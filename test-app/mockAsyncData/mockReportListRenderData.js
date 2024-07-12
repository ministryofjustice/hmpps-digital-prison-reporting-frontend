const mockGetReportListRenderData = {
  renderData: {
    variantId: undefined,
    variantName: 'variantName',
    reportId: undefined,
    reportName: 'reportName',
    requestedTimestamp: 'Invalid Date',
    description: 'description',
    rowCount: 10,
    rows: [
      [
        {
          text: 'Value 2',
          format: 'string',
          classes: null,
        },
      ],
      [
        {
          text: 'Value 2',
          format: 'string',
          classes: null,
        },
      ],
      [
        {
          text: 'Value 2',
          format: 'string',
          classes: null,
        },
      ],
      [
        {
          text: 'Value 2',
          format: 'string',
          classes: null,
        },
      ],
      [
        {
          text: 'Value 2',
          format: 'string',
          classes: null,
        },
      ],
      [
        {
          text: 'Value 2',
          format: 'string',
          classes: null,
        },
      ],
      [
        {
          text: 'Value 2',
          format: 'string',
          classes: null,
        },
      ],
      [
        {
          text: 'Value 2',
          format: 'string',
          classes: null,
        },
      ],
      [
        {
          text: 'Value 2',
          format: 'string',
          classes: null,
        },
      ],
      [
        {
          text: 'Value 2',
          format: 'string',
          classes: null,
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
        tooltipText: 'Refresh report',
        ariaLabelText: 'Refresh report',
        href: 'fullUrl&refreshId=executionId',
      },
      {
        id: 'dpr-button-printable',
        icon: 'print',
        disabled: false,
        tooltipText: 'Print report',
        ariaLabelText: 'Print report',
      },
      {
        id: 'dpr-button-sharable',
        icon: 'share',
        disabled: false,
        tooltipText: 'Share report request via email',
        ariaLabelText: 'Share report request via email',
        href: 'mailto:?subject=reportName-variantName&body=fullUrl',
      },
      {
        id: 'dpr-button-copy',
        icon: 'copy',
        disabled: false,
        tooltipText: 'Copy report request',
        ariaLabelText: 'report request',
        href: 'fullUrl',
      },
      {
        id: 'dpr-button-downloadable',
        icon: 'download',
        disabled: true,
        tooltipText: 'Download report',
        ariaLabelText: 'Download report',
      },
    ],
    querySummary: 'summary',
    bookmarked: false,
    classification: 'OFFICIAL',
    colCount: 2,
    summaryData: {},
template: 'list',
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
        classes: null,
      },
    ],
    [
      {
        text: 'Value 2',
        format: 'string',
        classes: null,
      },
    ],
    [
      {
        text: 'Value 2',
        format: 'string',
        classes: null,
      },
    ],
    [
      {
        text: 'Value 2',
        format: 'string',
        classes: null,
      },
    ],
    [
      {
        text: 'Value 2',
        format: 'string',
        classes: null,
      },
    ],
    [
      {
        text: 'Value 2',
        format: 'string',
        classes: null,
      },
    ],
    [
      {
        text: 'Value 2',
        format: 'string',
        classes: null,
      },
    ],
    [
      {
        text: 'Value 2',
        format: 'string',
        classes: null,
      },
    ],
    [
      {
        text: 'Value 2',
        format: 'string',
        classes: null,
      },
    ],
    [
      {
        text: 'Value 2',
        format: 'string',
        classes: null,
      },
    ],
  ],
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
  querySummary: 'summary',
}

module.exports = { mockReportListRenderData, mockGetReportListRenderData }
