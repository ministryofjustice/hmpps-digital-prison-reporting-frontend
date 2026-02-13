import { components } from '../../../../../../../src/dpr/types/api'
import { DashboardVisualisationType } from '../../../../../../../src/dpr/components/_dashboards/dashboard-visualisation/types'

export const fullDataset: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'allData',
  type: DashboardVisualisationType.LIST,
  display: 'All Data in dataset',
  options: {
    showLatest: true,
  },
  columns: {
    measures: [],
    expectNulls: false,
  },
}

export const fullDatasetHistoric: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'allData',
  type: DashboardVisualisationType.LIST,
  display: 'All Data in dataset',
  options: {
    showLatest: false,
  },
  columns: {
    measures: [],
    expectNulls: false,
  },
}
