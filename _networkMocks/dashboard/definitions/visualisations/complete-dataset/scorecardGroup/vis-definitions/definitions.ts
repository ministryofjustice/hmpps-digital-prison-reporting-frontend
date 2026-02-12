import { components } from '../../../../../../../src/dpr/types/api'
import { DashboardVisualisationType } from '../../../../../../../src/dpr/components/_dashboards/dashboard-visualisation/types'

export const dataQualityAllEstablishmentsEthnicity: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'data-quality-ethnicity',
  type: DashboardVisualisationType.SCORECARD_GROUP,
  display: 'Ethnicity score',
  description: '',
  options: {
    useRagColour: true,
    buckets: [{ min: 0, max: 500 }, { min: 501, max: 700 }, { min: 701 }],
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
        id: 'establishment_id',
        display: '',
      },
      {
        id: 'has_ethnicity',
        displayValue: true,
      },
    ],
    expectNulls: false,
  },
}

export const dataQualityAllEstablishmentsNoEthnicity: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'data-quality-no-ethnicity',
  type: DashboardVisualisationType.SCORECARD_GROUP,
  display: 'Missing ethnicity score',
  description: '',
  columns: {
    keys: [
      {
        id: 'establishment_id',
        display: 'Establishment ID',
      },
    ],
    measures: [
      {
        id: 'establishment_id',
        display: '',
      },
      {
        id: 'ethnicity_is_missing',
        displayValue: true,
      },
    ],
    expectNulls: false,
  },
}

export const dataQualityAllEstablishmentsReligion: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'data-quality-religion',
  type: DashboardVisualisationType.SCORECARD_GROUP,
  display: 'Religion score',
  description: '',
  columns: {
    keys: [
      {
        id: 'establishment_id',
        display: 'Establishment ID',
      },
    ],
    measures: [
      {
        id: 'establishment_id',
        display: '',
      },
      {
        id: 'has_religion',
        displayValue: true,
      },
    ],
    expectNulls: false,
  },
}

export const dataQualityAllEstablishmentsNoReligion: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'data-quality-no-religion',
  type: DashboardVisualisationType.SCORECARD_GROUP,
  display: 'Missing religion score',
  description: '',
  columns: {
    keys: [
      {
        id: 'establishment_id',
        display: 'Establishment ID',
      },
    ],
    measures: [
      {
        id: 'establishment_id',
        display: '',
      },
      {
        id: 'religion_is_missing',
        displayValue: true,
      },
    ],
    expectNulls: false,
  },
}

export const dataQualityAllEstablishmentsNationality: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'data-quality-nationality',
  type: DashboardVisualisationType.SCORECARD_GROUP,
  display: 'Nationality score',
  description: '',
  options: {
    useRagColour: true,
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
        id: 'establishment_id',
        display: '',
      },
      {
        id: 'has_nationality',
        displayValue: true,
      },
    ],
    expectNulls: false,
  },
}

export const dataQualityAllEstablishmentsNoNationality: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'data-quality-no-nationality',
  type: DashboardVisualisationType.SCORECARD_GROUP,
  display: 'Missing nationality score',
  description: '',
  columns: {
    keys: [
      {
        id: 'establishment_id',
        display: 'Establishment ID',
      },
    ],
    measures: [
      {
        id: 'establishment_id',
        display: '',
      },
      {
        id: 'nationality_is_missing',
        displayValue: true,
      },
    ],
    expectNulls: false,
  },
}

export const dataQualityAllCols: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'data-quality-columns-as-cards',
  type: DashboardVisualisationType.SCORECARD_GROUP,
  display: 'Data quality scores',
  description: '',
  options: {
    useRagColour: true,
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
        display: 'Nationality is missing',
      },
      {
        id: 'religion_is_missing',
        display: 'Religion is missing',
      },
      {
        id: 'has_religion',
        display: 'Has religion',
      },
      {
        id: 'ethnicity_is_missing',
        display: 'Ethnicity is missing',
      },
      {
        id: 'has_ethnicity',
        display: 'Has ethnicity',
      },
    ],
    expectNulls: false,
  },
}
