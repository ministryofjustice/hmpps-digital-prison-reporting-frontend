const dataQualityEthnicityBar = {
  id: 'bar-data-quality-has-ethnicity',
  type: 'bar',
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

const dataQualityReligionBar = {
  id: 'bar-data-quality-has-religion',
  type: 'bar',
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

const dataQualityNationalityBar = {
  id: 'bar-data-quality-has-nationality',
  type: 'bar',
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

const dataQualityAllBar = {
  id: 'bar-data-quality-all',
  type: 'bar',
  display: 'All metrics together',
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

const dataQualityListBar = {
  id: 'bar-data-quality-list',
  type: 'bar',
  display: 'All metrics',
  columns: {
    keys: [],
    measures: [
      {
        id: 'establishment_id',
        display: 'Establishment ID',
        axis: 'x',
      },
      {
        id: 'has_nationality',
        display: 'Has nationality',
        axis: 'y',
      },
    ],
  },
}

module.exports = {
  dataQualityEthnicityBar,
  dataQualityReligionBar,
  dataQualityNationalityBar,
  dataQualityAllBar,
  dataQualityListBar,
}
