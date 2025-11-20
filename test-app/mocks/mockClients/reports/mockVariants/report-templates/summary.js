// @ts-nocheck
const reportTemplateExampleSummaries = {
  id: 'report-template-example-summaries-no-list',
  name: 'Summaries template',
  description: 'A report with summaries, but no list.',
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
      id: 'summary3',
      template: 'page-header',
      fields: [
        {
          name: 'percentGood',
          display: 'Good (%)',
        },
        {
          name: 'percentBad',
          display: 'Bad (%)',
        },
        {
          name: 'percentUgly',
          display: 'Ugly (%)',
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

module.exports = reportTemplateExampleSummaries
