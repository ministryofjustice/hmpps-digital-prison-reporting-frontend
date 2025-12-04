import { components } from '../../../../src/dpr/types/api'

const dataQualityReligionHistoricLine: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'line-data-quality-has-religion-historic',
  type: 'line-timeseries',
  display: 'Religion values',
  columns: {
    expectNulls: false,
    keys: [
      {
        id: 'establishment_id',
        display: 'Establishment ID',
      },
    ],
    measures: [
      {
        id: 'ts',
        display: 'Date',
      },
      {
        id: 'has_religion',
        display: 'Has religion',
      },
    ],
  },
}

const dataQualityNationalityHistoricLine: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'line-data-quality-has-nationality-historic',
  type: 'line-timeseries',
  display: 'Nationality values',
  columns: {
    expectNulls: false,
    keys: [
      {
        id: 'establishment_id',
        display: 'Establishment ID',
      },
    ],
    measures: [
      {
        id: 'ts',
        display: 'Date',
      },
      {
        id: 'has_nationality',
        display: 'Has nationality',
      },
    ],
  },
}

const lineCharts = {
  dataQualityReligionHistoricLine,
  dataQualityNationalityHistoricLine,
}

export default lineCharts
