const mockGetReportListRenderData = {
  renderData: {
    id: 'id',
    name: 'variantName',
    reportId: 'reportId',
    type: 'report',
    reportName: 'reportName',
    reportSummaries: {},
    requestUrl: {
      fullUrl: 'fullUrl',
    },
    requestedTimestamp: 'Invalid Date',
    description: 'description',
    rowCount: 10,
    rows: [
      [
        {
          text: 'Value 2',
          format: 'string',
          classes: '',
        },
      ],
      [
        {
          text: 'Value 2',
          format: 'string',
          classes: '',
        },
      ],
      [
        {
          text: 'Value 2',
          format: 'string',
          classes: '',
        },
      ],
      [
        {
          text: 'Value 2',
          format: 'string',
          classes: '',
        },
      ],
      [
        {
          text: 'Value 2',
          format: 'string',
          classes: '',
        },
      ],
      [
        {
          text: 'Value 2',
          format: 'string',
          classes: '',
        },
      ],
      [
        {
          text: 'Value 2',
          format: 'string',
          classes: '',
        },
      ],
      [
        {
          text: 'Value 2',
          format: 'string',
          classes: '',
        },
      ],
      [
        {
          text: 'Value 2',
          format: 'string',
          classes: '',
        },
      ],
      [
        {
          text: 'Value 2',
          format: 'string',
          classes: '',
        },
      ],
    ],
    head: [
      {
        text: 'Field 2',
      },
    ],
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
          disabled: undefined,
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
      prev: undefined,
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
    actions: [
      {
        id: 'dpr-button-refresh',
        icon: 'refresh',
        disabled: false,
        tooltipText: 'refresh',
        ariaLabelText: 'refresh report',
        href: 'fullUrl',
      },
      {
        id: 'dpr-button-printable',
        icon: 'print',
        disabled: false,
        href: '#',
        tooltipText: 'print',
        ariaLabelText: 'print report',
      },
      {
        id: 'dpr-button-sharable',
        icon: 'share',
        disabled: false,
        tooltipText: 'share',
        ariaLabelText: 'share report request via email',
        href: 'mailto:?subject=reportName-variantName&body=fullUrl',
      },
      {
        id: 'dpr-button-copy',
        icon: 'copy',
        disabled: false,
        tooltipText: 'copy',
        ariaLabelText: 'report request',
        href: 'fullUrl',
      },
      {
        id: 'dpr-button-downloadable',
        icon: 'download',
        disabled: false,
        tooltipText: 'download',
        ariaLabelText: 'download report',
        attributes: {
          id: 'id',
          reportId: 'reportId',
          reportName: 'reportName',
          tableId: 'tableId',
          type: 'report',
          name: 'variantName',
          csrfToken: 'csrfToken',
          columns: ['field2', 'column'],
        },
      },
    ],
    querySummary: 'summary',
    bookmarked: false,
    canDownload: true,
    classification: 'OFFICIAL',
    colCount: 2,
    template: 'list',
    tableId: 'tableId',
    totals: '1-10 of 100',
    count: 100,
    csrfToken: 'csrfToken',
    printable: true,
    executionId: 'executionId',
  },
}

const mockReportListRenderData = {
  rowCount: 10,
  rows: [
    [
      {
        text: 'Value 2',
        format: 'string',
        classes: '',
      },
    ],
    [
      {
        text: 'Value 2',
        format: 'string',
        classes: '',
      },
    ],
    [
      {
        text: 'Value 2',
        format: 'string',
        classes: '',
      },
    ],
    [
      {
        text: 'Value 2',
        format: 'string',
        classes: '',
      },
    ],
    [
      {
        text: 'Value 2',
        format: 'string',
        classes: '',
      },
    ],
    [
      {
        text: 'Value 2',
        format: 'string',
        classes: '',
      },
    ],
    [
      {
        text: 'Value 2',
        format: 'string',
        classes: '',
      },
    ],
    [
      {
        text: 'Value 2',
        format: 'string',
        classes: '',
      },
    ],
    [
      {
        text: 'Value 2',
        format: 'string',
        classes: '',
      },
    ],
    [
      {
        text: 'Value 2',
        format: 'string',
        classes: '',
      },
    ],
  ],
  totals: '1-10 of 100',
  head: [
    {
      text: 'Field 2',
    },
  ],
  colCount: 2,
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
        disabled: undefined,
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
