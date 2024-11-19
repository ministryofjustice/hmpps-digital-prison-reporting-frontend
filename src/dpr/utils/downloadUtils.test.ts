/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response, Request } from 'express'
import ReportingService from '../services/reportingService'
import { Services } from '../types/Services'
import DownloadUtils from './downloadUtils'
import DownloadPermissionService from '../services/downloadPermissionService'
import createMockData from '../../../test-app/mocks/mockClients/reports/mockAsyncData'
import { LoadType } from '../types/UserReports'
import { components } from '../types/api'

describe('DownloadUtils', () => {
  describe('downloadReport', () => {
    let res: Response
    let req: Request
    let services: Services
    let reportingService: ReportingService
    let downloadPermissionService: DownloadPermissionService
    let redirectSpy: jest.SpyInstance<void, [url: string, status: number], any>
    let downloadSpy: jest.SpyInstance<
      Response<any, Record<string, any>>,
      [chunk: any, encoding: BufferEncoding, cb?: () => void],
      any
    >

    const mockDate = new Date(1466424490000)
    jest.spyOn(global, 'Date').mockImplementation(() => mockDate)

    beforeEach(() => {
      res = {
        userId: 'Us3r1D',
        token: 't0k3n',
        locals: {
          userId: 'Us3r1D',
          token: 't0k3n',
        },
        redirect: jest.fn(),
        download: jest.fn().mockImplementation(() => {
          // do nothing
        }),
        end: jest.fn().mockImplementation(() => {
          // do nothing
        }),
        setHeader: jest.fn().mockImplementation(() => {
          // do nothing
        }),
      } as unknown as Response

      redirectSpy = jest.spyOn(res, 'redirect')
      downloadSpy = jest.spyOn(res, 'end')

      req = {
        body: {
          reportId: 'reportId',
          id: 'id',
          tableId: 'tableId',
          dataProductDefinitionsPath: 'dataProductDefinitionsPath',
          reportName: 'reportName',
          variantName: 'variantName',
          cols: '["field1", "field2", "field3"]',
        },
      } as unknown as Request

      reportingService = {
        getAsyncReport: jest.fn().mockResolvedValue(createMockData(10)),
        getAsyncCount: jest.fn().mockResolvedValue(10),
        getDefinition: jest.fn().mockResolvedValue({
          variant: {
            specification: {
              fields: [
                { name: 'field1', display: 'field 1 display' },
                { name: 'field2', display: 'field 2 display' },
                { name: 'field3', display: 'field 3 display' },
              ],
            },
          },
        } as unknown as components['schemas']['SingleVariantReportDefinition']),
      } as unknown as ReportingService

      downloadPermissionService = {
        downloadEnabled: jest.fn().mockResolvedValue(true),
      } as unknown as DownloadPermissionService

      services = {
        reportingService,
        downloadPermissionService,
      } as unknown as Services
    })

    it('should download the report', async () => {
      await DownloadUtils.downloadReport({
        req,
        services,
        res,
        redirect: `/async/report/reportId/id/request/tableId/report/download-disabled`,
        loadType: LoadType.ASYNC,
      })

      const csv = `field 1 display,field 2 display,field 3 display
Value 1,Value 2,2003-02-01T01:00
Value 1,Value 2,2003-02-01T01:00
Value 1,Value 2,2003-02-01T01:00
Value 1,Value 2,2003-02-01T01:00
Value 1,Value 2,2003-02-01T01:00
Value 1,Value 2,2003-02-01T01:00
Value 1,Value 2,2003-02-01T01:00
Value 1,Value 2,2003-02-01T01:00
Value 1,Value 2,2003-02-01T01:00
Value 1,Value 2,2003-02-01T01:00`

      expect(downloadSpy).toHaveBeenCalledWith(csv)
    })

    it('should redirect when user does not have permission to download', async () => {
      downloadPermissionService = {
        downloadEnabled: jest.fn().mockResolvedValue(false),
      } as unknown as DownloadPermissionService

      services = {
        reportingService,
        downloadPermissionService,
      } as unknown as Services

      await DownloadUtils.downloadReport({
        req,
        services,
        res,
        redirect: `/async/report/reportId/id/request/tableId/report/download-disabled`,
        loadType: LoadType.ASYNC,
      })

      expect(redirectSpy).toHaveBeenCalledWith(`/async/report/reportId/id/request/tableId/report/download-disabled`)
    })
  })
})
