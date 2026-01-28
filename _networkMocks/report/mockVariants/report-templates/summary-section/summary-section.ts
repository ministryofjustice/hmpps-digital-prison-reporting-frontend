import { components } from '../../../../../src/dpr/types/api'
import { LoadType } from '../../../../../src/dpr/types/UserReports'

const reportTemplateExampleSectionedSummaries: components['schemas']['VariantDefinition'] & { loadType: LoadType } = {
  loadType: LoadType.ASYNC,
  id: 'report-template-example-sectioned-summaries',
  name: 'Summary-section',
  description: 'Summary-section template',
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
