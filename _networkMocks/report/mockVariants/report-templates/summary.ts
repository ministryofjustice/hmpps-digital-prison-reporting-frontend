import { components } from "src/dpr/types/api";
import { LoadType } from "src/dpr/types/UserReports";

const reportTemplateExampleSummaries: components['schemas']['VariantDefinition'] & { loadType: LoadType } = {
  loadType: LoadType.ASYNC,
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
    sections: [],
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
