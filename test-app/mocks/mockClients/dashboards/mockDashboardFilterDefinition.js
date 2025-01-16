const establishmentIdFilter = {
  name: 'establishment_id',
  display: 'Establishment ID',
  filter: {
    type: 'Select',
    mandatory: false,
    staticOptions: [
      {
        name: 'MDI',
        display: 'MDI',
      },
      {
        name: 'SLI',
        display: 'SLI',
      },
      {
        name: 'LTI',
        display: 'LTI',
      },
      {
        name: 'DAI',
        display: 'DAI',
      },
    ],
    dynamicOptions: {
      minimumLength: null,
    },
    interactive: true,
  },
  sortable: false,
  defaultsort: false,
  type: 'string',
  mandatory: false,
  visible: true,
  calculated: false,
}

const granularDateRangeFilter = {
  name: 'date',
  display: 'Date',
  sortable: false,
  visible: true,
  type: 'date',
  mandatory: false,
  filter: {
    type: 'granulardaterange',
    defaultQuickFilterValue: 'last-ninety-days',
    defaultValue: '2003-02-01 - 2006-05-04',
    mandatory: true,
    defaultGranularity: 'daily',
    interactive: true,
  },
}

module.exports = {
  establishmentIdFilter,
  granularDateRangeFilter,
}
