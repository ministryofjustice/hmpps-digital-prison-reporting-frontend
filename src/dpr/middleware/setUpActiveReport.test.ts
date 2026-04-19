import { expect, jest, describe } from '@jest/globals'
import type { Request, Response, NextFunction } from 'express'
import { storeActiveReportSessionData, buildKeyVariants } from './setUpActiveReport'
import { LoadType } from '../types/UserReports'
import { Services } from '../types/Services'
import LocalsHelper from '../utils/localsHelper'

// -------------------- Types --------------------

interface TestSession {
  activeReport?: Record<string, unknown>
}

// -------------------- Mocks --------------------

jest.mock('../utils/definitionUtils', () => ({
  getDefinitionByType: jest.fn(async () => ({
    fields: [],
  })),
  getDefaultFiltersQueryString: jest.fn(() => ({})),
  getDefaultColumnsQueryString: jest.fn(() => 'columns=a,b'),
  getDefaultSortQueryString: jest.fn(() => 'sort=a'),
}))

jest.mock('../utils/localsHelper', () => ({
  __esModule: true,
  default: {
    getValues: jest.fn(),
    getRouteLocals: jest.fn(),
  },
}))

// -------------------- Test helpers --------------------

const makeReq = (overrides: Partial<Request>, session: TestSession): Request =>
  ({
    method: 'GET',
    params: {},
    originalUrl: '/dpr/view-report',
    protocol: 'http',
    get: () => 'localhost',
    session,
    ...overrides,
  }) as unknown as Request

const makeRes = (): Response =>
  ({
    locals: {
      dprUser: {
        id: 'user-1',
        token: 'token-123',
      },
    },
  }) as unknown as Response

const makeServices = (): Services =>
  ({
    bookmarkService: {
      isBookmarked: jest.fn(async () => true),
    },
    downloadPermissionService: {
      downloadEnabledForReport: jest.fn(async () => true),
    },
    defaultFilterValuesService: {
      get: jest.fn(async () => []),
    },
  }) as unknown as Services

const next: NextFunction = jest.fn()

// -------------------- Tests --------------------

