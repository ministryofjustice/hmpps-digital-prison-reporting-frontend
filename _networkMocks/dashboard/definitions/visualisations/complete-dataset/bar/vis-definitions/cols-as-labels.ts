import { components } from '../../../../../../../src/dpr/types/api'
import { DashboardVisualisationType } from '../../../../../../../src/dpr/components/_dashboards/dashboard-visualisation/types'

export const dataQualityEthnicityBar: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'bar-data-quality-has-ethnicity',
  type: DashboardVisualisationType.BAR,
  display: 'Ethnicity values',
  options: {
    horizontal: true,
  },
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

export const dataQualityEthnicityBarHorizontal = {
  id: 'bar-data-quality-has-ethnicity-horizontal',
  type: DashboardVisualisationType.BAR,
  display: 'Ethnicity values',
  options: {
    horizontal: true,
  },
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
  },
}

export const dataQualityReligionBar = {
  id: 'bar-data-quality-has-religion',
  type: DashboardVisualisationType.BAR,
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
  },
}

export const dataQualityNationalityBar = {
  id: 'bar-data-quality-has-nationality',
  type: DashboardVisualisationType.BAR,
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
  },
}

export const dataQualityAllBar = {
  id: 'bar-data-quality-all',
  type: DashboardVisualisationType.BAR,
  display: 'All metrics together',
  options: {
    horizontal: false,
  },
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
      {
        id: 'has_ethnicity',
        display: 'Has ethnicity',
      },
      {
        id: 'ethnicity_is_missing',
        display: 'No Ethnicity',
      },
    ],
  },
}

export const dataQualityAllBarHorizontal = {
  id: 'bar-data-quality-all',
  type: DashboardVisualisationType.BAR,
  display: 'All metrics together',
  options: {
    horizontal: true,
  },
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
      {
        id: 'has_ethnicity',
        display: 'Has ethnicity',
      },
      {
        id: 'ethnicity_is_missing',
        display: 'No Ethnicity',
      },
    ],
  },
}
