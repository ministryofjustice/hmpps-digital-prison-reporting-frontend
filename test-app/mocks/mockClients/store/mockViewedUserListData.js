const viewedReady = {
  reportId: 'request-examples',
  id: 'request-example-success',
  executionId: 'exId_1729766362362',
  tableId: 'tblId_1729766362362',
  reportName: 'Request examples',
  variantName: 'Viewed report',
  name: 'Viewed report',
  description: 'this will succeed',
  type: 'report',
  status: 'READY',
  url: {
    origin: 'http://localhost:3010',
    request: {
      fullUrl:
        'http://localhost:3010/embedded/platform/async/report/request-examples/request-example-success/request?filters.field1=value1.1&filters.field2=value2.2&filters.field3.start=2004-02-01&filters.field3.end=2006-08-04&filters.field7=2003-02-01&sortColumn=field1&sortedAsc=true&filters.field6=Value+6.1',
      search:
        '?filters.field1=value1.1&filters.field2=value2.2&filters.field3.start=2004-02-01&filters.field3.end=2006-08-04&filters.field7=2003-02-01&sortColumn=field1&sortedAsc=true&filters.field6=Value+6.1',
    },
    report: {
      fullUrl:
        'http://localhost:3010/embedded/platform/async/report/request-examples/request-example-success/request/tblId_1729766362362/report',
      pathname:
        '/embedded/platform/async/report/request-examples/request-example-success/request/tblId_1729766362362/report',
    },
  },
  timestamp: {
    lastViewed: '2024-10-24T10:39:32.169Z',
  },
  query: {
    data: {
      'filters.field1': 'value1.1',
      'filters.field2': 'value2.2',
      'filters.field3.start': '2004-02-01',
      'filters.field3.end': '2006-08-04',
      'filters.field6': 'Value 6.1',
      'filters.field7': '2003-02-01',
      sortColumn: 'field1',
      sortedAsc: 'true',
    },
    summary: [
      {
        name: 'Field 1',
        value: 'value1.1',
      },
      {
        name: 'Field 2',
        value: 'value2.2',
      },
      {
        name: 'Field 3 start',
        value: '01/02/2004',
      },
      {
        name: 'Field 3 end',
        value: '04/08/2006',
      },
      {
        name: 'Field 6',
        value: 'Value 6.1',
      },
      {
        name: 'Field 7',
        value: '01/02/2003',
      },
      {
        name: 'Sort Column',
        value: 'Field 1',
      },
      {
        name: 'Sort Direction',
        value: 'Ascending',
      },
    ],
  },
}

const viewedDashboard = {
  reportId: 'mock-dashboards',
  id: 'Mock dashboards',
  executionId: 'exId_1729766362362',
  tableId: 'tblId_1730302242487',
  reportName: 'Mock dashboards',
  name: 'Viewed dashboard',
  description: 'Async Dashboard Testing',
  type: 'dashboard',
  status: 'READY',
  url: {
    origin: 'http://localhost:3010',
    request: {
      fullUrl: 'http://localhost:3010/embedded/platform/async/dashboard/mock-dashboards/test-dashboard-8/request?',
      search: '',
    },
    report: {
      fullUrl:
        'http://localhost:3010/embedded/platform/async/dashboard/mock-dashboards/test-dashboard-8/request/tblId_1730302242487/dashboard',
      pathname:
        '/embedded/platform/async/dashboard/mock-dashboards/test-dashboard-8/request/tblId_1730302242487/dashboard',
    },
  },
  timestamp: {
    lastViewed: '2024-10-30T15:30:46.136Z',
  },
}

