// @ts-nocheck
const mockRenderDataFromDefinition = {
  renderData: {
    dataTable: {
      rowCount: 1,
      summaries: {},
      sections: [
        {
          key: '',
          keyObj: [],
          data: {
            head: [
              {
                html: '<a data-column="field1" class="data-table-header-button data-table-header-button-sort-ascending" href="?selectedPage=1&pageSize=20&sortColumn=field1&sortedAsc=false&columns=field1&columns=field2&columns=field3&columns=field6&dataProductDefinitionsPath=dataProductDefinitionsPath&filters.field1=value1.1&filters.field3.start=2003-02-01&filters.field3.end=2006-05-04&filters.field7=value8.2&filters.field7=value8.3">Field 1</a>',
              },
              {
                html: '<a data-column="field2" class="data-table-header-button data-table-header-button-sort-none" href="?selectedPage=1&pageSize=20&sortColumn=field2&sortedAsc=true&columns=field1&columns=field2&columns=field3&columns=field6&dataProductDefinitionsPath=dataProductDefinitionsPath&filters.field1=value1.1&filters.field3.start=2003-02-01&filters.field3.end=2006-05-04&filters.field7=value8.2&filters.field7=value8.3">Field 2</a>',
              },
              {
                text: 'Field 3',
              },
              {
                text: 'Field 6',
              },
            ],
            rows: [
              [
                {
                  fieldName: 'field1',
                  text: '',
                  format: 'string',
                  classes: '',
                },
                {
                  fieldName: 'field2',
                  text: '',
                  format: 'string',
                  classes: '',
                },
                {
                  fieldName: 'field3',
                  text: '',
                  format: 'string',
                  classes: '',
                },
                {
                  fieldName: 'field6',
                  html: '',
                  format: 'string',
                  classes: '',
                },
              ],
            ],
            rowCount: 1,
            colCount: 4,
          },
          count: 1,
          summaries: {},
        },
      ],
    },
    totals: '0-0 of 0',
    filterData: {
      filters: [
        {
          text: 'Field 1',
          name: 'field1',
          type: 'Radio',
          value: 'value1.1',
          mandatory: false,
          options: [
            {
              value: 'no-filter',
              text: 'None',
              disabled: false,
            },
            {
              value: 'value1.1',
              text: 'Value 1.1',
            },
            {
              value: 'value1.2',
              text: 'Value 1.2',
            },
            {
              value: 'value1.3',
              text: 'Value 1.3',
            },
          ],
        },
        {
          text: 'Field 2',
          name: 'field2',
          type: 'Select',
          value: null,
          mandatory: false,
          options: [
            {
              value: '',
              text: 'Select your option',
              disabled: true,
              selected: true,
            },
            {
              value: 'no-filter',
              text: 'None',
              disabled: false,
            },
            {
              value: 'value2.1',
              text: 'Value 2.1',
            },
            {
              value: 'value2.2',
              text: 'Value 2.2',
            },
            {
              value: 'value2.3',
              text: 'Value 2.3',
            },
          ],
        },
        {
          text: 'Field 3',
          name: 'field3',
          type: 'daterange',
          value: {
            start: '2003-02-01',
            end: '2006-05-04',
          },
          mandatory: false,
          min: '2003-02-01',
          max: '2007-05-04',
          relativeOptions: [],
        },
        {
          text: 'Field 4',
          name: 'field4',
          type: 'autocomplete',
          value: null,
          mandatory: false,
          minimumLength: 3,
          options: [
            {
              value: 'Fezzick',
              text: 'Fezzick',
            },
            {
              value: 'inigo-montoya',
              text: 'Inigo Montoya',
            },
            {
              value: 'Prince Humperdink',
              text: 'Prince Humperdink',
            },
            {
              value: 'PrBu',
              text: 'Princess Buttercup',
            },
            {
              value: 'Westley',
              text: 'Westley',
            },
          ],
        },
        {
          text: 'Field 5',
          name: 'field5',
          type: 'autocomplete',
          value: null,
          mandatory: false,
          minimumLength: 3,
          options: [],
        },
        {
          text: 'Field 6',
          name: 'field6',
          type: 'text',
          value: null,
          mandatory: false,
        },
        {
          text: 'Field 7',
          name: 'field7',
          type: 'multiselect',
          value: 'value8.2,value8.3',
          mandatory: false,
          options: [
            {
              value: 'value8.1',
              text: 'Value 8.1',
            },
            {
              value: 'value8.2',
              text: 'Value 8.2',
            },
            {
              value: 'value8.3',
              text: 'Value 8.3',
            },
            {
              value: 'value8.4',
              text: 'Value 8.4',
            },
          ],
          values: ['value8.2', 'value8.3'],
        },
      ],
      selectedFilters: [
        {
          text: 'Field 1',
          displayValue: 'Value 1.1',
          key: '["filters.field1"]',
          value: ['"value1.1"'],
          disabled: false,
          classes: 'interactive-remove-filter-button',
          attributes: {
            'aria-label': 'Selected Filter: Field 1: Value 1.1. Click to clear this filter',
          },
        },
        {
          text: 'Field 3',
          displayValue: '01/02/2003 - 04/05/2006',
          key: '["filters.field3.start","filters.field3.end"]',
          value: ['"2003-02-01"', '"2006-05-04"'],
          disabled: false,
          constraints: [
            {
              key: 'filters.field3.start',
              value: '2003-02-01',
            },
            {
              key: 'filters.field3.end',
              value: '2007-05-04',
            },
          ],
          classes: 'interactive-remove-filter-button',
          attributes: {
            'aria-label': 'Selected Filter: Field 3: 01/02/2003 - 04/05/2006. Click to clear this filter',
          },
        },
        {
          text: 'Field 7',
          displayValue: 'Value 8.2, Value 8.3',
          key: '["filters.field7"]',
          value: ['"value8.2"', '"value8.3"'],
          disabled: false,
          classes: 'interactive-remove-filter-button',
          attributes: {
            'aria-label': 'Selected Filter: Field 7: Value 8.2, Value 8.3. Click to clear this filter',
          },
        },
      ],
      canSaveDefaults: false,
    },
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
          disabled: true,
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
      value: ['field2', 'field1', 'field3', 'field6'],
    },
    pagination: {
      pages: [],
      pageSize: 20,
      currentPage: 1,
      totalRows: '',
      sizes: [
        {
          value: 10,
          text: '10',
        },
        {
          value: 20,
          text: '20',
        },
        {
          value: 100,
          text: '100',
        },
        {
          value: 200,
          text: '200',
        },
        {
          value: '',
          text: 'All',
        },
      ],
    },
    reportUrl: 'originalUrl',
    reportSearch: 'search',
    encodedSearch: 'search',
    fullUrl: 'protocol://hostoriginalUrl',
    template: 'list',
    reportName: 'Test Report Name',
    name: 'Test Variant',
    description: 'Test Variant Description',
    count: '',
    classification: 'OFFICIAL',
    printable: true,
    actions: [
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
        href: 'mailto:?subject=Test Report Name-Test Variant&body=protocol%3A%2F%2FhostoriginalUrl',
      },
      {
        id: 'dpr-button-copy',
        disabled: false,
        text: 'Copy report link',
        ariaLabelText: 'Copy report link',
        href: 'protocol://hostoriginalUrl',
      },
    ],
    warnings: {},
    type: 'report',
  },
  layoutTemplate: '',
}

