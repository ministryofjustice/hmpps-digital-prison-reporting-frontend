export const barChartDataHasEthnicity = {
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

export const barChartFromListDataHasEthnicity = {
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

export const dataQualityTimeseriesLine = {
  details: {
    meta: [
      {
        label: 'Values for:',
        value: 'Jan 25',
      },
    ],
    headlines: [
      {
        label: 'Jan 25',
        value: 533,
      },
    ],
  },
  table: {
    head: [{ text: 'Date' }, { text: 'Establishment ID' }, { text: 'Has ethnicity' }],
    rows: [
      [{ text: 'Aug 24' }, { text: 'MDI' }, { text: 424 }],
      [{ text: 'Aug 24' }, { text: 'SLI' }, { text: 761 }],
      [{ text: 'Aug 24' }, { text: 'DAI' }, { text: 401 }],
      [{ text: 'Sep 24' }, { text: 'MDI' }, { text: 733 }],
      [{ text: 'Sep 24' }, { text: 'SLI' }, { text: 559 }],
      [{ text: 'Sep 24' }, { text: 'DAI' }, { text: 656 }],
      [{ text: 'Oct 24' }, { text: 'MDI' }, { text: 738 }],
      [{ text: 'Oct 24' }, { text: 'SLI' }, { text: 692 }],
      [{ text: 'Oct 24' }, { text: 'DAI' }, { text: 665 }],
      [{ text: 'Nov 24' }, { text: 'MDI' }, { text: 479 }],
      [{ text: 'Nov 24' }, { text: 'SLI' }, { text: 635 }],
      [{ text: 'Nov 24' }, { text: 'DAI' }, { text: 482 }],
      [{ text: 'Dec 24' }, { text: 'MDI' }, { text: 467 }],
      [{ text: 'Dec 24' }, { text: 'SLI' }, { text: 577 }],
      [{ text: 'Dec 24' }, { text: 'DAI' }, { text: 660 }],
      [{ text: 'Jan 25' }, { text: 'MDI' }, { text: 533 }],
      [{ text: 'Jan 25' }, { text: 'SLI' }, { text: 484 }],
      [{ text: 'Jan 25' }, { text: 'DAI' }, { text: 406 }],
    ],
  },
  chart: {
    type: 'line',
    timeseries: true,
    data: {
      labels: ['Aug 24', 'Sep 24', 'Oct 24', 'Nov 24', 'Dec 24', 'Jan 25'],
      datasets: [
        {
          data: [424, 733, 738, 479, 467, 533],
          label: 'MDI',
          total: 3374,
        },
        {
          data: [761, 559, 692, 635, 577, 484],
          label: 'SLI',
          total: 3708,
        },
        {
          data: [401, 656, 665, 482, 660, 406],
          label: 'DAI',
          total: 3270,
        },
      ],
    },
  },
}

export const chartFromList = {
  details: {
    meta: [
      {
        label: 'Values for:',
        value: 'Feb 25',
      },
    ],
    headlines: [
      {
        label: 'Total total prisoners',
        value: 1172,
      },
    ],
  },
  table: {
    head: [{ text: 'Establishment ID' }, { text: 'Diet' }, { text: 'Total prisoners' }],
    rows: [
      [{ text: 'MDI' }, { text: 'Vegetarian' }, { text: '251' }],
      [{ text: 'MDI' }, { text: 'Pescatarian' }, { text: '317' }],
      [{ text: 'MDI' }, { text: 'Vegan' }, { text: '330' }],
      [{ text: 'MDI' }, { text: 'Omnivore' }, { text: '274' }],
    ],
  },
  chart: {
    type: 'bar',
    data: {
      labels: ['Vegetarian', 'Pescatarian', 'Vegan', 'Omnivore'],
      datasets: [
        {
          label: 'MDI',
          data: [251, 317, 330, 274],
          total: 1172,
        },
      ],
    },
  },
}
