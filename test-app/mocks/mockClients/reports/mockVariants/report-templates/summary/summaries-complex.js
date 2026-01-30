// @ts-nocheck
const reportTemplateExampleSummariesComplex = {
  id: 'report-template-example-summaries-complex',
  name: 'Summary - with complex titles',
  description: 'Template: "summary".</br> A report with titled summaries',
  resourceName: 'reports/list',
  classification: 'OFFICIAL',
  printable: true,
  summaries: [
    {
      id: 'summary1',
      template: 'page-header',
      fields: [
        {
          name: 'total',
          display: 'Total',
        },
      ],
    },
    {
      id: 'summary8',
      template: 'page-header',
      fields: [
        {
          name: 'activity',
          display: '',
          header: true,
          mergeRows: true,
          sortAsc: false,
        },
        {
          name: 'measureType',
          display: '',
          header: true,
        },
        {
          name: 'monday',
          display: 'Mon',
        },
        {
          name: 'tuesday',
          display: 'Tue',
        },
        {
          name: 'wednesday',
          display: 'Wed',
        },
        {
          name: 'thursday',
          display: 'Thu',
        },
        {
          name: 'friday',
          display: 'Fri',
        },
        {
          name: 'total',
          display: 'Total',
          header: true,
        },
      ],
    },
  ],
  specification: {
    template: 'summary',
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
}

module.exports = reportTemplateExampleSummariesComplex
