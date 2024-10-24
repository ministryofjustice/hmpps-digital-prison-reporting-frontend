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
const submittedDashboard = {
  reportId: 'test-report-1',
  id: 'test-dashboard-1',
  executionId: 'exId_1724943092098',
  tableId: 'tblId_1724943092098',
  name: 'Test Dashboard 1',
  reportName: 'Test Report',
  description: 'Requested Dashboard',
  template: 'list',
  type: 'dashboard',
  status: 'SUBMITTED',
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

module.exports = {
  submittedDashboard,
  failedDashboard,
  expiredDashboard,
}
