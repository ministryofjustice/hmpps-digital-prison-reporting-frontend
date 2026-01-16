import { components } from 'dpr/types/api'

const reportTemplateExampleSummaries: components['schemas']['VariantDefinition'] = {
  id: 'report-template-example-summaries',
  name: 'Summaries (no list)',
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
    sections: [],
    fields: [
      {
        name: 'section1',
        display: 'First',
        sortable: false,
        defaultsort: false,
        type: 'string',
        mandatory: false,
        visible: false,
        calculated: false,
        header: false,
      },
      {
        name: 'section2',
        display: 'Second',
        sortable: false,
        defaultsort: false,
        type: 'string',
        mandatory: false,
        visible: false,
        calculated: false,
        header: false,
      },
    ],
  },
}

export default reportTemplateExampleSummaries
