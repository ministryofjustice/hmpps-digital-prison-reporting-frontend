import { Response } from 'express'
import ReportingService from '../services/reportingService'
import { Services } from '../types/Services'
import DownloadUtils from './downloadUtils'

describe('DownloadUtils', () => {
  describe('downloadReport', () => {
    let res: Response
    let services: Services
    let reportingService: ReportingService

    beforeEach(() => {
      res = {
        download: jest.fn,
      } as unknown as Response

      reportingService = {} as unknown as ReportingService

      services = {
        reportingService,
      } as unknown as Services
    })

    it('should download the report', async () => {
      const result = await DownloadUtils.downloadReport({
        reportId: 'reportId',
        id: 'id',
        token: 'token',
        tableId: 'tableId',
        services,
        res,
      })

      expect(result).toEqual('')
    })
  })
})
