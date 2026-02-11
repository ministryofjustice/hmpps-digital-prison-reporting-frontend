export const dataQualityEthnicityHistoric = {
  id: 'list-data-quality-has-ethnicity-historic',
  type: 'list',
  display: 'Ethnicity Values',
  columns: {
    keys: [
      {
        id: 'establishment_id',
      },
    ],
    measures: [
      {
        id: 'ts',
        display: 'Date',
      },
      {
        id: 'establishment_id',
        display: 'Establishment ID',
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
  options: { showLatest: false },
}

export const dataQualityReligionHistoric = {
  id: 'list-data-quality-has-religion-historic',
  type: 'list',
  display: 'Religion Values',
  columns: {
    keys: [
      {
        id: 'establishment_id',
      },
    ],
    measures: [
      {
        id: 'ts',
        display: 'Date',
      },
      {
        id: 'establishment_id',
        display: 'Establishment ID',
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
  options: { showLatest: false },
}

export const dataQualityNationalityHistoric = {
  id: 'list-data-quality-has-nationality-historic',
  type: 'list',
  display: 'Nationality Values',
  columns: {
    keys: [
      {
        id: 'establishment_id',
      },
    ],
    measures: [
      {
        id: 'ts',
        display: 'Date',
      },
      {
        id: 'establishment_id',
        display: 'Establishment ID',
      },
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
  options: { showLatest: false },
}
