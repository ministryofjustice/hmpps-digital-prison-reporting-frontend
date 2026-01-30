const parentChildData = {
  columns: {
    name: 'columns',
    options: [
      {
        text: 'First',
        value: 'section1',
        disabled: false,
      },
      {
        text: 'Second',
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
        disabled: false,
      },
      {
        text: 'Field 5',
        value: 'field5',
        disabled: false,
      },
      {
        text: 'Field 6',
        value: 'field6',
        disabled: false,
      },
      {
        text: 'Field 7',
        value: 'field7',
        disabled: false,
      },
    ],
    text: 'Select report columns',
    value: ['section1', 'field1', 'field2', 'field3', 'field4', 'field5', 'field6', 'field7'],
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
  tableId: 'tblId_1769453539086',
  reportId: 'report-template-examples',
  id: 'report-template-parent-child',
  actions: [
    {
      id: 'dpr-button-refresh',
      disabled: false,
      text: 'Refresh',
      ariaLabelText: 'Refresh report',
      href: 'http://localhost:3010/embedded/platform/dpr/request-report/report/report-template-examples/report-template-parent-child/filters?sortedAsc=false&sortColumn=field1',
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
      href: 'mailto:?subject=Report templates-Parent-child&body=http%3A%2F%2Flocalhost%3A3010%2Fembedded%2Fplatform%2Fdpr%2Frequest-report%2Freport%2Freport-template-examples%2Freport-template-parent-child%2Ffilters%3FsortedAsc%3Dfalse%26sortColumn%3Dfield1',
    },
    {
      id: 'dpr-button-copy',
      disabled: false,
      text: 'Copy report link',
      ariaLabelText: 'Copy report link',
      href: 'http://localhost:3010/embedded/platform/dpr/request-report/report/report-template-examples/report-template-parent-child/filters?sortedAsc=false&sortColumn=field1',
    },
    {
      id: 'dpr-button-downloadable',
      disabled: false,
      text: 'Enable download',
      ariaLabelText: 'Enable download',
      attributes: {
        enabled: true,
        name: 'Parent-child',
        reportName: 'Report templates',
        csrfToken: 'csrfToken',
        reportId: 'report-template-examples',
        id: 'report-template-parent-child',
        tableId: 'tblId_1769453539086',
        columns: ['section1', 'field1', 'field2', 'field3', 'field4', 'field5', 'field6', 'field7'],
        loadType: 'async',
        nestedBaseUrl: '/embedded/platform',
        canDownload: false,
        currentUrl:
          '/embedded/platform/dpr/view-report/async/report/report-template-examples/report-template-parent-child/tblId_1769453539086/report',
      },
    },
  ],
  canDownload: false,
  bookmarked: false,
  reportName: 'Report templates',
  name: 'Parent-child',
  description: 'Template: "parent-child".</br> A report with parent and child datasets',
  classification: 'OFFICIAL',
  printable: true,
  specification: {
    template: 'parent-child',
    fields: [
      {
        name: 'section1',
        display: 'First',
        sortable: false,
        defaultsort: false,
        type: 'string',
        mandatory: false,
        visible: true,
      },
      {
        name: 'field1',
        display: 'Second',
        sortable: true,
        defaultsort: false,
        type: 'string',
        mandatory: false,
        visible: true,
      },
      {
        name: 'field2',
        display: 'Field 2',
        sortable: true,
        defaultsort: false,
        type: 'string',
        mandatory: false,
        visible: true,
      },
      {
        name: 'field3',
        display: 'Field 3',
        sortable: true,
        defaultsort: false,
        type: 'string',
        mandatory: false,
        visible: true,
      },
      {
        name: 'field4',
        display: 'Field 4',
        sortable: true,
        defaultsort: false,
        type: 'string',
        mandatory: false,
        visible: true,
      },
      {
        name: 'field5',
        display: 'Field 5',
        sortable: true,
        defaultsort: false,
        type: 'string',
        mandatory: false,
        visible: true,
      },
      {
        name: 'field6',
        display: 'Field 6',
        sortable: true,
        defaultsort: false,
        type: 'string',
        mandatory: false,
        visible: true,
      },
      {
        name: 'field7',
        display: 'Field 7',
        sortable: true,
        defaultsort: false,
        type: 'string',
        mandatory: false,
        visible: true,
      },
    ],
  },
  template: 'parent-child',
  fields: [
    {
      name: 'section1',
      display: 'First',
      sortable: false,
      defaultsort: false,
      type: 'string',
      mandatory: false,
      visible: true,
    },
    {
      name: 'field1',
      display: 'Second',
      sortable: true,
      defaultsort: false,
      type: 'string',
      mandatory: false,
      visible: true,
    },
    {
      name: 'field2',
      display: 'Field 2',
      sortable: true,
      defaultsort: false,
      type: 'string',
      mandatory: false,
      visible: true,
    },
    {
      name: 'field3',
      display: 'Field 3',
      sortable: true,
      defaultsort: false,
      type: 'string',
      mandatory: false,
      visible: true,
    },
    {
      name: 'field4',
      display: 'Field 4',
      sortable: true,
      defaultsort: false,
      type: 'string',
      mandatory: false,
      visible: true,
    },
    {
      name: 'field5',
      display: 'Field 5',
      sortable: true,
      defaultsort: false,
      type: 'string',
      mandatory: false,
      visible: true,
    },
    {
      name: 'field6',
      display: 'Field 6',
      sortable: true,
      defaultsort: false,
      type: 'string',
      mandatory: false,
      visible: true,
    },
    {
      name: 'field7',
      display: 'Field 7',
      sortable: true,
      defaultsort: false,
      type: 'string',
      mandatory: false,
      visible: true,
    },
  ],
  executionId: 'exId_1769453539086',
  requestedTimestamp: '26/01/2026, 18:52:21',
  querySummary: [
    {
      name: 'Sort Column',
      value: 'Second',
    },
    {
      name: 'Sort Direction',
      value: 'Descending',
    },
  ],
  queryData: {},
  requestUrl: {
    fullUrl:
      'http://localhost:3010/embedded/platform/dpr/request-report/report/report-template-examples/report-template-parent-child/filters?sortedAsc=false&sortColumn=field1',
    pathname:
      '/embedded/platform/dpr/request-report/report/report-template-examples/report-template-parent-child/filters',
    search: '?sortedAsc=false&sortColumn=field1',
  },
  reportUrl:
    '/embedded/platform/dpr/view-report/async/report/report-template-examples/report-template-parent-child/tblId_1769453539086/report',
  pathname:
    '/embedded/platform/dpr/view-report/async/report/report-template-examples/report-template-parent-child/tblId_1769453539086/report',
  dataTable: {
    rowCount: 7,
    sections: [
      {
        key: '',
        keyObj: [],
        data: [
          {
            parent: {
              head: [
                {
                  text: 'First',
                },
                {
                  text: 'Second',
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
                {
                  text: 'Field 5',
                },
                {
                  text: 'Field 6',
                },
                {
                  text: 'Field 7',
                },
              ],
              rows: [
                [
                  {
                    fieldName: 'section1',
                    text: 'one',
                    format: 'string',
                    classes: '',
                  },
                  {
                    fieldName: 'field1',
                    text: 'Parent row 1',
                    format: 'string',
                    classes: '',
                  },
                  {
                    fieldName: 'field2',
                    text: 'Field 2 data',
                    format: 'string',
                    classes: '',
                  },
                  {
                    fieldName: 'field3',
                    text: 'Field 3 data',
                    format: 'string',
                    classes: '',
                  },
                  {
                    fieldName: 'field4',
                    text: 'Field 4 data',
                    format: 'string',
                    classes: '',
                  },
                  {
                    fieldName: 'field5',
                    text: 'Field 5 data',
                    format: 'string',
                    classes: '',
                  },
                  {
                    fieldName: 'field6',
                    text: 'Field 6 data',
                    format: 'string',
                    classes: '',
                  },
                  {
                    fieldName: 'field7',
                    text: 'Field 7 data',
                    format: 'string',
                    classes: '',
                  },
                ],
              ],
            },
            children: [
              {
                title: 'Child Report',
                rows: [
                  [
                    {
                      fieldName: 'field2',
                      text: 'Child one - parent 1',
                      format: 'string',
                      classes: '',
                    },
                    {
                      fieldName: 'field3',
                      text: 'Other value',
                      format: 'string',
                      classes: '',
                    },
                    {
                      fieldName: 'field4',
                      text: 'Child Field 4 data',
                      format: 'string',
                      classes: '',
                    },
                    {
                      fieldName: 'field5',
                      text: 'Child Field 5 data',
                      format: 'string',
                      classes: '',
                    },
                    {
                      fieldName: 'field6',
                      text: 'Child Field 6 data',
                      format: 'string',
                      classes: '',
                    },
                    {
                      fieldName: 'field7',
                      text: 'Child Field 7 data',
                      format: 'string',
                      classes: '',
                    },
                    {
                      fieldName: 'field8',
                      text: 'Child Field 8 data',
                      format: 'string',
                      classes: '',
                    },
                  ],
                  [
                    {
                      fieldName: 'field2',
                      text: 'Child two - parent 1',
                      format: 'string',
                      classes: '',
                    },
                    {
                      fieldName: 'field3',
                      text: 'Other value',
                      format: 'string',
                      classes: '',
                    },
                    {
                      fieldName: 'field4',
                      text: 'Child Field 4 data',
                      format: 'string',
                      classes: '',
                    },
                    {
                      fieldName: 'field5',
                      text: 'Child Field 5 data',
                      format: 'string',
                      classes: '',
                    },
                    {
                      fieldName: 'field6',
                      text: 'Child Field 6 data',
                      format: 'string',
                      classes: '',
                    },
                    {
                      fieldName: 'field7',
                      text: 'Child Field 7 data',
                      format: 'string',
                      classes: '',
                    },
                    {
                      fieldName: 'field8',
                      text: 'Child Field 8 data',
                      format: 'string',
                      classes: '',
                    },
                  ],
                  [
                    {
                      fieldName: 'field2',
                      text: 'Child three - parent 1',
                      format: 'string',
                      classes: '',
                    },
                    {
                      fieldName: 'field3',
                      text: 'Other value',
                      format: 'string',
                      classes: '',
                    },
                    {
                      fieldName: 'field4',
                      text: 'Child Field 4 data',
                      format: 'string',
                      classes: '',
                    },
                    {
                      fieldName: 'field5',
                      text: 'Child Field 5 data',
                      format: 'string',
                      classes: '',
                    },
                    {
                      fieldName: 'field6',
                      text: 'Child Field 6 data',
                      format: 'string',
                      classes: '',
                    },
                    {
                      fieldName: 'field7',
                      text: 'Child Field 7 data',
                      format: 'string',
                      classes: '',
                    },
                    {
                      fieldName: 'field8',
                      text: 'Child Field 8 data',
                      format: 'string',
                      classes: '',
                    },
                  ],
                ],
                head: [
                  {
                    text: 'Field2',
                  },
                  {
                    text: 'Field3',
                  },
                  {
                    text: 'Field4',
                  },
                  {
                    text: 'Field5',
                  },
                  {
                    text: 'Field6',
                  },
                  {
                    text: 'Field7',
                  },
                  {
                    text: 'Field8',
                  },
                ],
              },
              {
                title: 'Child Report 2',
                rows: [
                  [
                    {
                      fieldName: 'field2',
                      text: 'Child one - parent 1',
                      format: 'string',
                      classes: '',
                    },
                    {
                      fieldName: 'field3',
                      text: 'Other value',
                      format: 'string',
                      classes: '',
                    },
                  ],
                  [
                    {
                      fieldName: 'field2',
                      text: 'Child two - parent 1',
                      format: 'string',
                      classes: '',
                    },
                    {
                      fieldName: 'field3',
                      text: 'Other value',
                      format: 'string',
                      classes: '',
                    },
                  ],
                  [
                    {
                      fieldName: 'field2',
                      text: 'Child three - parent 1',
                      format: 'string',
                      classes: '',
                    },
                    {
                      fieldName: 'field3',
                      text: 'Other value',
                      format: 'string',
                      classes: '',
                    },
                  ],
                ],
                head: [
                  {
                    text: 'Field2',
                  },
                  {
                    text: 'Field3',
                  },
                ],
              },
            ],
          },
          {
            parent: {
              head: [
                {
                  text: 'First',
                },
                {
                  text: 'Second',
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
                {
                  text: 'Field 5',
                },
                {
                  text: 'Field 6',
                },
                {
                  text: 'Field 7',
                },
              ],
              rows: [
                [
                  {
                    fieldName: 'section1',
                    text: 'two',
                    format: 'string',
                    classes: '',
                  },
                  {
                    fieldName: 'field1',
                    text: 'Parent row 2',
                    format: 'string',
                    classes: '',
                  },
                  {
                    fieldName: 'field2',
                    text: 'Field 2 data',
                    format: 'string',
                    classes: '',
                  },
                  {
                    fieldName: 'field3',
                    text: 'Field 3 data',
                    format: 'string',
                    classes: '',
                  },
                  {
                    fieldName: 'field4',
                    text: 'Field 4 data',
                    format: 'string',
                    classes: '',
                  },
                  {
                    fieldName: 'field5',
                    text: 'Field 5 data',
                    format: 'string',
                    classes: '',
                  },
                  {
                    fieldName: 'field6',
                    text: 'Field 6 data',
                    format: 'string',
                    classes: '',
                  },
                  {
                    fieldName: 'field7',
                    text: 'Field 7 data',
                    format: 'string',
                    classes: '',
                  },
                ],
              ],
            },
            children: [
              {
                title: 'Child Report',
                rows: [
                  [
                    {
                      fieldName: 'field2',
                      text: 'Child one - parent 2',
                      format: 'string',
                      classes: '',
                    },
                    {
                      fieldName: 'field3',
                      text: 'Other value',
                      format: 'string',
                      classes: '',
                    },
                    {
                      fieldName: 'field4',
                      text: 'Child Field 4 data',
                      format: 'string',
                      classes: '',
                    },
                    {
                      fieldName: 'field5',
                      text: 'Child Field 5 data',
                      format: 'string',
                      classes: '',
                    },
                    {
                      fieldName: 'field6',
                      text: 'Child Field 6 data',
                      format: 'string',
                      classes: '',
                    },
                    {
                      fieldName: 'field7',
                      text: 'Child Field 7 data',
                      format: 'string',
                      classes: '',
                    },
                    {
                      fieldName: 'field8',
                      text: 'Child Field 8 data',
                      format: 'string',
                      classes: '',
                    },
                  ],
                  [
                    {
                      fieldName: 'field2',
                      text: 'Child two - parent 2',
                      format: 'string',
                      classes: '',
                    },
                    {
                      fieldName: 'field3',
                      text: 'Other value',
                      format: 'string',
                      classes: '',
                    },
                    {
                      fieldName: 'field4',
                      text: 'Child Field 4 data',
                      format: 'string',
                      classes: '',
                    },
                    {
                      fieldName: 'field5',
                      text: 'Child Field 5 data',
                      format: 'string',
                      classes: '',
                    },
                    {
                      fieldName: 'field6',
                      text: 'Child Field 6 data',
                      format: 'string',
                      classes: '',
                    },
                    {
                      fieldName: 'field7',
                      text: 'Child Field 7 data',
                      format: 'string',
                      classes: '',
                    },
                    {
                      fieldName: 'field8',
                      text: 'Child Field 8 data',
                      format: 'string',
                      classes: '',
                    },
                  ],
                  [
                    {
                      fieldName: 'field2',
                      text: 'Child three - parent 2',
                      format: 'string',
                      classes: '',
                    },
                    {
                      fieldName: 'field3',
                      text: 'Other value',
                      format: 'string',
                      classes: '',
                    },
                    {
                      fieldName: 'field4',
                      text: 'Child Field 4 data',
                      format: 'string',
                      classes: '',
                    },
                    {
                      fieldName: 'field5',
                      text: 'Child Field 5 data',
                      format: 'string',
                      classes: '',
                    },
                    {
                      fieldName: 'field6',
                      text: 'Child Field 6 data',
                      format: 'string',
                      classes: '',
                    },
                    {
                      fieldName: 'field7',
                      text: 'Child Field 7 data',
                      format: 'string',
                      classes: '',
                    },
                    {
                      fieldName: 'field8',
                      text: 'Child Field 8 data',
                      format: 'string',
                      classes: '',
                    },
                  ],
                ],
                head: [
                  {
                    text: 'Field2',
                  },
                  {
                    text: 'Field3',
                  },
                  {
                    text: 'Field4',
                  },
                  {
                    text: 'Field5',
                  },
                  {
                    text: 'Field6',
                  },
                  {
                    text: 'Field7',
                  },
                  {
                    text: 'Field8',
                  },
                ],
              },
              {
                title: 'Child Report 2',
                rows: [
                  [
                    {
                      fieldName: 'field2',
                      text: 'Child one - parent 2',
                      format: 'string',
                      classes: '',
                    },
                    {
                      fieldName: 'field3',
                      text: 'Other value',
                      format: 'string',
                      classes: '',
                    },
                  ],
                  [
                    {
                      fieldName: 'field2',
                      text: 'Child two - parent 2',
                      format: 'string',
                      classes: '',
                    },
                    {
                      fieldName: 'field3',
                      text: 'Other value',
                      format: 'string',
                      classes: '',
                    },
                  ],
                  [
                    {
                      fieldName: 'field2',
                      text: 'Child three - parent 2',
                      format: 'string',
                      classes: '',
                    },
                    {
                      fieldName: 'field3',
                      text: 'Other value',
                      format: 'string',
                      classes: '',
                    },
                  ],
                ],
                head: [
                  {
                    text: 'Field2',
                  },
                  {
                    text: 'Field3',
                  },
                ],
              },
            ],
          },
          {
            parent: {
              head: [
                {
                  text: 'First',
                },
                {
                  text: 'Second',
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
                {
                  text: 'Field 5',
                },
                {
                  text: 'Field 6',
                },
                {
                  text: 'Field 7',
                },
              ],
              rows: [
                [
                  {
                    fieldName: 'section1',
                    text: 'three',
                    format: 'string',
                    classes: '',
                  },
                  {
                    fieldName: 'field1',
                    text: 'Parent row 3',
                    format: 'string',
                    classes: '',
                  },
                  {
                    fieldName: 'field2',
                    text: 'Field 2 data',
                    format: 'string',
                    classes: '',
                  },
                  {
                    fieldName: 'field3',
                    text: 'Field 3 data',
                    format: 'string',
                    classes: '',
                  },
                  {
                    fieldName: 'field4',
                    text: 'Field 4 data',
                    format: 'string',
                    classes: '',
                  },
                  {
                    fieldName: 'field5',
                    text: 'Field 5 data',
                    format: 'string',
                    classes: '',
                  },
                  {
                    fieldName: 'field6',
                    text: 'Field 6 data',
                    format: 'string',
                    classes: '',
                  },
                  {
                    fieldName: 'field7',
                    text: 'Field 7 data',
                    format: 'string',
                    classes: '',
                  },
                ],
              ],
            },
            children: [
              {
                title: 'Child Report 2',
                rows: [
                  [
                    {
                      fieldName: 'field2',
                      text: 'Child one - parent 3',
                      format: 'string',
                      classes: '',
                    },
                    {
                      fieldName: 'field3',
                      text: 'Other value',
                      format: 'string',
                      classes: '',
                    },
                  ],
                  [
                    {
                      fieldName: 'field2',
                      text: 'Child two - parent 3',
                      format: 'string',
                      classes: '',
                    },
                    {
                      fieldName: 'field3',
                      text: 'Other value',
                      format: 'string',
                      classes: '',
                    },
                  ],
                  [
                    {
                      fieldName: 'field2',
                      text: 'Child three - parent 3',
                      format: 'string',
                      classes: '',
                    },
                    {
                      fieldName: 'field3',
                      text: 'Other value',
                      format: 'string',
                      classes: '',
                    },
                  ],
                ],
                head: [
                  {
                    text: 'Field2',
                  },
                  {
                    text: 'Field3',
                  },
                ],
              },
            ],
          },
          {
            parent: {
              head: [
                {
                  text: 'First',
                },
                {
                  text: 'Second',
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
                {
                  text: 'Field 5',
                },
                {
                  text: 'Field 6',
                },
                {
                  text: 'Field 7',
                },
              ],
              rows: [
                [
                  {
                    fieldName: 'section1',
                    text: 'four',
                    format: 'string',
                    classes: '',
                  },
                  {
                    fieldName: 'field1',
                    text: 'Parent row 4',
                    format: 'string',
                    classes: '',
                  },
                  {
                    fieldName: 'field2',
                    text: 'Field 2 data',
                    format: 'string',
                    classes: '',
                  },
                  {
                    fieldName: 'field3',
                    text: 'Field 3 data',
                    format: 'string',
                    classes: '',
                  },
                  {
                    fieldName: 'field4',
                    text: 'Field 4 data',
                    format: 'string',
                    classes: '',
                  },
                  {
                    fieldName: 'field5',
                    text: 'Field 5 data',
                    format: 'string',
                    classes: '',
                  },
                  {
                    fieldName: 'field6',
                    text: 'Field 6 data',
                    format: 'string',
                    classes: '',
                  },
                  {
                    fieldName: 'field7',
                    text: 'Field 7 data',
                    format: 'string',
                    classes: '',
                  },
                ],
              ],
            },
            children: [
              {
                title: 'Child Report',
                rows: [
                  [
                    {
                      fieldName: 'field2',
                      text: 'Child one - parent 4',
                      format: 'string',
                      classes: '',
                    },
                    {
                      fieldName: 'field3',
                      text: 'Other value',
                      format: 'string',
                      classes: '',
                    },
                    {
                      fieldName: 'field4',
                      text: 'Child Field 4 data',
                      format: 'string',
                      classes: '',
                    },
                    {
                      fieldName: 'field5',
                      text: 'Child Field 5 data',
                      format: 'string',
                      classes: '',
                    },
                    {
                      fieldName: 'field6',
                      text: 'Child Field 6 data',
                      format: 'string',
                      classes: '',
                    },
                    {
                      fieldName: 'field7',
                      text: 'Child Field 7 data',
                      format: 'string',
                      classes: '',
                    },
                    {
                      fieldName: 'field8',
                      text: 'Child Field 8 data',
                      format: 'string',
                      classes: '',
                    },
                  ],
                  [
                    {
                      fieldName: 'field2',
                      text: 'Child two - parent 4',
                      format: 'string',
                      classes: '',
                    },
                    {
                      fieldName: 'field3',
                      text: 'Other value',
                      format: 'string',
                      classes: '',
                    },
                    {
                      fieldName: 'field4',
                      text: 'Child Field 4 data',
                      format: 'string',
                      classes: '',
                    },
                    {
                      fieldName: 'field5',
                      text: 'Child Field 5 data',
                      format: 'string',
                      classes: '',
                    },
                    {
                      fieldName: 'field6',
                      text: 'Child Field 6 data',
                      format: 'string',
                      classes: '',
                    },
                    {
                      fieldName: 'field7',
                      text: 'Child Field 7 data',
                      format: 'string',
                      classes: '',
                    },
                    {
                      fieldName: 'field8',
                      text: 'Child Field 8 data',
                      format: 'string',
                      classes: '',
                    },
                  ],
                  [
                    {
                      fieldName: 'field2',
                      text: 'Child three - parent 4',
                      format: 'string',
                      classes: '',
                    },
                    {
                      fieldName: 'field3',
                      text: 'Other value',
                      format: 'string',
                      classes: '',
                    },
                    {
                      fieldName: 'field4',
                      text: 'Child Field 4 data',
                      format: 'string',
                      classes: '',
                    },
                    {
                      fieldName: 'field5',
                      text: 'Child Field 5 data',
                      format: 'string',
                      classes: '',
                    },
                    {
                      fieldName: 'field6',
                      text: 'Child Field 6 data',
                      format: 'string',
                      classes: '',
                    },
                    {
                      fieldName: 'field7',
                      text: 'Child Field 7 data',
                      format: 'string',
                      classes: '',
                    },
                    {
                      fieldName: 'field8',
                      text: 'Child Field 8 data',
                      format: 'string',
                      classes: '',
                    },
                  ],
                ],
                head: [
                  {
                    text: 'Field2',
                  },
                  {
                    text: 'Field3',
                  },
                  {
                    text: 'Field4',
                  },
                  {
                    text: 'Field5',
                  },
                  {
                    text: 'Field6',
                  },
                  {
                    text: 'Field7',
                  },
                  {
                    text: 'Field8',
                  },
                ],
              },
            ],
          },
          {
            parent: {
              head: [
                {
                  text: 'First',
                },
                {
                  text: 'Second',
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
                {
                  text: 'Field 5',
                },
                {
                  text: 'Field 6',
                },
                {
                  text: 'Field 7',
                },
              ],
              rows: [
                [
                  {
                    fieldName: 'section1',
                    text: 'five',
                    format: 'string',
                    classes: '',
                  },
                  {
                    fieldName: 'field1',
                    text: 'Parent row 5',
                    format: 'string',
                    classes: '',
                  },
                  {
                    fieldName: 'field2',
                    text: 'Field 2 data',
                    format: 'string',
                    classes: '',
                  },
                  {
                    fieldName: 'field3',
                    text: 'Field 3 data',
                    format: 'string',
                    classes: '',
                  },
                  {
                    fieldName: 'field4',
                    text: 'Field 4 data',
                    format: 'string',
                    classes: '',
                  },
                  {
                    fieldName: 'field5',
                    text: 'Field 5 data',
                    format: 'string',
                    classes: '',
                  },
                  {
                    fieldName: 'field6',
                    text: 'Field 6 data',
                    format: 'string',
                    classes: '',
                  },
                  {
                    fieldName: 'field7',
                    text: 'Field 7 data',
                    format: 'string',
                    classes: '',
                  },
                ],
                [
                  {
                    fieldName: 'section1',
                    text: 'five',
                    format: 'string',
                    classes: '',
                  },
                  {
                    fieldName: 'field1',
                    text: 'Parent row 6',
                    format: 'string',
                    classes: '',
                  },
                  {
                    fieldName: 'field2',
                    text: 'Field 2 data',
                    format: 'string',
                    classes: '',
                  },
                  {
                    fieldName: 'field3',
                    text: 'Field 3 data',
                    format: 'string',
                    classes: '',
                  },
                  {
                    fieldName: 'field4',
                    text: 'Field 4 data',
                    format: 'string',
                    classes: '',
                  },
                  {
                    fieldName: 'field5',
                    text: 'Field 5 data',
                    format: 'string',
                    classes: '',
                  },
                  {
                    fieldName: 'field6',
                    text: 'Field 6 data',
                    format: 'string',
                    classes: '',
                  },
                  {
                    fieldName: 'field7',
                    text: 'Field 7 data',
                    format: 'string',
                    classes: '',
                  },
                ],
                [
                  {
                    fieldName: 'section1',
                    text: 'seven',
                    format: 'string',
                    classes: '',
                  },
                  {
                    fieldName: 'field1',
                    text: 'Parent row 7',
                    format: 'string',
                    classes: '',
                  },
                  {
                    fieldName: 'field2',
                    text: 'Field 2 data',
                    format: 'string',
                    classes: '',
                  },
                  {
                    fieldName: 'field3',
                    text: 'Field 3 data',
                    format: 'string',
                    classes: '',
                  },
                  {
                    fieldName: 'field4',
                    text: 'Field 4 data',
                    format: 'string',
                    classes: '',
                  },
                  {
                    fieldName: 'field5',
                    text: 'Field 5 data',
                    format: 'string',
                    classes: '',
                  },
                  {
                    fieldName: 'field6',
                    text: 'Field 6 data',
                    format: 'string',
                    classes: '',
                  },
                  {
                    fieldName: 'field7',
                    text: 'Field 7 data',
                    format: 'string',
                    classes: '',
                  },
                ],
              ],
            },
            children: [
              {
                title: 'Child Report',
                rows: [
                  [
                    {
                      fieldName: 'field2',
                      text: 'Child one - parent 7',
                      format: 'string',
                      classes: '',
                    },
                    {
                      fieldName: 'field3',
                      text: 'Other value',
                      format: 'string',
                      classes: '',
                    },
                    {
                      fieldName: 'field4',
                      text: 'Child Field 4 data',
                      format: 'string',
                      classes: '',
                    },
                    {
                      fieldName: 'field5',
                      text: 'Child Field 5 data',
                      format: 'string',
                      classes: '',
                    },
                    {
                      fieldName: 'field6',
                      text: 'Child Field 6 data',
                      format: 'string',
                      classes: '',
                    },
                    {
                      fieldName: 'field7',
                      text: 'Child Field 7 data',
                      format: 'string',
                      classes: '',
                    },
                    {
                      fieldName: 'field8',
                      text: 'Child Field 8 data',
                      format: 'string',
                      classes: '',
                    },
                  ],
                  [
                    {
                      fieldName: 'field2',
                      text: 'Child two - parent 7',
                      format: 'string',
                      classes: '',
                    },
                    {
                      fieldName: 'field3',
                      text: 'Other value',
                      format: 'string',
                      classes: '',
                    },
                    {
                      fieldName: 'field4',
                      text: 'Child Field 4 data',
                      format: 'string',
                      classes: '',
                    },
                    {
                      fieldName: 'field5',
                      text: 'Child Field 5 data',
                      format: 'string',
                      classes: '',
                    },
                    {
                      fieldName: 'field6',
                      text: 'Child Field 6 data',
                      format: 'string',
                      classes: '',
                    },
                    {
                      fieldName: 'field7',
                      text: 'Child Field 7 data',
                      format: 'string',
                      classes: '',
                    },
                    {
                      fieldName: 'field8',
                      text: 'Child Field 8 data',
                      format: 'string',
                      classes: '',
                    },
                  ],
                ],
                head: [
                  {
                    text: 'Field2',
                  },
                  {
                    text: 'Field3',
                  },
                  {
                    text: 'Field4',
                  },
                  {
                    text: 'Field5',
                  },
                  {
                    text: 'Field6',
                  },
                  {
                    text: 'Field7',
                  },
                  {
                    text: 'Field8',
                  },
                ],
              },
            ],
          },
        ],
        count: 7,
        summaries: [],
      },
    ],
  },
}

export default parentChildData
