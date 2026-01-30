const listSectionData = {
  columns: {
    name: 'columns',
    options: [
      {
        text: 'Field 1',
        value: 'field1',
        disabled: false,
      },
      {
        text: 'Field 2',
        value: 'field2',
        disabled: false,
      },
      {
        text: 'Field 3',
        value: 'field3',
        disabled: false,
      },
      {
        text: 'Field 4',
        value: 'field4',
      },
      {
        text: 'Field 6',
        value: 'field6',
        disabled: false,
      },
    ],
    text: 'Select report columns',
    value: ['field1', 'field2', 'field3', 'field4'],
  },
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
  tableId: 'tblId_1769454177138',
  reportId: 'report-template-examples',
  id: 'report-template-list-section-summaries',
  actions: [
    {
      id: 'dpr-button-refresh',
      disabled: false,
      text: 'Refresh',
      ariaLabelText: 'Refresh report',
      href: 'http://localhost:3010/embedded/platform/dpr/request-report/report/report-template-examples/report-template-list-section-summaries/filters?sortColumn=field1&sortedAsc=false',
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
      href: 'mailto:?subject=Report templates-List-section - with Summaries&body=http%3A%2F%2Flocalhost%3A3010%2Fembedded%2Fplatform%2Fdpr%2Frequest-report%2Freport%2Freport-template-examples%2Freport-template-list-section-summaries%2Ffilters%3FsortColumn%3Dfield1%26sortedAsc%3Dfalse',
    },
    {
      id: 'dpr-button-copy',
      disabled: false,
      text: 'Copy report link',
      ariaLabelText: 'Copy report link',
      href: 'http://localhost:3010/embedded/platform/dpr/request-report/report/report-template-examples/report-template-list-section-summaries/filters?sortColumn=field1&sortedAsc=false',
    },
    {
      id: 'dpr-button-downloadable',
      disabled: false,
      text: 'Enable download',
      ariaLabelText: 'Enable download',
      attributes: {
        enabled: true,
        name: 'List-section - with Summaries',
        reportName: 'Report templates',
        csrfToken: 'csrfToken',
        reportId: 'report-template-examples',
        id: 'report-template-list-section-summaries',
        tableId: 'tblId_1769454177138',
        columns: ['field1', 'field2', 'field3', 'field4'],
        loadType: 'async',
        nestedBaseUrl: '/embedded/platform',
        canDownload: false,
        currentUrl:
          '/embedded/platform/dpr/view-report/async/report/report-template-examples/report-template-list-section-summaries/tblId_1769454177138/report',
      },
    },
  ],
  canDownload: false,
  bookmarked: false,
  reportName: 'Report templates',
  name: 'List-section - with Summaries',
  description: 'Template: "list-section".</br> A sectioned report with all summaries',
  classification: 'OFFICIAL',
  printable: true,
  specification: {
    template: 'list-section',
    sections: ['section1', 'section2'],
    fields: [
      {
        name: 'field1',
        display: 'Field 1',
        sortable: true,
        defaultsort: true,
        type: 'string',
        mandatory: false,
        visible: true,
        filter: {
          type: 'Radio',
          staticOptions: [
            {
              name: 'value1.1',
              display: 'Value 1.1',
            },
            {
              name: 'value1.2',
              display: 'Value 1.2',
            },
            {
              name: 'value1.3',
              display: 'Value 1.3',
            },
          ],
          mandatory: false,
        },
      },
      {
        name: 'field2',
        display: 'Field 2',
        sortable: true,
        type: 'string',
        mandatory: false,
        visible: true,
        filter: {
          type: 'Select',
          staticOptions: [
            {
              name: 'value2.1',
              display: 'Value 2.1',
            },
            {
              name: 'value2.2',
              display: 'Value 2.2',
            },
            {
              name: 'value2.3',
              display: 'Value 2.3',
            },
          ],
          mandatory: false,
        },
      },
      {
        name: 'field3',
        display: 'Field 3',
        sortable: false,
        type: 'date',
        mandatory: false,
        visible: true,
        filter: {
          type: 'daterange',
          min: '2003-02-01',
          max: '2007-05-04',
          mandatory: false,
        },
      },
      {
        name: 'field4',
        display: 'Field 4',
        sortable: false,
        type: 'string',
        visible: true,
        filter: {
          type: 'autocomplete',
          dynamicOptions: {
            minimumLength: 3,
            returnAsStaticOptions: true,
          },
          staticOptions: [
            {
              name: 'Fezzick',
              display: 'Fezzick',
            },
            {
              name: 'Inigo Montoya',
              display: 'Inigo Montoya',
            },
            {
              name: 'Prince Humperdink',
              display: 'Prince Humperdink',
            },
            {
              name: 'Princess Buttercup',
              display: 'Princess Buttercup',
            },
            {
              name: 'Westley',
              display: 'Westley',
            },
          ],
          mandatory: false,
          pattern: '(?!Invalid).+',
        },
      },
      {
        name: 'field6',
        display: 'Field 6',
        sortable: false,
        type: 'string',
        mandatory: false,
        filter: {
          type: 'text',
          pattern: 'Value 6\\.\\d',
          mandatory: false,
        },
      },
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
  template: 'list-section',
  fields: [
    {
      name: 'field1',
      display: 'Field 1',
      sortable: true,
      defaultsort: true,
      type: 'string',
      mandatory: false,
      visible: true,
      filter: {
        type: 'Radio',
        staticOptions: [
          {
            name: 'value1.1',
            display: 'Value 1.1',
          },
          {
            name: 'value1.2',
            display: 'Value 1.2',
          },
          {
            name: 'value1.3',
            display: 'Value 1.3',
          },
        ],
        mandatory: false,
      },
    },
    {
      name: 'field2',
      display: 'Field 2',
      sortable: true,
      type: 'string',
      mandatory: false,
      visible: true,
      filter: {
        type: 'Select',
        staticOptions: [
          {
            name: 'value2.1',
            display: 'Value 2.1',
          },
          {
            name: 'value2.2',
            display: 'Value 2.2',
          },
          {
            name: 'value2.3',
            display: 'Value 2.3',
          },
        ],
        mandatory: false,
      },
    },
    {
      name: 'field3',
      display: 'Field 3',
      sortable: false,
      type: 'date',
      mandatory: false,
      visible: true,
      filter: {
        type: 'daterange',
        min: '2003-02-01',
        max: '2007-05-04',
        mandatory: false,
      },
    },
    {
      name: 'field4',
      display: 'Field 4',
      sortable: false,
      type: 'string',
      visible: true,
      filter: {
        type: 'autocomplete',
        dynamicOptions: {
          minimumLength: 3,
          returnAsStaticOptions: true,
        },
        staticOptions: [
          {
            name: 'Fezzick',
            display: 'Fezzick',
          },
          {
            name: 'Inigo Montoya',
            display: 'Inigo Montoya',
          },
          {
            name: 'Prince Humperdink',
            display: 'Prince Humperdink',
          },
          {
            name: 'Princess Buttercup',
            display: 'Princess Buttercup',
          },
          {
            name: 'Westley',
            display: 'Westley',
          },
        ],
        mandatory: false,
        pattern: '(?!Invalid).+',
      },
    },
    {
      name: 'field6',
      display: 'Field 6',
      sortable: false,
      type: 'string',
      mandatory: false,
      filter: {
        type: 'text',
        pattern: 'Value 6\\.\\d',
        mandatory: false,
      },
    },
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
  executionId: 'exId_1769454177138',
  requestedTimestamp: '26/01/2026, 19:02:58',
  querySummary: [
    {
      name: 'Sort Column',
      value: 'Field 1',
    },
    {
      name: 'Sort Direction',
      value: 'Descending',
    },
  ],
  queryData: {},
  requestUrl: {
    fullUrl:
      'http://localhost:3010/embedded/platform/dpr/request-report/report/report-template-examples/report-template-list-section-summaries/filters?sortColumn=field1&sortedAsc=false',
    pathname:
      '/embedded/platform/dpr/request-report/report/report-template-examples/report-template-list-section-summaries/filters',
    search: '?sortColumn=field1&sortedAsc=false',
  },
  reportUrl:
    '/embedded/platform/dpr/view-report/async/report/report-template-examples/report-template-list-section-summaries/tblId_1769454177138/report',
  pathname:
    '/embedded/platform/dpr/view-report/async/report/report-template-examples/report-template-list-section-summaries/tblId_1769454177138/report',
  dataTable: {
    rowCount: 100,
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
      ],
      'page-footer': [
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
          'table-header': [
            {
              head: [
                {
                  text: 'Field 1',
                },
                {
                  text: 'Field 1',
                },
                {
                  text: 'Field 1',
                },
                {
                  text: 'Field 1',
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
          ],
          'table-footer': [
            {
              head: [
                {
                  text: 'Field 1',
                },
                {
                  text: 'Field 1',
                },
                {
                  text: 'Field 1',
                },
                {
                  text: 'Field 1',
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
          'section-header': [
            {
              head: [
                {
                  text: 'Field 1',
                },
                {
                  text: 'Field 1',
                },
                {
                  text: 'Field 1',
                },
                {
                  text: 'Field 1',
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
          ],
          'section-footer': [
            {
              head: [
                {
                  text: 'Field 1',
                },
                {
                  text: 'Field 1',
                },
                {
                  text: 'Field 1',
                },
                {
                  text: 'Field 1',
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
                classes: 'dpr-report-summary-cell dpr-report-summary-cell-table-header',
              },
              {
                fieldName: 'field2',
                text: 1,
                format: 'numeric',
                classes: 'dpr-report-summary-cell dpr-report-summary-cell-table-header',
              },
              {
                fieldName: 'field3',
                text: 12219380923,
                format: 'numeric',
                classes: 'dpr-report-summary-cell dpr-report-summary-cell-table-header',
              },
              {
                fieldName: 'field4',
                text: '4 Freds',
                format: 'string',
                classes: 'dpr-report-summary-cell dpr-report-summary-cell-table-header',
              },
            ],
            [
              {
                fieldName: 'field1',
                text: 'Value 1',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field2',
                text: 'Value 2',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field3',
                text: '01/02/03 01:00',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field4',
                text: 'Value 4',
                format: 'string',
                classes: '',
              },
            ],
            [
              {
                fieldName: 'field1',
                text: 'Value 1',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field2',
                text: 'Value 2',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field3',
                text: '01/02/03 01:00',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field4',
                text: 'Value 4',
                format: 'string',
                classes: '',
              },
            ],
            [
              {
                fieldName: 'field1',
                text: 'Value 1',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field2',
                text: 'Value 2',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field3',
                text: '01/02/03 01:00',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field4',
                text: 'Value 4',
                format: 'string',
                classes: '',
              },
            ],
            [
              {
                fieldName: 'field1',
                text: 'Value 1',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field2',
                text: 'Value 2',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field3',
                text: '01/02/03 01:00',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field4',
                text: 'Value 4',
                format: 'string',
                classes: '',
              },
            ],
            [
              {
                fieldName: 'field1',
                text: 'Value 1',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field2',
                text: 'Value 2',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field3',
                text: '01/02/03 01:00',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field4',
                text: 'Value 4',
                format: 'string',
                classes: '',
              },
            ],
            [
              {
                fieldName: 'field1',
                text: 'Value 1',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field2',
                text: 'Value 2',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field3',
                text: '01/02/03 01:00',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field4',
                text: 'Value 4',
                format: 'string',
                classes: '',
              },
            ],
            [
              {
                fieldName: 'field1',
                text: 'Value 1',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field2',
                text: 'Value 2',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field3',
                text: '01/02/03 01:00',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field4',
                text: 'Value 4',
                format: 'string',
                classes: '',
              },
            ],
            [
              {
                fieldName: 'field1',
                text: 'Value 1',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field2',
                text: 'Value 2',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field3',
                text: '01/02/03 01:00',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field4',
                text: 'Value 4',
                format: 'string',
                classes: '',
              },
            ],
            [
              {
                fieldName: 'field1',
                text: 'Value 1',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field2',
                text: 'Value 2',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field3',
                text: '01/02/03 01:00',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field4',
                text: 'Value 4',
                format: 'string',
                classes: '',
              },
            ],
            [
              {
                fieldName: 'field1',
                text: 'Value 1',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field2',
                text: 'Value 2',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field3',
                text: '01/02/03 01:00',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field4',
                text: 'Value 4',
                format: 'string',
                classes: '',
              },
            ],
            [
              {
                fieldName: 'field1',
                text: 'Value 1',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field2',
                text: 'Value 2',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field3',
                text: '01/02/03 01:00',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field4',
                text: 'Value 4',
                format: 'string',
                classes: '',
              },
            ],
            [
              {
                fieldName: 'field1',
                text: 'Value 1',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field2',
                text: 'Value 2',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field3',
                text: '01/02/03 01:00',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field4',
                text: 'Value 4',
                format: 'string',
                classes: '',
              },
            ],
            [
              {
                fieldName: 'field1',
                text: 'Value 1',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field2',
                text: 'Value 2',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field3',
                text: '01/02/03 01:00',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field4',
                text: 'Value 4',
                format: 'string',
                classes: '',
              },
            ],
            [
              {
                fieldName: 'field1',
                text: 'Value 1',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field2',
                text: 'Value 2',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field3',
                text: '01/02/03 01:00',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field4',
                text: 'Value 4',
                format: 'string',
                classes: '',
              },
            ],
            [
              {
                fieldName: 'field1',
                text: 'Value 1',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field2',
                text: 'Value 2',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field3',
                text: '01/02/03 01:00',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field4',
                text: 'Value 4',
                format: 'string',
                classes: '',
              },
            ],
            [
              {
                fieldName: 'field1',
                text: 'Value 1',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field2',
                text: 'Value 2',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field3',
                text: '01/02/03 01:00',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field4',
                text: 'Value 4',
                format: 'string',
                classes: '',
              },
            ],
            [
              {
                fieldName: 'field1',
                text: 'Value 1',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field2',
                text: 'Value 2',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field3',
                text: '01/02/03 01:00',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field4',
                text: 'Value 4',
                format: 'string',
                classes: '',
              },
            ],
            [
              {
                fieldName: 'field1',
                text: 'Section One A Footer',
                format: 'string',
                classes: 'dpr-report-summary-cell dpr-report-summary-cell-table-footer',
              },
              {
                fieldName: 'field2',
                text: 1,
                format: 'numeric',
                classes: 'dpr-report-summary-cell dpr-report-summary-cell-table-footer',
              },
              {
                fieldName: 'field3',
                text: 12219380923,
                format: 'numeric',
                classes: 'dpr-report-summary-cell dpr-report-summary-cell-table-footer',
              },
              {
                fieldName: 'field4',
                text: '6 Freds',
                format: 'string',
                classes: 'dpr-report-summary-cell dpr-report-summary-cell-table-footer',
              },
            ],
          ],
          rowCount: 17,
          colCount: 4,
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
          'table-footer': [
            {
              head: [
                {
                  text: 'Field 1',
                },
                {
                  text: 'Field 1',
                },
                {
                  text: 'Field 1',
                },
                {
                  text: 'Field 1',
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
          'section-footer': [
            {
              head: [
                {
                  text: 'Field 1',
                },
                {
                  text: 'Field 1',
                },
                {
                  text: 'Field 1',
                },
                {
                  text: 'Field 1',
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
                text: 'Value 1',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field2',
                text: 'Value 2',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field3',
                text: '01/02/03 01:00',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field4',
                text: 'Value 4',
                format: 'string',
                classes: '',
              },
            ],
            [
              {
                fieldName: 'field1',
                text: 'Value 1',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field2',
                text: 'Value 2',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field3',
                text: '01/02/03 01:00',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field4',
                text: 'Value 4',
                format: 'string',
                classes: '',
              },
            ],
            [
              {
                fieldName: 'field1',
                text: 'Value 1',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field2',
                text: 'Value 2',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field3',
                text: '01/02/03 01:00',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field4',
                text: 'Value 4',
                format: 'string',
                classes: '',
              },
            ],
            [
              {
                fieldName: 'field1',
                text: 'Value 1',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field2',
                text: 'Value 2',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field3',
                text: '01/02/03 01:00',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field4',
                text: 'Value 4',
                format: 'string',
                classes: '',
              },
            ],
            [
              {
                fieldName: 'field1',
                text: 'Value 1',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field2',
                text: 'Value 2',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field3',
                text: '01/02/03 01:00',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field4',
                text: 'Value 4',
                format: 'string',
                classes: '',
              },
            ],
            [
              {
                fieldName: 'field1',
                text: 'Value 1',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field2',
                text: 'Value 2',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field3',
                text: '01/02/03 01:00',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field4',
                text: 'Value 4',
                format: 'string',
                classes: '',
              },
            ],
            [
              {
                fieldName: 'field1',
                text: 'Value 1',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field2',
                text: 'Value 2',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field3',
                text: '01/02/03 01:00',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field4',
                text: 'Value 4',
                format: 'string',
                classes: '',
              },
            ],
            [
              {
                fieldName: 'field1',
                text: 'Value 1',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field2',
                text: 'Value 2',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field3',
                text: '01/02/03 01:00',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field4',
                text: 'Value 4',
                format: 'string',
                classes: '',
              },
            ],
            [
              {
                fieldName: 'field1',
                text: 'Value 1',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field2',
                text: 'Value 2',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field3',
                text: '01/02/03 01:00',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field4',
                text: 'Value 4',
                format: 'string',
                classes: '',
              },
            ],
            [
              {
                fieldName: 'field1',
                text: 'Value 1',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field2',
                text: 'Value 2',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field3',
                text: '01/02/03 01:00',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field4',
                text: 'Value 4',
                format: 'string',
                classes: '',
              },
            ],
            [
              {
                fieldName: 'field1',
                text: 'Value 1',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field2',
                text: 'Value 2',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field3',
                text: '01/02/03 01:00',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field4',
                text: 'Value 4',
                format: 'string',
                classes: '',
              },
            ],
            [
              {
                fieldName: 'field1',
                text: 'Value 1',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field2',
                text: 'Value 2',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field3',
                text: '01/02/03 01:00',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field4',
                text: 'Value 4',
                format: 'string',
                classes: '',
              },
            ],
            [
              {
                fieldName: 'field1',
                text: 'Value 1',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field2',
                text: 'Value 2',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field3',
                text: '01/02/03 01:00',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field4',
                text: 'Value 4',
                format: 'string',
                classes: '',
              },
            ],
            [
              {
                fieldName: 'field1',
                text: 'Value 1',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field2',
                text: 'Value 2',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field3',
                text: '01/02/03 01:00',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field4',
                text: 'Value 4',
                format: 'string',
                classes: '',
              },
            ],
            [
              {
                fieldName: 'field1',
                text: 'Value 1',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field2',
                text: 'Value 2',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field3',
                text: '01/02/03 01:00',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field4',
                text: 'Value 4',
                format: 'string',
                classes: '',
              },
            ],
            [
              {
                fieldName: 'field1',
                text: 'Value 1',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field2',
                text: 'Value 2',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field3',
                text: '01/02/03 01:00',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field4',
                text: 'Value 4',
                format: 'string',
                classes: '',
              },
            ],
            [
              {
                fieldName: 'field1',
                text: 'Value 1',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field2',
                text: 'Value 2',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field3',
                text: '01/02/03 01:00',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field4',
                text: 'Value 4',
                format: 'string',
                classes: '',
              },
            ],
            [
              {
                fieldName: 'field1',
                text: 'Value 1',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field2',
                text: 'Value 2',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field3',
                text: '01/02/03 01:00',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field4',
                text: 'Value 4',
                format: 'string',
                classes: '',
              },
            ],
            [
              {
                fieldName: 'field1',
                text: 'Value 1',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field2',
                text: 'Value 2',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field3',
                text: '01/02/03 01:00',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field4',
                text: 'Value 4',
                format: 'string',
                classes: '',
              },
            ],
            [
              {
                fieldName: 'field1',
                text: 'Value 1',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field2',
                text: 'Value 2',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field3',
                text: '01/02/03 01:00',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field4',
                text: 'Value 4',
                format: 'string',
                classes: '',
              },
            ],
            [
              {
                fieldName: 'field1',
                text: 'Value 1',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field2',
                text: 'Value 2',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field3',
                text: '01/02/03 01:00',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field4',
                text: 'Value 4',
                format: 'string',
                classes: '',
              },
            ],
            [
              {
                fieldName: 'field1',
                text: 'Value 1',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field2',
                text: 'Value 2',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field3',
                text: '01/02/03 01:00',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field4',
                text: 'Value 4',
                format: 'string',
                classes: '',
              },
            ],
            [
              {
                fieldName: 'field1',
                text: 'Value 1',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field2',
                text: 'Value 2',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field3',
                text: '01/02/03 01:00',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field4',
                text: 'Value 4',
                format: 'string',
                classes: '',
              },
            ],
            [
              {
                fieldName: 'field1',
                text: 'Value 1',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field2',
                text: 'Value 2',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field3',
                text: '01/02/03 01:00',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field4',
                text: 'Value 4',
                format: 'string',
                classes: '',
              },
            ],
            [
              {
                fieldName: 'field1',
                text: 'Value 1',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field2',
                text: 'Value 2',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field3',
                text: '01/02/03 01:00',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field4',
                text: 'Value 4',
                format: 'string',
                classes: '',
              },
            ],
            [
              {
                fieldName: 'field1',
                text: 'Value 1',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field2',
                text: 'Value 2',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field3',
                text: '01/02/03 01:00',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field4',
                text: 'Value 4',
                format: 'string',
                classes: '',
              },
            ],
            [
              {
                fieldName: 'field1',
                text: 'Value 1',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field2',
                text: 'Value 2',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field3',
                text: '01/02/03 01:00',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field4',
                text: 'Value 4',
                format: 'string',
                classes: '',
              },
            ],
            [
              {
                fieldName: 'field1',
                text: 'Value 1',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field2',
                text: 'Value 2',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field3',
                text: '01/02/03 01:00',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field4',
                text: 'Value 4',
                format: 'string',
                classes: '',
              },
            ],
            [
              {
                fieldName: 'field1',
                text: 'Value 1',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field2',
                text: 'Value 2',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field3',
                text: '01/02/03 01:00',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field4',
                text: 'Value 4',
                format: 'string',
                classes: '',
              },
            ],
            [
              {
                fieldName: 'field1',
                text: 'Value 1',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field2',
                text: 'Value 2',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field3',
                text: '01/02/03 01:00',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field4',
                text: 'Value 4',
                format: 'string',
                classes: '',
              },
            ],
            [
              {
                fieldName: 'field1',
                text: 'Value 1',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field2',
                text: 'Value 2',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field3',
                text: '01/02/03 01:00',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field4',
                text: 'Value 4',
                format: 'string',
                classes: '',
              },
            ],
            [
              {
                fieldName: 'field1',
                text: 'Value 1',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field2',
                text: 'Value 2',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field3',
                text: '01/02/03 01:00',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field4',
                text: 'Value 4',
                format: 'string',
                classes: '',
              },
            ],
            [
              {
                fieldName: 'field1',
                text: 'Value 1',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field2',
                text: 'Value 2',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field3',
                text: '01/02/03 01:00',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field4',
                text: 'Value 4',
                format: 'string',
                classes: '',
              },
            ],
            [
              {
                fieldName: 'field1',
                text: 'Section One B Footer',
                format: 'string',
                classes: 'dpr-report-summary-cell dpr-report-summary-cell-table-footer',
              },
              {
                fieldName: 'field2',
                text: 1,
                format: 'numeric',
                classes: 'dpr-report-summary-cell dpr-report-summary-cell-table-footer',
              },
              {
                fieldName: 'field3',
                text: 12219380923,
                format: 'numeric',
                classes: 'dpr-report-summary-cell dpr-report-summary-cell-table-footer',
              },
              {
                fieldName: 'field4',
                text: '7 Freds',
                format: 'string',
                classes: 'dpr-report-summary-cell dpr-report-summary-cell-table-footer',
              },
            ],
          ],
          rowCount: 33,
          colCount: 4,
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
          'table-header': [
            {
              head: [
                {
                  text: 'Field 1',
                },
                {
                  text: 'Field 1',
                },
                {
                  text: 'Field 1',
                },
                {
                  text: 'Field 1',
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
          'section-header': [
            {
              head: [
                {
                  text: 'Field 1',
                },
                {
                  text: 'Field 1',
                },
                {
                  text: 'Field 1',
                },
                {
                  text: 'Field 1',
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
                classes: 'dpr-report-summary-cell dpr-report-summary-cell-table-header',
              },
              {
                fieldName: 'field2',
                text: 1,
                format: 'numeric',
                classes: 'dpr-report-summary-cell dpr-report-summary-cell-table-header',
              },
              {
                fieldName: 'field3',
                text: 12219380923,
                format: 'numeric',
                classes: 'dpr-report-summary-cell dpr-report-summary-cell-table-header',
              },
              {
                fieldName: 'field4',
                text: '5 Freds',
                format: 'string',
                classes: 'dpr-report-summary-cell dpr-report-summary-cell-table-header',
              },
            ],
            [
              {
                fieldName: 'field1',
                text: 'Value 1',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field2',
                text: 'Value 2',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field3',
                text: '01/02/03 01:00',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field4',
                text: 'Value 4',
                format: 'string',
                classes: '',
              },
            ],
            [
              {
                fieldName: 'field1',
                text: 'Value 1',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field2',
                text: 'Value 2',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field3',
                text: '01/02/03 01:00',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field4',
                text: 'Value 4',
                format: 'string',
                classes: '',
              },
            ],
            [
              {
                fieldName: 'field1',
                text: 'Value 1',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field2',
                text: 'Value 2',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field3',
                text: '01/02/03 01:00',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field4',
                text: 'Value 4',
                format: 'string',
                classes: '',
              },
            ],
            [
              {
                fieldName: 'field1',
                text: 'Value 1',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field2',
                text: 'Value 2',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field3',
                text: '01/02/03 01:00',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field4',
                text: 'Value 4',
                format: 'string',
                classes: '',
              },
            ],
            [
              {
                fieldName: 'field1',
                text: 'Value 1',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field2',
                text: 'Value 2',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field3',
                text: '01/02/03 01:00',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field4',
                text: 'Value 4',
                format: 'string',
                classes: '',
              },
            ],
            [
              {
                fieldName: 'field1',
                text: 'Value 1',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field2',
                text: 'Value 2',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field3',
                text: '01/02/03 01:00',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field4',
                text: 'Value 4',
                format: 'string',
                classes: '',
              },
            ],
            [
              {
                fieldName: 'field1',
                text: 'Value 1',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field2',
                text: 'Value 2',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field3',
                text: '01/02/03 01:00',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field4',
                text: 'Value 4',
                format: 'string',
                classes: '',
              },
            ],
            [
              {
                fieldName: 'field1',
                text: 'Value 1',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field2',
                text: 'Value 2',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field3',
                text: '01/02/03 01:00',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field4',
                text: 'Value 4',
                format: 'string',
                classes: '',
              },
            ],
            [
              {
                fieldName: 'field1',
                text: 'Value 1',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field2',
                text: 'Value 2',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field3',
                text: '01/02/03 01:00',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field4',
                text: 'Value 4',
                format: 'string',
                classes: '',
              },
            ],
            [
              {
                fieldName: 'field1',
                text: 'Value 1',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field2',
                text: 'Value 2',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field3',
                text: '01/02/03 01:00',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field4',
                text: 'Value 4',
                format: 'string',
                classes: '',
              },
            ],
            [
              {
                fieldName: 'field1',
                text: 'Value 1',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field2',
                text: 'Value 2',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field3',
                text: '01/02/03 01:00',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field4',
                text: 'Value 4',
                format: 'string',
                classes: '',
              },
            ],
            [
              {
                fieldName: 'field1',
                text: 'Value 1',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field2',
                text: 'Value 2',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field3',
                text: '01/02/03 01:00',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field4',
                text: 'Value 4',
                format: 'string',
                classes: '',
              },
            ],
            [
              {
                fieldName: 'field1',
                text: 'Value 1',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field2',
                text: 'Value 2',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field3',
                text: '01/02/03 01:00',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field4',
                text: 'Value 4',
                format: 'string',
                classes: '',
              },
            ],
            [
              {
                fieldName: 'field1',
                text: 'Value 1',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field2',
                text: 'Value 2',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field3',
                text: '01/02/03 01:00',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field4',
                text: 'Value 4',
                format: 'string',
                classes: '',
              },
            ],
            [
              {
                fieldName: 'field1',
                text: 'Value 1',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field2',
                text: 'Value 2',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field3',
                text: '01/02/03 01:00',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field4',
                text: 'Value 4',
                format: 'string',
                classes: '',
              },
            ],
            [
              {
                fieldName: 'field1',
                text: 'Value 1',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field2',
                text: 'Value 2',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field3',
                text: '01/02/03 01:00',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field4',
                text: 'Value 4',
                format: 'string',
                classes: '',
              },
            ],
            [
              {
                fieldName: 'field1',
                text: 'Value 1',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field2',
                text: 'Value 2',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field3',
                text: '01/02/03 01:00',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field4',
                text: 'Value 4',
                format: 'string',
                classes: '',
              },
            ],
          ],
          rowCount: 17,
          colCount: 4,
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
                text: 'Value 1',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field2',
                text: 'Value 2',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field3',
                text: '01/02/03 01:00',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field4',
                text: 'Value 4',
                format: 'string',
                classes: '',
              },
            ],
            [
              {
                fieldName: 'field1',
                text: 'Value 1',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field2',
                text: 'Value 2',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field3',
                text: '01/02/03 01:00',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field4',
                text: 'Value 4',
                format: 'string',
                classes: '',
              },
            ],
            [
              {
                fieldName: 'field1',
                text: 'Value 1',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field2',
                text: 'Value 2',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field3',
                text: '01/02/03 01:00',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field4',
                text: 'Value 4',
                format: 'string',
                classes: '',
              },
            ],
            [
              {
                fieldName: 'field1',
                text: 'Value 1',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field2',
                text: 'Value 2',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field3',
                text: '01/02/03 01:00',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field4',
                text: 'Value 4',
                format: 'string',
                classes: '',
              },
            ],
            [
              {
                fieldName: 'field1',
                text: 'Value 1',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field2',
                text: 'Value 2',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field3',
                text: '01/02/03 01:00',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field4',
                text: 'Value 4',
                format: 'string',
                classes: '',
              },
            ],
            [
              {
                fieldName: 'field1',
                text: 'Value 1',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field2',
                text: 'Value 2',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field3',
                text: '01/02/03 01:00',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field4',
                text: 'Value 4',
                format: 'string',
                classes: '',
              },
            ],
            [
              {
                fieldName: 'field1',
                text: 'Value 1',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field2',
                text: 'Value 2',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field3',
                text: '01/02/03 01:00',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field4',
                text: 'Value 4',
                format: 'string',
                classes: '',
              },
            ],
            [
              {
                fieldName: 'field1',
                text: 'Value 1',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field2',
                text: 'Value 2',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field3',
                text: '01/02/03 01:00',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field4',
                text: 'Value 4',
                format: 'string',
                classes: '',
              },
            ],
            [
              {
                fieldName: 'field1',
                text: 'Value 1',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field2',
                text: 'Value 2',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field3',
                text: '01/02/03 01:00',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field4',
                text: 'Value 4',
                format: 'string',
                classes: '',
              },
            ],
            [
              {
                fieldName: 'field1',
                text: 'Value 1',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field2',
                text: 'Value 2',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field3',
                text: '01/02/03 01:00',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field4',
                text: 'Value 4',
                format: 'string',
                classes: '',
              },
            ],
            [
              {
                fieldName: 'field1',
                text: 'Value 1',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field2',
                text: 'Value 2',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field3',
                text: '01/02/03 01:00',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field4',
                text: 'Value 4',
                format: 'string',
                classes: '',
              },
            ],
            [
              {
                fieldName: 'field1',
                text: 'Value 1',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field2',
                text: 'Value 2',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field3',
                text: '01/02/03 01:00',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field4',
                text: 'Value 4',
                format: 'string',
                classes: '',
              },
            ],
            [
              {
                fieldName: 'field1',
                text: 'Value 1',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field2',
                text: 'Value 2',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field3',
                text: '01/02/03 01:00',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field4',
                text: 'Value 4',
                format: 'string',
                classes: '',
              },
            ],
            [
              {
                fieldName: 'field1',
                text: 'Value 1',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field2',
                text: 'Value 2',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field3',
                text: '01/02/03 01:00',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field4',
                text: 'Value 4',
                format: 'string',
                classes: '',
              },
            ],
            [
              {
                fieldName: 'field1',
                text: 'Value 1',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field2',
                text: 'Value 2',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field3',
                text: '01/02/03 01:00',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field4',
                text: 'Value 4',
                format: 'string',
                classes: '',
              },
            ],
            [
              {
                fieldName: 'field1',
                text: 'Value 1',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field2',
                text: 'Value 2',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field3',
                text: '01/02/03 01:00',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field4',
                text: 'Value 4',
                format: 'string',
                classes: '',
              },
            ],
            [
              {
                fieldName: 'field1',
                text: 'Value 1',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field2',
                text: 'Value 2',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field3',
                text: '01/02/03 01:00',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field4',
                text: 'Value 4',
                format: 'string',
                classes: '',
              },
            ],
            [
              {
                fieldName: 'field1',
                text: 'Value 1',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field2',
                text: 'Value 2',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field3',
                text: '01/02/03 01:00',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field4',
                text: 'Value 4',
                format: 'string',
                classes: '',
              },
            ],
            [
              {
                fieldName: 'field1',
                text: 'Value 1',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field2',
                text: 'Value 2',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field3',
                text: '01/02/03 01:00',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field4',
                text: 'Value 4',
                format: 'string',
                classes: '',
              },
            ],
            [
              {
                fieldName: 'field1',
                text: 'Value 1',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field2',
                text: 'Value 2',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field3',
                text: '01/02/03 01:00',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field4',
                text: 'Value 4',
                format: 'string',
                classes: '',
              },
            ],
            [
              {
                fieldName: 'field1',
                text: 'Value 1',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field2',
                text: 'Value 2',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field3',
                text: '01/02/03 01:00',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field4',
                text: 'Value 4',
                format: 'string',
                classes: '',
              },
            ],
            [
              {
                fieldName: 'field1',
                text: 'Value 1',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field2',
                text: 'Value 2',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field3',
                text: '01/02/03 01:00',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field4',
                text: 'Value 4',
                format: 'string',
                classes: '',
              },
            ],
            [
              {
                fieldName: 'field1',
                text: 'Value 1',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field2',
                text: 'Value 2',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field3',
                text: '01/02/03 01:00',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field4',
                text: 'Value 4',
                format: 'string',
                classes: '',
              },
            ],
            [
              {
                fieldName: 'field1',
                text: 'Value 1',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field2',
                text: 'Value 2',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field3',
                text: '01/02/03 01:00',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field4',
                text: 'Value 4',
                format: 'string',
                classes: '',
              },
            ],
            [
              {
                fieldName: 'field1',
                text: 'Value 1',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field2',
                text: 'Value 2',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field3',
                text: '01/02/03 01:00',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field4',
                text: 'Value 4',
                format: 'string',
                classes: '',
              },
            ],
            [
              {
                fieldName: 'field1',
                text: 'Value 1',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field2',
                text: 'Value 2',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field3',
                text: '01/02/03 01:00',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field4',
                text: 'Value 4',
                format: 'string',
                classes: '',
              },
            ],
            [
              {
                fieldName: 'field1',
                text: 'Value 1',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field2',
                text: 'Value 2',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field3',
                text: '01/02/03 01:00',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field4',
                text: 'Value 4',
                format: 'string',
                classes: '',
              },
            ],
            [
              {
                fieldName: 'field1',
                text: 'Value 1',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field2',
                text: 'Value 2',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field3',
                text: '01/02/03 01:00',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field4',
                text: 'Value 4',
                format: 'string',
                classes: '',
              },
            ],
            [
              {
                fieldName: 'field1',
                text: 'Value 1',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field2',
                text: 'Value 2',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field3',
                text: '01/02/03 01:00',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field4',
                text: 'Value 4',
                format: 'string',
                classes: '',
              },
            ],
            [
              {
                fieldName: 'field1',
                text: 'Value 1',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field2',
                text: 'Value 2',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field3',
                text: '01/02/03 01:00',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field4',
                text: 'Value 4',
                format: 'string',
                classes: '',
              },
            ],
            [
              {
                fieldName: 'field1',
                text: 'Value 1',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field2',
                text: 'Value 2',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field3',
                text: '01/02/03 01:00',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field4',
                text: 'Value 4',
                format: 'string',
                classes: '',
              },
            ],
            [
              {
                fieldName: 'field1',
                text: 'Value 1',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field2',
                text: 'Value 2',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field3',
                text: '01/02/03 01:00',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field4',
                text: 'Value 4',
                format: 'string',
                classes: '',
              },
            ],
            [
              {
                fieldName: 'field1',
                text: 'Value 1',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field2',
                text: 'Value 2',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field3',
                text: '01/02/03 01:00',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field4',
                text: 'Value 4',
                format: 'string',
                classes: '',
              },
            ],
          ],
          rowCount: 33,
          colCount: 4,
        },
      },
    ],
  },
}

export default listSectionData
