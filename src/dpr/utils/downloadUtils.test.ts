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
    let redirectSpy
    let fsUnlinkSpy: jest.SpyInstance<void, [path: fs.PathLike], any>
    let fsOutputFileSpy: jest.SpyInstance<
      void,
      [file: string, data: string | NodeJS.ArrayBufferView, options: fs.WriteFileOptions, callback: fs.NoParamCallback],
      any
    >

    beforeEach(() => {
      fsUnlinkSpy = jest.spyOn(fs, 'unlinkSync')
      fsOutputFileSpy = jest.spyOn(fs, 'outputFile')
      res = {
        userId: 'Us3r1D',
        token: 't0k3n',
        locals: {
          userId: 'Us3r1D',
          token: 't0k3n',
        },
        redirect: jest.fn(),
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
          cols: '["field1", "Field2", "Field3"]',
        },
      } as unknown as Request

      reportingService = {
        getAsyncReport: jest.fn().mockResolvedValue(createMockData(10)),
      } as unknown as ReportingService

      downloadPermissionService = {
        downloadEnabled: jest.fn(),
      } as unknown as DownloadPermissionService

      services = {
        reportingService,
        downloadPermissionService,
      } as unknown as Services
    })

    it('should download the report', async () => {
      const result = await DownloadUtils.downloadReport({
        req,
        services,
        res,
      })

      expect(result).toEqual('')
    })

    it('should redirect when user does not have permission to download', async () => {
      const result = await DownloadUtils.downloadReport({
        req,
        services,
        res,
      })

      expect(result).toEqual('')
    })
  })
})
