const variant17 = {
  id: 'variantId-17',
  name: 'Test Variant 17',
  description: 'Relative Daterange variant -  no defaults',
  resourceName: 'reports/list',
  classification: 'OFFICIAL',
  printable: false,
  specification: {
    template: 'list',
    fields: [
      {
        name: 'field1',
        display: 'Field 1',
        sortable: false,
        visible: true,
        type: 'date',
        mandatory: false,
        filter: {
          type: 'daterange',
          defaultValue: '',
          min: '',
          max: '',
          mandatory: true,
        },
      },
    ],
  },
}

module.exports = variant17
