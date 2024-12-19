const variant25 = {
  id: 'variantId-25',
  name: 'Granular Daterange',
  description: 'Granular Daterange variant',
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
          type: 'granulardaterange',
          defaultValue: '2024-12-19 - 2024-11-19',
          mandatory: true,
          defaultGranularity: 'monthly',
          min: '2003-02-01',
          max: '2007-05-04',
        },
      },
    ],
  },
}

module.exports = variant25
