import AsyncReportStoreService from './requestedReportsService'
import UserDataStore from '../data/userDataStore'
import { AsyncReportData } from '../types/AsyncReport'

const mockUserStore = {
  setUserConfig: jest.fn(),
  getUserConfig: jest.fn().mockImplementation((userId: string) => {
    return Promise.resolve({
      requestedReports: [],
    })
  }),
  ensureConnected: jest.fn(),
  init: jest.fn(),
} as unknown as jest.Mocked<UserDataStore>

describe('AsyncReportStoreService', () => {
  let asyncReportsStore: AsyncReportStoreService

  beforeEach(() => {
    asyncReportsStore = new AsyncReportStoreService(mockUserStore, 'userId')
    asyncReportsStore.init()
  })

  describe('getState', () => {
    it('should get the state from the store', async () => {
      await asyncReportsStore.getState()
      expect(mockUserStore.getUserConfig).toHaveBeenCalledWith('userId')
    })
  })

  describe('saveState', () => {
    it('should save the state to the store', async () => {
      asyncReportsStore.userConfig.requestedReports = [{ test: true }] as unknown as AsyncReportData[]
      await asyncReportsStore.saveState()
      expect(mockUserStore.setUserConfig).toHaveBeenCalledWith('userId', [{ test: true }])
    })
  })

  describe('addReport', () => {
    it('should add a report to the store', async () => {
      const getStateSpy = jest.spyOn(asyncReportsStore, 'getState')
      const saveStateSpy = jest.spyOn(asyncReportsStore, 'saveState')
      const updateStatusSpy = jest.spyOn(asyncReportsStore, 'updateDataByStatus')

      const mockreportData = {
        reportId: 'reportId-1',
        variantId: 'variantId-1',
        executionId: 'ex1a2s3d4f5g6h7j8k',
        tableId: 'dfsdf',
        variantName: 'vName',
        reportName: 'rName',
        description: 'description',
        fullUrl: 'fullUrl',
        pathname: 'pathname',
        search: 'search',
        origin: 'origin',
      }
      const mockFiltersData = {
        field1: 'value1.2',
        'field3.start': '2003-02-01',
        'field3.end': '2006-05-04',
      }
      const mockSortData = { sortColumn: 'field1', sortAsc: 'true' }
      const mockQuery = {
        'filters.field1': 'value1.2',
        'filters.field3.start': '2003-02-01',
        'filters.field3.end': '2006-05-04',
        sortColumn: 'field1',
        sortAsc: 'true',
      }
      const mockSummary = [
        { name: 'field1', value: 'value1.2' },
        { name: 'field3.start', value: '2003-02-01' },
        { name: 'field3.end', value: '2006-05-04' },
        { name: 'sortColumn', value: 'field1' },
        { name: 'sortAsc', value: 'true' },
      ]
      await asyncReportsStore.addReport(mockreportData, mockFiltersData, mockSortData, mockQuery, mockSummary)

      expect(getStateSpy).toHaveBeenCalledTimes(1)
      expect(updateStatusSpy).toHaveBeenCalledWith(
        {
          reportId: 'reportId-1',
          variantId: 'variantId-1',
          executionId: 'ex1a2s3d4f5g6h7j8k',
          tableId: 'dfsdf',
          variantName: 'vName',
          reportName: 'rName',
          description: 'description',
          status: 'SUBMITTED',
          filters: {
            data: mockFiltersData,
            queryString: 'filtersQueryString',
          },
          sortBy: {
            data: mockSortData,
            queryString: 'sortyByQueryString',
          },
          url: {
            origin: 'origin',
            request: {
              fullUrl: 'fullUrl',
              pathname: 'pathname',
              search: 'search',
            },
            polling: {
              fullUrl: `originpathname/ex1a2s3d4f5g6h7j8k`,
              pathname: `pathname/ex1a2s3d4f5g6h7j8k`,
            },
            report: {},
          },
          query: {
            data: mockQuery,
            summary: mockSummary,
          },
          timestamp: {},
        },
        'SUBMITTED',
      )
      expect(saveStateSpy).toHaveBeenCalledTimes(1)

      expect(true)
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
  describe('updateReport', () => {
    it('should update a report', () => {
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
