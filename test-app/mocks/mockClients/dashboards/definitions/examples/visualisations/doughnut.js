const dataQualityEthnicityDoughnut = {
  id: 'doughnut-data-quality-has-ethnicity',
  type: 'doughnut',
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
  },
}

const dataQualityReligionDoughnut = {
  id: 'doughnut-data-quality-has-religion',
  type: 'doughnut',
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

const dataQualityNationalityDoughnut = {
  id: 'doughnut-data-quality-has-nationality',
  type: 'doughnut',
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

const dataQualityNationalityReligionDoughnut = {
  id: 'doughnut-data-quality-has-nationality-religion',
  type: 'doughnut',
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
  },
}

module.exports = {
  dataQualityEthnicityDoughnut,
  dataQualityNationalityDoughnut,
  dataQualityReligionDoughnut,
  dataQualityNationalityReligionDoughnut,
}
