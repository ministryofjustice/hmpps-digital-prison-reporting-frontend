import { components } from '../../../src/dpr/types/api'

const simpleScorecardNationality: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'simple-scorecard-nationality',
  type: 'scorecard',
  display: 'No of prisoners with nationality',
  description: 'Example definition description',
  columns: {
    keys: [{ id: 'establishment_id' }],
    measures: [{ id: 'has_nationality' }],
    expectNulls: false,
  },
}

const simpleScorecardNationalityFilter: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'simple-scorecard-nationality',
  type: 'scorecard',
  display: 'No of prisoners with nationality',
  description: 'Example definition description',
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

const simpleScorecardReligion: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'simple-scorecard-religion',
  type: 'scorecard',
  display: 'No of prisoners with religion',
  description: 'Example definition description',
  columns: {
    keys: [{ id: 'establishment_id' }],
    measures: [{ id: 'has_religion' }],
    expectNulls: false,
  },
}

const simpleScorecardEthnicity: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'simple-scorecard-ethnicity',
  type: 'scorecard',
  display: 'No of prisoners with ethnicity',
  description: 'Example definition description',
  columns: {
    keys: [{ id: 'establishment_id' }],
    measures: [{ id: 'has_ethnicity' }],
    expectNulls: false,
  },
}

const simpleScorecardRagColoursNationality: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'simple-scorecard-rag-nationality',
  type: 'scorecard',
  display: 'No of prisoners with nationality',
  description: 'Rag score in dataset. Uses rag colours',
  options: {
    useRagColour: true,
  },
  columns: {
    keys: [{ id: 'establishment_id' }],
    measures: [{ id: 'has_nationality' }],
    expectNulls: false,
  },
}

const simpleScorecardRagColoursReligion: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'simple-scorecard-rag-religion',
  type: 'scorecard',
  display: 'No of prisoners with religion',
  description: 'Rag score in dataset. Uses rag colours',
  options: {
    useRagColour: true,
  },
  columns: {
    keys: [{ id: 'establishment_id' }],
    measures: [{ id: 'has_religion' }],
    expectNulls: false,
  },
}

const simpleScorecardRagColoursEthnicity: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'simple-scorecard-rag-ethnicity',
  type: 'scorecard',
  display: 'No of prisoners with ethnicity',
  description: 'Rag score in dataset. Uses rag colours',
  options: {
    useRagColour: true,
  },
  columns: {
    keys: [{ id: 'establishment_id' }],
    measures: [{ id: 'has_ethnicity' }],
    expectNulls: false,
  },
}

const simpleScorecardCustomBucketsNationality: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'simple-scorecard-rag',
  type: 'scorecard',
  display: 'No of prisoners with nationality',
  description: 'Rag score in dataset. Uses rag colours',
  options: {
    buckets: [{ hexColour: '#912b88' }, { hexColour: '#28a197' }, { hexColour: '#f47738' }],
  },
  columns: {
    keys: [{ id: 'establishment_id' }],
    measures: [{ id: 'has_nationality' }],
    expectNulls: false,
  },
}

const simpleScorecardCustomBucketsEthnicity: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'simple-scorecard-rag',
  type: 'scorecard',
  display: 'No of prisoners with ethnicity',
  description: 'Rag score in dataset. Uses rag colours',
  options: {
    buckets: [{ hexColour: '#912b88' }, { hexColour: '#28a197' }, { hexColour: '#f47738' }],
  },
  columns: {
    keys: [{ id: 'establishment_id' }],
    measures: [{ id: 'has_ethnicity' }],
    expectNulls: false,
  },
}

const simpleScorecardCustomBucketsReligion: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'simple-scorecard-rag',
  type: 'scorecard',
  display: 'No of prisoners with religion',
  description: 'Rag score in dataset. Uses rag colours',
  options: {
    buckets: [{ hexColour: '#912b88' }, { hexColour: '#28a197' }, { hexColour: '#f47738' }],
  },
  columns: {
    keys: [{ id: 'establishment_id' }],
    measures: [{ id: 'has_religion' }],
    expectNulls: false,
  },
}

const simpleScorecardCustomBucketsBoundariesReligion: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'simple-scorecard-rag-religion',
  type: 'scorecard',
  display: 'No of prisoners with religion',
  description: 'Custom buckets',
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

const simpleScorecardCustomBucketsBoundariesNationality: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'simple-scorecard-rag-nationality',
  type: 'scorecard',
  display: 'No of prisoners with nationality',
  description: 'Custom buckets',
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

const simpleScorecardCustomBucketsBoundariesEthnicity: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'simple-scorecard-rag-ethnicity',
  type: 'scorecard',
  display: 'No of prisoners with ethnicity',
  description: 'Custom buckets',
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

const dietTotalFilterEstWing: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'sc-diet-totals-by-establishment-by-wing-by-cell',
  type: 'scorecard',
  display: 'Vegetarians in MDI, in North wing',
  columns: {
    keys: [{ id: 'establishment_id' }, { id: 'wing' }],
    measures: [{ id: 'count' }],
    filters: [
      {
        id: 'diet',
        equals: 'Vegetarian',
      },
      {
        id: 'establishment_id',
        equals: 'MDI',
      },
      {
        id: 'wing',
        equals: 'north',
      },
    ],
    expectNulls: true,
  },
}

const dietTotalFilter: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'sc-diet-totals-by-establishment-by-wing-by-cell',
  type: 'scorecard',
  display: 'Total Vegetarians',
  columns: {
    measures: [{ id: 'count' }],
    filters: [
      {
        id: 'diet',
        equals: 'Vegetarian',
      },
    ],
    expectNulls: true,
  },
}

const dataQuality = {
  simpleScorecardNationality,
  simpleScorecardReligion,
  simpleScorecardEthnicity,
  simpleScorecardRagColoursNationality,
  simpleScorecardRagColoursReligion,
  simpleScorecardRagColoursEthnicity,
  simpleScorecardCustomBucketsNationality,
  simpleScorecardCustomBucketsEthnicity,
  simpleScorecardCustomBucketsReligion,
  simpleScorecardCustomBucketsBoundariesNationality,
  simpleScorecardCustomBucketsBoundariesEthnicity,
  simpleScorecardCustomBucketsBoundariesReligion,
  simpleScorecardNationalityFilter,
}

const dietMetrics = {
  dietTotalFilter,
  dietTotalFilterEstWing,
}

const scorecard = {
  ...dataQuality,
  ...dietMetrics,
}

export default scorecard
