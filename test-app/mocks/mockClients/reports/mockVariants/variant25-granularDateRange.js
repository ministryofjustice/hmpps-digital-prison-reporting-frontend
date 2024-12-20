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
          defaultValue: 'today',
          mandatory: true,
          defaultGranularity: 'daily',
        },
      },
    ],
  },
}

module.exports = variant25
