import { NextFunction, Response, Request } from 'express'

import { Services } from '../types/Services'
import * as Middleware from './populateRequestedReports'
import RequestedReportService from '../services/requestedReportService'
import { RecentlyViewedReport } from '../types/UserReports'
import BookmarkService from '../services/bookmarkService'
import DownloadPermissionService from '../services/downloadPermissionService'

describe('populateRequestedReports middleware', () => {
  let requestedReportService: RequestedReportService
  let bookmarkService: BookmarkService
  let recentlyViewedService: RecentlyViewedReport
  let downloadPermissionService: DownloadPermissionService
  let services: Services
  let res: Response
  let req: Request
  let next: NextFunction

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

    req = {
      body: {},
      query: {},
    } as unknown as Request

    next = jest.fn().mockImplementation(() => {
      // do nothing
    })
  })

  it('should get the request and recently viewed reports', async () => {
    await Middleware.populateRequestedReports(services, req, res, next)

    expect(services.requestedReportService.getAllReports).toHaveBeenCalledWith('Uu1d')
    expect(services.recentlyViewedService.getAllReports).toHaveBeenCalledWith('Uu1d')
    expect(res.locals.bookmarkingEnabled).toBeUndefined()
    expect(res.locals.downloadingEnabled).toBeUndefined()
  })

  it('should get the boomarks', async () => {
    services = {
      ...services,
      bookmarkService,
    }
    await Middleware.populateRequestedReports(services, req, res, next)

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
    await Middleware.populateRequestedReports(services, req, res, next)

    expect(services.requestedReportService.getAllReports).toHaveBeenCalledWith('Uu1d')
    expect(services.recentlyViewedService.getAllReports).toHaveBeenCalledWith('Uu1d')
    expect(res.locals.bookmarkingEnabled).toBeTruthy()
    expect(services.bookmarkService.getAllBookmarks).toHaveBeenCalledWith('Uu1d')
    expect(res.locals.downloadingEnabled).toBeTruthy()
  })
})