const viewedInteractive = {
  reportId: 'feature-testing',
  id: 'feature-testing-interactive',
  executionId: 'exId_1729766362362',
  tableId: 'tblId_1733925499607',
  reportName: 'Feature testing',
  name: 'Interactive Report',
  description: 'this is an interactive report',
  type: 'report',
  status: 'READY',
  url: {
    origin: 'http://localhost:3010',
    request: {
      fullUrl:
        'http://localhost:3010/embedded/platform/async/report/feature-testing/feature-testing-interactive/request?',
      pathname: '/embedded/platform/async/report/feature-testing/feature-testing-interactive/request',
      search: '',
    },
    report: {
      pathname:
        '/embedded/platform/async/report/feature-testing/feature-testing-interactive/request/tblId_1733925499607/report',
      fullUrl:
        'http://localhost:3010/embedded/platform/async/report/feature-testing/feature-testing-interactive/request/tblId_1733925499607/report?columns=field1&columns=field2&columns=field3&columns=field6&columns=field7&filters.field1=value1.2&filters.field3.start=2003-02-01&filters.field3.end=2006-05-04&filters.field7=2005-02-01&filters.field8=value8.2&filters.field8=value8.3',
    },
  },
  timestamp: {
    lastViewed: '2024-12-11T13:58:30.841Z',
  },
  query: {
    data: {},
    summary: [],
  },
  interactiveQuery: {
    data: {
      columns: ['field1', 'field2', 'field3', 'field6', 'field7'],
      'filters.field1': 'value1.2',
      'filters.field3.start': '2003-02-01',
      'filters.field3.end': '2006-05-04',
      'filters.field7': '2005-02-01',
      'filters.field8': ['value8.2', 'value8.3'],
    },
    summary: [
      {
        id: 'field1',
        name: 'Field 1',
        value: 'Value 1.2',
      },
      {
        id: 'field3',
        name: 'Field 3',
        value: '2003-02-01 - 2006-05-04',
      },
      {
        id: 'field7',
        name: 'Field 7',
        value: '2005-02-01',
      },
      {
        id: 'field8',
        name: 'Field 8',
        value: 'Value 8.2, Value 8.3',
      },
    ],
  },
}

const viewedExpired = {
  reportId: 'request-examples',
  id: 'request-example-success',
  executionId: 'exId_1729766362362',
  tableId: 'tblId_1729766465228',
  reportName: 'Request examples',
  variantName: 'Expired viewed report',
  name: 'Expired viewed report',
  description: 'this will succeed',
  type: 'report',
  status: 'EXPIRED',
  url: {
    origin: 'http://localhost:3010',
    request: {
      fullUrl:
        'http://localhost:3010/embedded/platform/async/report/request-examples/request-example-success/request?filters.field2=value2.3&filters.field3.start=2003-09-05&filters.field3.end=2007-05-01&filters.field7=2007-05-04&sortColumn=field1&sortedAsc=true&filters.field4=Inigo+Montoya',
      search:
        '?filters.field2=value2.3&filters.field3.start=2003-09-05&filters.field3.end=2007-05-01&filters.field7=2007-05-04&sortColumn=field1&sortedAsc=true&filters.field4=Inigo+Montoya',
    },
    report: {
      fullUrl:
        'http://localhost:3010/embedded/platform/async/report/request-examples/request-example-success/request/tblId_1729766465228/report',
    },
  },
  timestamp: {
    lastViewed: '2024-10-24T10:41:28.196Z',
    expired: '2024-10-24T10:41:28.196Z',
  },
  query: {
    data: {
      'filters.field2': 'value2.3',
      'filters.field3.start': '2003-09-05',
      'filters.field3.end': '2007-05-01',
      'filters.field4': 'Inigo Montoya',
      'filters.field7': '2007-05-04',
      sortColumn: 'field1',
      sortedAsc: 'true',
    },
    summary: [
      {
        name: 'Field 2',
        value: 'value2.3',
      },
      {
        name: 'Field 3 start',
        value: '05/09/2003',
      },
      {
        name: 'Field 3 end',
        value: '01/05/2007',
      },
      {
        name: 'Field 4',
        value: 'Inigo Montoya',
      },
      {
        name: 'Field 7',
        value: '04/05/2007',
      },
      {
        name: 'Sort Column',
        value: 'Field 1',
      },
      {
        name: 'Sort Direction',
        value: 'Ascending',
      },
    ],
  },
}

