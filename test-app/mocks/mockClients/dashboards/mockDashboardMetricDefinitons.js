const mockDashboardMetricDefMissingEthnicity = {
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
  charts: [
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
  ],
}

const mockDashboardMetricDefMissingEthnicityRaw = {
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
    {
      name: 'has_ethnicity',
      display: 'No. of Prisoners with ethnicity',
    },
    {
      name: 'ethnicity_is_missing',
      display: 'No. of Prisoners with ethnicity',
    },
  ],
  charts: [
    // {
    //   type: 'bar',
    //   label: 'establishment_id',
    //   columns: ['has_ethnicity', 'ethnicity_is_missing'],
    // },
    // {
    //   type: 'doughnut',
    //   label: 'establishment_id',
    //   unit: 'number',
    //   columns: ['has_ethnicity', 'ethnicity_is_missing'],
    // },
  ],
}

const mockDashboardMetricDefMissingNationality = {
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
    {
      name: 'has_nationality_percentage',
      display: 'Percentage of Prisoners with nationality',
      unit: 'percentage',
    },
    {
      name: 'nationality_is_missing_percentage',
      display: 'Percentage of Prisoners with no nationality',
      unit: 'percentage',
    },
  ],
  charts: [
    {
      type: 'bar',
      label: 'establishment_id',
      columns: ['has_nationality', 'nationality_is_missing'],
    },
    {
      type: 'doughnut',
      label: 'establishment_id',
      columns: ['has_nationality_percentage', 'nationality_is_missing_percentage'],
    },
  ],
}

const mockDashboardMetricDefMissingReligion = {
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
    {
      name: 'has_religion_percentage',
      display: 'Percentage of Prisoners with religion',
      unit: 'percentage',
    },
    {
      name: 'religion_is_missing_percentage',
      display: 'Percentage of Prisoners with no religion',
      unit: 'percentage',
    },
  ],
  charts: [
    {
      type: 'bar',
      label: 'establishment_id',
      columns: ['has_religion', 'religion_is_missing'],
    },
    {
      type: 'doughnut',
      label: 'establishment_id',
      columns: ['has_religion_percentage', 'religion_is_missing_percentage'],
    },
  ],
}

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
  mockDashboardMetricDefMissingEthnicity,
  mockDashboardMetricDefMissingEthnicityRaw,
  mockDashboardMetricDefMissingNationality,
  mockDashboardMetricDefMissingReligion,
  mockDashboardMetricDefMissingEthnicityTimeseries,
}
