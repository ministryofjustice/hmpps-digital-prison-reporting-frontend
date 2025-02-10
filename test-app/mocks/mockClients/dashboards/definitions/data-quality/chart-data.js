const barChartDataHasEthnicity = {
  chart: {
    data: {
      datasets: [
        { data: [533, 614], label: 'MDI', total: 1147 },
        { data: [484, 713], label: 'SLI', total: 1197 },
        { data: [406, 682], label: 'DAI', total: 1088 },
      ],
      labels: ['Has ethnicity', 'Has no ethnicity'],
    },
    type: 'bar',
    unit: undefined,
  },
  details: {
    headlines: [
      {
        label: 'Total has ethnicity',
        value: 1423,
      },
    ],
    meta: [
      {
        label: 'Values for:',
        value: 'Jan 25',
      },
    ],
  },
  table: {
    head: [{ text: 'Establishment ID' }, { text: 'Has ethnicity' }, { text: 'Has no ethnicity' }],
    rows: [
      [{ text: 'MDI' }, { text: 533 }, { text: 614 }],
      [{ text: 'SLI' }, { text: 484 }, { text: 713 }],
      [{ text: 'DAI' }, { text: 406 }, { text: 682 }],
    ],
  },
}

const barChartFromListDataHasEthnicity = {
  chart: {
    data: {
      datasets: [
        { data: [533, 614], label: 'MDI', total: 1147 },
        { data: [484, 713], label: 'SLI', total: 1197 },
        { data: [406, 682], label: 'DAI', total: 1088 },
      ],
      labels: ['Has ethnicity', 'Has no ethnicity'],
    },
    type: 'bar',
    unit: undefined,
  },
  details: {
    headlines: [
      {
        label: 'Total has ethnicity',
        value: 1423,
      },
    ],
    meta: [
      {
        label: 'Values for:',
        value: 'Jan 25',
      },
    ],
  },
  table: {
    head: [{ text: 'Establishment ID' }, { text: 'Has ethnicity' }, { text: 'Has no ethnicity' }],
    rows: [
      [{ text: 'MDI' }, { text: 533 }, { text: 614 }],
      [{ text: 'SLI' }, { text: 484 }, { text: 713 }],
      [{ text: 'DAI' }, { text: 406 }, { text: 682 }],
    ],
  },
}

module.exports = {
  barChartDataHasEthnicity,
  barChartFromListDataHasEthnicity,
}
