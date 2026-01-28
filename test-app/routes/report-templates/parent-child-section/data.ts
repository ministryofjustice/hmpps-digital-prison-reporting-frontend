const parentChildSectionData = {
  columns: {
    name: 'columns',
    options: [
      {
        text: 'Field 1',
        value: 'field1',
        disabled: false,
      },
      {
        text: 'Child key',
        value: 'childKey',
        disabled: false,
      },
    ],
    text: 'Select report columns',
    value: ['field1', 'childKey'],
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
  tableId: 'tblId_1769454262897',
  reportId: 'report-template-examples',
  id: 'report-template-parent-child-section',
  actions: [
    {
      id: 'dpr-button-refresh',
      disabled: false,
      text: 'Refresh',
      ariaLabelText: 'Refresh report',
      href: 'http://localhost:3010/embedded/platform/dpr/request-report/report/report-template-examples/report-template-parent-child-section/filters',
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
      href: 'mailto:?subject=Report templates-Parent-child-section&body=http%3A%2F%2Flocalhost%3A3010%2Fembedded%2Fplatform%2Fdpr%2Frequest-report%2Freport%2Freport-template-examples%2Freport-template-parent-child-section%2Ffilters',
    },
    {
      id: 'dpr-button-copy',
      disabled: false,
      text: 'Copy report link',
      ariaLabelText: 'Copy report link',
      href: 'http://localhost:3010/embedded/platform/dpr/request-report/report/report-template-examples/report-template-parent-child-section/filters',
    },
    {
      id: 'dpr-button-downloadable',
      disabled: false,
      text: 'Enable download',
      ariaLabelText: 'Enable download',
      attributes: {
        enabled: true,
        name: 'Parent-child-section',
        reportName: 'Report templates',
        csrfToken: 'csrfToken',
        reportId: 'report-template-examples',
        id: 'report-template-parent-child-section',
        tableId: 'tblId_1769454262897',
        columns: ['field1', 'childKey'],
        loadType: 'async',
        nestedBaseUrl: '/embedded/platform',
        canDownload: false,
        currentUrl:
          '/embedded/platform/dpr/view-report/async/report/report-template-examples/report-template-parent-child-section/tblId_1769454262897/report',
      },
    },
  ],
  canDownload: false,
  bookmarked: false,
  reportName: 'Report templates',
  name: 'Parent-child-section',
  description: 'Template: "parent-child-section". </br> A report with parent and child datasets in sections',
  classification: 'OFFICIAL',
  printable: true,
  specification: {
    template: 'parent-child-section',
    sections: ['section1', 'section2'],
    fields: [
      {
        name: 'field1',
        display: 'Field 1',
        sortable: false,
        defaultsort: false,
        type: 'string',
        mandatory: false,
        visible: true,
      },
      {
        name: 'childKey',
        display: 'Child key',
        sortable: false,
        defaultsort: false,
        type: 'string',
        mandatory: false,
        visible: true,
      },
      {
        name: 'section1',
        display: 'Section 1',
        sortable: false,
        defaultsort: false,
        type: 'string',
        mandatory: false,
        visible: false,
      },
      {
        name: 'section2',
        display: 'Section 2',
        sortable: false,
        defaultsort: false,
        type: 'string',
        mandatory: false,
        visible: false,
      },
    ],
  },
  template: 'parent-child-section',
  fields: [
    {
      name: 'field1',
      display: 'Field 1',
      sortable: false,
      defaultsort: false,
      type: 'string',
      mandatory: false,
      visible: true,
    },
    {
      name: 'childKey',
      display: 'Child key',
      sortable: false,
      defaultsort: false,
      type: 'string',
      mandatory: false,
      visible: true,
    },
    {
      name: 'section1',
      display: 'Section 1',
      sortable: false,
      defaultsort: false,
      type: 'string',
      mandatory: false,
      visible: false,
    },
    {
      name: 'section2',
      display: 'Section 2',
      sortable: false,
      defaultsort: false,
      type: 'string',
      mandatory: false,
      visible: false,
    },
  ],
  executionId: 'exId_1769454262897',
  requestedTimestamp: '26/01/2026, 19:04:24',
  querySummary: [],
  queryData: {},
  requestUrl: {
    fullUrl:
      'http://localhost:3010/embedded/platform/dpr/request-report/report/report-template-examples/report-template-parent-child-section/filters',
    pathname:
      '/embedded/platform/dpr/request-report/report/report-template-examples/report-template-parent-child-section/filters',
    search: '',
  },
  reportUrl:
    '/embedded/platform/dpr/view-report/async/report/report-template-examples/report-template-parent-child-section/tblId_1769454262897/report',
  pathname:
    '/embedded/platform/dpr/view-report/async/report/report-template-examples/report-template-parent-child-section/tblId_1769454262897/report',
  dataTable: {
    rowCount: 8,
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
        title: 'Section 1: One, Section 2: A',
        count: 3,
        summaries: [],
        data: [
          {
            parent: {
              head: [
                {
                  text: 'Field 1',
                },
                {
                  text: 'Child key',
                },
              ],
              rows: [
                [
                  {
                    fieldName: 'field1',
                    text: 'Parent 1',
                    format: 'string',
                    classes: '',
                  },
                  {
                    fieldName: 'childKey',
                    text: 'one',
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
                      fieldName: 'field1',
                      text: 'Child one - Parent 1',
                      format: 'string',
                      classes: '',
                    },
                    {
                      fieldName: 'field2',
                      text: 'Other value',
                      format: 'string',
                      classes: '',
                    },
                  ],
                  [
                    {
                      fieldName: 'field1',
                      text: 'Child two - Parent 1',
                      format: 'string',
                      classes: '',
                    },
                    {
                      fieldName: 'field2',
                      text: 'Other value',
                      format: 'string',
                      classes: '',
                    },
                  ],
                ],
                head: [
                  {
                    text: 'Child Field 1',
                  },
                  {
                    text: 'Child Field 2',
                  },
                ],
              },
            ],
          },
          {
            parent: {
              head: [
                {
                  text: 'Field 1',
                },
                {
                  text: 'Child key',
                },
              ],
              rows: [
                [
                  {
                    fieldName: 'field1',
                    text: 'Parent 2',
                    format: 'string',
                    classes: '',
                  },
                  {
                    fieldName: 'childKey',
                    text: 'two',
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
                      fieldName: 'field1',
                      text: 'Child one - Parent 2',
                      format: 'string',
                      classes: '',
                    },
                    {
                      fieldName: 'field2',
                      text: 'Other value',
                      format: 'string',
                      classes: '',
                    },
                  ],
                  [
                    {
                      fieldName: 'field1',
                      text: 'Child two - Parent 2',
                      format: 'string',
                      classes: '',
                    },
                    {
                      fieldName: 'field2',
                      text: 'Other value',
                      format: 'string',
                      classes: '',
                    },
                  ],
                ],
                head: [
                  {
                    text: 'Child Field 1',
                  },
                  {
                    text: 'Child Field 2',
                  },
                ],
              },
            ],
          },
          {
            parent: {
              head: [
                {
                  text: 'Field 1',
                },
                {
                  text: 'Child key',
                },
              ],
              rows: [
                [
                  {
                    fieldName: 'field1',
                    text: 'Parent 3',
                    format: 'string',
                    classes: '',
                  },
                  {
                    fieldName: 'childKey',
                    text: 'three',
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
                      fieldName: 'field1',
                      text: 'Child one - Parent 3',
                      format: 'string',
                      classes: '',
                    },
                    {
                      fieldName: 'field2',
                      text: 'Other value',
                      format: 'string',
                      classes: '',
                    },
                  ],
                  [
                    {
                      fieldName: 'field1',
                      text: 'Child two - Parent 3',
                      format: 'string',
                      classes: '',
                    },
                    {
                      fieldName: 'field2',
                      text: 'Other value',
                      format: 'string',
                      classes: '',
                    },
                  ],
                ],
                head: [
                  {
                    text: 'Child Field 1',
                  },
                  {
                    text: 'Child Field 2',
                  },
                ],
              },
            ],
          },
        ],
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
        title: 'Section 1: One, Section 2: B',
        count: 2,
        summaries: [],
        data: [
          {
            parent: {
              head: [
                {
                  text: 'Field 1',
                },
                {
                  text: 'Child key',
                },
              ],
              rows: [
                [
                  {
                    fieldName: 'field1',
                    text: 'Parent 4',
                    format: 'string',
                    classes: '',
                  },
                  {
                    fieldName: 'childKey',
                    text: 'four',
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
                      fieldName: 'field1',
                      text: 'Child one - Parent 4',
                      format: 'string',
                      classes: '',
                    },
                    {
                      fieldName: 'field2',
                      text: 'Other value',
                      format: 'string',
                      classes: '',
                    },
                  ],
                  [
                    {
                      fieldName: 'field1',
                      text: 'Child two - Parent 4',
                      format: 'string',
                      classes: '',
                    },
                    {
                      fieldName: 'field2',
                      text: 'Other value',
                      format: 'string',
                      classes: '',
                    },
                  ],
                ],
                head: [
                  {
                    text: 'Child Field 1',
                  },
                  {
                    text: 'Child Field 2',
                  },
                ],
              },
            ],
          },
          {
            parent: {
              head: [
                {
                  text: 'Field 1',
                },
                {
                  text: 'Child key',
                },
              ],
              rows: [
                [
                  {
                    fieldName: 'field1',
                    text: 'Parent 5',
                    format: 'string',
                    classes: '',
                  },
                  {
                    fieldName: 'childKey',
                    text: 'five',
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
                      fieldName: 'field1',
                      text: 'Child one - Parent 5',
                      format: 'string',
                      classes: '',
                    },
                    {
                      fieldName: 'field2',
                      text: 'Other value',
                      format: 'string',
                      classes: '',
                    },
                  ],
                  [
                    {
                      fieldName: 'field1',
                      text: 'Child two - Parent 5',
                      format: 'string',
                      classes: '',
                    },
                    {
                      fieldName: 'field2',
                      text: 'Other value',
                      format: 'string',
                      classes: '',
                    },
                  ],
                ],
                head: [
                  {
                    text: 'Child Field 1',
                  },
                  {
                    text: 'Child Field 2',
                  },
                ],
              },
            ],
          },
        ],
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
        title: 'Section 1: Two, Section 2: A',
        count: 1,
        summaries: [],
        data: [
          {
            parent: {
              head: [
                {
                  text: 'Field 1',
                },
                {
                  text: 'Child key',
                },
              ],
              rows: [
                [
                  {
                    fieldName: 'field1',
                    text: 'Parent 6',
                    format: 'string',
                    classes: '',
                  },
                  {
                    fieldName: 'childKey',
                    text: 'six',
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
                      fieldName: 'field1',
                      text: 'Child one - Parent 6',
                      format: 'string',
                      classes: '',
                    },
                    {
                      fieldName: 'field2',
                      text: 'Other value',
                      format: 'string',
                      classes: '',
                    },
                  ],
                  [
                    {
                      fieldName: 'field1',
                      text: 'Child two - Parent 6',
                      format: 'string',
                      classes: '',
                    },
                    {
                      fieldName: 'field2',
                      text: 'Other value',
                      format: 'string',
                      classes: '',
                    },
                  ],
                ],
                head: [
                  {
                    text: 'Child Field 1',
                  },
                  {
                    text: 'Child Field 2',
                  },
                ],
              },
            ],
          },
        ],
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
        title: 'Section 1: Two, Section 2: B',
        count: 2,
        summaries: [],
        data: [
          {
            parent: {
              head: [
                {
                  text: 'Field 1',
                },
                {
                  text: 'Child key',
                },
              ],
              rows: [
                [
                  {
                    fieldName: 'field1',
                    text: 'Parent 7',
                    format: 'string',
                    classes: '',
                  },
                  {
                    fieldName: 'childKey',
                    text: 'seven',
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
                      fieldName: 'field1',
                      text: 'Child one - Parent 7',
                      format: 'string',
                      classes: '',
                    },
                    {
                      fieldName: 'field2',
                      text: 'Other value',
                      format: 'string',
                      classes: '',
                    },
                  ],
                  [
                    {
                      fieldName: 'field1',
                      text: 'Child two - Parent 7',
                      format: 'string',
                      classes: '',
                    },
                    {
                      fieldName: 'field2',
                      text: 'Other value',
                      format: 'string',
                      classes: '',
                    },
                  ],
                ],
                head: [
                  {
                    text: 'Child Field 1',
                  },
                  {
                    text: 'Child Field 2',
                  },
                ],
              },
            ],
          },
          {
            parent: {
              head: [
                {
                  text: 'Field 1',
                },
                {
                  text: 'Child key',
                },
              ],
              rows: [
                [
                  {
                    fieldName: 'field1',
                    text: 'Parent 8',
                    format: 'string',
                    classes: '',
                  },
                  {
                    fieldName: 'childKey',
                    text: 'eight',
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
                      fieldName: 'field1',
                      text: 'Child one - Parent 8',
                      format: 'string',
                      classes: '',
                    },
                    {
                      fieldName: 'field2',
                      text: 'Other value',
                      format: 'string',
                      classes: '',
                    },
                  ],
                  [
                    {
                      fieldName: 'field1',
                      text: 'Child two - Parent 8',
                      format: 'string',
                      classes: '',
                    },
                    {
                      fieldName: 'field2',
                      text: 'Other value',
                      format: 'string',
                      classes: '',
                    },
                  ],
                ],
                head: [
                  {
                    text: 'Child Field 1',
                  },
                  {
                    text: 'Child Field 2',
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
}

export default parentChildSectionData
