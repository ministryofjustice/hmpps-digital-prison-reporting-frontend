const summaryData = {
  filterData: {
    filters: [],
    selectedFilters: [],
    canSaveDefaults: true,
  },
  count: 100,
  nestedBaseUrl: '/embedded/platform',
  csrfToken: 'csrfToken',
  loadType: 'async',
  type: 'report',
  tableId: 'tblId_1769454359101',
  reportId: 'report-template-examples',
  id: 'report-template-summary',
  actions: [
    {
      id: 'dpr-button-refresh',
      disabled: false,
      text: 'Refresh',
      ariaLabelText: 'Refresh report',
      href: 'http://localhost:3010/embedded/platform/dpr/request-report/report/report-template-examples/report-template-summary/filters',
    },
    {
      id: 'dpr-button-printable',
      disabled: false,
      text: 'Print screen',
      ariaLabelText: 'Print screen',
      href: '#',
    },
    {
      id: 'dpr-button-sharable',
      disabled: true,
      text: 'Email report link',
      ariaLabelText: 'Email report link',
      href: 'mailto:?subject=Report templates-Summary&body=http%3A%2F%2Flocalhost%3A3010%2Fembedded%2Fplatform%2Fdpr%2Frequest-report%2Freport%2Freport-template-examples%2Freport-template-summary%2Ffilters',
    },
    {
      id: 'dpr-button-copy',
      disabled: false,
      text: 'Copy report link',
      ariaLabelText: 'Copy report link',
      href: 'http://localhost:3010/embedded/platform/dpr/request-report/report/report-template-examples/report-template-summary/filters',
    },
    {
      id: 'dpr-button-downloadable',
      disabled: false,
      text: 'Enable download',
      ariaLabelText: 'Enable download',
      attributes: {
        enabled: true,
        name: 'Summary',
        reportName: 'Report templates',
        csrfToken: 'csrfToken',
        reportId: 'report-template-examples',
        id: 'report-template-summary',
        tableId: 'tblId_1769454359101',
        columns: [],
        loadType: 'async',
        nestedBaseUrl: '/embedded/platform',
        canDownload: false,
        currentUrl:
          '/embedded/platform/dpr/view-report/async/report/report-template-examples/report-template-summary/tblId_1769454359101/report',
      },
    },
  ],
  canDownload: false,
  bookmarked: false,
  reportName: 'Report templates',
  name: 'Summary',
  description: 'Template: "summary"',
  classification: 'OFFICIAL',
  printable: true,
  specification: {
    template: 'summary',
    fields: [
      {
        name: 'section1',
        display: 'First',
        sortable: false,
        defaultsort: false,
        type: 'string',
        mandatory: false,
        visible: false,
      },
      {
        name: 'section2',
        display: 'Second',
        sortable: false,
        defaultsort: false,
        type: 'string',
        mandatory: false,
        visible: false,
      },
    ],
  },
  template: 'summary',
  fields: [
    {
      name: 'section1',
      display: 'First',
      sortable: false,
      defaultsort: false,
      type: 'string',
      mandatory: false,
      visible: false,
    },
    {
      name: 'section2',
      display: 'Second',
      sortable: false,
      defaultsort: false,
      type: 'string',
      mandatory: false,
      visible: false,
    },
  ],
  executionId: 'exId_1769454359101',
  requestedTimestamp: '26/01/2026, 19:06:00',
  querySummary: [],
  queryData: {},
  requestUrl: {
    fullUrl:
      'http://localhost:3010/embedded/platform/dpr/request-report/report/report-template-examples/report-template-summary/filters',
    pathname: '/embedded/platform/dpr/request-report/report/report-template-examples/report-template-summary/filters',
    search: '',
  },
  reportUrl:
    '/embedded/platform/dpr/view-report/async/report/report-template-examples/report-template-summary/tblId_1769454359101/report',
  pathname:
    '/embedded/platform/dpr/view-report/async/report/report-template-examples/report-template-summary/tblId_1769454359101/report',
  dataTable: {
    rowCount: 20,
    summaries: {
      'page-header': [
        {
          head: [
            {
              text: 'Total',
            },
          ],
          rows: [
            [
              {
                fieldName: 'total',
                text: 52,
                format: 'numeric',
                classes: '',
              },
            ],
          ],
          rowCount: 1,
          colCount: 1,
        },
        {
          head: [
            {
              text: 'Good (%)',
            },
            {
              text: 'Bad (%)',
            },
            {
              text: 'Ugly (%)',
            },
          ],
          rows: [
            [
              {
                fieldName: 'percentGood',
                text: 1,
                format: 'numeric',
                classes: '',
              },
              {
                fieldName: 'percentBad',
                text: 10,
                format: 'numeric',
                classes: '',
              },
              {
                fieldName: 'percentUgly',
                text: 89,
                format: 'numeric',
                classes: '',
              },
            ],
          ],
          rowCount: 1,
          colCount: 3,
        },
      ],
    },
    sections: [],
  },
}

export default summaryData
