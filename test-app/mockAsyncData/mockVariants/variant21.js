const variant21 = {
  id: 'variantId-21',
  name: 'Test Variant 21',
  description: 'Relative Daterange variant -  no relative range options',
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
          min: '2024-08-15',
          max: '2024-08-15',
          mandatory: true,
        },
      },
    ],
  },
}

module.exports = variant21
