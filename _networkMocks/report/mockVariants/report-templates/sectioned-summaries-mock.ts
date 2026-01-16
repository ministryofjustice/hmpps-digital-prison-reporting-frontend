import { components } from 'dpr/types/api'

const reportTemplateExampleSectionedSummaries: components['schemas']['VariantDefinition'] = {
  id: 'report-template-example-sectioned-summaries',
  name: 'Sectioned Summaries (no list)',
  description: 'A report with summaries in sections, but no list.',
  resourceName: 'reports/list',
  classification: 'OFFICIAL',
  printable: true,
  summaries: [
    {
      id: 'summary6',
      template: 'section-footer',
      fields: [
        {
          name: 'field1',
          display: 'Field 1',
          type: 'string',
        },
        {
          name: 'field2',
          display: 'Field 1',
          type: 'string',
        },
        {
          name: 'field3',
          display: 'Field 1',
          type: 'string',
        },
        {
          name: 'field4',
          display: 'Field 1',
          type: 'string',
        },
      ],
    },
    {
      id: 'summary7',
      template: 'section-footer',
      fields: [
        {
          name: 'field1',
          display: 'Field 1',
          type: 'string',
        },
        {
          name: 'field2',
          display: 'Field 1',
          type: 'string',
        },
        {
          name: 'field3',
          display: 'Field 1',
          type: 'string',
        },
        {
          name: 'field4',
          display: 'Field 1',
          type: 'string',
        },
      ],
    },
  ],
  specification: {
    template: 'summary-section',
    sections: ['section1', 'section2'],
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

export default reportTemplateExampleSectionedSummaries
