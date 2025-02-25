const variant23Interactive = {
  id: 'variantId-23',
  name: 'Interactive Report',
  description: 'this is an interactive report',
  resourceName: 'reports/list',
  classification: 'OFFICIAL',
  printable: false,
  interactive: true,
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
          defaultValue: 'value1.2',
          mandatory: false,
          interactive: true,
        },
      },
      {
        name: 'field2',
        display: 'Field 2',
        sortable: true,
        type: 'string',
        mandatory: true,
        visible: true,
        filter: {
          type: 'Select',
          staticOptions: [
            { name: 'value2.1', display: 'Value 2.1' },
            { name: 'value2.2', display: 'Value 2.2' },
            { name: 'value2.3', display: 'Value 2.3' },
          ],
          mandatory: true,
          interactive: true,
        },
      },
      {
        name: 'field3',
        display: 'Field 3',
        sortable: false,
        visible: true,
        type: 'date',
        mandatory: false,
        filter: {
          type: 'daterange',
          defaultValue: '2003-02-01 - 2006-05-04',
          // min: '2003-02-01',
          // max: '2007-05-04',
          mandatory: true,
          interactive: true,
        },
      },
      {
        name: 'field4',
        display: 'Field 4',
        visible: false,
        sortable: false,
        type: 'string',
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
          interactive: true,
        },
      },
      {
        name: 'field5',
        display: 'Field 5',
        sortable: false,
        type: 'string',
        mandatory: false,
        visible: false,
      },
      {
        name: 'field6',
        display: 'Field 6',
        sortable: false,
        type: 'HTML',
        mandatory: true,
        visible: true,
        filter: {
          type: 'text',
          interactive: true,
        },
      },
      {
        name: 'field7',
        display: 'Field 7',
        sortable: false,
        visible: true,
        type: 'date',
        mandatory: false,
        filter: {
          type: 'date',
          defaultValue: '2005-02-01',
          // min: '2003-02-01',
          // max: '2007-05-04',
          interactive: true,
        },
      },
      {
        name: 'field8',
        display: 'Field 8',
        sortable: false,
        visible: false,
        type: 'date',
        mandatory: false,
        filter: {
          type: 'multiselect',
          staticOptions: [
            { name: 'value8.1', display: 'Value 8.1' },
            { name: 'value8.2', display: 'Value 8.2' },
            { name: 'value8.3', display: 'Value 8.3' },
            { name: 'value8.4', display: 'Value 8.4' },
          ],
          defaultValue: 'value8.2,value8.3',
          interactive: true,
        },
      },
    ],
  },
}

module.exports = variant23Interactive
