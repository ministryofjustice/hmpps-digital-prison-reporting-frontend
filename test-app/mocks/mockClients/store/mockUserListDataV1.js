/**
 * NOTE: This data structure is deprecated. But Could still remain in the user store
 */
const mockViewedReports = [
  {
    reportId: 'test-report-1',
    variantId: 'variantId-1',
    executionId: 'exId_1721738244284',
    tableId: 'tblId_1721738244284',
    reportName: 'Test Report',
    variantName: 'Test Variant 1',
    description:
      'Test Variant 1 description - this will succeed Test Variant 1 description - this will succeed Test Variant 1 description - this will succeed Test Variant 1 description - this will succeed',
    status: 'READY',
    url: {
      origin: 'http://localhost:3010',
      request: {
        fullUrl:
          'http://localhost:3010/async-reports/test-report-1/variantId-1/request?filters.field1=value1.2&filters.field2=value2.1&filters.field3.start=2003-02-01&filters.field3.end=2006-05-04&filters.field7=2005-02-01&sortColumn=field1&sortedAsc=true',
      },
      report: {
        fullUrl: 'http://localhost:3010/async-reports/test-report-1/variantId-1/request/tblId_1721738244284/report',
      },
    },
    timestamp: {
      lastViewed: new Date('2024-07-23T12:48:37.824Z'),
      expired: new Date('2024-07-23T12:48:37.824Z'),
    },
    query: {
      data: {
        'filters.field1': 'value1.2',
        'filters.field2': 'value2.1',
        'filters.field3.start': '2003-02-01',
        'filters.field3.end': '2006-05-04',
        'filters.field7': '2005-02-01',
        sortColumn: 'field1',
        sortedAsc: 'true',
      },
      summary: [
        {
          name: 'Field 1',
          value: 'value1.2',
        },
        {
          name: 'Field 2',
          value: 'value2.1',
        },
        {
          name: 'Field 3 start',
          value: '01-02-2003',
        },
        {
          name: 'Field 3 end',
          value: '04-05-2006',
        },
        {
          name: 'Field 7',
          value: '01-02-2005',
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
  },
  {
    reportId: 'test-report-2',
    variantId: 'variantId-2',
    executionId: 'exId_1721738907386',
    tableId: 'tblId_1721738907386',
    reportName: 'Test Report 2',
    variantName: 'Test Variant 2',
    description:
      'Test Variant 2 description - this will succeed Test Variant 1 description - this will succeed Test Variant 1 description - this will succeed Test Variant 1 description - this will succeed',
    status: 'EXPIRED',
    url: {
      origin: 'http://localhost:3010',
      request: {
        fullUrl:
          'http://localhost:3010/async-reports/test-report-2/variantId-2/request?filters.field1=value1.2&filters.field2=value2.1&filters.field3.start=2003-02-01&filters.field3.end=2006-05-04&filters.field7=2005-02-01&sortColumn=field1&sortedAsc=true',
      },
      report: {
        fullUrl: 'http://localhost:3010/async-reports/test-report-2/variantId-2/request/tblId_1721738907386/report',
      },
    },
    timestamp: {
      lastViewed: new Date('2024-07-23T12:48:37.824Z'),
      expired: new Date('2024-07-23T12:48:37.824Z'),
    },
    query: {
      data: {
        'filters.field1': 'value1.2',
        'filters.field2': 'value2.1',
        'filters.field3.start': '2003-02-01',
        'filters.field3.end': '2006-05-04',
        'filters.field7': '2005-02-01',
        sortColumn: 'field1',
        sortedAsc: 'true',
      },
      summary: [
        {
          name: 'Field 1',
          value: 'value1.2',
        },
        {
          name: 'Field 2',
          value: 'value2.1',
        },
        {
          name: 'Field 3 start',
          value: '01-02-2003',
        },
        {
          name: 'Field 3 end',
          value: '04-05-2006',
        },
        {
          name: 'Field 7',
          value: '01-02-2005',
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
  },
  {
    reportId: 'test-report-3',
    variantId: 'variantId-3',
    executionId: 'exId_1721738907388',
    tableId: 'tblId_1721738907388',
    reportName: 'Test Report 3',
    variantName: 'Test Variant 3',
    description:
      'Test Variant 3 description - this will succeed Test Variant 1 description - this will succeed Test Variant 1 description - this will succeed Test Variant 1 description - this will succeed',
    status: 'READY',
    url: {
      origin: 'http://localhost:3010',
      request: {
        fullUrl:
          'http://localhost:3010/async-reports/test-report-3/variantId-3/request?filters.field1=value1.2&filters.field2=value2.1&filters.field3.start=2003-02-01&filters.field3.end=2006-05-04&filters.field7=2005-02-01&sortColumn=field1&sortedAsc=true',
      },
      report: {
        fullUrl: 'http://localhost:3010/async-reports/test-report-3/variantId-3/request/tblId_1721738907388/report',
      },
    },
    timestamp: {
      lastViewed: new Date('2024-07-23T12:48:37.824Z'),
    },
    query: {
      data: {
        'filters.field1': 'value1.2',
        'filters.field2': 'value2.1',
        'filters.field3.start': '2003-02-01',
        'filters.field3.end': '2006-05-04',
        'filters.field7': '2005-02-01',
        sortColumn: 'field1',
        sortedAsc: 'true',
      },
      summary: [
        {
          name: 'Field 1',
          value: 'value1.2',
        },
        {
          name: 'Field 2',
          value: 'value2.1',
        },
        {
          name: 'Field 3 start',
          value: '01-02-2003',
        },
        {
          name: 'Field 3 end',
          value: '04-05-2006',
        },
        {
          name: 'Field 7',
          value: '01-02-2005',
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
  },
]

const mockRequestedReports = [
  {
    reportId: 'test-report-1',
    variantId: 'variantId-1',
    executionId: 'exId_1724943092549',
    tableId: 'tblId_1724943092549',
    name: 'Test Variant 1',
    reportName: 'Test Report 1',
    description: 'V1 requested variant',
    template: 'list',
    status: 'FINISHED',
    filters: {
      data: {
        field1: 'value1.2',
        field2: 'value2.1',
        'field3.start': '2007-02-01',
        'field3.end': '2010-05-04',
        field7: '2005-02-01',
      },
      queryString: 'field1=value1.2&field2=value2.1&field3.start=2003-02-01&field3.end=2006-05-04&field7=2005-02-01',
    },
    sortBy: {
      data: {
        sortColumn: 'field1',
        sortedAsc: 'true',
      },
      queryString: 'sortColumn=field1&sortedAsc=true',
    },
    url: {
      origin: 'http://localhost:3010',
      request: {
        fullUrl:
          'http://localhost:3010/async-reports/test-report-1/variantId-1/request?filters.field1=value1.2&filters.field2=value2.1&filters.field3.start=2003-02-01&filters.field3.end=2006-05-04&filters.field7=2005-02-01&sortColumn=field1&sortedAsc=true',
        pathname: '/async-reports/test-report-1/variantId-1/request',
        search:
          '?filters.field1=value1.2&filters.field2=value2.1&filters.field3.start=2007-02-01&filters.field3.end=2010-05-04&filters.field7=2005-02-01&sortColumn=field1&sortedAsc=true',
      },
      polling: {
        fullUrl: 'http://localhost:3010/async-reports/test-report-1/variantId-1/request/exId_1724943092549',
        pathname: '/async-reports/test-report-1/variantId-1/request/exId_1724943092549',
      },
      report: {
        pathname: '/async-reports/test-report-1/variantId-1/request/tblId_1724943092549/report',
        fullUrl: 'http://localhost:3010/async-reports/test-report-1/variantId-1/request/tblId_1724943092549/report',
      },
    },
    query: {
      data: {
        'filters.field1': 'value1.2',
        'filters.field2': 'value2.1',
        'filters.field3.start': '2007-02-01',
        'filters.field3.end': '2010-05-04',
        'filters.field7': '2005-02-01',
        sortColumn: 'field1',
        sortedAsc: 'true',
      },
      summary: [
        {
          name: 'Field 1',
          value: 'value1.2',
        },
        {
          name: 'Field 2',
          value: 'value2.1',
        },
        {
          name: 'Field 3 start',
          value: '01-02-2007',
        },
        {
          name: 'Field 3 end',
          value: '04-05-2010',
        },
        {
          name: 'Field 7',
          value: '01-02-2005',
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
    timestamp: {
      requested: '2024-08-29T14:51:33.557Z',
      completed: '2024-08-29T14:51:41.807Z',
    },
    dataProductDefinitionsPath: '',
  },
  {
    reportId: 'test-report-2',
    variantId: 'variantId-2',
    executionId: 'exId_1721738244285',
    tableId: 'tblId_1721738244285',
    name: 'Test Variant 2',
    reportName: 'Test Report 2',
    description: 'V1 requested variant',
    template: 'list',
    status: 'FAILED',
    filters: {
      data: {
        field1: 'value1.2',
        field2: 'value2.1',
        'field3.start': '2003-02-01',
        'field3.end': '2006-05-04',
        field7: '2005-02-01',
      },
      queryString: 'field1=value1.2&field2=value2.1&field3.start=2003-02-01&field3.end=2006-05-04&field7=2005-02-01',
    },
    sortBy: {
      data: {
        sortColumn: 'field1',
        sortedAsc: 'true',
      },
      queryString: 'sortColumn=field1&sortedAsc=true',
    },
    url: {
      origin: 'http://localhost:3010',
      request: {
        fullUrl:
          'http://localhost:3010/async-reports/test-report-2/variantId-2/request?filters.field1=value1.2&filters.field2=value2.1&filters.field3.start=2003-02-01&filters.field3.end=2006-05-04&filters.field7=2005-02-01&sortColumn=field1&sortedAsc=true',
        pathname: '/async-reports/test-report-2/variantId-2/request',
        search:
          '?filters.field1=value1.2&filters.field2=value2.1&filters.field3.start=2003-02-01&filters.field3.end=2006-05-04&filters.field7=2005-02-01&sortColumn=field1&sortedAsc=true',
      },
      polling: {
        fullUrl: 'http://localhost:3010/async-reports/test-report-2/variantId-2/request/exId_1721738244285',
        pathname: '/async-reports/test-report-1/variantId-1/request/exId_1721738244285',
      },
      report: {},
    },
    query: {
      data: {
        'filters.field1': 'value1.2',
        'filters.field2': 'value2.1',
        'filters.field3.start': '2003-02-01',
        'filters.field3.end': '2006-05-04',
        'filters.field7': '2005-02-01',
        sortColumn: 'field1',
        sortedAsc: 'true',
      },
      summary: [
        {
          name: 'Field 1',
          value: 'value1.2',
        },
        {
          name: 'Field 2',
          value: 'value2.1',
        },
        {
          name: 'Field 3 start',
          value: '01-02-2003',
        },
        {
          name: 'Field 3 end',
          value: '04-05-2006',
        },
        {
          name: 'Field 7',
          value: '01-02-2005',
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
    timestamp: {
      requested: '2024-07-23T12:37:25.288Z',
      retried: '2024-07-23T12:37:25.288Z',
    },
    dataProductDefinitionsPath: '',
  },
  {
    reportId: 'test-report-3',
    variantId: 'variantId-4',
    executionId: 'exId_1721738244290',
    tableId: 'tblId_1721738244290',
    name: 'Test Variant 3',
    reportName: 'Test Report 3',
    description: 'V1 requested variant',
    template: 'list',
    status: 'EXPIRED',
    filters: {
      data: {
        field1: 'value1.2',
        field2: 'value2.1',
        'field3.start': '2003-02-10',
        'field3.end': '2006-05-24',
        field7: '2005-02-01',
      },
      queryString: 'field1=value1.2&field2=value2.1&field3.start=2003-02-01&field3.end=2006-05-04&field7=2005-02-01',
    },
    sortBy: {
      data: {
        sortColumn: 'field1',
        sortedAsc: 'true',
      },
      queryString: 'sortColumn=field1&sortedAsc=true',
    },
    url: {
      origin: 'http://localhost:3010',
      request: {
        fullUrl:
          'http://localhost:3010/async-reports/test-report-1/variantId-1/request?filters.field1=value1.2&filters.field2=value2.1&filters.field3.start=2003-02-01&filters.field3.end=2006-05-04&filters.field7=2005-02-01&sortColumn=field1&sortedAsc=true',
        pathname: '/async-reports/test-report-1/variantId-1/request',
        search:
          '?filters.field1=value1.2&filters.field2=value2.1&filters.field3.start=2003-02-01&filters.field3.end=2006-05-04&filters.field7=2005-02-01&sortColumn=field1&sortedAsc=true',
      },
      polling: {
        fullUrl: 'http://localhost:3010/async-reports/test-report-1/variantId-1/request/exId_1721738244284',
        pathname: '/async-reports/test-report-1/variantId-1/request/exId_1721738244284',
      },
      report: {},
    },
    query: {
      data: {
        'filters.field1': 'value1.2',
        'filters.field2': 'value2.1',
        'filters.field3.start': '2003-02-10',
        'filters.field3.end': '2006-05-24',
        'filters.field7': '2005-02-01',
        sortColumn: 'field1',
        sortedAsc: 'true',
      },
      summary: [
        {
          name: 'Field 1',
          value: 'value1.2',
        },
        {
          name: 'Field 2',
          value: 'value2.1',
        },
        {
          name: 'Field 3 start',
          value: '01-02-2003',
        },
        {
          name: 'Field 3 end',
          value: '04-05-2006',
        },
        {
          name: 'Field 7',
          value: '01-02-2005',
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
    timestamp: {
      expired: new Date().toISOString(),
    },
    dataProductDefinitionsPath: '',
  },
  {
    reportId: 'test-report-3',
    variantId: 'variantId-5',
    executionId: 'exId_1721738244290',
    tableId: 'tblId_1721738244290',
    name: 'Test Variant 5',
    reportName: 'Test Report 3',
    description: 'V1 requested variant',
    template: 'list',
    status: 'ABORTED',
    filters: {
      data: {
        field1: 'value1.2',
        field2: 'value2.1',
        'field3.start': '2003-02-10',
        'field3.end': '2006-05-24',
        field7: '2005-02-01',
      },
      queryString: 'field1=value1.2&field2=value2.1&field3.start=2003-02-01&field3.end=2006-05-04&field7=2005-02-01',
    },
    sortBy: {
      data: {
        sortColumn: 'field1',
        sortedAsc: 'true',
      },
      queryString: 'sortColumn=field1&sortedAsc=true',
    },
    url: {
      origin: 'http://localhost:3010',
      request: {
        fullUrl:
          'http://localhost:3010/async-reports/test-report-1/variantId-5/request?filters.field1=value1.2&filters.field2=value2.1&filters.field3.start=2003-02-01&filters.field3.end=2006-05-04&filters.field7=2005-02-01&sortColumn=field1&sortedAsc=true',
        pathname: '/async-reports/test-report-1/variantId-5/request',
        search:
          '?filters.field1=value1.2&filters.field2=value2.1&filters.field3.start=2003-02-01&filters.field3.end=2006-05-04&filters.field7=2005-02-01&sortColumn=field1&sortedAsc=true',
      },
      polling: {
        fullUrl: 'http://localhost:3010/async-reports/test-report-1/variantId-5/request/exId_1721738244284',
        pathname: '/async-reports/test-report-1/variantId-5/request/exId_1721738244284',
      },
      report: {},
    },
    query: {
      data: {
        'filters.field1': 'value1.2',
        'filters.field2': 'value2.1',
        'filters.field3.start': '2003-02-10',
        'filters.field3.end': '2006-05-24',
        'filters.field7': '2005-02-01',
        sortColumn: 'field1',
        sortedAsc: 'true',
      },
      summary: [
        {
          name: 'Field 1',
          value: 'value1.2',
        },
        {
          name: 'Field 2',
          value: 'value2.1',
        },
        {
          name: 'Field 3 start',
          value: '01-02-2003',
        },
        {
          name: 'Field 3 end',
          value: '04-05-2006',
        },
        {
          name: 'Field 7',
          value: '01-02-2005',
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
    timestamp: {
      aborted: new Date().toISOString(),
    },
    dataProductDefinitionsPath: '',
  },
  {
    reportId: 'test-report-1',
    variantId: 'variantId-1',
    executionId: 'exId_1721738244284',
    tableId: 'tblId_1721738244284',
    name: 'Test Variant 1',
    reportName: 'Test Report',
    description: 'this will succeed',
    template: 'list',
    status: 'FINISHED',
    filters: {
      data: {
        field1: 'value1.2',
        field2: 'value2.1',
        'field3.start': '2003-02-11',
        'field3.end': '2006-05-15',
        field7: '2005-02-01',
      },
      queryString: 'field1=value1.2&field2=value2.1&field3.start=2003-02-01&field3.end=2006-05-04&field7=2005-02-01',
    },
    sortBy: {
      data: {
        sortColumn: 'field1',
        sortedAsc: 'true',
      },
      queryString: 'sortColumn=field1&sortedAsc=true',
    },
    url: {
      origin: 'http://localhost:3010',
      request: {
        fullUrl:
          'http://localhost:3010/async-reports/test-report-1/variantId-1/request?filters.field1=value1.2&filters.field2=value2.1&filters.field3.start=2003-02-01&filters.field3.end=2006-05-04&filters.field7=2005-02-01&sortColumn=field1&sortedAsc=true',
        pathname: '/async-reports/test-report-1/variantId-1/request',
        search:
          '?filters.field1=value1.2&filters.field2=value2.1&filters.field3.start=2003-02-01&filters.field3.end=2006-05-04&filters.field7=2005-02-01&sortColumn=field1&sortedAsc=true',
      },
      polling: {
        fullUrl: 'http://localhost:3010/async-reports/test-report-1/variantId-1/request/exId_1721738244284',
        pathname: '/async-reports/test-report-1/variantId-1/request/exId_1721738244284',
      },
      report: {
        pathname: '/async-reports/test-report-1/variantId-1/request/tblId_1721738244284/report',
        fullUrl: 'http://localhost:3010/async-reports/test-report-1/variantId-1/request/tblId_1721738244284/report',
      },
    },
    query: {
      data: {
        'filters.field1': 'value1.2',
        'filters.field2': 'value2.1',
        'filters.field3.start': '2003-02-01',
        'filters.field3.end': '2006-05-04',
        'filters.field7': '2005-02-01',
        sortColumn: 'field1',
        sortedAsc: 'true',
      },
      summary: [
        {
          name: 'Field 1',
          value: 'value1.2',
        },
        {
          name: 'Field 2',
          value: 'value2.1',
        },
        {
          name: 'Field 3 start',
          value: '01-02-2003',
        },
        {
          name: 'Field 3 end',
          value: '04-05-2006',
        },
        {
          name: 'Field 7',
          value: '01-02-2005',
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
    timestamp: {
      requested: '2024-08-29T14:51:33.557Z',
      completed: '2024-08-29T14:51:41.807Z',
      lastViewed: '2024-08-29T14:51:41.807Z',
    },
    dataProductDefinitionsPath: '',
  },
]

module.exports = { mockRequestedReports, mockViewedReports }
