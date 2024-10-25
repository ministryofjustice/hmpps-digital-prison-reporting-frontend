import RequestedReportService from './requestedReportService'
import UserDataStore from '../data/userDataStore'
import { ReportType, RequestedReport, RequestStatus } from '../types/UserReports'

const mockUserStore = {
  setUserConfig: jest.fn(),
  getUserConfig: jest.fn().mockImplementation(() => {
    return Promise.resolve({
      requestedReports: [],
    })
  }),
  ensureConnected: jest.fn(),
  init: jest.fn(),
} as unknown as jest.Mocked<UserDataStore>

const userId = 'userId'

describe('RequestedReportService', () => {
  let asyncReportsStore: RequestedReportService

  beforeEach(() => {
    asyncReportsStore = new RequestedReportService(mockUserStore)
    asyncReportsStore.init(userId)
  })

  describe('addReport', () => {
    it('should add a report to the store', async () => {
      const getStateSpy = jest.spyOn(asyncReportsStore, 'getState')
      const saveStateSpy = jest.spyOn(asyncReportsStore, 'saveState')

      const requestData: RequestedReport = {
        reportId: 'reportId-1',
        variantId: 'variantId-1',
        executionId: 'ex1a2s3d4f5g6h7j8k',
        tableId: 'dfsdf',
        name: 'vName',
        variantName: 'vName',
        reportName: 'rName',
        template: 'list',
        type: ReportType.REPORT,
        description: 'description',
        status: RequestStatus.SUBMITTED,
        dataProductDefinitionsPath: undefined,
        filters: {
          data: {
            field1: 'value1.2',
            'field3.start': '2003-02-01',
            'field3.end': '2006-05-04',
          },
          queryString: 'field1=value1.2&field3.start=2003-02-01&field3.end=2006-05-04',
        },
        sortBy: {
          data: {
            sortColumn: 'field1',
            sortedAsc: 'true',
          },
          queryString: 'sortColumn=field1&sortedAsc=true',
        },
        url: {
          origin: 'origin',
          request: {
            fullUrl: undefined,
            pathname: 'pathname',
            search: 'search',
          },
          polling: {
            fullUrl: 'originpathname/ex1a2s3d4f5g6h7j8k',
            pathname: 'pathname/ex1a2s3d4f5g6h7j8k',
          },
          report: {},
        },
        query: {
          data: {
            'filters.field1': 'value1.2',
            'filters.field3.start': '2003-02-01',
            'filters.field3.end': '2006-05-04',
            sortColumn: 'field1',
            sortedAsc: 'true',
          },
          summary: [
            {
              name: 'field1',
              value: 'value1.2',
            },
            {
              name: 'field3.start',
              value: '2003-02-01',
            },
            {
              name: 'field3.end',
              value: '2006-05-04',
            },
            {
              name: 'sortColumn',
              value: 'field1',
            },
            {
              name: 'sortedAsc',
              value: 'true',
            },
          ],
        },
        timestamp: {},
      }
      await asyncReportsStore.addReport(userId, requestData)

      expect(getStateSpy).toHaveBeenCalledTimes(1)
      expect(saveStateSpy).toHaveBeenCalledTimes(1)
    })
  })

  // TODO: Implement this test
  describe('getReport', () => {
    it('should get a report from the user store', () => {
      expect(true)
    })
  })

  // TODO: Implement this test
  describe('getAllReports', () => {
    it('should get all reports from the user store', () => {
      expect(true)
    })
  })

  // TODO: Implement this test
  describe('updateStatus', () => {
    it('should update a reports status', () => {
      expect(true)
    })
  })

  // TODO: Implement this test
  describe('updateDataByStatus', () => {
    it('should update a reports data based on its status', () => {
      expect(true)
    })
  })
})
