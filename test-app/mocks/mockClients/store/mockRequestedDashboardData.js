const failedDashboard = {
  reportId: 'request-examples',
  id: 'test-dashboard-2',
  executionId: 'exId_1724943092123',
  tableId: 'tblId_1724943092123',
  name: 'Failing dashboard',
  reportName: 'Request examples',
  description: 'Requested Dashboard',
  template: 'list',
  type: 'dashboard',
  status: 'FAILED',
  url: {
    origin: 'http://localhost:3010',
    request: {
      fullUrl: 'http://localhost:3010/async/dashboard/request-examples/test-dashboard-2/request?',
      pathname: '/async/dashboard/request-examples/test-dashboard-2/request',
      search: '',
    },
    polling: {
      fullUrl: 'http://localhost:3010/async/dashboard/request-examples/test-dashboard-2/request/exId_1724943092123',
      pathname: '/async/dashboard/request-examples/test-dashboard-2/request/exId_1724943092123',
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
  reportId: 'request-examples',
  id: 'test-dashboard-3',
  executionId: 'exId_1724943092824',
  tableId: 'tblId_1724943092824',
  name: 'Expiring dashboard',
  reportName: 'Request examples',
  description: 'requested dashboard',
  template: 'list',
  type: 'dashboard',
  status: 'EXPIRED',
  url: {
    origin: 'http://localhost:3010',
    request: {
      fullUrl: 'http://localhost:3010/async/dashboard/request-examples/test-dashboard-3/request?',
      pathname: '/async/dashboard/request-examples/test-dashboard-3/request',
      search: '',
    },
    polling: {
      fullUrl: 'http://localhost:3010/async/dashboard/request-examples/test-dashboard-3/request/exId_1724943092824',
      pathname: '/async/dashboard/request-examples/test-dashboard-3/request/exId_1724943092824',
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
  reportId: 'request-examples',
  id: 'test-dashboard-1',
  executionId: 'exId_1724943092098',
  tableId: 'tblId_1724943092098',
  name: 'Requested dashboard',
  reportName: 'Request examples',
  description: 'This dashboard is pending',
  template: 'list',
  type: 'dashboard',
  status: 'SUBMITTED',
  url: {
    origin: 'http://localhost:3010',
    request: {
      fullUrl: 'http://localhost:3010/async/dashboard/request-examples/test-dashboard-1/request?',
      pathname: '/async/dashboard/request-examples/test-dashboard-1/request',
      search: '',
    },
    polling: {
      fullUrl: 'http://localhost:3010/async/dashboard/request-examples/test-dashboard-1/request/exId_1724943092098',
      pathname: '/async/dashboard/request-examples/test-dashboard-1/request/exId_1724943092098',
    },
    report: {},
  },
  timestamp: {
    requested: '2024-08-29T14:51:33.557Z',
  },
  dataProductDefinitionsPath: '',
}

const abortedDashboard = {
  reportId: 'request-examples',
  id: 'test-dashboard-1',
  executionId: 'exId_1724943092098',
  tableId: 'tblId_1724943092098',
  name: 'Cancelled dashboard',
  reportName: 'Request examples',
  description: 'Cancel dashboard',
  template: 'list',
  type: 'dashboard',
  status: 'ABORTED',
  url: {
    origin: 'http://localhost:3010',
    request: {
      fullUrl: 'http://localhost:3010/async/dashboard/request-examples/test-dashboard-1/request?',
      pathname: '/async/dashboard/request-examples/test-dashboard-1/request',
      search: '',
    },
    polling: {
      fullUrl: 'http://localhost:3010/async/dashboard/request-examples/test-dashboard-1/request/exId_1724943092098',
      pathname: '/async/dashboard/request-examples/test-dashboard-1/request/exId_1724943092098',
    },
    report: {},
  },
  timestamp: {
    requested: '2024-08-29T14:51:33.557Z',
    aborted: '2024-08-29T14:51:33.557Z',
  },
  dataProductDefinitionsPath: '',
}

const readyDashboard = {
  dataProductDefinitionsPath: '',
  type: 'dashboard',
  reportId: 'mock-dashboards',
  reportName: 'Mock dashboards',
  description: 'This dashboard has succeeded',
  id: 'test-dashboard-8',
  name: 'Successful dashboard',
  timestamp: {
    requested: '2024-10-31T13:45:25.707Z',
    completed: '2024-10-31T13:45:26.794Z',
  },
  executionId: 'exId_1730382324700',
  tableId: 'tblId_1730382324700',
  url: {
    origin: 'http://localhost:3010',
    request: {
      fullUrl: 'http://localhost:3010/async/dashboard/mock-dashboards/test-dashboard-8/request?',
      pathname: '/async/dashboard/mock-dashboards/test-dashboard-8/request',
      search: '',
    },
    polling: {
      fullUrl: 'http://localhost:3010/async/dashboard/mock-dashboards/test-dashboard-8/request/exId_1730382324700',
      pathname: '/async/dashboard/mock-dashboards/test-dashboard-8/request/exId_1730382324700',
    },
    report: {
      pathname: '/async/dashboard/mock-dashboards/test-dashboard-8/request/tblId_1730382324700/report',
      fullUrl:
        'http://localhost:3010/async/dashboard/mock-dashboards/test-dashboard-8/request/tblId_1730382324700/report',
    },
  },
  status: 'FINISHED',
  metrics: [
    {
      name: 'Missing Ethnicity By Establishment',
    },
    {
      name: 'Percentage Missing Ethnicity By Establishment',
    },
    {
      name: 'Missing Ethnicity By Establishment',
    },
  ],
}

module.exports = {
  submittedDashboard,
  failedDashboard,
  expiredDashboard,
  readyDashboard,
  abortedDashboard,
}
