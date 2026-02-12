import { components } from '../../../../../../../src/dpr/types/api'
import { DashboardVisualisationType } from '../../../../../../../src/dpr/components/_dashboards/dashboard-visualisation/types'

export const dataQualityEthnicity: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'list-data-quality-has-ethnicity',
  type: DashboardVisualisationType.LIST,
  display: 'Ethnicity Values',
  columns: {
    keys: [
      {
        id: 'establishment_id',
      },
    ],
    measures: [
      {
        id: 'establishment_id',
        display: 'Establishment ID',
      },
      {
        id: 'has_ethnicity',
        display: 'Has ethnicity',
      },
      {
        id: 'ethnicity_is_missing',
        display: 'No Ethnicity',
      },
    ],
    expectNulls: false,
  },
}

export const dataQualityReligion: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'list-data-quality-has-religion',
  type: DashboardVisualisationType.LIST,
  display: 'Religion Values',
  columns: {
    keys: [
      {
        id: 'establishment_id',
      },
    ],
    measures: [
      {
        id: 'establishment_id',
        display: 'Establishment ID',
      },
      {
        id: 'has_religion',
        display: 'Has religion',
      },
      {
        id: 'religion_is_missing',
        display: 'No religion',
      },
    ],
    expectNulls: false,
  },
}

export const dataQualityNationality: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'list-data-quality-has-nationality',
  type: DashboardVisualisationType.LIST,
  display: 'nationality Values',
  columns: {
    keys: [
      {
        id: 'establishment_id',
      },
    ],
    measures: [
      {
        id: 'establishment_id',
        display: 'Establishment ID',
      },
      {
        id: 'has_nationality',
        display: 'Has nationality',
      },
      {
        id: 'nationality_is_missing',
        display: 'No nationality',
      },
    ],
    expectNulls: false,
  },
}
