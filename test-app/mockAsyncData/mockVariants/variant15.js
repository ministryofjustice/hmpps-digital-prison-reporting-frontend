const variant15 = {
  id: 'variantId-15',
  name: 'Test Variant 15',
  description: 'Relative Daterange variant',
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
          min: '2003-02-01',
          max: '2024-08-20',
          mandatory: true,
        },
      },
    ],
  },
}

module.exports = variant15