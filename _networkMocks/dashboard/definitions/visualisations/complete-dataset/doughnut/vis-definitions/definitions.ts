import { components } from '../../../../../../../src/dpr/types/api'
import { DashboardVisualisationType } from '../../../../../../../src/dpr/components/_dashboards/dashboard-visualisation/types'

export const dataQualityEthnicityDoughnut: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'doughnut-data-quality-has-ethnicity',
  type: DashboardVisualisationType.DONUT,
  display: 'Ethnicity values',
  columns: {
    keys: [
      {
        id: 'establishment_id',
        display: 'Establishment ID',
      },
    ],
    measures: [
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

export const dataQualityReligionDoughnut: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'doughnut-data-quality-has-religion',
  type: DashboardVisualisationType.DONUT,
  display: 'Religion values',
  columns: {
    keys: [
      {
        id: 'establishment_id',
        display: 'Establishment ID',
      },
    ],
    measures: [
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

export const dataQualityNationalityDoughnut: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'doughnut-data-quality-has-nationality',
  type: DashboardVisualisationType.DONUT,
  display: 'Nationality values',
  columns: {
    keys: [
      {
        id: 'establishment_id',
        display: 'Establishment ID',
      },
    ],
    measures: [
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

export const dataQualityNationalityReligionDoughnut: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'doughnut-data-quality-has-nationality-religion',
  type: DashboardVisualisationType.DONUT,
  display: 'Nationality & Religion values',
  columns: {
    keys: [
      {
        id: 'establishment_id',
        display: 'Establishment ID',
      },
    ],
    measures: [
      {
        id: 'has_nationality',
        display: 'Has nationality',
      },
      {
        id: 'nationality_is_missing',
        display: 'No nationality',
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
