import { components } from "src/dpr/types/api";

const reportTemplateExampleTableSummaries: components['schemas']['VariantDefinition'] = {
  id: 'report-template-example-table-summaries',
  name: 'Table Summaries',
  description:
    'A report with table summaries. A report with table summaries. A report with table summaries. A report with table summaries. A report with table summaries. A report with table summaries. A report with table summaries. A report with table summaries. A report with table summaries. A report with table summaries. A report with table summaries. A report with table summaries. A report with table summaries. A report with table summaries.',
  resourceName: 'reports/list',
  classification: 'OFFICIAL',
  printable: true,
  summaries: [
    {
      id: 'summary4',
      template: 'table-header',
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
      id: 'summary5',
      template: 'table-footer',
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
    sections: [],
    template: 'list',
    fields: [
      {
        name: 'field1',
        display: 'Field 1',
        sortable: true,
        defaultsort: true,
        type: 'string',
        mandatory: false,
        visible: true,
        calculated: false,
        header: false,
        filter: {
          type: 'Radio',
          staticOptions: [
            { name: 'value1.1', display: 'Value 1.1' },
            { name: 'value1.2', display: 'Value 1.2' },
            { name: 'value1.3', display: 'Value 1.3' },
          ],
          mandatory: false,
        },
      },
      {
        name: 'field2',
        display: 'Field 2',
        sortable: true,
        type: 'string',
        mandatory: false,
        visible: true,
        calculated: false,
        header: false,
        defaultsort: false,
        filter: {
          type: 'Select',
          staticOptions: [
            { name: 'value2.1', display: 'Value 2.1' },
            { name: 'value2.2', display: 'Value 2.2' },
            { name: 'value2.3', display: 'Value 2.3' },
          ],
          mandatory: false,
        },
      },
      {
        name: 'field3',
        display: 'Field 3',
        sortable: false,
        type: 'date',
        mandatory: false,
        visible: true,
        calculated: false,
        header: false,
        defaultsort: false,
        filter: {
          type: 'daterange',
          min: '2003-02-01',
          max: '2007-05-04',
          mandatory: false,
        },
      },
      {
        name: 'field4',
        display: 'Field 4',
        sortable: false,
        type: 'string',
        visible: true,
        calculated: false,
        header: false,
        defaultsort: false,
        mandatory: false,
        filter: {
          type: 'autocomplete',
          dynamicOptions: {
            minimumLength: 3,
          },
          staticOptions: [
            { name: 'Fezzick', display: 'Fezzick' },
            { name: 'Inigo Montoya', display: 'Inigo Montoya' },
            { name: 'Prince Humperdink', display: 'Prince Humperdink' },
            { name: 'Princess Buttercup', display: 'Princess Buttercup' },
            { name: 'Westley', display: 'Westley' },
          ],
          mandatory: false,
          pattern: '(?!Invalid).+',
        },
      },
      {
        name: 'field6',
        display: 'Field 6',
        sortable: false,
        type: 'string',
        mandatory: false,
        calculated: false,
        header: false,
        defaultsort: false,
        visible: false,
        filter: {
          type: 'text',
          pattern: 'Value 6\\.\\d',
          mandatory: false,
        },
      },
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

export default reportTemplateExampleTableSummaries
