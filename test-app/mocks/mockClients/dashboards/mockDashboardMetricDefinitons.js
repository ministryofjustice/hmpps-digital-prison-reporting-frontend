const missingEthnicityMetric = {
  id: 'missing-ethnicity-metric',
  name: 'Missing ethnicity',
  display: 'Missing ethnicity',
  description: 'Number of prisoners with missing ethnicity data',
  columns: [
    {
      name: 'establishment_id',
      display: 'Establishment ID',
    },
    {
      name: 'has_ethnicity',
      display: 'No. of Prisoners with ethnicity',
    },
    {
      name: 'ethnicity_is_missing',
      display: 'No. of Prisoners with no ethnicity',
    },
  ],
  charts: [],
}

const missingEthnicityCharts = [
  {
    type: 'bar',
    label: 'establishment_id',
    columns: ['has_ethnicity', 'ethnicity_is_missing'],
  },
  {
    type: 'doughnut',
    label: 'establishment_id',
    columns: ['has_ethnicity', 'ethnicity_is_missing'],
  },
]

const missingEthnicityMetricPercentage = {
  id: 'missing-ethnicity-metric-percentage',
  name: 'Missing ethnicity percentage',
  display: 'Missing ethnicity percentage',
  description: 'Percentage of prisoners with missing ethnicity data',
  columns: [
    {
      name: 'establishment_id',
      display: 'Establishment ID',
    },
    {
      name: 'has_ethnicity_percentage',
      display: 'Percentage of Prisoners with ethnicity',
      unit: 'percentage',
    },
    {
      name: 'ethnicity_is_missing_percentage',
      display: 'Percentage of Prisoners with no ethnicity',
      unit: 'percentage',
    },
  ],
  charts: [],
}

const missingEthnicityChartsPercentage = [
  {
    type: 'bar',
    label: 'establishment_id',
    columns: ['has_ethnicity_percentage', 'ethnicity_is_missing_percentage'],
  },
  {
    type: 'doughnut',
    label: 'establishment_id',
    unit: 'percentage',
    columns: ['has_ethnicity_percentage', 'ethnicity_is_missing_percentage'],
  },
]

const missingEthnicityMetricsMixed = {
  id: 'missing-ethnicity-metric-mixed',
  name: 'Missing ethnicity raw and percentage',
  display: 'Missing ethnicity percentage',
  description: 'Percentage of prisoners with missing ethnicity data',
  columns: [
    {
      name: 'establishment_id',
      display: 'Establishment ID',
    },
    {
      name: 'has_ethnicity',
      display: 'No. of Prisoners with ethnicity',
    },
    {
      name: 'ethnicity_is_missing',
      display: 'No. of Prisoners with no ethnicity',
    },
    {
      name: 'has_ethnicity_percentage',
      display: 'Percentage of Prisoners with ethnicity',
      unit: 'percentage',
    },
    {
      name: 'ethnicity_is_missing_percentage',
      display: 'Percentage of Prisoners with no ethnicity',
      unit: 'percentage',
    },
  ],
  charts: [],
}

const missingEthnicityChartsMixed = [
  {
    type: 'bar',
    label: 'establishment_id',
    columns: ['has_ethnicity', 'ethnicity_is_missing'],
  },
  {
    type: 'doughnut',
    label: 'establishment_id',
    unit: 'percentage',
    columns: ['has_ethnicity_percentage', 'ethnicity_is_missing_percentage'],
  },
]

const missingNationalityMetric = {
  id: 'missing-nationality-metric',
  name: 'Missing nationality',
  display: 'Missing nationality',
  description: 'Number of prisoners with missing nationality data',
  columns: [
    {
      name: 'establishment_id',
      display: 'Establishment ID',
    },
    {
      name: 'has_nationality',
      display: 'No. of Prisoners with nationality',
    },
    {
      name: 'nationality_is_missing',
      display: 'No. of Prisoners with no nationality',
    },
  ],
  charts: [],
}

const missingNationalityCharts = [
  {
    type: 'bar',
    label: 'establishment_id',
    columns: ['has_nationality', 'nationality_is_missing'],
  },
  {
    type: 'doughnut',
    label: 'establishment_id',
    columns: ['has_nationality', 'nationality_is_missing'],
  },
]

const missingReligionMetric = {
  id: 'missing-religion-metric',
  name: 'Missing religion',
  display: 'Missing religion',
  description: 'Number of prisoners with missing religion data',
  columns: [
    {
      name: 'establishment_id',
      display: 'Establishment ID',
    },
    {
      name: 'has_religion',
      display: 'No. of Prisoners with religion',
    },
    {
      name: 'religion_is_missing',
      display: 'No. of Prisoners with no religion',
    },
  ],
  charts: [],
}

const missingReligionCharts = [
  {
    type: 'bar',
    label: 'establishment_id',
    columns: ['has_religion', 'religion_is_missing'],
  },
  {
    type: 'doughnut',
    label: 'establishment_id',
    columns: ['has_religion', 'religion_is_missing'],
  },
]

const mockDashboardMetricDefMissingEthnicityTimeseries = {
  id: 'missing-ethnicity-metric-timeseries',
  name: 'Missing ethnicity over time',
  display: 'Missing ethnicity over time',
  description: 'Number of prisoners with missing ethnicity data over time',
  timeseries: true,
  columns: [
    {
      name: 'establishment_id',
      display: 'Establishment ID',
    },
    {
      name: 'ethnicity_is_missing',
      display: 'No. of Prisoners with no ethnicity',
    },
  ],
  charts: [
    {
      type: 'line',
      label: 'establishment_id',
      columns: ['ethnicity_is_missing'],
    },
    {
      type: 'bar',
      label: 'establishment_id',
      columns: ['ethnicity_is_missing'],
    },
  ],
}

module.exports = {
  mockDashboardMetricDefMissingEthnicityTimeseries,
  missingEthnicityMetric,
  missingEthnicityMetricCharts: { ...missingEthnicityMetric, charts: missingEthnicityCharts },
  missingEthnicityMetricPercentage,
  missingEthnicityMetricChartsPercentage: {
    ...missingEthnicityMetricPercentage,
    charts: missingEthnicityChartsPercentage,
  },
  missingEthnicityMetricsMixed,
  missingEthnicityMetricsChartsMixed: {
    ...missingEthnicityMetricsMixed,
    charts: missingEthnicityChartsMixed,
  },
  missingReligionMetric,
  missingReligionMetricCharts: { ...missingReligionMetric, charts: missingReligionCharts },
  missingNationalityMetric,
  missingNationalityMetricCharts: { ...missingNationalityMetric, charts: missingNationalityCharts },
}
