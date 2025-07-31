const viewedReady = {
  reportId: 'test-report-3',
  id: 'variantId-1',
  executionId: 'exId_1729766362362',
  tableId: 'tblId_1729766362362',
  reportName: 'Test Report',
  variantName: 'Viewed report v2',
  name: 'Viewed report v2',
  description: 'this will succeed',
  type: 'report',
  status: 'READY',
  url: {
    origin: 'http://localhost:3010',
    request: {
      fullUrl:
        'http://localhost:3010/embedded/platform/async/report/test-report-3/variantId-1/request?filters.field1=value1.1&filters.field2=value2.2&filters.field3.start=2004-02-01&filters.field3.end=2006-08-04&filters.field7=2003-02-01&sortColumn=field1&sortedAsc=true&filters.field6=Value+6.1',
      pathname: '/embedded/platform/async/report/test-report-3/variantId-1/request',
      search:
        '?filters.field1=value1.1&filters.field2=value2.2&filters.field3.start=2004-02-01&filters.field3.end=2006-08-04&filters.field7=2003-02-01&sortColumn=field1&sortedAsc=true&filters.field6=Value+6.1',
    },
    report: {
      fullUrl:
        'http://localhost:3010/embedded/platform/dpr/view-report/async/report/test-report-3/variantId-1/tblId_1729766362362/report',
      pathname: '/embedded/platform/dpr/view-report/async/report/test-report-3/variantId-1/tblId_1729766362362/report',
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
  reportId: 'test-report-1',
  id: 'test-dashboard-8',
  executionId: 'exId_1730302242487',
  tableId: 'tblId_1730302242487',
  reportName: 'A Test Report',
  name: 'Viewed dashboard',
  description: 'Async Dashboard Testing',
  type: 'dashboard',
  status: 'READY',
  url: {
    origin: 'http://localhost:3010',
    request: {
      fullUrl: 'http://localhost:3010/embedded/platform/async/dashboard/test-report-1/test-dashboard-8/request?',
      pathname: '/embedded/platform/async/dashboard/test-report-1/test-dashboard-8/request',
      search: '',
    },
    report: {
      fullUrl:
        'http://localhost:3010/embedded/platform/dpr/view-report/async/dashboard/test-report-1/test-dashboard-8/tblId_1730302242487/dashboard',
      pathname:
        '/embedded/platform/dpr/view-report/async/dashboard/test-report-1/test-dashboard-8/tblId_1730302242487/dashboard',
    },
  },
  timestamp: {
    lastViewed: '2024-10-30T15:30:46.136Z',
  },
}

const viewedInteractive = {
  reportId: 'test-report-6',
  id: 'variantId-23',
  executionId: 'exId_1733925499607',
  tableId: 'tblId_1733925499607',
  reportName: 'Interactive reports',
  name: 'Interactive Report',
  description: 'this is an interactive report',
  type: 'report',
  status: 'READY',
  url: {
    origin: 'http://localhost:3010',
    request: {
      fullUrl: 'http://localhost:3010/embedded/platform/async/report/test-report-6/variantId-23/request?',
      pathname: '/embedded/platform/async/report/test-report-6/variantId-23/request',
      search: '',
    },
    report: {
      pathname: '/embedded/platform/async/report/test-report-6/variantId-23/request/tblId_1733925499607/report',
      fullUrl:
        'http://localhost:3010/embedded/platform/async/report/test-report-6/variantId-23/request/tblId_1733925499607/report?columns=field1&columns=field2&columns=field3&columns=field6&columns=field7&filters.field1=value1.2&filters.field3.start=2003-02-01&filters.field3.end=2006-05-04&filters.field7=2005-02-01&filters.field8=value8.2&filters.field8=value8.3',
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
  reportId: 'test-report-3',
  id: 'variantId-1',
  executionId: 'exId_1729766465228',
  tableId: 'tblId_1729766465228',
  reportName: 'Test Report',
  variantName: 'Expired viewed report v2',
  name: 'Expired viewed report v2',
  description: 'this will succeed',
  type: 'report',
  status: 'EXPIRED',
  url: {
    origin: 'http://localhost:3010',
    request: {
      fullUrl:
        'http://localhost:3010/embedded/platform/async/report/test-report-3/variantId-1/request?filters.field2=value2.3&filters.field3.start=2003-09-05&filters.field3.end=2007-05-01&filters.field7=2007-05-04&sortColumn=field1&sortedAsc=true&filters.field4=Inigo+Montoya',
      pathname: '/embedded/platform/async/report/test-report-3/variantId-1/request',
      search:
        '?filters.field2=value2.3&filters.field3.start=2003-09-05&filters.field3.end=2007-05-01&filters.field7=2007-05-04&sortColumn=field1&sortedAsc=true&filters.field4=Inigo+Montoya',
    },
    report: {
      fullUrl:
        'http://localhost:3010/embedded/platform/async/report/test-report-3/variantId-1/request/tblId_1729766465228/report',
      pathname: '/embedded/platform/async/report/test-report-3/variantId-1/request/tblId_1729766465228/report',
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
  reportId: 'test-report-1',
  id: 'test-dashboard-8',
  executionId: 'exId_1730302123456',
  tableId: 'tblId_1730302123456',
  reportName: 'A Test Report',
  name: 'Expired viewed dashboard',
  description: 'Async Dashboard Testing',
  type: 'dashboard',
  status: 'EXPIRED',
  url: {
    origin: 'http://localhost:3010',
    request: {
      fullUrl: 'http://localhost:3010/embedded/platform/async/dashboard/test-report-1/test-dashboard-8/request?',
      pathname: '/embedded/platform/async/dashboard/test-report-1/test-dashboard-8/request',
      search: '',
    },
    report: {
      fullUrl:
        'http://localhost:3010/embedded/platform/async/dashboard/test-report-1/test-dashboard-8/request/tblId_1730302123456/report',
      pathname: '/embedded/platform/async/dashboard/test-report-1/test-dashboard-8/request/tblId_1730302123456/report',
    },
  },
  timestamp: {
    lastViewed: '2024-10-30T15:30:46.136Z',
    expired: '2024-10-30T15:30:46.136Z',
  },
}

const viewedInteractiveAsync = {
  type: 'report',
  reportId: 'test-report-3',
  reportName: 'C Test Report',
  description: 'this is an interactive report',
  id: 'variantId-35',
  name: 'Interactive Report with async filters',
  timestamp: {
    lastViewed: '2025-06-10T10:37:02.786Z',
  },
  executionId: 'exId_1749551815281',
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
        'http://localhost:3010/embedded/platform/async/report/test-report-3/variantId-35/request?filters.field1=value1.2&filters.field7=2005-02-01',
      pathname: '/embedded/platform/async/report/test-report-3/variantId-35/request',
      search: '?filters.field1=value1.2&filters.field7=2005-02-01',
    },
    polling: {
      fullUrl:
        'http://localhost:3010/embedded/platform/async/report/test-report-3/variantId-35/request/exId_1749551815281',
      pathname: '/embedded/platform/async/report/test-report-3/variantId-35/request/exId_1749551815281',
    },
    report: {
      search:
        '?filters.field3.start=2003-02-01&filters.field3.end=2006-05-04&filters.field8=value8.2&filters.field8=value8.3',
      default:
        '?filters.field3.start=2003-02-01&filters.field3.end=2006-05-04&filters.field8=value8.2&filters.field8=value8.3',
      pathname:
        '/embedded/platform/async/report/test-report-3/variantId-35/request/tblId_1749551815281/report?filters.field3.start=2003-02-01&filters.field3.end=2006-05-04&filters.field8=value8.2&filters.field8=value8.3',
      fullUrl:
        'http://localhost:3010/embedded/platform/async/report/test-report-3/variantId-35/request/tblId_1749551815281/report?filters.field3.start=2003-02-01&filters.field3.end=2006-05-04&filters.field8=value8.2&filters.field8=value8.3',
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
