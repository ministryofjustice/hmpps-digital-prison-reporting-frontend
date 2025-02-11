const { establishmentIdFilter, granularDateRangeFilter } = require('../../filter-definitions')

const listDef = {
  id: 'allData',
  type: 'list',
  display: 'All Data in dataset',
  columns: {
    measures: [
      {
        id: 'timestamp',
        display: 'timestamp',
      },
      {
        id: 'establishment_id',
        display: 'establishment_id',
      },
      {
        id: 'wing',
        display: 'wing',
      },
      {
        id: 'total_prisoners',
        display: 'total_prisoners',
      },
      {
        id: 'random_metric',
        display: 'random_metric',
      },
      {
        id: 'random_metric_2',
        display: 'random_metric_2',
      },
    ],
    expectNulls: true,
  },
}

const timeseries = {
  id: 'timeseries',
  type: 'line',
  display: 'timeseries',
  description: 'timeseries',
  columns: {
    keys: [
      {
        id: 'establishment_id',
        display: 'establishment_id',
      },
      {
        id: 'wing',
        display: 'wing',
      },
    ],
    measures: [
      {
        id: 'timestamp',
        display: 'Date',
      },
      {
        id: 'random_metric_2',
        display: 'random_metric_2',
      },
    ],
  },
}

const mockDataDashboard1 = {
  id: 'mock-data-dashboard-1',
  name: 'Mock Data dashboard',
  description: 'Mock Data testing',
  sections: [
    {
      id: 'charts-section',
      display: 'Charts Test Section',
      visualisations: [listDef, timeseries],
    },
  ],
  filterFields: [establishmentIdFilter, granularDateRangeFilter],
}

module.exports = {
  mockDataDashboard1,
}
