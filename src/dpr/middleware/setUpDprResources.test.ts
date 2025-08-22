import { Response, Request } from 'express'

import { Services } from '../types/Services'
import * as Middleware from './setUpDprResources'
import { RecentlyViewedReport } from '../types/UserReports'
import { DownloadPermissionService, RequestedReportService, ReportingService, BookmarkService } from '../services'

describe('setUpDprResources', () => {
  describe('populateRequestedReports', () => {
    let requestedReportService: RequestedReportService
    let bookmarkService: BookmarkService
    let recentlyViewedService: RecentlyViewedReport
    let downloadPermissionService: DownloadPermissionService
    let services: Services
    let res: Response

    beforeEach(() => {
      requestedReportService = {
        getAllReports: jest.fn().mockResolvedValue([]),
      } as unknown as RequestedReportService

      recentlyViewedService = {
        getAllReports: jest.fn().mockResolvedValue([]),
      } as unknown as RecentlyViewedReport

      bookmarkService = {
        getAllBookmarks: jest.fn().mockResolvedValue([]),
      } as unknown as BookmarkService

      downloadPermissionService = {} as unknown as DownloadPermissionService

      services = {
        requestedReportService,
        recentlyViewedService,
      } as unknown as Services

      res = {
        locals: {
          user: {
            token: 'T0k3n',
            uuid: 'Uu1d',
          },
        },
      } as unknown as Response
    })

    it('should get the request and recently viewed reports', async () => {
      await Middleware.populateRequestedReports(services, res)

      expect(services.requestedReportService.getAllReports).toHaveBeenCalledWith('Uu1d')
      expect(services.recentlyViewedService.getAllReports).toHaveBeenCalledWith('Uu1d')
      expect(res.locals.bookmarkingEnabled).toBeUndefined()
      expect(res.locals.downloadingEnabled).toBeUndefined()
    })

    it('should get the bookmarks', async () => {
      services = {
        ...services,
        bookmarkService,
      }
      await Middleware.populateRequestedReports(services, res)

      expect(services.requestedReportService.getAllReports).toHaveBeenCalledWith('Uu1d')
      expect(services.recentlyViewedService.getAllReports).toHaveBeenCalledWith('Uu1d')
      expect(res.locals.bookmarkingEnabled).toBeTruthy()
      expect(services.bookmarkService.getAllBookmarks).toHaveBeenCalledWith('Uu1d')
      expect(res.locals.downloadingEnabled).toBeUndefined()
    })

    it('should enable downloading', async () => {
      services = {
        ...services,
        bookmarkService,
        downloadPermissionService,
      }
      await Middleware.populateRequestedReports(services, res)

      expect(services.requestedReportService.getAllReports).toHaveBeenCalledWith('Uu1d')
      expect(services.recentlyViewedService.getAllReports).toHaveBeenCalledWith('Uu1d')
      expect(res.locals.bookmarkingEnabled).toBeTruthy()
      expect(services.bookmarkService.getAllBookmarks).toHaveBeenCalledWith('Uu1d')
      expect(res.locals.downloadingEnabled).toBeTruthy()
    })
  })

  describe('populateDefinitions', () => {
    let reportingService: ReportingService
    let services: Services
    let res: Response
    let req: Request

    beforeEach(() => {
      reportingService = {
        getDefinitions: jest.fn(),
      } as unknown as ReportingService

      services = {
        reportingService,
      } as unknown as Services

      res = {
        locals: {
          user: {
            token: 'T0k3n',
          },
        },
      } as unknown as Response

      req = {
        body: {},
        query: {},
      } as unknown as Request
    })

    it('should get the definitions with no DPD path', async () => {
      await Middleware.populateDefinitions(services, req, res)

      expect(services.reportingService.getDefinitions).toHaveBeenCalledWith('T0k3n', undefined)
    })

    it('should get the definitions with a DPD path from the config', async () => {
      await Middleware.populateDefinitions(services, req, res, {
        dataProductDefinitionsPath: 'dpd/path/from/config',
      })
      expect(res.locals.dpdPathFromConfig).toBeTruthy()
      expect(res.locals.dpdPathFromQuery).toBeFalsy()
      expect(res.locals.definitionsPath).toEqual('dpd/path/from/config')
      expect(res.locals.pathSuffix).toEqual('?dataProductDefinitionsPath=dpd/path/from/config')
      expect(services.reportingService.getDefinitions).toHaveBeenCalledWith('T0k3n', 'dpd/path/from/config')
    })

    it('should get the definitions and override the config DPD path with DPD path from query', async () => {
      req.query.dataProductDefinitionsPath = 'dpd/path/from/query'

      await Middleware.populateDefinitions(services, req, res, {
        dataProductDefinitionsPath: 'dpd/path/from/config',
      })
      expect(res.locals.dpdPathFromConfig).toBeTruthy()
      expect(res.locals.dpdPathFromQuery).toBeTruthy()
      expect(res.locals.definitionsPath).toEqual('dpd/path/from/query')
      expect(res.locals.pathSuffix).toEqual('?dataProductDefinitionsPath=dpd/path/from/query')
      expect(services.reportingService.getDefinitions).toHaveBeenCalledWith('T0k3n', 'dpd/path/from/query')
    })
  })
})
