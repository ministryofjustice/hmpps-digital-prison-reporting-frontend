import { components } from '../../../../../../../src/dpr/types/api'
import { DashboardVisualisationType } from '../../../../../../../src/dpr/components/_dashboards/dashboard-visualisation/types'

export const boxBlotWide1: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'box-plot-wide-1',
  type: DashboardVisualisationType.BOX_PLOT,
  display: 'Box plot example 1',
  description: 'Example of a box plot chart',
  options: {},
  columns: {
    keys: [],
    measures: [
      {
        id: 'cat1',
        display: 'Category 1',
      },
      {
        id: 'cat2',
        display: 'Category 2',
      },
      {
        id: 'cat3',
        display: 'Category 3',
      },
      {
        id: 'cat4',
        display: 'Category 4',
      },
    ],
    expectNulls: false,
  },
}

export const boxBlotWide2: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'box-plot-wide-2',
  type: DashboardVisualisationType.BOX_PLOT,
  display: 'Box plot example 2',
  description: 'Example of a box plot chart',
  options: {},
  columns: {
    keys: [],
    measures: [
      {
        id: 'cat1',
        display: 'Category 1',
      },
      {
        id: 'cat3',
        display: 'Category 3',
      },
    ],
    expectNulls: false,
  },
}

export const boxBlotGrouped1: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'box-plot-grouped-1',
  type: DashboardVisualisationType.BOX_PLOT,
  display: 'Box plot grouped example 1',
  description: 'Example of a box plot chart using groups',
  options: {},
  columns: {
    keys: [
      {
        id: 'date',
        display: 'Date',
      },
    ],
    measures: [
      {
        id: 'cat1',
        display: 'Category 1',
      },
    ],
    expectNulls: false,
  },
}

export const boxBlotGrouped2: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'box-plot-grouped-2',
  type: DashboardVisualisationType.BOX_PLOT,
  display: 'Box plot grouped example 2',
  description: 'Example of a box plot chart using groups - multiple categorys',
  options: {},
  columns: {
    keys: [
      {
        id: 'date',
        display: 'Date',
      },
    ],
    measures: [
      {
        id: 'cat1',
        display: 'Category 1',
      },
      {
        id: 'cat2',
        display: 'Category 2',
      },
    ],
    expectNulls: false,
  },
}

export const boxBlotGrouped3: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'box-plot-grouped-3',
  type: DashboardVisualisationType.BOX_PLOT,
  display: 'Box plot grouped example 3',
  description: 'Example of a box plot chart using groups - multiple categorys - horizontal',
  options: {
    horizontal: true,
  },
  columns: {
    keys: [
      {
        id: 'date',
        display: 'Date',
      },
    ],
    measures: [
      {
        id: 'cat1',
        display: 'Category 1',
      },
      {
        id: 'cat2',
        display: 'Category 2',
      },
      {
        id: 'cat3',
        display: 'Category 3',
      },
      {
        id: 'cat4',
        display: 'Category 4',
      },
      {
        id: 'cat5',
        display: 'Category 5',
      },
      {
        id: 'cat6',
        display: 'Category 6',
      },
      {
        id: 'cat7',
        display: 'Category 7',
      },
      {
        id: 'cat8',
        display: 'Category 8',
      },
    ],
    expectNulls: false,
  },
}

export const boxBlotGrouped4: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'box-plot-grouped-4',
  type: DashboardVisualisationType.BOX_PLOT,
  display: 'Box plot grouped example 3',
  description: 'Example of a box plot chart using groups - multiple categorys, composite key',
  options: {},
  columns: {
    keys: [
      {
        id: 'date',
        display: 'Date',
      },
      {
        id: 'type',
        display: 'type',
      },
    ],
    measures: [
      {
        id: 'cat1',
        display: 'Category 1',
      },
      {
        id: 'cat2',
        display: 'Category 2',
      },
    ],
    expectNulls: false,
  },
}
