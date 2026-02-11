export const dataQualityAllEstablishmentsEthnicity = {
  id: 'data-quality-ethnicity',
  type: 'scorecard-group',
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
  },
}

export const dataQualityAllEstablishmentsNoEthnicity = {
  id: 'data-quality-no-ethnicity',
  type: 'scorecard-group',
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
  },
}

export const dataQualityAllEstablishmentsReligion = {
  id: 'data-quality-religion',
  type: 'scorecard-group',
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
  },
}

export const dataQualityAllEstablishmentsNoReligion = {
  id: 'data-quality-no-religion',
  type: 'scorecard-group',
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
  },
}

export const dataQualityAllEstablishmentsNationality = {
  id: 'data-quality-nationality',
  type: 'scorecard-group',
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
  },
}

export const dataQualityAllEstablishmentsNoNationality = {
  id: 'data-quality-no-nationality',
  type: 'scorecard-group',
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
  },
}

export const dataQualityAllCols = {
  id: 'data-quality-columns-as-cards',
  type: 'scorecard-group',
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
  },
}
