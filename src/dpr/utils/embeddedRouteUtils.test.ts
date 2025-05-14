/* eslint-disable @typescript-eslint/no-explicit-any */
import { Router } from 'express'
import SyncRouteUtils from './embeddedRouteUtils'
import * as embeddedRouteHelper from './embeddedRouteUtils'
import * as DownloadRoutes from '../routes/download'
import { Services } from '../types/Services'
import logger from './logger'

import MockUserStoreService from '../../../test-app/mocks/mockClients/store/mockRedisStore'
import DownloadPermissionService from '../services/downloadPermissionService'
import UserDataStore, { RedisClient } from '../data/reportDataStore'
import { EmbeddedReportFeatures, EmbeddedReportFeaturesList } from '../types/EmbeddedReportUtils'
import MockReportingClient from '../../../test-app/mocks/mockClients/reports/mockReportingClient'
import ReportingService from '../services/reportingService'
import ReportingClient from '../data/reportingClient'

const mockDownloadPermissionService = {
  init: () => true,
} as unknown as DownloadPermissionService
jest.mock('../services/downloadPermissionService', () => {
  return jest.fn().mockImplementation(() => {
    return mockDownloadPermissionService
  })
})

jest.mock('../services/reportingService.ts', () => {
  return jest.fn().mockImplementation(() => {
    return {}
  })
})

jest.mock('../data/reportingClient.ts', () => {
  return jest.fn().mockImplementation(() => {
    return {}
  })
})

const mockReportingClient = new MockReportingClient() as unknown as ReportingClient
const mockReportingService = new ReportingService(mockReportingClient)

