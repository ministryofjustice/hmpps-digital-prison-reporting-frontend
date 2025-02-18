// DIET TOTALS

const dietTotalsBar = {
  id: 'bar-diet-totals',
  type: 'bar',
  display: 'Diet totals as bar chart',
  description: '',
  columns: {
    keys: [],
    measures: [
      {
        id: 'diet',
        display: 'Diet',
        axis: 'x',
      },
      {
        id: 'count',
        display: 'Total prisoners',
        axis: 'y',
      },
    ],
    expectNulls: true,
  },
}

const dietTotalsDoughnut = {
  id: 'bar-diet-totals',
  type: 'doughnut',
  display: 'Diet totals as doughnut chart',
  description: '',
  columns: {
    keys: [],
    measures: [
      {
        id: 'diet',
        display: 'Diet',
        axis: 'x',
      },
      {
        id: 'count',
        display: 'Total prisoners',
        axis: 'y',
      },
    ],
    expectNulls: true,
  },
}

const dietTotalsByEstablishmentBar = {
  id: 'diet-totals-by-establishment-bar',
  type: 'bar',
  display: 'Diet totals by establishment',
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
        id: 'diet',
        display: 'Diet',
        axis: 'x',
      },
      {
        id: 'count',
        display: 'Total prisoners',
        axis: 'y',
      },
    ],
    expectNulls: true,
  },
}

const dietTotalsByEstablishmentDoughnut = {
  ...dietTotalsByEstablishmentBar,
  id: 'diet-totals-by-establishment-doughnut',
  type: 'doughnut',
}

const dietTotalsByEstablishmentByWingBar = {
  id: 'diet-totals-by-establishment',
  type: 'bar',
  display: 'Diet totals by establishment',
  description: '',
  columns: {
    keys: [
      {
        id: 'establishment_id',
        display: 'Establishment ID',
      },
      {
        id: 'wing',
        display: 'Wing',
      },
    ],
    measures: [
      {
        id: 'diet',
        display: 'Diet',
        axis: 'x',
      },
      {
        id: 'count',
        display: 'Total prisoners',
        axis: 'y',
      },
    ],
    expectNulls: true,
  },
}

const dietTotalsByEstablishmentByWingDoughnut = {
  ...dietTotalsByEstablishmentByWingBar,
  id: 'diet-totals-by-establishment-and-wing-doughnut',
  type: 'doughnut',
}

const dietTotalsByEstablishmentByWingOptionalBar = {
  id: 'diet-totals-by-establishment-by-wing-optional-bar',
  type: 'bar',
  display: 'Diet totals by establishment, by wing',
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
        display: 'Diet',
        axis: 'x',
      },
      {
        id: 'count',
        display: 'Total prisoners',
        axis: 'y',
      },
    ],
    expectNulls: true,
  },
}

const dietTotalsByEstablishmentByWingOptionalDoughnut = {
  ...dietTotalsByEstablishmentByWingOptionalBar,
  id: 'diet-totals-by-establishment-and-wing-doughnut-optional',
  type: 'doughnut',
}

const dietTotalsByEstablishmentByWingByCellBar = {
  id: 'diet-totals-by-establishment-by-wing-by-cell-bar',
  type: 'bar',
  display: 'Diet totals by cell bar',
  description: '',
  columns: {
    keys: [
      {
        id: 'establishment_id',
        display: 'Establishment ID',
      },
      {
        id: 'wing',
      },
      {
        id: 'cell',
        display: 'Cell',
      },
    ],
    measures: [
      {
        id: 'diet',
        display: 'Diet',
        axis: 'x',
      },
      {
        id: 'count',
        display: 'Total prisoners',
        axis: 'y',
      },
    ],
  },
}

