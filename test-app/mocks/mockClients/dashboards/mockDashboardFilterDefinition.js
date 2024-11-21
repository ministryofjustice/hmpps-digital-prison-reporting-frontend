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

module.exports = {
  establishmentIdFilter,
}
