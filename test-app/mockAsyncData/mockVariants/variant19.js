const variant19 = {
  id: 'variantId-19',
  name: 'Test Variant 19',
  description: 'Relative Daterange variant -  default value, with min/max',
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
          min: '2024-08-15',
          max: '2024-12-15',
          mandatory: true,
        },
      },
    ],
  },
}

module.exports = variant19
