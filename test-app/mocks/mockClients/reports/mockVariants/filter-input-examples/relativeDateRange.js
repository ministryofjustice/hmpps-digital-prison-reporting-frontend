const dayjs = require('dayjs')

const variant15 = {
  id: 'variantId-15',
  name: 'Relative Daterange',
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
        },
      },
      {
        name: 'field2',
        display: 'Relative date-range with min and max',
        sortable: false,
        visible: true,
        type: 'date',
        mandatory: false,
        filter: {
          type: 'daterange',
          min: dayjs().format('YYYY-MM-DD').toString(),
          max: dayjs().add(2, 'month').format('YYYY-MM-DD').toString(),
          mandatory: true,
        },
      },
    ],
  },
}

module.exports = variant15
