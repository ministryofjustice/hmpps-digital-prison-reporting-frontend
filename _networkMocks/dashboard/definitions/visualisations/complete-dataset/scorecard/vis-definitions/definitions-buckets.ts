import { components } from '../../../../../../../src/dpr/types/api'
import { DashboardVisualisationType } from '../../../../../../../src/dpr/components/_dashboards/dashboard-visualisation/types'

export const simpleScorecardCustomBucketsNationality: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'simple-scorecard-rag',
  type: DashboardVisualisationType.SCORECARD,
  display: 'No of prisoners with nationality',
  options: {
    buckets: [{ hexColour: '#912b88' }, { hexColour: '#28a197' }, { hexColour: '#f47738' }],
  },
  columns: {
    keys: [{ id: 'establishment_id' }],
    measures: [{ id: 'has_nationality' }],
    expectNulls: false,
  },
}

export const simpleScorecardCustomBucketsEthnicity: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'simple-scorecard-rag',
  type: DashboardVisualisationType.SCORECARD,
  display: 'No of prisoners with ethnicity',
  options: {
    buckets: [{ hexColour: '#912b88' }, { hexColour: '#28a197' }, { hexColour: '#f47738' }],
  },
  columns: {
    keys: [{ id: 'establishment_id' }],
    measures: [{ id: 'has_ethnicity' }],
    expectNulls: false,
  },
}

export const simpleScorecardCustomBucketsReligion: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'simple-scorecard-rag',
  type: DashboardVisualisationType.SCORECARD,
  display: 'No of prisoners with religion',
  options: {
    buckets: [{ hexColour: '#912b88' }, { hexColour: '#28a197' }, { hexColour: '#f47738' }],
  },
  columns: {
    keys: [{ id: 'establishment_id' }],
    measures: [{ id: 'has_religion' }],
    expectNulls: false,
  },
}

export const simpleScorecardCustomBucketsBoundariesReligion: components['schemas']['DashboardVisualisationDefinition'] =
  {
    id: 'simple-scorecard-rag-religion',
    type: DashboardVisualisationType.SCORECARD,
    display: 'No of prisoners with religion',
    options: {
      useRagColour: true,
      buckets: [{ max: 500 }, { min: 501, max: 600 }, { min: 601 }],
    },
    columns: {
      keys: [{ id: 'establishment_id' }],
      measures: [{ id: 'has_religion' }],
      expectNulls: false,
    },
  }

export const simpleScorecardCustomBucketsBoundariesNationality: components['schemas']['DashboardVisualisationDefinition'] =
  {
    id: 'simple-scorecard-rag-nationality',
    type: DashboardVisualisationType.SCORECARD,
    display: 'No of prisoners with nationality',
    options: {
      useRagColour: true,
      buckets: [{ max: 300 }, { min: 301, max: 800 }, { min: 801 }],
    },
    columns: {
      keys: [{ id: 'establishment_id' }],
      measures: [{ id: 'has_nationality' }],
      expectNulls: false,
    },
  }

export const simpleScorecardCustomBucketsBoundariesEthnicity: components['schemas']['DashboardVisualisationDefinition'] =
  {
    id: 'simple-scorecard-rag-ethnicity',
    type: DashboardVisualisationType.SCORECARD,
    display: 'No of prisoners with ethnicity',
    options: {
      useRagColour: true,
      buckets: [{ max: 200 }, { min: 201, max: 700 }, { min: 701 }],
    },
    columns: {
      keys: [{ id: 'establishment_id' }],
      measures: [{ id: 'has_ethnicity' }],
      expectNulls: false,
    },
  }
