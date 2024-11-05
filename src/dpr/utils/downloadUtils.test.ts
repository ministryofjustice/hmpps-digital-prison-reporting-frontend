/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response, Request } from 'express'
import fs from 'fs-extra'
import ReportingService from '../services/reportingService'
import { Services } from '../types/Services'
import DownloadUtils from './downloadUtils'
import DownloadPermissionService from '../services/downloadPermissionService'
import createMockData from '../../../test-app/mocks/mockClients/reports/mockAsyncData'

describe('DownloadUtils', () => {
  describe('downloadReport', () => {
    let res: Response
    let req: Request
    let services: Services
    let reportingService: ReportingService
    let downloadPermissionService: DownloadPermissionService
    let redirectSpy: jest.SpyInstance<void, [url: string, status: number], any>
    let fsOutputFileSpy: jest.SpyInstance<
      void,
      [file: string, data: string | NodeJS.ArrayBufferView, options: fs.WriteFileOptions, callback: fs.NoParamCallback],
      any
    >

    const mockDate = new Date(1466424490000)
    jest.spyOn(global, 'Date').mockImplementation(() => mockDate)

    beforeEach(() => {
      fsOutputFileSpy = jest.spyOn(fs, 'outputFile')
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
      } as unknown as Response

      redirectSpy = jest.spyOn(res, 'redirect')

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
      })

      const csv = `field1,field2,field3
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

      expect(fsOutputFileSpy).toHaveBeenCalledWith(
        './download/reportName-variantName-2016-06-20T12:08:10.000Z.csv',
        csv,
      )
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
      })

      expect(redirectSpy).toHaveBeenCalledWith(`/async/report/reportId/id/request/tableId/report/download-disabled`)
    })
  })
})
