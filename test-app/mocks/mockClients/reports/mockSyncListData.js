const mockSyncData = {
  renderData: {
    dataTable: {
      head: [
        {
          html: '<a data-column="field1" class="data-table-header-button data-table-header-button-sort-ascending" href="?selectedPage=1&pageSize=20&sortColumn=field1&sortedAsc=false&columns=field1&columns=field2&columns=field3&columns=field6&columns=field7&dataProductDefinitionsPath=this/that/other">Field 1</a>',
          classes: null,
        },
        {
          html: '<a data-column="field2" class="data-table-header-button data-table-header-button-sort-none" href="?selectedPage=1&pageSize=20&sortColumn=field2&sortedAsc=true&columns=field1&columns=field2&columns=field3&columns=field6&columns=field7&dataProductDefinitionsPath=this/that/other">Field 2</a>',
          classes: null,
        },
        {
          text: 'Field 3',
          classes: null,
        },
        {
          text: 'Field 6',
          classes: null,
        },
        {
          text: 'Field 7',
          classes: null,
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
            fieldName: 'field6',
            html: '<a href="#" target="_blank">Value 6</a>',
            format: 'string',
            classes: '',
          },
          {
            fieldName: 'field7',
            text: '01/02/03 01:00',
            format: 'string',
            classes: '',
          },
        ],
      ],
      rowCount: 1,
      colCount: 5,
    },
    totals: '1-1 of 100',
    filterData: {
      filters: [
        {
          text: 'Field 1',
          name: 'field1',
          type: 'Radio',
          options: [
            {
              disabled: false,
              text: 'None',
              value: 'no-filter',
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
          value: 'value1.2',
          minimumLength: null,
          dynamicResourceEndpoint: null,
          mandatory: false,
        },
        {
          text: 'Field 2',
          name: 'field2',
          type: 'Select',
          options: [
            {
              value: '',
              text: 'Select your option',
              disabled: true,
              selected: true,
            },
            { value: 'no-filter', text: 'None', disabled: false },
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
          value: null,
          minimumLength: null,
          dynamicResourceEndpoint: null,
          mandatory: false,
        },
        {
          text: 'Field 3',
          name: 'field3',
          type: 'daterange',
          value: {
            start: '2003-02-01',
            end: '2006-05-04',
          },
          minimumLength: null,
          dynamicResourceEndpoint: null,
          mandatory: true,
          min: '2003-02-01',
          max: '2007-05-04',
          relativeOptions: [],
        },
        {
          text: 'Field 4',
          name: 'field4',
          type: 'autocomplete',
          options: [
            {
              value: 'Fezzick',
              text: 'Fezzick',
            },
            {
              value: 'Inigo Montoya',
              text: 'Inigo Montoya',
            },
            {
              value: 'PrHu',
              text: 'Prince Humperdink',
            },
            {
              value: 'Princess Buttercup',
              text: 'Princess Buttercup',
            },
            {
              value: 'Westley',
              text: 'Westley',
            },
          ],
          value: null,
          minimumLength: 3,
          dynamicResourceEndpoint: null,
          mandatory: false,
        },
        {
          text: 'Field 5',
          name: 'field5',
          type: 'autocomplete',
          options: [],
          value: null,
          minimumLength: 3,
          dynamicResourceEndpoint: null,
          mandatory: false,
        },
        {
          text: 'Field 6',
          name: 'field6',
          type: 'text',
          value: null,
          minimumLength: null,
          dynamicResourceEndpoint: null,
          mandatory: false,
        },
        {
          text: 'Field 7',
          name: 'field7',
          type: 'date',
          value: '2005-02-01',
          minimumLength: null,
          dynamicResourceEndpoint: null,
          min: '2003-02-01',
          max: '2007-05-04',
          mandatory: false,
        },
        {
          dynamicResourceEndpoint: null,
          mandatory: false,
          minimumLength: null,
          name: 'field8',
          options: [
            {
              text: 'Value 8.1',
              value: 'value8.1',
            },
            {
              text: 'Value 8.2',
              value: 'value8.2',
            },
            {
              text: 'Value 8.3',
              value: 'value8.3',
            },
            {
              text: 'Value 8.4',
              value: 'value8.4',
            },
          ],
          pattern: undefined,
          text: 'Field 8',
          type: 'multiselect',
          value: 'value8.2,value8.3',
          values: ['value8.2', 'value8.3'],
        },
      ],
      selectedFilters: [
        {
          text: 'Field 1: Value 1.2',
          key: '["filters.field1"]',
          value: ['"value1.2"'],
          disabled: false,
          classes: 'interactive-remove-filter-button',
          attributes: {
            'aria-label': 'Selected Filter: Field 1: Value 1.2. Click to clear this filter',
          },
        },
        {
          text: 'Field 3: 2003-02-01 - 2006-05-04',
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
            'aria-label': 'Selected Filter: Field 3: 2003-02-01 - 2006-05-04. Click to clear this filter',
          },
        },
        {
          text: 'Field 7: 2005-02-01',
          key: '["filters.field7"]',
          value: ['"2005-02-01"'],
          disabled: false,
          classes: 'interactive-remove-filter-button',
          constraints: [
            {
              key: 'filters.field7',
              value: '2003-02-01',
            },
          ],
          attributes: {
            'aria-label': 'Selected Filter: Field 7: 2005-02-01. Click to clear this filter',
          },
        },
        {
          attributes: {
            'aria-label': 'Selected Filter: Field 8: Value 8.2, Value 8.3. Click to clear this filter',
          },
          classes: 'interactive-remove-filter-button',
          disabled: false,
          key: '["filters.field8"]',
          text: 'Field 8: Value 8.2, Value 8.3',
          value: ['"value8.2"', '"value8.3"'],
        },
      ],
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
          disabled: true,
        },
        {
          text: 'Field 7',
          value: 'field7',
          disabled: false,
        },
        {
          disabled: false,
          text: 'Field 8',
          value: 'field8',
        },
      ],
      text: 'Select report columns',
      value: ['field2', 'field6', 'field1', 'field3', 'field7'],
    },
    pagination: {
      next: 'pathname?search=&selectedPage=2',
      pages: [
        {
          number: 1,
          href: 'pathname?search=&selectedPage=1',
          current: true,
        },
        {
          number: 2,
          href: 'pathname?search=&selectedPage=2',
          current: false,
        },
        {
          ellipsis: true,
        },
        {
          number: 5,
          href: 'pathname?search=&selectedPage=5',
          current: false,
        },
      ],
      pageSize: 20,
      currentPage: 1,
      totalRows: 100,
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
          value: 100,
          text: 'All',
        },
      ],
    },
    reportUrl: 'pathname',
    bookmarked: false,
    reportSearch: 'search',
    encodedSearch: 'search',
    reportName: 'reportName',
    name: 'Successful Report',
    description: 'this will succeed',
    count: 100,
    type: 'report',
    classification: 'OFFICIAL',
    printable: false,
    actions: [
      {
        id: 'dpr-button-printable',
        icon: 'print',
        disabled: true,
        tooltipText: 'Print',
        ariaLabelText: 'print report, disabled',
        href: '#',
      },
      {
        id: 'dpr-button-sharable',
        icon: 'share',
        disabled: false,
        tooltipText: 'Share',
        ariaLabelText: 'share report request via email',
        href: 'mailto:?subject=reportName-Successful Report&body=protocol%3A%2F%2FhostoriginalUrl',
      },
      {
        id: 'dpr-button-copy',
        icon: 'copy',
        disabled: false,
        tooltipText: 'Copy',
        ariaLabelText: 'report request',
        href: 'protocol://hostoriginalUrl',
      },
      {
        id: 'dpr-button-downloadable',
        icon: 'download',
        disabled: false,
        tooltipText: 'Enable download',
        ariaLabelText: 'download report',
        attributes: {
          enabled: true,
          name: 'Successful Report',
          reportName: 'reportName',
          csrfToken: 'csrfToken',
          reportId: 'reportId',
          id: 'variantId-1',
          columns: ['field2', 'field6', 'field1', 'field3', 'field7'],
          loadType: 'sync',
          definitionPath: 'this/that/other',
          canDownload: false,
          currentUrl: 'pathname',
          currentQueryParams: 'search',
        },
      },
    ],
    csrfToken: 'csrfToken',
    loadType: 'sync',
    reportId: 'reportId',
    id: 'id',
    dataProductDefinitionsPath: 'this/that/other',
  },
}

module.exports = mockSyncData
