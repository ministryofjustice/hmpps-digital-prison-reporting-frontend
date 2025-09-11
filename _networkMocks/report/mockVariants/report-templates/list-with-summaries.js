const reportTemplateExampleListWithSummaries = {
  id: 'report-template-example-list-with-summaries',
  name: 'Page Summaries',
  description: 'A report with summaries.',
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
      id: 'summary2',
      template: 'page-header',
      fields: [
        {
          name: 'total',
          display: 'Other Total',
        },
      ],
    },
    {
      id: 'summary3',
      template: 'page-footer',
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
        filter: {
          type: 'autocomplete',
          dynamicOptions: {
            minimumLength: 3,
            returnAsStaticOptions: true,
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

module.exports = reportTemplateExampleListWithSummaries