const dietTotalsByEstablishmentByWingByCellBarOptional = {
  id: 'diet-totals-by-establishment-by-wing-by-cell-bar-optional',
  type: 'bar',
  display: 'Flexible Diet totals Bar chart',
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
      {
        id: 'cell',
        display: 'Cell',
        optional: true,
      },
    ],
    measures: [
      {
        id: 'diet',
        display: 'Diet',
        axis: 'x',
      },
      {
        id: 'count',
        display: 'Total prisoners',
        axis: 'y',
      },
    ],
  },
}

const dietTotalsByEstablishmentByWingByCellPieOptional = {
  id: 'diet-totals-by-establishment-by-wing-by-cell-pie-optional',
  type: 'doughnut',
  display: 'Flexible Diet totals Pie chart',
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
        display: 'Diet',
        axis: 'x',
      },
      {
        id: 'count',
        display: 'Total prisoners',
        axis: 'y',
      },
    ],
    expectNulls: true,
  },
}

// DATA QUALITY

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
  display: 'nationality values',
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

const dataQualityEthnicityHistoricLine = {
  id: 'line-data-quality-has-ethnicity-historic',
  type: 'line',
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
        id: 'ts',
        display: 'Date',
      },
      {
        id: 'has_ethnicity',
        display: 'Has ethnicity',
      },
    ],
  },
  showLatest: false,
}

const dataQualityReligionHistoricLine = {
  id: 'line-data-quality-has-religion-historic',
  type: 'line',
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
        id: 'ts',
        display: 'Date',
      },
      {
        id: 'has_religion',
        display: 'Has religion',
      },
    ],
  },
  showLatest: false,
}

const dataQualityNationalityHistoricLine = {
  id: 'line-data-quality-has-nationality-historic',
  type: 'line',
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
        id: 'ts',
        display: 'Date',
      },
      {
        id: 'has_nationality',
        display: 'Has nationality',
      },
    ],
  },
  showLatest: false,
}

const dataQualityEthnicityHistoricBar = {
  id: 'line-data-quality-has-ethnicity-historic',
  type: 'bar-timeseries',
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
        id: 'ts',
        display: 'Date',
      },
      {
        id: 'has_ethnicity',
        display: 'Has ethnicity',
      },
    ],
  },
  showLatest: false,
}

const dataQualityReligionHistoricBar = {
  id: 'line-data-quality-has-religion-historic',
  type: 'bar-timeseries',
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
        id: 'ts',
        display: 'Date',
      },
      {
        id: 'has_religion',
        display: 'Has religion',
      },
    ],
  },
  showLatest: false,
}

const dataQualityNationalityHistoricBar = {
  id: 'line-data-quality-has-nationality-historic',
  type: 'bar-timeseries',
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
        id: 'ts',
        display: 'Date',
      },
      {
        id: 'has_nationality',
        display: 'Has nationality',
      },
    ],
  },
  showLatest: false,
}

const charts = {
  dietTotalsBar,
  dietTotalsDoughnut,
  dietTotalsByEstablishmentBar,
  dietTotalsByEstablishmentDoughnut,
  dietTotalsByEstablishmentByWingBar,
  dietTotalsByEstablishmentByWingDoughnut,
  dietTotalsByEstablishmentByWingOptionalBar,
  dietTotalsByEstablishmentByWingOptionalDoughnut,
  dietTotalsByEstablishmentByWingByCellBar,
  dietTotalsByEstablishmentByWingByCellBarOptional,
  dietTotalsByEstablishmentByWingByCellPieOptional,
  dataQualityEthnicityBar,
  dataQualityReligionBar,
  dataQualityNationalityBar,
  dataQualityEthnicityDoughnut,
  dataQualityReligionDoughnut,
  dataQualityNationalityDoughnut,
  dataQualityEthnicityHistoricLine,
  dataQualityReligionHistoricLine,
  dataQualityNationalityHistoricLine,
  dataQualityEthnicityHistoricBar,
  dataQualityReligionHistoricBar,
  dataQualityNationalityHistoricBar,
}

module.exports = charts
