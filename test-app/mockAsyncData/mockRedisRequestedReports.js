const mockRedisRequestedReports = [
  {
    reportId: 'reportId-1',
    variantId: 'variantId-1',
    executionId: 'ex1a2s3d4f5g6h7j8k',
    tableId: 'dfsdf',
    name: 'Test Variant 1',
    reportName: 'Test Report',
    description: 'Test Variant 1 description',
    status: 'SUBMITTED',
    href: '/async-reports/reportId-1/variantId-1/request/ex1a2s3d4f5g6h7j8k',
    filters: {
      data: {
        field1: 'value1.2',
        'field3.start': '2003-02-01',
        'field3.end': '2006-05-04',
      },
      queryString: 'field1=value1.2&field3.start=2003-02-01&field3.end=2006-05-04',
    },
    sortBy: {
      data: { sortColumn: 'field1', sortAsc: 'true' },
      queryString: 'sortColumn=field1&sortAsc=true',
    },
    filtersUrl:
      '/async-reports/reportId-1/variantId-1/request/ex1a2s3d4f5g6h7j8k?field1=value1.2&field3.start=2003-02-01&field3.end=2006-05-04&sortColumn=field1&sortAsc=true',
    querySummary: [
      { name: 'field1', value: 'value1.2' },
      { name: 'field3.start', value: '2003-02-01' },
      { name: 'field3.end', value: '2006-05-04' },
      { name: 'sortColumn', value: 'field1' },
      { name: 'sortAsc', value: 'true' },
    ],
    query: {
      'filters.field1': 'value1.2',
      'filters.field3.start': '2003-02-01',
      'filters.field3.end': '2006-05-04',
      sortColumn: 'field1',
      sortAsc: 'true',
    },
    timestamp: { requested: 'Requested at: 07/06/2024, 11:41:51' },
  },
  {
    reportId: 'reportId-1',
    variantId: 'variantId-2',
    executionId: 'executionId-2',
    name: 'Test Variant 2',
    description: 'Test Variant 2 description',
    tableId: 'tableId',
    status: 'FAILED',
    filters: {
      data: {},
      queryString: 'queryString',
      url: 'url',
    },
    sortyBy: {
      data: {},
      queryString: 'queryString',
      url: 'url',
    },
    columns: {
      data: {},
      queryString: 'queryString',
      url: 'url',
    },
    href: '/async-reports/reportId-2/variantId-1/request',
    reportUrl: 'reportUrl',
    timestamp: {
      requested: 'Requested at: 06/06/2024, 11:08:50',
      failed: 'Failed at: 06/06/2024, 11:08:50',
    },
  },
  {
    reportId: 'reportId-1',
    variantId: 'variantId-3',
    executionId: 'executionId-3',
    name: 'Test Variant 3',
    description: 'Test Variant 3 description',
    tableId: 'tableId',
    status: 'STARTED',
    filters: {
      data: {},
      queryString: 'queryString',
      url: 'url',
    },
    sortyBy: {
      data: {},
      queryString: 'queryString',
      url: 'url',
    },
    columns: {
      data: {},
      queryString: 'queryString',
      url: 'url',
    },
    href: '/async-reports/reportId-3/variantId-3/request/executionId',
    reportUrl: 'reportUrl',
    timestamp: {
      requested: 'Requested at: 06/06/2024, 11:08:50',
    },
  },
]

module.exports = mockRedisRequestedReports
