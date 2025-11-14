// @ts-nocheck
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
          defaultValue: '2003-02-01 - 2006-05-04',
          defaultQuickFilterValue: 'last-six-months',
          mandatory: true,
          defaultGranularity: 'daily',
        },
      },
    ],
  },
}

module.exports = variant25