const expiredDashboard = {
  reportId: 'mock-dashboards',
  id: 'test-dashboard-8',
  executionId: 'exId_1729766362362',
  tableId: 'tblId_1730302123456',
  reportName: 'Mock dashboards',
  name: 'Expired viewed dashboard',
  description: 'Async Dashboard Testing',
  type: 'dashboard',
  status: 'EXPIRED',
  url: {
    origin: 'http://localhost:3010',
    request: {
      fullUrl: 'http://localhost:3010/embedded/platform/async/dashboard/mock-dashboards/test-dashboard-8/request?',
      search: '',
    },
    report: {
      fullUrl:
        'http://localhost:3010/embedded/platform/async/dashboard/mock-dashboards/test-dashboard-8/request/tblId_1730302123456/dashboard',
    },
  },
  timestamp: {
    lastViewed: '2024-10-30T15:30:46.136Z',
    expired: '2024-10-30T15:30:46.136Z',
  },
}

const viewedInteractiveAsync = {
  type: 'report',
  reportId: 'mock-report',
  reportName: 'Mock reports',
  description: 'this is an interactive report',
  id: 'variantId-35',
  name: 'Interactive Report with async filters',
  timestamp: {
    lastViewed: '2025-06-10T10:37:02.786Z',
  },
  executionId: 'exId_1729766362362',
  tableId: 'tblId_1749551815281',
  query: {
    data: {
      'filters.field1': 'value1.2',
      'filters.field7': '2005-02-01',
    },
    summary: [
      {
        name: 'Field 1',
        value: 'value1.2',
      },
      {
        name: 'Field 7',
        value: '01/02/2005',
      },
    ],
  },
  interactiveQuery: {
    data: {
      'filters.field3.start': '2003-02-01',
      'filters.field3.end': '2006-05-04',
      'filters.field8': ['value8.2', 'value8.3'],
    },
    summary: [
      {
        id: 'field3',
        name: 'Field 3',
        value: '2003-02-01 - 2006-05-04',
      },
      {
        id: 'field8',
        name: 'Field 8',
        value: 'Value 8.2, Value 8.3',
      },
    ],
  },
  status: 'READY',
  url: {
    origin: 'localhost:3010',
    request: {
      fullUrl:
        'http://localhost:3010/embedded/platform/async/report/mock-report/variantId-35/request?filters.field1=value1.2&filters.field7=2005-02-01',
      pathname: '/embedded/platform/async/report/mock-report/variantId-35/request',
      search: '?filters.field1=value1.2&filters.field7=2005-02-01',
    },
    polling: {
      fullUrl:
        'http://localhost:3010/embedded/platform/async/report/mock-report/variantId-35/request/exId_1729766362362',
      pathname: '/embedded/platform/async/report/mock-report/variantId-35/request/exId_1729766362362',
    },
    report: {
      search:
        '?filters.field3.start=2003-02-01&filters.field3.end=2006-05-04&filters.field8=value8.2&filters.field8=value8.3',
      default:
        '?filters.field3.start=2003-02-01&filters.field3.end=2006-05-04&filters.field8=value8.2&filters.field8=value8.3',
      pathname:
        '/embedded/platform/async/report/mock-report/variantId-35/request/tblId_1749551815281/report?filters.field3.start=2003-02-01&filters.field3.end=2006-05-04&filters.field8=value8.2&filters.field8=value8.3',
      fullUrl:
        'http://localhost:3010/embedded/platform/async/report/mock-report/variantId-35/request/tblId_1749551815281/report?filters.field3.start=2003-02-01&filters.field3.end=2006-05-04&filters.field8=value8.2&filters.field8=value8.3',
    },
  },
}

module.exports = {
  viewedReady,
  viewedExpired,
  viewedDashboard,
  expiredDashboard,
  viewedInteractive,
  viewedInteractiveAsync,
}
