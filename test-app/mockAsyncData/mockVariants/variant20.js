const variant20 = {
  id: 'variantId-20',
  name: 'Test Variant 20',
  description: 'Relative Daterange variant -  default relative value',
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
          defaultValue: 'next-week',
          min: '2024-07-28',
          max: '2024-12-15',
          mandatory: true,
        },
      },
    ],
  },
}

module.exports = variant20
