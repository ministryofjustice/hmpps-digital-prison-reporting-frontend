// @ts-nocheck
const mockGetReportListRenderData = {
  renderData: {
    reportName: 'reportName',
    name: 'variantName',
    description: 'description',
    requestedTimestamp: 'Invalid Date',
    reportId: 'reportId',
    tableId: 'tableId',
    id: 'id',
    executionId: 'executionId',
    querySummary: 'summary',
    requestUrl: {
      fullUrl: 'fullUrl',
    },
    defaultQuery: 'defaultQuery',
    classification: 'OFFICIAL',
    template: 'list',
    count: 100,
    filterData: {
      filters: [],
      selectedFilters: [],
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
      ],
      text: 'Select report columns',
      value: ['field2', 'column'],
    },
    loadType: 'async',
    type: 'report',
    actions: [
      {
        id: 'dpr-button-refresh',
        disabled: false,
        text: 'Refresh',
        ariaLabelText: 'Refresh report',
        href: 'fullUrl',
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
        href: 'mailto:?subject=reportName-variantName&body=fullUrl',
      },
      {
        id: 'dpr-button-copy',
        disabled: false,
        text: 'Copy report link',
        ariaLabelText: 'Copy report link',
        href: 'fullUrl',
      },
      {
        id: 'dpr-button-downloadable',
        disabled: false,
        text: 'Download',
        ariaLabelText: 'download report',
        attributes: {
          enabled: true,
          name: 'variantName',
          reportName: 'reportName',
          csrfToken: 'csrfToken',
          reportId: 'reportId',
          id: 'id',
          columns: ['field2', 'column'],
          loadType: 'async',
          canDownload: true,
          currentUrl: 'originalUrl',
          currentQueryParams: 'search',
          tableId: 'tableId',
        },
      },
    ],
    printable: true,
    csrfToken: 'csrfToken',
    bookmarked: false,
    canDownload: true,
    reportUrl: 'originalUrl',
    search: 'search',
    pathname: 'originalUrl',
    reportSearch: 'search',
    encodedSearch: 'search',
    dataTable: [
      {
        head: [
          {
            text: 'Field 2',
          },
        ],
        rows: [
          [
            {
              fieldName: 'field2',
              text: 'Value 2',
              format: 'string',
              classes: '',
            },
          ],
          [
            {
              fieldName: 'field2',
              text: 'Value 2',
              format: 'string',
              classes: '',
            },
          ],
          [
            {
              fieldName: 'field2',
              text: 'Value 2',
              format: 'string',
              classes: '',
            },
          ],
          [
            {
              fieldName: 'field2',
              text: 'Value 2',
              format: 'string',
              classes: '',
            },
          ],
          [
            {
              fieldName: 'field2',
              text: 'Value 2',
              format: 'string',
              classes: '',
            },
          ],
          [
            {
              fieldName: 'field2',
              text: 'Value 2',
              format: 'string',
              classes: '',
            },
          ],
          [
            {
              fieldName: 'field2',
              text: 'Value 2',
              format: 'string',
              classes: '',
            },
          ],
          [
            {
              fieldName: 'field2',
              text: 'Value 2',
              format: 'string',
              classes: '',
            },
          ],
          [
            {
              fieldName: 'field2',
              text: 'Value 2',
              format: 'string',
              classes: '',
            },
          ],
          [
            {
              fieldName: 'field2',
              text: 'Value 2',
              format: 'string',
              classes: '',
            },
          ],
        ],
        rowCount: 10,
        colCount: 2,
      },
    ],
    pagination: {
      next: 'originalUrl?search=&selectedPage=2',
      pages: [
        {
          number: 1,
          href: 'originalUrl?search=&selectedPage=1',
          current: true,
        },
        {
          number: 2,
          href: 'originalUrl?search=&selectedPage=2',
          current: false,
        },
        {
          ellipsis: true,
        },
        {
          number: 5,
          href: 'originalUrl?search=&selectedPage=5',
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
    totals: 'Showing <strong>1</strong> to <strong>10</strong> of <strong>100</strong> results',
  },
}

const mockReportListRenderData = {
  dataTable: {
    rowCount: 10,
    rows: [
      [
        {
          text: 'Value 2',
          fieldName: 'field2',
          format: 'string',
          classes: '',
        },
      ],
      [
        {
          text: 'Value 2',
          fieldName: 'field2',
          format: 'string',
          classes: '',
        },
      ],
      [
        {
          text: 'Value 2',
          fieldName: 'field2',
          format: 'string',
          classes: '',
        },
      ],
      [
        {
          text: 'Value 2',
          fieldName: 'field2',
          format: 'string',
          classes: '',
        },
      ],
      [
        {
          text: 'Value 2',
          fieldName: 'field2',
          format: 'string',
          classes: '',
        },
      ],
      [
        {
          text: 'Value 2',
          fieldName: 'field2',
          format: 'string',
          classes: '',
        },
      ],
      [
        {
          text: 'Value 2',
          fieldName: 'field2',
          format: 'string',
          classes: '',
        },
      ],
      [
        {
          text: 'Value 2',
          fieldName: 'field2',
          format: 'string',
          classes: '',
        },
      ],
      [
        {
          text: 'Value 2',
          fieldName: 'field2',
          format: 'string',
          classes: '',
        },
      ],
      [
        {
          text: 'Value 2',
          fieldName: 'field2',
          format: 'string',
          classes: '',
        },
      ],
    ],
    head: [
      {
        text: 'Field 2',
        classes: null,
      },
    ],
    colCount: 2,
  },
  totals: 'Showing <strong>1</strong> to <strong>10</strong> of <strong>100</strong> results',
  pagination: {
    prev: undefined,
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
  querySummary: [
    {
      query: 'summary',
    },
  ],
}

module.exports = { mockReportListRenderData, mockGetReportListRenderData }
