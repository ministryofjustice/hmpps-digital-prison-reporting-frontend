const mockRequestedReports = [
  {
    reportId: 'test-report-1',
    variantId: 'variantId-1',
    executionId: 'exId_1721738244284',
    tableId: 'tblId_1721738244284',
    name: 'Test Variant 1',
    reportName: 'Test Report',
    description:
      'Test Variant 1 description - this will succeed Test Variant 1 description - this will succeed Test Variant 1 description - this will succeed Test Variant 1 description - this will succeed',
    template: 'list',
    status: 'SUBMITTED',
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
    description:
      'Test Variant 2 description - this will succeed Test Variant 1 description - this will succeed Test Variant 1 description - this will succeed Test Variant 1 description - this will succeed',
    template: 'list',
    status: 'SUBMITTED',
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
    variantId: 'variantId-3',
    executionId: 'exId_1721738244287',
    tableId: 'tblId_1721738244287',
    name: 'Test Variant 3',
    reportName: 'Test Report 3',
    description:
      'Test Variant 3 description - this will succeed Test Variant 1 description - this will succeed Test Variant 1 description - this will succeed Test Variant 1 description - this will succeed',
    template: 'list',
    status: 'SUBMITTED',
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
          'http://localhost:3010/async-reports/test-report-3/variantId-3/request?filters.field1=value1.2&filters.field2=value2.1&filters.field3.start=2003-02-01&filters.field3.end=2006-05-04&filters.field7=2005-02-01&sortColumn=field1&sortedAsc=true',
        pathname: '/async-reports/test-report-3/variantId-3/request',
        search:
          '?filters.field1=value1.2&filters.field2=value2.1&filters.field3.start=2003-02-01&filters.field3.end=2006-05-04&filters.field7=2005-02-01&sortColumn=field1&sortedAsc=true',
      },
      polling: {
        fullUrl: 'http://localhost:3010/async-reports/test-report-3/variantId-3/request/exId_1721738244287',
        pathname: '/async-reports/test-report-1/variantId-1/request/exId_1721738244287',
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
      requested: new Date('2024-07-23T12:37:25.288Z'),
      retried: new Date('2024-07-23T12:37:25.288Z'),
      lastViewed: new Date('2024-07-23T12:37:25.288Z'),
    },
    dataProductDefinitionsPath: '',
  },
]

const mockViewedReports = [
  {
    reportId: 'test-report-1',
    variantId: 'variantId-1',
    executionId: 'exId_1721738907385',
    tableId: 'tblId_1721738907385',
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
        fullUrl: 'http://localhost:3010/async-reports/test-report-1/variantId-1/request/tblId_1721738907385/report',
      },
    },
    timestamp: {
      lastViewed: new Date('2024-07-23T12:48:37.824Z'),
      refresh: new Date('2024-07-23T12:48:37.824Z'),
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
    status: 'READY',
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
      retried: new Date('2024-07-23T12:48:37.824Z'),
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

module.exports = { mockRequestedReports, mockViewedReports }