describe('setUpActiveReport', () => {
  describe('concurrency safety', () => {
    beforeEach(() => {
      jest.clearAllMocks()
      ;(LocalsHelper.getValues as jest.Mock).mockReturnValue({
        definitionsPath: '/defs',
        dprUser: { token: 'token-123' },
      })
      ;(LocalsHelper.getRouteLocals as jest.Mock).mockReturnValue({
        nestedBaseUrl: '',
      })
    })

    it('isolates execution state while safely merging base state for the same report across tabs', async () => {
      const session: TestSession = {}

      const middleware = storeActiveReportSessionData({
        services: makeServices(),
        loadType: LoadType.ASYNC,
      })

      const reqTabA = makeReq(
        {
          params: {
            id: '1',
            reportId: 'report-A',
            executionId: 'exec-1',
            type: 'ASYNC',
          },
        },
        session,
      )

      const reqTabB = makeReq(
        {
          params: {
            id: '1',
            reportId: 'report-A',
            executionId: 'exec-2',
            type: 'ASYNC',
          },
        },
        session,
      )

      const res = makeRes()

      await middleware(reqTabA, res, next)
      await middleware(reqTabB, res, next)

      const store = session.activeReport!
      const { baseKey } = buildKeyVariants(reqTabA)
      const { execKey: execKeyA } = buildKeyVariants(reqTabA)
      const { execKey: execKeyB } = buildKeyVariants(reqTabB)

      expect(store[baseKey]).toBeDefined()
      expect(store[execKeyA!]).toBeDefined()
      expect(store[execKeyB!]).toBeDefined()
    })

    it('keeps session data isolated when two different reports are loaded in parallel tabs', async () => {
      const session: TestSession = {}

      const middleware = storeActiveReportSessionData({
        services: makeServices(),
        loadType: LoadType.SYNC,
      })

      const reqA = makeReq(
        {
          params: {
            id: '1',
            reportId: 'report-A',
            type: 'SYNC',
          },
        },
        session,
      )

      const reqB = makeReq(
        {
          params: {
            id: '2',
            reportId: 'report-B',
            type: 'SYNC',
          },
        },
        session,
      )

      const res = makeRes()

      await middleware(reqA, res, next)
      await middleware(reqB, res, next)

      const store = session.activeReport!
      const keyA = buildKeyVariants(reqA).baseKey
      const keyB = buildKeyVariants(reqB).baseKey

      expect(store[keyA]).toBeDefined()
      expect(store[keyB]).toBeDefined()
      expect(keyA).not.toEqual(keyB)
    })

    it('does not lose base report data when an execution request arrives before the base request', async () => {
      const session: TestSession = {}

      const middleware = storeActiveReportSessionData({
        services: makeServices(),
        loadType: LoadType.ASYNC,
      })

      const execFirst = makeReq(
        {
          params: {
            id: '99',
            reportId: 'report-X',
            executionId: 'exec-early',
            type: 'ASYNC',
          },
        },
        session,
      )

      const baseLater = makeReq(
        {
          params: {
            id: '99',
            reportId: 'report-X',
            type: 'ASYNC',
          },
        },
        session,
      )

      const res = makeRes()

      await middleware(execFirst, res, next)
      await middleware(baseLater, res, next)

      const store = session.activeReport!
      const { baseKey } = buildKeyVariants(baseLater)

      expect(store[baseKey]).toBeDefined()
    })
  })

  describe('idempotency & repeat navigation', () => {
    beforeEach(() => {
      jest.clearAllMocks()
      ;(LocalsHelper.getValues as jest.Mock).mockReturnValue({
        definitionsPath: '/defs',
        dprUser: { token: 'token-123' },
      })
      ;(LocalsHelper.getRouteLocals as jest.Mock).mockReturnValue({
        nestedBaseUrl: '',
      })
    })

    it('is idempotent when the same base report is loaded multiple times', async () => {
      const session: TestSession = {}

      const middleware = storeActiveReportSessionData({
        services: makeServices(),
        loadType: LoadType.SYNC,
      })

      const req = makeReq(
        {
          params: {
            id: '10',
            reportId: 'report-repeat',
            type: 'SYNC',
          },
        },
        session,
      )

      const res = makeRes()

      // First load
      await middleware(req, res, next)
      const firstSnapshot = JSON.stringify(session.activeReport)

      // Repeat navigation (refresh / back / reopen)
      await middleware(req, res, next)
      const secondSnapshot = JSON.stringify(session.activeReport)

      const { baseKey } = buildKeyVariants(req)

      expect(session.activeReport).toBeDefined()
      expect(session.activeReport![baseKey]).toBeDefined()

      // No mutation or drift between identical requests
      expect(secondSnapshot).toEqual(firstSnapshot)
    })

    it('does not create duplicate execution keys when the same execution is reloaded', async () => {
      const session: TestSession = {}

      const middleware = storeActiveReportSessionData({
        services: makeServices(),
        loadType: LoadType.ASYNC,
      })

      const req = makeReq(
        {
          params: {
            id: '20',
            reportId: 'report-exec',
            executionId: 'exec-1',
            type: 'ASYNC',
          },
        },
        session,
      )

      const res = makeRes()

      await middleware(req, res, next)
      await middleware(req, res, next)

      const store = session.activeReport!
      const { baseKey, execKey } = buildKeyVariants(req)

      const keys = Object.keys(store)

      // Still only base + one exec key
      expect(keys).toContain(baseKey)
      expect(keys).toContain(execKey!)
      expect(keys).toHaveLength(2)
    })

    it('preserves existing base data when a repeat request provides no new values', async () => {
      const session: TestSession = {}

      const middleware = storeActiveReportSessionData({
        services: makeServices(),
        loadType: LoadType.SYNC,
      })

      const req = makeReq(
        {
          params: {
            id: '30',
            reportId: 'report-stable',
            type: 'SYNC',
          },
        },
        session,
      )

      const res = makeRes()

      await middleware(req, res, next)

      const before = session.activeReport!
      const { baseKey } = buildKeyVariants(req)
      const baseBefore = { ...(before[baseKey] as object) }

      // Repeat same navigation
      await middleware(req, res, next)

      const baseAfter = session.activeReport![baseKey]
      expect(baseAfter).toEqual(baseBefore)
    })
  })

  describe('partial journeys & optional params', () => {
    beforeEach(() => {
      jest.clearAllMocks()
      ;(LocalsHelper.getValues as jest.Mock).mockReturnValue({
        definitionsPath: '/defs',
        dprUser: { token: 'token-123' },
      })
      ;(LocalsHelper.getRouteLocals as jest.Mock).mockReturnValue({
        nestedBaseUrl: '',
      })
    })

    it('creates only a base key when no executionId or tableId is provided', async () => {
      const session: TestSession = {}

      const middleware = storeActiveReportSessionData({
        services: makeServices(),
        loadType: LoadType.SYNC,
      })

      const req = makeReq(
        {
          params: {
            id: '1',
            reportId: 'report-base',
            type: 'SYNC',
          },
        },
        session,
      )

      const res = makeRes()

      await middleware(req, res, next)

      const store = session.activeReport!
      const { baseKey, execKey, tableKey } = buildKeyVariants(req)

      expect(store[baseKey]).toBeDefined()
      expect(execKey).toBeUndefined()
      expect(tableKey).toBeUndefined()
      expect(Object.keys(store)).toHaveLength(1)
    })

    it('creates base and execution keys when executionId is present', async () => {
      const session: TestSession = {}

      const middleware = storeActiveReportSessionData({
        services: makeServices(),
        loadType: LoadType.ASYNC,
      })

      const req = makeReq(
        {
          params: {
            id: '2',
            reportId: 'report-exec',
            executionId: 'exec-1',
            type: 'ASYNC',
          },
        },
        session,
      )

      const res = makeRes()

      await middleware(req, res, next)

      const store = session.activeReport!
      const { baseKey, execKey, tableKey } = buildKeyVariants(req)

      expect(store[baseKey]).toBeDefined()
      expect(store[execKey!]).toBeDefined()
      expect(tableKey).toBeUndefined()
      expect(Object.keys(store)).toHaveLength(2)
    })

    it('creates base and table keys when tableId is present without executionId', async () => {
      const session: TestSession = {}

      const middleware = storeActiveReportSessionData({
        services: makeServices(),
        loadType: LoadType.ASYNC,
      })

      const req = makeReq(
        {
          params: {
            id: '3',
            reportId: 'report-table',
            tableId: 'table-1',
            type: 'ASYNC',
          },
        },
        session,
      )

      const res = makeRes()

      await middleware(req, res, next)

      const store = session.activeReport!
      const { baseKey, execKey, tableKey } = buildKeyVariants(req)

      expect(store[baseKey]).toBeDefined()
      expect(execKey).toBeUndefined()
      expect(store[tableKey!]).toBeDefined()
      expect(Object.keys(store)).toHaveLength(2)
    })

    it('creates base, execution, and table keys when both executionId and tableId are present', async () => {
      const session: TestSession = {}

      const middleware = storeActiveReportSessionData({
        services: makeServices(),
        loadType: LoadType.ASYNC,
      })

      const req = makeReq(
        {
          params: {
            id: '4',
            reportId: 'report-full',
            executionId: 'exec-99',
            tableId: 'table-99',
            type: 'ASYNC',
          },
        },
        session,
      )

      const res = makeRes()

      await middleware(req, res, next)

      const store = session.activeReport!
      const { baseKey, execKey, tableKey } = buildKeyVariants(req)

      expect(store[baseKey]).toBeDefined()
      expect(store[execKey!]).toBeDefined()
      expect(store[tableKey!]).toBeDefined()
      expect(Object.keys(store)).toHaveLength(3)
    })
  })

  describe('non-GET request behaviour', () => {
    beforeEach(() => {
      jest.clearAllMocks()
      ;(LocalsHelper.getValues as jest.Mock).mockReturnValue({
        definitionsPath: '/defs',
        dprUser: { token: 'token-123' },
      })
      ;(LocalsHelper.getRouteLocals as jest.Mock).mockReturnValue({
        nestedBaseUrl: '',
      })
    })

    it('does not initialise or mutate activeReport for POST requests', async () => {
      const session: TestSession = {}

      const middleware = storeActiveReportSessionData({
        services: makeServices(),
        loadType: LoadType.ASYNC,
      })

      const req = {
        ...makeReq(
          {
            params: {
              id: '1',
              reportId: 'report-post',
              executionId: 'exec-1',
              type: 'ASYNC',
            },
          },
          session,
        ),
        method: 'POST',
      } as Request

      const res = makeRes()

      await middleware(req, res, next)

      // Session must remain untouched
      expect(session.activeReport).toBeUndefined()
    })

    it('calls next() for POST requests without side effects', async () => {
      const session: TestSession = {}

      const middleware = storeActiveReportSessionData({
        services: makeServices(),
        loadType: LoadType.SYNC,
      })

      const req = {
        ...makeReq(
          {
            params: {
              id: '2',
              reportId: 'report-post-next',
              type: 'SYNC',
            },
          },
          session,
        ),
        method: 'POST',
      } as Request

      const res = makeRes()
      const nextSpy = jest.fn()

      await middleware(req, res, nextSpy)

      expect(nextSpy).toHaveBeenCalledTimes(1)
      expect(session.activeReport).toBeUndefined()
    })
  })
})
