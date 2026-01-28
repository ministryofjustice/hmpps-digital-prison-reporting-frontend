const summarySectionData = {
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
  tableId: 'tblId_1769454461356',
  reportId: 'report-template-examples',
  id: 'report-template-example-summary-section-better',
  actions: [
    {
      id: 'dpr-button-refresh',
      disabled: false,
      text: 'Refresh',
      ariaLabelText: 'Refresh report',
      href: 'http://localhost:3010/embedded/platform/dpr/request-report/report/report-template-examples/report-template-example-summary-section-better/filters',
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
      href: 'mailto:?subject=Report templates-Summary-section&body=http%3A%2F%2Flocalhost%3A3010%2Fembedded%2Fplatform%2Fdpr%2Frequest-report%2Freport%2Freport-template-examples%2Freport-template-example-summary-section-better%2Ffilters',
    },
    {
      id: 'dpr-button-copy',
      disabled: false,
      text: 'Copy report link',
      ariaLabelText: 'Copy report link',
      href: 'http://localhost:3010/embedded/platform/dpr/request-report/report/report-template-examples/report-template-example-summary-section-better/filters',
    },
    {
      id: 'dpr-button-downloadable',
      disabled: false,
      text: 'Enable download',
      ariaLabelText: 'Enable download',
      attributes: {
        enabled: true,
        name: 'Summary-section',
        reportName: 'Report templates',
        csrfToken: 'csrfToken',
        reportId: 'report-template-examples',
        id: 'report-template-example-summary-section-better',
        tableId: 'tblId_1769454461356',
        columns: [],
        loadType: 'async',
        nestedBaseUrl: '/embedded/platform',
        canDownload: false,
        currentUrl:
          '/embedded/platform/dpr/view-report/async/report/report-template-examples/report-template-example-summary-section-better/tblId_1769454461356/report',
      },
    },
  ],
  canDownload: false,
  bookmarked: false,
  reportName: 'Report templates',
  name: 'Summary-section',
  description: 'template: "summary-section".</br> A report with summaries in sections',
  classification: 'OFFICIAL',
  printable: true,
  specification: {
    template: 'summary-section',
    sections: ['section1', 'section2'],
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
  template: 'summary-section',
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
  executionId: 'exId_1769454461356',
  requestedTimestamp: '26/01/2026, 19:07:42',
  querySummary: [],
  queryData: {},
  requestUrl: {
    fullUrl:
      'http://localhost:3010/embedded/platform/dpr/request-report/report/report-template-examples/report-template-example-summary-section-better/filters',
    pathname:
      '/embedded/platform/dpr/request-report/report/report-template-examples/report-template-example-summary-section-better/filters',
    search: '',
  },
  reportUrl:
    '/embedded/platform/dpr/view-report/async/report/report-template-examples/report-template-example-summary-section-better/tblId_1769454461356/report',
  pathname:
    '/embedded/platform/dpr/view-report/async/report/report-template-examples/report-template-example-summary-section-better/tblId_1769454461356/report',
  dataTable: {
    rowCount: 100,
    summaries: {},
    sections: [
      {
        key: '[{"name":"section1","value":"One"},{"name":"section2","value":"A"}]',
        keyObj: [
          {
            name: 'section1',
            value: 'One',
          },
          {
            name: 'section2',
            value: 'A',
          },
        ],
        title: 'First: One, Second: A',
        count: 17,
        summaries: {
          'section-footer': [
            {
              head: [
                {
                  text: 'Field 1',
                },
                {
                  text: 'Field 2',
                },
                {
                  text: 'Field 3',
                },
                {
                  text: 'Field 4',
                },
              ],
              rows: [
                [
                  {
                    fieldName: 'field1',
                    text: 'Section One A Header',
                    format: 'string',
                    classes: '',
                  },
                  {
                    fieldName: 'field2',
                    text: 1,
                    format: 'numeric',
                    classes: '',
                  },
                  {
                    fieldName: 'field3',
                    text: 12219380923,
                    format: 'numeric',
                    classes: '',
                  },
                  {
                    fieldName: 'field4',
                    text: '4 Freds',
                    format: 'string',
                    classes: '',
                  },
                ],
              ],
              rowCount: 1,
              colCount: 4,
            },
            {
              head: [
                {
                  text: 'Field 1',
                },
                {
                  text: 'Field 2',
                },
                {
                  text: 'Field 3',
                },
                {
                  text: 'Field 4',
                },
              ],
              rows: [
                [
                  {
                    fieldName: 'field1',
                    text: 'Section One A Footer',
                    format: 'string',
                    classes: '',
                  },
                  {
                    fieldName: 'field2',
                    text: 1,
                    format: 'numeric',
                    classes: '',
                  },
                  {
                    fieldName: 'field3',
                    text: 12219380923,
                    format: 'numeric',
                    classes: '',
                  },
                  {
                    fieldName: 'field4',
                    text: '6 Freds',
                    format: 'string',
                    classes: '',
                  },
                ],
              ],
              rowCount: 1,
              colCount: 4,
            },
          ],
        },
        data: {
          head: [],
          rows: [],
          rowCount: 17,
          colCount: 0,
        },
      },
      {
        key: '[{"name":"section1","value":"One"},{"name":"section2","value":"B"}]',
        keyObj: [
          {
            name: 'section1',
            value: 'One',
          },
          {
            name: 'section2',
            value: 'B',
          },
        ],
        title: 'First: One, Second: B',
        count: 33,
        summaries: {
          'section-footer': [
            {
              head: [
                {
                  text: 'Field 1',
                },
                {
                  text: 'Field 2',
                },
                {
                  text: 'Field 3',
                },
                {
                  text: 'Field 4',
                },
              ],
              rows: [
                [
                  {
                    fieldName: 'field1',
                    text: 'Section One B Footer',
                    format: 'string',
                    classes: '',
                  },
                  {
                    fieldName: 'field2',
                    text: 1,
                    format: 'numeric',
                    classes: '',
                  },
                  {
                    fieldName: 'field3',
                    text: 12219380923,
                    format: 'numeric',
                    classes: '',
                  },
                  {
                    fieldName: 'field4',
                    text: '7 Freds',
                    format: 'string',
                    classes: '',
                  },
                ],
              ],
              rowCount: 1,
              colCount: 4,
            },
          ],
        },
        data: {
          head: [],
          rows: [],
          rowCount: 33,
          colCount: 0,
        },
      },
      {
        key: '[{"name":"section1","value":"Two"},{"name":"section2","value":"A"}]',
        keyObj: [
          {
            name: 'section1',
            value: 'Two',
          },
          {
            name: 'section2',
            value: 'A',
          },
        ],
        title: 'First: Two, Second: A',
        count: 17,
        summaries: {
          'section-footer': [
            {
              head: [
                {
                  text: 'Field 1',
                },
                {
                  text: 'Field 2',
                },
                {
                  text: 'Field 3',
                },
                {
                  text: 'Field 4',
                },
              ],
              rows: [
                [
                  {
                    fieldName: 'field1',
                    text: 'Section Two A Header',
                    format: 'string',
                    classes: '',
                  },
                  {
                    fieldName: 'field2',
                    text: 1,
                    format: 'numeric',
                    classes: '',
                  },
                  {
                    fieldName: 'field3',
                    text: 12219380923,
                    format: 'numeric',
                    classes: '',
                  },
                  {
                    fieldName: 'field4',
                    text: '5 Freds',
                    format: 'string',
                    classes: '',
                  },
                ],
              ],
              rowCount: 1,
              colCount: 4,
            },
          ],
        },
        data: {
          head: [],
          rows: [],
          rowCount: 17,
          colCount: 0,
        },
      },
      {
        key: '[{"name":"section1","value":"Two"},{"name":"section2","value":"B"}]',
        keyObj: [
          {
            name: 'section1',
            value: 'Two',
          },
          {
            name: 'section2',
            value: 'B',
          },
        ],
        title: 'First: Two, Second: B',
        count: 33,
        summaries: {},
        data: {
          head: [],
          rows: [],
          rowCount: 33,
          colCount: 0,
        },
      },
    ],
  },
}

export default summarySectionData
