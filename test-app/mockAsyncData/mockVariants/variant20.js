const variant20 = {
  id: 'variantId-20',
  name: 'By Person ID and Visit Detail',
  description:
    'Visitor and Prisoner details for those Visitors who have visits within a date range specified, along with the number of Prisoners visited and the Visitor details. This identification will facilitate multi-agency work as well as assist Establishments with their Data Cleansing.</br>VIS0019 - v0.1 Last Modified: 08 /09 / 2017',
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
        sortable: false,
        type: 'string',
        mandatory: false,
        visible: false,
        filter: {
          type: 'autocomplete',
          dynamicOptions: {
            minimumLength: 3,
            returnAsStaticOptions: false,
          },
          mandatory: false,
        },
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
        sortable: false,
        visible: true,
        type: 'date',
        mandatory: false,
        filter: {
          type: 'date',
          defaultValue: '2005-02-01',
          min: '2003-02-01',
          max: '2007-05-04',
        },
      },
    ],
  },
}

module.exports = variant20
