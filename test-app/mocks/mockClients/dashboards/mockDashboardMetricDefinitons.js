const mockDashboardMetricDefMissingEthnicity = {
  id: 'missing-ethnicity-metric',
  name: 'Missing ethnicity',
  display: 'Missing ethnicity',
  description: 'Number of prisoners with missing ethnicity data',
  charts: [
    {
      type: 'bar',
      label: {
        name: 'establishment_id',
        display: 'Establishment ID',
      },
      unit: 'number',
      columns: [
        {
          name: 'has_ethnicity',
          display: 'No. of Prisoners with ethnicity',
        },
        {
          name: 'ethnicity_is_missing',
          display: 'No. of Prisoners with no ethnicity',
        },
      ],
    },
    {
      type: 'doughnut',
      label: {
        name: 'establishment_id',
        display: 'Establishment ID',
      },
      unit: 'percentage',
      columns: [
        {
          name: 'has_ethnicity_percentage',
          display: 'Percentage of Prisoners with ethnicity',
        },
        {
          name: 'ethnicity_is_missing_percentage',
          display: 'Percentage of Prisoners with no ethnicity',
        },
      ],
    },
  ],
}

const mockDashboardMetricDefMissingNationality = {
  id: 'missing-nationality-metric',
  name: 'Missing nationality',
  display: 'Missing nationality',
  description: 'Number of prisoners with missing nationality data',
  charts: [
    {
      type: 'bar',
      label: {
        name: 'establishment_id',
        display: 'Establishment ID',
      },
      unit: 'number',
      columns: [
        {
          name: 'has_nationality',
          display: 'No. of Prisoners with nationality',
        },
        {
          name: 'nationality_is_missing',
          display: 'No. of Prisoners with no nationality',
        },
      ],
    },
    {
      type: 'doughnut',
      label: {
        name: 'establishment_id',
        display: 'Establishment ID',
      },
      unit: 'percentage',
      columns: [
        {
          name: 'has_nationality_percentage',
          display: 'Percentage of Prisoners with nationality',
        },
        {
          name: 'nationality_is_missing_percentage',
          display: 'Percentage of Prisoners with no nationality',
        },
      ],
    },
  ],
}

const mockDashboardMetricDefMissingReligion = {
  id: 'missing-religion-metric',
  name: 'Missing religion',
  display: 'Missing religion',
  description: 'Number of prisoners with missing religion data',
  charts: [
    {
      type: 'bar',
      label: {
        name: 'establishment_id',
        display: 'Establishment ID',
      },
      unit: 'number',
      columns: [
        {
          name: 'has_religion',
          display: 'No. of Prisoners with religion',
        },
        {
          name: 'religion_is_missing',
          display: 'No. of Prisoners with no religion',
        },
      ],
    },
    {
      type: 'doughnut',
      label: {
        name: 'establishment_id',
        display: 'Establishment ID',
      },
      unit: 'percentage',
      columns: [
        {
          name: 'has_religion_percentage',
          display: 'Percentage of Prisoners with religion',
        },
        {
          name: 'religion_is_missing_percentage',
          display: 'Percentage of Prisoners with no religion',
        },
      ],
    },
  ],
}

module.exports = {
  mockDashboardMetricDefMissingEthnicity,
  mockDashboardMetricDefMissingNationality,
  mockDashboardMetricDefMissingReligion,
}
