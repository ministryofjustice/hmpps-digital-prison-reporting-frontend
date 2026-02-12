import { components } from '../../../../../../../src/dpr/types/api'
import { DashboardVisualisationType } from '../../../../../../../src/dpr/components/_dashboards/dashboard-visualisation/types'

export const mockEthnicityLineChartTimeseries: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'mockEthnicityLineChartTimeseries',
  type: DashboardVisualisationType.LINE_TIMESERIES,
  display: 'Missing ethnicity timeseries chart',
  description: 'Prisoner totals for missing ethnicity by establishment over time',
  columns: {
    keys: [
      {
        id: 'establishment_id',
        display: 'Establishment ID',
      },
    ],
    measures: [
      {
        id: 'ts',
        display: 'Date',
      },
      {
        id: 'ethnicity_is_missing',
        display: 'Has no ethnicity',
      },
    ],
    filters: [
      {
        id: 'establishment_id',
        equals: 'MDI',
      },
    ],
    expectNulls: false,
  },
}

export const mockNationalityLineChartTimeseries: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'mockEthnicityLineChartTimeseries',
  type: DashboardVisualisationType.LINE_TIMESERIES,
  display: 'Missing nationality timeseries chart',
  description: 'Prisoner totals for missing nationality by establishment over time',
  columns: {
    keys: [
      {
        id: 'establishment_id',
        display: 'Establishment ID',
      },
    ],
    measures: [
      {
        id: 'ts',
        display: 'Date',
      },
      {
        id: 'nationality_is_missing',
        display: 'Has no nationality',
      },
    ],
    filters: [
      {
        id: 'establishment_id',
        equals: 'MDI',
      },
    ],
    expectNulls: false,
  },
}

export const mockReligionLineChartTimeseries: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'mockEthnicityLineChartTimeseries',
  type: DashboardVisualisationType.LINE_TIMESERIES,
  display: 'Missing religion timeseries chart',
  description: 'Prisoner totals for missing religion by establishment over time',
  columns: {
    keys: [
      {
        id: 'establishment_id',
        display: 'Establishment ID',
      },
    ],
    measures: [
      {
        id: 'ts',
        display: 'Date',
      },
      {
        id: 'religion_is_missing',
        display: 'Has no religion',
      },
    ],
    filters: [
      {
        id: 'establishment_id',
        equals: 'MDI',
      },
    ],
    expectNulls: false,
  },
}

export const mockEthnicityLineChartTimeseriesAllEst: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'mockEthnicityLineChartTimeseries',
  type: DashboardVisualisationType.LINE_TIMESERIES,
  display: 'Missing ethnicity timeseries chart',
  description: 'Prisoner totals for missing ethnicity for multiple establishments over time',
  columns: {
    keys: [
      {
        id: 'establishment_id',
        display: 'Establishment ID',
      },
    ],
    measures: [
      {
        id: 'ts',
        display: 'Date',
      },
      {
        id: 'ethnicity_is_missing',
        display: 'Has no ethnicity',
      },
    ],
    expectNulls: false,
  },
}

export const mockNationalityLineChartTimeseriesAllEst: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'mockEthnicityLineChartTimeseries',
  type: DashboardVisualisationType.LINE_TIMESERIES,
  display: 'Missing nationality timeseries chart',
  description: 'Prisoner totals for missing nationality for all establishments over time',
  columns: {
    keys: [
      {
        id: 'establishment_id',
        display: 'Establishment ID',
      },
    ],
    measures: [
      {
        id: 'ts',
        display: 'Date',
      },
      {
        id: 'nationality_is_missing',
        display: 'Has no nationality',
      },
    ],
    expectNulls: false,
  },
}

export const mockReligionLineChartTimeseriesAllEst: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'mockEthnicityLineChartTimeseries',
  type: DashboardVisualisationType.LINE_TIMESERIES,
  display: 'Missing religion timeseries chart',
  description: 'Prisoner totals for missing religion for all establishments over time',
  columns: {
    keys: [
      {
        id: 'establishment_id',
        display: 'Establishment ID',
      },
    ],
    measures: [
      {
        id: 'ts',
        display: 'Date',
      },
      {
        id: 'religion_is_missing',
        display: 'Has no religion',
      },
    ],
    expectNulls: false,
  },
}
