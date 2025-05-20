import type { Request, Response } from 'express'
import { Url } from 'url'
import { Services } from '../../../types/Services'
import { EmbeddedReportFeatures, EmbeddedReportFeaturesList } from '../../../types/EmbeddedReportUtils'
import EmbeddedReportUtils from './utils'
import ReportingService from '../../../services/reportingService'

// mocks
import mockReportVariant from '../../../../../test-app/mocks/mockClients/reports/mockVariants/variant1'
import { components } from '../../../types/api'
import DownloadPermissionService from '../../../services/downloadPermissionService'
import BookmarkService from '../../../services/bookmarkService'
import createMockData from '../../../../../test-app/mocks/mockClients/reports/mockAsyncData'
import mockEmbeddedListData from '../../../../../test-app/mocks/mockClients/reports/mockEmbeddedListData'

jest.mock('parseurl', () => ({
  __esModule: true,
  default: jest.fn().mockImplementation(() => ({ pathname: 'pathname', search: 'search' } as Url)),
}))

describe('EmbeddedReportUtils', () => {
  let req: Request
  let res: Response
  let services: Services
  let features: EmbeddedReportFeatures
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
      list: [EmbeddedReportFeaturesList.download],
    } as unknown as EmbeddedReportFeatures
  })

  describe('getReport', () => {
    it('should get the report', async () => {
      const result = await EmbeddedReportUtils.getReport({ req, res, services, features })

      expect(result).toEqual(mockEmbeddedListData)
    })
  })
})
