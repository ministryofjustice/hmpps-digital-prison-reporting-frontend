import { components } from '../../../../../../../src/dpr/types/api'
import { DashboardVisualisationType } from '../../../../../../../src/dpr/components/_dashboards/dashboard-visualisation/types'

export const dataQualityEthnicityHistoric: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'list-data-quality-has-ethnicity-historic',
  type: DashboardVisualisationType.LIST,
  display: 'Ethnicity values',
  description: 'List visualisation showing historic ethnicity values',
  columns: {
    keys: [
      {
        id: 'establishment_id',
      },
    ],
    measures: [
      {
        id: 'ts',
        display: 'Date',
      },
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
  options: { showLatest: false },
}

export const dataQualityReligionHistoric: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'list-data-quality-has-religion-historic',
  type: DashboardVisualisationType.LIST,
  display: 'Religion Values',
  description: 'List visualisation showing historic religion values',
  columns: {
    keys: [
      {
        id: 'establishment_id',
      },
    ],
    measures: [
      {
        id: 'ts',
        display: 'Date',
      },
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
  options: { showLatest: false },
}

export const dataQualityNationalityHistoric: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'list-data-quality-has-nationality-historic',
  type: DashboardVisualisationType.LIST,
  display: 'Nationality values',
  description: 'List visualisation showing historic nationality values',
  columns: {
    keys: [
      {
        id: 'establishment_id',
      },
    ],
    measures: [
      {
        id: 'ts',
        display: 'Date',
      },
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
  options: { showLatest: false },
}
