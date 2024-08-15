const variant18 = {
  id: 'variantId-18',
  name: 'Test Variant 18',
  description: 'Relative Daterange variant -  default value, no min/max',
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
          defaultValue: '2024-03-15 - 2024-08-15',
          min: '',
          max: '',
          mandatory: true,
        },
      },
    ],
  },
}

module.exports = variant18
