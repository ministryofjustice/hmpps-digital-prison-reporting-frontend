/**
 * NOTE: V1 is depracted in place of this data structure.
 * Changes
 *  - deleted variantId
 *  - added id: string
 *  - added type: ReportType
 */

const mockUserListDataV1 = require('./mockUserListDataV1')

const successfulReport = {
  ...mockUserListDataV1.mockRequestedReports[0],
  type: 'report',
  id: mockUserListDataV1.mockRequestedReports[0].variantId,
  description: 'V2 requested variant',
  url: {
    origin: 'http://localhost:3010',
    request: {
      fullUrl:
        'http://localhost:3010/async/report/test-report-1/variantId-1/request?filters.field1=value1.2&filters.field2=value2.1&filters.field3.start=2007-02-01&filters.field3.end=2010-05-04&filters.field7=2005-02-01&sortColumn=field1&sortedAsc=true',
      pathname: '/async/report/test-report-1/variantId-1/request',
      search:
        '?filters.field1=value1.2&filters.field2=value2.1&filters.field3.start=2007-02-01&filters.field3.end=2010-05-04&filters.field7=2005-02-01&sortColumn=field1&sortedAsc=true',
    },
    polling: {
      fullUrl: 'http://localhost:3010/async/report/test-report-1/variantId-1/request/exId_1724943092549',
      pathname: '/async/report/test-report-1/variantId-1/request/exId_1724943092549',
    },
    report: {
      pathname: '/async/report/test-report-1/variantId-1/request/tblId_1724943092549/report',
      fullUrl: 'http://localhost:3010/async/report/test-report-1/variantId-1/request/tblId_1724943092549/report',
    },
  },
}
delete successfulReport.variantId

const failedReport = {
  ...mockUserListDataV1.mockRequestedReports[1],
  type: 'report',
  id: mockUserListDataV1.mockRequestedReports[1].variantId,
  description: 'V2 requested variant',
  url: {
    origin: 'http://localhost:3010',
    request: {
      fullUrl:
        'http://localhost:3010/async/report/test-report-2/variantId-2/request?filters.field1=value1.2&filters.field2=value2.1&filters.field3.start=2003-02-01&filters.field3.end=2006-05-04&filters.field7=2005-02-01&sortColumn=field1&sortedAsc=true',
      pathname: '/async/report/test-report-2/variantId-2/request',
      search:
        '?filters.field1=value1.2&filters.field2=value2.1&filters.field3.start=2003-02-01&filters.field3.end=2006-05-04&filters.field7=2005-02-01&sortColumn=field1&sortedAsc=true',
    },
    polling: {
      fullUrl: 'http://localhost:3010/async/report/test-report-2/variantId-2/request/exId_1721738244285',
      pathname: '/async/report/test-report-1/variantId-1/request/exId_1721738244285',
    },
    report: {},
  },
}
delete failedReport.variantId

const expiredReport = {
  ...mockUserListDataV1.mockRequestedReports[2],
  type: 'report',
  id: mockUserListDataV1.mockRequestedReports[2].variantId,
  description: 'V2 requested variant',
  url: {
    origin: 'http://localhost:3010',
    request: {
      fullUrl:
        'http://localhost:3010/async/report/test-report-1/variantId-1/request?filters.field1=value1.2&filters.field2=value2.1&filters.field3.start=2003-02-01&filters.field3.end=2006-05-04&filters.field7=2005-02-01&sortColumn=field1&sortedAsc=true',
      pathname: '/async/report/test-report-1/variantId-1/request',
      search:
        '?filters.field1=value1.2&filters.field2=value2.1&filters.field3.start=2003-02-01&filters.field3.end=2006-05-04&filters.field7=2005-02-01&sortColumn=field1&sortedAsc=true',
    },
    polling: {
      fullUrl: 'http://localhost:3010/async/report/test-report-1/variantId-1/request/exId_1721738244284',
      pathname: '/async/report/test-report-1/variantId-1/request/exId_1721738244284',
    },
    report: {},
  },
}
delete expiredReport.variantId

const readyViewedReport = {
  type: 'report',
  id: mockUserListDataV1.mockViewedReports[0].variantId,
  ...mockUserListDataV1.mockRequestedReports[0],
  url: {
    origin: 'http://localhost:3010',
    request: {
      fullUrl:
        'http://localhost:3010/async/report/test-report-1/variantId-1/request?filters.field1=value1.2&filters.field2=value2.1&filters.field3.start=2003-02-01&filters.field3.end=2006-05-04&filters.field7=2005-02-01&sortColumn=field1&sortedAsc=true',
    },
    report: {
      fullUrl: 'http://localhost:3010/async/report/test-report-1/variantId-1/request/tblId_1721738244284/report',
    },
  },
}
delete readyViewedReport.variantId

