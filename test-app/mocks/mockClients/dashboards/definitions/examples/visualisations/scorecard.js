// @ts-nocheck
const simpleScorecardNationality = {
  id: 'simple-scorecard-nationality',
  type: 'scorecard',
  display: 'No of prisoners with nationality',
  description: 'Example definition description',
  columns: {
    keys: [{ id: 'establishment_id' }],
    measures: [{ id: 'has_nationality' }],
  },
}

const simpleScorecardNationalityFilter = {
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
  },
}

const simpleScorecardReligion = {
  id: 'simple-scorecard-religion',
  type: 'scorecard',
  display: 'No of prisoners with religion',
  description: 'Example definition description',
  columns: {
    keys: [{ id: 'establishment_id' }],
    measures: [{ id: 'has_religion' }],
  },
}

const simpleScorecardEthnicity = {
  id: 'simple-scorecard-ethnicity',
  type: 'scorecard',
  display: 'No of prisoners with ethnicity',
  description: 'Example definition description',
  columns: {
    keys: [{ id: 'establishment_id' }],
    measures: [{ id: 'has_ethnicity' }],
  },
}

const simpleScorecardRagColoursNationality = {
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
  },
}

const simpleScorecardRagColoursReligion = {
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
  },
}

const simpleScorecardRagColoursEthnicity = {
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
  },
}

const simpleScorecardCustomBucketsNationality = {
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
  },
}

const simpleScorecardCustomBucketsEthnicity = {
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
  },
}

const simpleScorecardCustomBucketsReligion = {
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
  },
}

const simpleScorecardCustomBucketsBoundariesReligion = {
  id: 'simple-scorecard-rag',
  type: 'scorecard',
  display: 'No of prisoners with religion',
  description: 'Custom buckets',
  options: {
    useRagColour: true,
    buckets: [{ max: 40 }, { min: 41, max: 60 }, { min: 61 }],
  },
  columns: {
    keys: [{ id: 'establishment_id' }],
    measures: [{ id: 'has_religion' }],
  },
}

const simpleScorecardCustomBucketsBoundariesNationality = {
  id: 'simple-scorecard-rag',
  type: 'scorecard',
  display: 'No of prisoners with nationality',
  description: 'Custom buckets',
  options: {
    useRagColour: true,
    buckets: [{ max: 50 }, { min: 51, max: 55 }, { min: 56 }],
  },
  columns: {
    keys: [{ id: 'establishment_id' }],
    measures: [{ id: 'has_nationality' }],
  },
}

const simpleScorecardCustomBucketsBoundariesEthnicity = {
  id: 'simple-scorecard-rag',
  type: 'scorecard',
  display: 'No of prisoners with ethnicity',
  description: 'Custom buckets',
  options: {
    useRagColour: true,
    buckets: [{ max: 20 }, { min: 21, max: 70 }, { min: 71 }],
  },
  columns: {
    keys: [{ id: 'establishment_id' }],
    measures: [{ id: 'has_ethnicity' }],
  },
}

const dietTotalFilterEstWing = {
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

const dietTotalFilter = {
  id: 'sc-diet-totals-by-establishment-by-wing-by-cell',
  type: 'scorecard',
  display: 'Total Vegetarians',
  columns: {
    keys: [],
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

module.exports = scorecard
