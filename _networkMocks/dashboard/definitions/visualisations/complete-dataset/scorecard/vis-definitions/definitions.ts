import { components } from '../../../../../../../src/dpr/types/api'
import { DashboardVisualisationType } from '../../../../../../../src/dpr/components/_dashboards/dashboard-visualisation/types'

export const simpleScorecardNationality: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'simple-scorecard-nationality',
  type: DashboardVisualisationType.SCORECARD,
  display: 'No of prisoners with nationality',
  columns: {
    keys: [{ id: 'establishment_id' }],
    measures: [{ id: 'has_nationality' }],
    expectNulls: false,
  },
}

export const simpleScorecardNationalityFilter: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'simple-scorecard-nationality',
  type: DashboardVisualisationType.SCORECARD,
  display: 'No of prisoners with nationality',
  columns: {
    keys: [{ id: 'establishment_id' }],
    measures: [{ id: 'has_nationality' }],
    filters: [
      {
        id: 'establishment_id',
        equals: 'SLI',
      },
    ],
    expectNulls: false,
  },
}

export const simpleScorecardReligion: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'simple-scorecard-religion',
  type: DashboardVisualisationType.SCORECARD,
  display: 'No of prisoners with religion',
  columns: {
    keys: [{ id: 'establishment_id' }],
    measures: [{ id: 'has_religion' }],
    expectNulls: false,
  },
}

export const simpleScorecardEthnicity: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'simple-scorecard-ethnicity',
  type: DashboardVisualisationType.SCORECARD,
  display: 'No of prisoners with ethnicity',
  columns: {
    keys: [{ id: 'establishment_id' }],
    measures: [{ id: 'has_ethnicity' }],
    expectNulls: false,
  },
}

export const simpleScorecardRagColoursNationality: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'simple-scorecard-rag-nationality',
  type: DashboardVisualisationType.SCORECARD,
  display: 'No of prisoners with nationality',
  options: {
    useRagColour: true,
  },
  columns: {
    keys: [{ id: 'establishment_id' }],
    measures: [{ id: 'has_nationality' }],
    expectNulls: false,
  },
}

export const simpleScorecardRagColoursReligion: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'simple-scorecard-rag-religion',
  type: DashboardVisualisationType.SCORECARD,
  display: 'No of prisoners with religion',
  options: {
    useRagColour: true,
  },
  columns: {
    keys: [{ id: 'establishment_id' }],
    measures: [{ id: 'has_religion' }],
    expectNulls: false,
  },
}

export const simpleScorecardRagColoursEthnicity: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'simple-scorecard-rag-ethnicity',
  type: DashboardVisualisationType.SCORECARD,
  display: 'No of prisoners with ethnicity',
  options: {
    useRagColour: true,
  },
  columns: {
    keys: [{ id: 'establishment_id' }],
    measures: [{ id: 'has_ethnicity' }],
    expectNulls: false,
  },
}
