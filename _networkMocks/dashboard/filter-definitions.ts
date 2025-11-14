import { components } from '../../src/dpr/types/api'

type FilterField = components['schemas']['FieldDefinition']

export const establishmentIdFilter: FilterField = {
  header: false,
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

export const wingFilterCompass: FilterField = {
  header: false,
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

export const wingFilter: FilterField = {
  header: false,
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

export const granularDateRangeFilter: FilterField = {
  calculated: false,
  defaultsort: false,
  header: false,
  name: 'date',
  display: 'Date',
  sortable: false,
  visible: true,
  type: 'date',
  mandatory: false,
  filter: {
    type: 'granulardaterange',
    defaultQuickFilterValue: 'last-three-months',
    defaultValue: '2003-02-01 - 2006-05-04',
    mandatory: true,
    defaultGranularity: 'monthly',
    interactive: true,
  },
}
