const mockReportListRenderData = {
  renderData: {
    variantName: 'variantName',
    reportName: 'reportName',
    description: 'description',
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
          number: 10,
          href: 'pathname?search=&selectedPage=10',
          current: false,
        },
      ],
      pageSize: 10,
      currentPage: 1,
      totalRows: 100,
      sizes: [
        {
          value: 10,
          text: 10,
        },
        {
          value: 20,
          text: 20,
        },
        {
          value: 100,
          text: 100,
        },
        {
          value: 200,
          text: 200,
        },
        {
          value: 100,
          text: 'All',
        },
      ],
    },
    actions: [
      {
        id: 'refresh',
        icon: 'refresh',
        disabled: false,
        tooltipText: 'Refresh report',
        ariaLabelText: 'Refresh report',
        href: 'fullUrl&refreshId=executionId',
      },
      {
        id: 'printable',
        icon: 'print',
        disabled: false,
        tooltipText: 'Print report',
        ariaLabelText: 'Print report',
      },
      {
        id: 'sharable',
        icon: 'share',
        disabled: false,
        tooltipText: 'Share report request via email',
        ariaLabelText: 'Share report request via email',
        href: 'mailto:?subject=reportName-variantName&body=fullUrl',
      },
      {
        id: 'copy',
        icon: 'copy',
        disabled: false,
        tooltipText: 'Copy report request',
        ariaLabelText: 'report request',
        href: 'fullUrl',
      },
      {
        id: 'downloadable',
        icon: 'download',
        disabled: true,
        tooltipText: 'Download report',
        ariaLabelText: 'Download report',
      },
    ],
    appliedFilters: 'summary',
    classification: 'OFFICIAL',
  },
}

module.exports = mockReportListRenderData
