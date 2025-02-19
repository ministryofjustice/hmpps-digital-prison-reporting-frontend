const dietTotals = {
  id: 'sc-diet-totals',
  type: 'scorecard-group',
  display: 'Diet totals',
  description: '',
  columns: {
    measures: [
      {
        id: 'diet',
        display: '',
      },
      {
        id: 'count',
        displayValue: true,
      },
    ],
    expectNulls: true,
  },
}

const dietTotalsByEstablishment = {
  id: 'sc-diet-totals-by-establishment',
  type: 'scorecard-group',
  display: 'Diet totals for establishment',
  description: '',
  columns: {
    keys: [
      {
        id: 'establishment_id',
      },
    ],
    measures: [
      {
        id: 'diet',
        display: '',
      },
      {
        id: 'count',
        displayValue: true,
      },
    ],
    expectNulls: true,
  },
}

const dietTotalsByEstablishmentByWing = {
  id: 'sc-diet-totals-by-establishment-by-wing',
  type: 'scorecard-group',
  display: 'Diet totals by establishment, by wing',
  description: '',
  columns: {
    keys: [
      {
        id: 'establishment_id',
      },
      {
        id: 'wing',
      },
    ],
    measures: [
      {
        id: 'diet',
        display: '',
      },
      {
        id: 'count',
        displayValue: true,
      },
    ],
    expectNulls: true,
  },
}

const dietTotalsByEstablishmentByWingOptional = {
  id: 'sc-diet-totals-by-establishment-by-wing-optional',
  type: 'scorecard-group',
  display: 'Diet totals, by est, by wing - optional keys',
  description: '',
  columns: {
    keys: [
      {
        id: 'establishment_id',
        optional: true,
      },
      {
        id: 'wing',
        optional: true,
      },
    ],
    measures: [
      {
        id: 'diet',
        display: '',
      },
      {
        id: 'count',
        displayValue: true,
      },
    ],
    expectNulls: true,
  },
}

const dietTotalsByEstablishmentOptional = {
  id: 'sc-diet-totals-by-establishment-optional',
  type: 'scorecard-group',
  display: 'Diet totals by establishment',
  description: '',
  columns: {
    keys: [
      {
        id: 'establishment_id',
        optional: true,
      },
    ],
    measures: [
      {
        id: 'diet',
        display: '',
      },
      {
        id: 'count',
        displayValue: true,
      },
    ],
    expectNulls: true,
  },
}

const dietTotalsByEstablishmentByWingByCell = {
  id: 'sc-diet-totals-by-establishment-by-wing-by-cell',
  type: 'scorecard-group',
  display: 'Diet totals in Cell 1',
  description: 'Filter rows where cell is equal to "cell-1"',
  columns: {
    keys: [
      {
        id: 'establishment_id',
      },
      {
        id: 'wing',
      },
    ],
    measures: [
      {
        id: 'diet',
        display: '',
      },
      {
        id: 'count',
        displayValue: true,
      },
    ],
    filters: [
      {
        id: 'cell',
        equals: 'cell-1',
      },
    ],
  },
}

const dietTotalsByEstablishmentByWingByCellLoop = {
  id: 'diet-totals-by-establishment-by-wing-by-cell-loop',
  type: 'scorecard-group',
  display: 'Diet totals by cell loop',
  description: '',
  columns: {
    keys: [
      {
        id: 'establishment_id',
      },
      {
        id: 'wing',
      },
    ],
    measures: [
      {
        id: 'cell',
      },
      {
        id: 'diet',
        display: '',
      },
      {
        id: 'count',
        displayValue: true,
      },
    ],
  },
}

// Data Quality

const dataQualityAllEstablishmentsEthnicity = {
  id: 'data-quality-ethnicity',
  type: 'scorecard-group',
  display: 'Ethnicity score',
  description: '',
  columns: {
    keys: [
      {
        id: 'establishment_id',
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

const dataQualityAllEstablishmentsNoEthnicity = {
  id: 'data-quality-no-ethnicity',
  type: 'scorecard-group',
  display: 'Missing ethnicity score',
  description: '',
  columns: {
    keys: [
      {
        id: 'establishment_id',
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

const dataQualityAllEstablishmentsReligion = {
  id: 'data-quality-religion',
  type: 'scorecard-group',
  display: 'Religion score',
  description: '',
  columns: {
    keys: [
      {
        id: 'establishment_id',
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

const dataQualityAllEstablishmentsNoReligion = {
  id: 'data-quality-no-religion',
  type: 'scorecard-group',
  display: 'Missing religion score',
  description: '',
  columns: {
    keys: [
      {
        id: 'establishment_id',
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

const dataQualityAllEstablishmentsNationality = {
  id: 'data-quality-nationality',
  type: 'scorecard-group',
  display: 'Nationality score',
  description: '',
  columns: {
    keys: [
      {
        id: 'establishment_id',
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

const dataQualityAllEstablishmentsNoNationality = {
  id: 'data-quality-no-nationality',
  type: 'scorecard-group',
  display: 'Missing nationality score',
  description: '',
  columns: {
    keys: [
      {
        id: 'establishment_id',
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

const scorecards = {
  dietTotals,
  dietTotalsByEstablishment,
  dietTotalsByEstablishmentByWing,
  dietTotalsByEstablishmentOptional,
  dietTotalsByEstablishmentByWingOptional,
  dietTotalsByEstablishmentByWingByCell,
  dietTotalsByEstablishmentByWingByCellLoop,
  dataQualityAllEstablishmentsEthnicity,
  dataQualityAllEstablishmentsNoEthnicity,
  dataQualityAllEstablishmentsReligion,
  dataQualityAllEstablishmentsNoReligion,
  dataQualityAllEstablishmentsNationality,
  dataQualityAllEstablishmentsNoNationality,
}

module.exports = scorecards
