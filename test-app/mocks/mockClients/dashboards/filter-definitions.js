// @ts-nocheck
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
    defaultValue: 'MDI',
    dynamicOptions: {
      minimumLength: undefined,
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

const wingFilterCompass = {
  name: 'wing',
  display: 'Wing',
  filter: {
    type: 'Select',
    mandatory: false,
    staticOptions: [
      {
        name: 'east',
        display: 'East',
      },
      {
        name: 'west',
        display: 'West',
      },
      {
        name: 'north',
        display: 'North',
      },
      {
        name: 'south',
        display: 'South',
      },
    ],
    defaultValue: 'north',
    dynamicOptions: {
      minimumLength: undefined,
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

const wingFilter = {
  name: 'wing',
  display: 'Wing',
  filter: {
    type: 'Select',
    mandatory: false,
    staticOptions: [
      {
        name: 'I',
        display: 'I',
      },
      {
        name: 'J',
        display: 'J',
      },
      {
        name: 'K',
        display: 'K',
      },
      {
        name: 'L',
        display: 'L',
      },
    ],
    defaultValue: 'I',
    dynamicOptions: {
      minimumLength: undefined,
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

const dateRangeFilter = {
  name: 'date',
  display: 'Date',
  sortable: false,
  visible: true,
  type: 'date',
  mandatory: false,
  filter: {
    type: 'daterange',
    defaultValue: '2025-01-01 - 2025-02-01',
    mandatory: true,
    interactive: true,
  },
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
    defaultQuickFilterValue: 'last-six-months',
    defaultValue: '2003-02-01 - 2006-05-04',
    mandatory: true,
    defaultGranularity: 'months',
    interactive: true,
  },
}

module.exports = {
  establishmentIdFilter,
  granularDateRangeFilter,
  wingFilterCompass,
  wingFilter,
  dateRangeFilter,
}