describe('SyncRouteUtils', () => {
  let router: Router
  let services: Services
  let redisClient: RedisClient
  let mockUserDataStore: UserDataStore

  let loggerSpy: jest.SpyInstance<void, [format: any, ...params: any[]], any>
  let loggerErrorSpy: jest.SpyInstance<void, [format: any, ...params: any[]], any>

  beforeEach(() => {
    router = {} as unknown as Router
    services = {} as unknown as Services
    redisClient = {} as unknown as RedisClient
    mockUserDataStore = new MockUserStoreService() as unknown as UserDataStore
    loggerSpy = jest.spyOn(logger, 'info')
    loggerErrorSpy = jest.spyOn(logger, 'error')
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('initUserDataStore', () => {
    it('should initialise the store given a redis client ', async () => {
      const features: EmbeddedReportFeatures = {
        config: {
          redisClient,
        },
        list: [EmbeddedReportFeaturesList.download],
      }

      try {
        await embeddedRouteHelper.initUserDataStore(features, services)
      } catch (error) {
        //
      }

      expect(loggerSpy).toHaveBeenLastCalledWith('Embedded Reports: Redis Client found. Initialising User Data store.')
    })

    it('should use a provided user data store', async () => {
      const features: EmbeddedReportFeatures = {
        config: {
          userDataStore: mockUserDataStore,
        },
        list: [EmbeddedReportFeaturesList.download],
      }

      try {
        await embeddedRouteHelper.initUserDataStore(features, services)
      } catch (error) {
        //
      }

      expect(loggerSpy).toHaveBeenLastCalledWith(
        'Embedded Reports: User data store found. Using the provided user data store',
      )
    })

    it('should throw error cant create UserData store no initialised service is provided', async () => {
      const features: EmbeddedReportFeatures = {
        config: {},
        list: [EmbeddedReportFeaturesList.download],
      }

      let errorMessage
      try {
        await embeddedRouteHelper.initUserDataStore(features, services)
      } catch (error) {
        errorMessage = error.message
      }

      expect(loggerSpy).toHaveBeenLastCalledWith(
        'No user data store config provided. Assuming pre-initialisation of feature services',
      )
      expect(errorMessage).toEqual('Missing downloadPermissionService in services config: Cant enable download feature')
    })
  })

  describe('initFeatures', () => {
    let addDownloadRoutesSpy: jest.SpyInstance<
      void,
      [{ router: Router; layoutPath: string; services: Services; templatePath?: string }],
      any
    >

    beforeEach(() => {
      jest.spyOn(embeddedRouteHelper, 'initUserDataStore').mockReturnValue(mockUserDataStore)
      addDownloadRoutesSpy = jest.spyOn(DownloadRoutes, 'default').mockImplementation(() => {
        // do nothing
      })
    })

    it('should initialise the download feature', async () => {
      const params = {
        router,
        config: {
          templatePath: 'templatePath',
          layoutPath: 'layoutPath',
        },
        services,
        features: {
          config: {
            redisClient,
            userId: 'userId',
          },
          list: [EmbeddedReportFeaturesList.download],
        },
      }

      const res = await SyncRouteUtils.initFeatures(params)

      expect(loggerSpy).toHaveBeenNthCalledWith(4, 'Download Feature: Service initialised and added to services config')

      expect(addDownloadRoutesSpy).toHaveBeenCalledWith({
        router,
        services: {
          downloadPermissionService: mockDownloadPermissionService,
        },
        prefix: '',
        layoutPath: params.config.layoutPath,
      })

      expect(res.initialisedFeatures).toEqual({
        download: true,
      })
    })

    it('should not initialise the download feature if pre-initialised', async () => {
      const params = {
        router,
        config: {
          templatePath: 'templatePath',
          layoutPath: 'layoutPath',
        },
        services: {
          downloadPermissionService: mockDownloadPermissionService,
        } as unknown as Services,
        features: {
          config: {
            userDataStore: mockUserDataStore,
          },
          list: [EmbeddedReportFeaturesList.download],
        },
      }

      const res = SyncRouteUtils.initFeatures(params)

      expect(addDownloadRoutesSpy).toHaveBeenCalledWith({
        router,
        services: {
          downloadPermissionService: mockDownloadPermissionService,
        },
        prefix: '',
        layoutPath: params.config.layoutPath,
      })

      expect(res.initialisedFeatures).toEqual({
        download: true,
      })

      expect(loggerSpy).toHaveBeenNthCalledWith(3, 'Download Feature: DownloadPermissionService found')
    })

    it('should provide info about unavailable services', async () => {
      const params = {
        router,
        config: {
          templatePath: 'templatePath',
          layoutPath: 'layoutPath',
        },
        services: {} as unknown as Services,
        features: {
          config: {
            userDataStore: mockUserDataStore,
          },
          list: [EmbeddedReportFeaturesList.recentlyViewed, EmbeddedReportFeaturesList.bookmark],
        },
      }

      SyncRouteUtils.initFeatures(params)

      expect(addDownloadRoutesSpy).not.toHaveBeenCalled()

      expect(loggerSpy).toHaveBeenNthCalledWith(2, 'Recently Viewed Feature: Not Available')
      expect(loggerSpy).toHaveBeenNthCalledWith(3, 'Bookmark Feature: Not Available')
    })
  })

  describe('initReportingService', () => {
    beforeEach(() => {
      //
    })

    it('should initialise the repoprting service when config is provided', async () => {
      const res = SyncRouteUtils.initReportingService(
        {
          reportingClientArgs: {
            url: 'url',
            agent: { timeout: 20 },
          },
        },
        {} as unknown as Services,
      )

      expect(loggerSpy).toHaveBeenNthCalledWith(1, 'Embedded Reports: Reporting config found')
      expect(loggerSpy).toHaveBeenNthCalledWith(2, 'Embedded Reports: Initialising Reporting Client and Service')

      expect(Object.keys(res.services).length).toEqual(1)
    })

    it('should not initialise the repoprting service when a pre inititialised service is present', async () => {
      const res = SyncRouteUtils.initReportingService(
        {
          reportingClientArgs: {
            url: 'url',
            agent: { timeout: 20 },
          },
        },
        {
          reportingService: mockReportingService,
        } as unknown as Services,
      )

      expect(loggerSpy).toHaveBeenNthCalledWith(1, 'Embedded Reports: Reporting config found')
      expect(loggerSpy).toHaveBeenNthCalledWith(2, 'Embedded Reports: Reporting Service Found. Using service provided')

      expect(Object.keys(res.services).length).toEqual(1)
    })

    it('should complain when neither config or service is provided', async () => {
      SyncRouteUtils.initReportingService({}, {} as unknown as Services)

      expect(loggerErrorSpy).toHaveBeenCalledWith(
        'Embedded Reports: No Reporting service or Config Found. Please provide an initialiesed report service, or the correct config',
      )
    })
  })
})
