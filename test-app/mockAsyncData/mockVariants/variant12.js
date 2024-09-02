const variant12 = {
  id: 'variantId-12',
  name: 'Sort',
  //note description missing
  resourceName: 'reports/list',
  classification: 'OFFICIAL',
  printable: false,
  specification: {
    template: 'list',
    fields: [
      {
        name: 'field1',
        display: 'Field 1',
        sortable: true,
        type: 'string',
        mandatory: false,
        visible: true,
      },
      {
        name: 'field2',
        display: 'Field 2',
        sortable: false,
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
          min: '2003-02-01',
          max: '2007-05-04',
          mandatory: true,
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
        },
      },
      {
        name: 'field5',
        display: 'Field 5',
        sortable: true,
        type: 'string',
        mandatory: false,
        visible: false,
        defaultsort: true,
      },
      {
        name: 'field6',
        display: 'Field 6',
        sortable: false,
        type: 'HTML',
        mandatory: false,
        visible: true,
        filter: {
          type: 'text',
        },
      },
      {
        name: 'field7',
        display: 'Field 7',
        sortable: true,
        visible: true,
        type: 'date',
        mandatory: false,
      },
    ],
  },
}

module.exports = variant12
