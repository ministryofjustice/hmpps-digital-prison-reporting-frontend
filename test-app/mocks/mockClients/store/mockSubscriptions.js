// @ts-nocheck
const subscribedReport = {
  reportId: 'request-examples',
  id: 'request-example-success',
  tableId: 'tblId_1729766362362',
  reportName: 'Request examples',
  name: 'Viewed report',
  description: 'this will succeed',
  type: 'report',
  status: 'READY',
  url: {
    origin: 'http://localhost:3010',
    report: {
      fullUrl:
        'http://localhost:3010/embedded/platform/async/report/request-examples/request-example-success/request/tblId_1729766362362/report',
      pathname:
        '/embedded/platform/async/report/request-examples/request-example-success/request/tblId_1729766362362/report',
    },
  },
  timestamp: {
    refresh: '2024-10-24T10:39:32.169Z'
  },
}

const subscribedDashboard = {
  reportId: 'mock-dashboards',
  id: 'Mock dashboards',
  tableId: 'tblId_1730302242487',
  reportName: 'Mock dashboards',
  name: 'Viewed dashboard',
  description: 'Async Dashboard Testing',
  type: 'dashboard',
  status: 'READY',
  url: {
    origin: 'http://localhost:3010',
    report: {
      fullUrl:
        'http://localhost:3010/embedded/platform/async/dashboard/mock-dashboards/test-dashboard-8/request/tblId_1730302242487/dashboard',
      pathname:
        '/embedded/platform/async/dashboard/mock-dashboards/test-dashboard-8/request/tblId_1730302242487/dashboard',
    },
  },
  timestamp: {
    refresh: '2024-10-30T15:30:46.136Z',
  },
}


module.exports = {
  subscribedReport,
  subscribedDashboard
}