const mockRenderDataFromData = {
  renderData: {
    dataTable: {
      rowCount: 0,
      summaries: {},
      sections: [
        {
          key: '',
          keyObj: [],
          data: {
            head: [
              {
                html: '<a data-column="field1" class="data-table-header-button data-table-header-button-sort-ascending" href="?selectedPage=1&pageSize=20&sortColumn=field1&sortedAsc=false&columns=field1&columns=field2&columns=field3&columns=field6&dataProductDefinitionsPath=dataProductDefinitionsPath&filters.field1=value1.1&filters.field3.start=2003-02-01&filters.field3.end=2006-05-04&filters.field7=value8.2&filters.field7=value8.3">Field 1</a>',
              },
              {
                html: '<a data-column="field2" class="data-table-header-button data-table-header-button-sort-none" href="?selectedPage=1&pageSize=20&sortColumn=field2&sortedAsc=true&columns=field1&columns=field2&columns=field3&columns=field6&dataProductDefinitionsPath=dataProductDefinitionsPath&filters.field1=value1.1&filters.field3.start=2003-02-01&filters.field3.end=2006-05-04&filters.field7=value8.2&filters.field7=value8.3">Field 2</a>',
              },
              {
                text: 'Field 3',
              },
              {
                text: 'Field 6',
              },
            ],
            rows: [],
            rowCount: 0,
            colCount: 4,
          },
          count: 0,
          summaries: {},
        },
      ],
    },
    totals: '0 total results',
    filterData: {
      filters: [
        {
          text: 'Field 1',
          name: 'field1',
          type: 'Radio',
          value: 'value1.1',
          mandatory: false,
          options: [
            {
              value: 'no-filter',
              text: 'None',
              disabled: false,
            },
            {
              value: 'value1.1',
              text: 'Value 1.1',
            },
            {
              value: 'value1.2',
              text: 'Value 1.2',
            },
            {
              value: 'value1.3',
              text: 'Value 1.3',
            },
          ],
        },
        {
          text: 'Field 2',
          name: 'field2',
          type: 'Select',
          value: null,
          mandatory: false,
          options: [
            {
              value: '',
              text: 'Select your option',
              disabled: true,
              selected: true,
            },
            {
              value: 'no-filter',
              text: 'None',
              disabled: false,
            },
            {
              value: 'value2.1',
              text: 'Value 2.1',
            },
            {
              value: 'value2.2',
              text: 'Value 2.2',
            },
            {
              value: 'value2.3',
              text: 'Value 2.3',
            },
          ],
        },
        {
          text: 'Field 3',
          name: 'field3',
          type: 'daterange',
          value: {
            start: '2003-02-01',
            end: '2006-05-04',
          },
          mandatory: false,
          min: '2003-02-01',
          max: '2007-05-04',
          relativeOptions: [],
        },
        {
          text: 'Field 4',
          name: 'field4',
          type: 'autocomplete',
          value: null,
          mandatory: false,
          minimumLength: 3,
          options: [
            {
              value: 'Fezzick',
              text: 'Fezzick',
            },
            {
              value: 'inigo-montoya',
              text: 'Inigo Montoya',
            },
            {
              value: 'Prince Humperdink',
              text: 'Prince Humperdink',
            },
            {
              value: 'PrBu',
              text: 'Princess Buttercup',
            },
            {
              value: 'Westley',
              text: 'Westley',
            },
          ],
        },
        {
          text: 'Field 5',
          name: 'field5',
          type: 'autocomplete',
          value: null,
          mandatory: false,
          minimumLength: 3,
          options: [],
        },
        {
          text: 'Field 6',
          name: 'field6',
          type: 'text',
          value: null,
          mandatory: false,
        },
        {
          text: 'Field 7',
          name: 'field7',
          type: 'multiselect',
          value: 'value8.2,value8.3',
          mandatory: false,
          options: [
            {
              value: 'value8.1',
              text: 'Value 8.1',
            },
            {
              value: 'value8.2',
              text: 'Value 8.2',
            },
            {
              value: 'value8.3',
              text: 'Value 8.3',
            },
            {
              value: 'value8.4',
              text: 'Value 8.4',
            },
          ],
          values: ['value8.2', 'value8.3'],
        },
      ],
      selectedFilters: [
        {
          text: 'Field 1',
          displayValue: 'Value 1.1',
          key: '["filters.field1"]',
          value: ['"value1.1"'],
          disabled: false,
          classes: 'interactive-remove-filter-button',
          attributes: {
            'aria-label': 'Selected Filter: Field 1: Value 1.1. Click to clear this filter',
          },
        },
        {
          text: 'Field 3',
          displayValue: '01/02/2003 - 04/05/2006',
          key: '["filters.field3.start","filters.field3.end"]',
          value: ['"2003-02-01"', '"2006-05-04"'],
          disabled: false,
          constraints: [
            {
              key: 'filters.field3.start',
              value: '2003-02-01',
            },
            {
              key: 'filters.field3.end',
              value: '2007-05-04',
            },
          ],
          classes: 'interactive-remove-filter-button',
          attributes: {
            'aria-label': 'Selected Filter: Field 3: 01/02/2003 - 04/05/2006. Click to clear this filter',
          },
        },
        {
          text: 'Field 7',
          displayValue: 'Value 8.2, Value 8.3',
          key: '["filters.field7"]',
          value: ['"value8.2"', '"value8.3"'],
          disabled: false,
          classes: 'interactive-remove-filter-button',
          attributes: {
            'aria-label': 'Selected Filter: Field 7: Value 8.2, Value 8.3. Click to clear this filter',
          },
        },
      ],
      canSaveDefaults: false,
    },
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
          disabled: true,
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
      value: ['field2', 'field1', 'field3', 'field6'],
    },
    pagination: {
      pages: [],
      pageSize: 20,
      currentPage: 1,
      totalRows: 0,
      sizes: [
        {
          value: 10,
          text: '10',
        },
        {
          value: 20,
          text: '20',
        },
        {
          value: 100,
          text: '100',
        },
        {
          value: 200,
          text: '200',
        },
        {
          value: 0,
          text: 'All',
        },
      ],
    },
    reportUrl: 'originalUrl',
    reportSearch: 'search',
    encodedSearch: 'search',
    fullUrl: 'protocol://hostoriginalUrl',
    template: 'list',
    reportName: 'Test report name',
    name: 'Test variant title',
    description: 'Test Variant Description',
    count: 0,
    classification: 'OFFICIAL',
    printable: true,
    actions: [
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
        href: 'mailto:?subject=Test report name-Test Variant&body=protocol%3A%2F%2FhostoriginalUrl',
      },
      {
        id: 'dpr-button-copy',
        disabled: false,
        text: 'Copy report link',
        ariaLabelText: 'Copy report link',
        href: 'protocol://hostoriginalUrl',
      },
    ],
    warnings: {},
    type: 'report',
  },
  layoutTemplate: 'layoutTemplate',
}

module.exports = {
  mockRenderDataFromDefinition,
  mockRenderDataFromData,
}