const expiredViewedReport = {
  type: 'report',
  id: mockUserListDataV1.mockViewedReports[1].variantId,
  ...mockUserListDataV1.mockRequestedReports[1],
  url: {
    origin: 'http://localhost:3010',
    request: {
      fullUrl:
        'http://localhost:3010/async/report/test-report-2/variantId-2/request?filters.field1=value1.2&filters.field2=value2.1&filters.field3.start=2003-02-01&filters.field3.end=2006-05-04&filters.field7=2005-02-01&sortColumn=field1&sortedAsc=true',
    },
    report: {
      fullUrl: 'http://localhost:3010/async/report/test-report-2/variantId-2/request/tblId_1721738907386/report',
    },
  },
}
delete expiredViewedReport.variantId

const successfulDashboard = {
  reportId: 'test-report-1',
  id: 'test-dashboard-1',
  executionId: 'exId_1724943092098',
  tableId: 'tblId_1724943092098',
  name: 'Test Dashboard 1',
  reportName: 'Test Report',
  description: 'Requested Dashboard',
  template: 'list',
  type: 'dashboard',
  status: 'FINISHED',
  url: {
    origin: 'http://localhost:3010',
    request: {
      fullUrl: 'http://localhost:3010/async/dashboard/test-report-1/test-dashboard-1/request?',
      pathname: '/async/dashboard/test-report-1/test-dashboard-1/request',
      search: '',
    },
    polling: {
      fullUrl: 'http://localhost:3010/async/dashboard/test-report-1/test-dashboard-1/request/exId_1724943092098',
      pathname: '/async/dashboard/test-report-1/test-dashboard-1/request/exId_1724943092098',
    },
    report: {},
  },
  timestamp: {
    requested: '2024-08-29T14:51:33.557Z',
    completed: '2024-08-29T14:51:41.807Z',
  },
  dataProductDefinitionsPath: '',
}

const failedDashboard = {
  reportId: 'test-report-1',
  id: 'test-dashboard-2',
  executionId: 'exId_1724943092123',
  tableId: 'tblId_1724943092123',
  name: 'Test Dashboard 2',
  reportName: 'Test Report',
  description: 'Requested Dashboard',
  template: 'list',
  type: 'dashboard',
  status: 'FAILED',
  url: {
    origin: 'http://localhost:3010',
    request: {
      fullUrl: 'http://localhost:3010/async/dashboard/test-report-1/test-dashboard-2/request?',
      pathname: '/async/dashboard/test-report-1/test-dashboard-2/request',
      search: '',
    },
    polling: {
      fullUrl: 'http://localhost:3010/async/dashboard/test-report-1/test-dashboard-2/request/exId_1724943092123',
      pathname: '/async/dashboard/test-report-1/test-dashboard-2/request/exId_1724943092123',
    },
    report: {},
  },
  timestamp: {
    timestamp: {
      requested: '2024-07-23T12:37:25.288Z',
      retried: '2024-07-23T12:37:25.288Z',
    },
  },
  dataProductDefinitionsPath: '',
}

const expiredDashboard = {
  reportId: 'test-report-1',
  id: 'test-dashboard-3',
  executionId: 'exId_1724943092824',
  tableId: 'tblId_1724943092824',
  name: 'Test Dashboard 3',
  reportName: 'Test Report',
  description: 'Requested Dashboard',
  template: 'list',
  type: 'dashboard',
  status: 'EXPIRED',
  url: {
    origin: 'http://localhost:3010',
    request: {
      fullUrl: 'http://localhost:3010/async/dashboard/test-report-1/test-dashboard-3/request?',
      pathname: '/async/dashboard/test-report-1/test-dashboard-3/request',
      search: '',
    },
    polling: {
      fullUrl: 'http://localhost:3010/async/dashboard/test-report-1/test-dashboard-3/request/exId_1724943092824',
      pathname: '/async/dashboard/test-report-1/test-dashboard-3/request/exId_1724943092824',
    },
    report: {},
  },
  timestamp: {
    timestamp: {
      requested: '2024-07-23T12:37:25.288Z',
      expired: new Date().toISOString(),
    },
  },
  dataProductDefinitionsPath: '',
}

const mockRequestedReports = [successfulReport, failedReport, expiredReport]
const mockRequestedDashboards = [successfulDashboard, failedDashboard, expiredDashboard]
const mockViewedReports = [readyViewedReport, expiredViewedReport]

module.exports = { mockRequestedReports, mockViewedReports, mockRequestedDashboards }
