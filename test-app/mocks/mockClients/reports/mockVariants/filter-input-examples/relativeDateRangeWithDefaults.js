// @ts-nocheck
const variant15 = {
  id: 'relative-daterange-with-default',
  name: 'Relative Daterange with default',
  description: 'Relative Daterange variant',
  resourceName: 'reports/list',
  classification: 'OFFICIAL',
  printable: false,
  specification: {
    template: 'list',
    fields: [
      {
        name: 'field1',
        display: 'Relative date-range',
        sortable: false,
        visible: true,
        type: 'date',
        mandatory: false,
        filter: {
          type: 'daterange',
          mandatory: true,
          defaultQuickFilterValue: 'next-month',
        },
      },
    ],
  },
}

module.exports = variant15
