const dietTotalsVegetarianOvertime = {
  id: 'diet-totals-vegetarian-overtime',
  type: 'matrix-timeseries',
  display: 'Vegetarian totals over time matrix chart',
  description: '',
  options: {
    showLatest: false,
  },
  columns: {
    keys: [
      {
        id: 'ts',
      },
    ],
    measures: [
      {
        id: 'ts',
        display: 'Date',
      },
      {
        id: 'count',
        display: 'Total prisoners',
      },
    ],
    filters: [
      {
        id: 'diet',
        equals: 'Vegetarian',
      },
    ],
    expectNulls: true,
  },
}

const dietTotalsVegetarianOvertimeRag = {
  id: 'diet-totals-vegetarian-overtime-rag',
  type: 'matrix-timeseries',
  display: 'Vegetarian totals over time matrix chart RAG',
  description: '',
  options: {
    showLatest: false,
    ragStatus: true,
  },
  columns: {
    keys: [
      {
        id: 'ts',
      },
    ],
    measures: [
      {
        id: 'ts',
        display: 'Date',
      },
      {
        id: 'count',
        display: 'Total prisoners',
      },
    ],
    filters: [
      {
        id: 'diet',
        equals: 'Vegetarian',
      },
    ],
    expectNulls: true,
  },
}

module.exports = {
  dietTotalsVegetarianOvertime,
  dietTotalsVegetarianOvertimeRag,
}
