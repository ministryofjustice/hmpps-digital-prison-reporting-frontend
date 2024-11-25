import type { Request, Response } from 'express'
import { Url } from 'url'
import { Services } from '../../../types/Services'
import { SyncReportFeatures, SyncReportFeaturesList } from '../../../types/SyncReportUtils'
import SyncReportUtils from './utils'
import ReportingService from '../../../services/reportingService'

// mocks
import mockReportVariant from '../../../../../test-app/mocks/mockClients/reports/mockVariants/variant1'
import { components } from '../../../types/api'
import DownloadPermissionService from '../../../services/downloadPermissionService'
import BookmarkService from '../../../services/bookmarkService'
import createMockData from '../../../../../test-app/mocks/mockClients/reports/mockAsyncData'
import mockSyncListData from '../../../../../test-app/mocks/mockClients/reports/mockSyncListData'

jest.mock('parseurl', () => ({
  __esModule: true,
  default: jest.fn().mockImplementation(() => ({ pathname: 'pathname', search: 'search' } as Url)),
}))

describe('SyncReportUtils', () => {
  let req: Request
  let res: Response
  let services: Services
  let features: SyncReportFeatures
  let reportingService: ReportingService
  let downloadPermissionService: DownloadPermissionService
  let bookmarkService: BookmarkService
  let mockDefinition: components['schemas']['SingleVariantReportDefinition']

  beforeEach(() => {
    req = {
      params: {
        reportId: 'reportId',
        id: 'id',
      },
      query: {
        dataProductDefinitionsPath: 'this/that/other',
      },
      get: jest.fn().mockReturnValue('host'),
      originalUrl: 'originalUrl',
      protocol: 'protocol',
    } as unknown as Request

    res = {
      locals: {
        user: {
          uuid: 'userId',
        },
        token: 'T03En',
      },
    } as unknown as Response

    mockDefinition = {
      id: 'reportId',
      name: 'reportName',
      description: 'description',
      variant: mockReportVariant as components['schemas']['VariantDefinition'],
    }

    const mockData = createMockData(1)
    reportingService = {
      getDefinition: jest.fn().mockResolvedValue(mockDefinition),
      getListWithWarnings: jest.fn().mockResolvedValue({ data: mockData }),
      getCount: jest.fn().mockResolvedValue(100),
    } as unknown as ReportingService

    downloadPermissionService = {
      downloadEnabled: jest.fn().mockResolvedValue(false),
    } as unknown as DownloadPermissionService

    bookmarkService = {
      isBookmarked: jest.fn().mockResolvedValue(false),
    } as unknown as BookmarkService

    services = {
      reportingService,
      downloadPermissionService,
      bookmarkService,
    } as unknown as Services

    features = {
      list: [SyncReportFeaturesList.download],
    } as unknown as SyncReportFeatures
  })

  describe('getReport', () => {
    it('should get the report', async () => {
      const result = await SyncReportUtils.getReport({ req, res, services, features })

      expect(result).toEqual(mockSyncListData)
    })
  })
})
