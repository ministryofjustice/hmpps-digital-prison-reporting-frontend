const mockDashboardNewDefinition = {
  id: 'test-dashboard-100',
  name: 'Test Dashboard 100',
  description: 'New Dashboard Definition',
  sections: [
    {
      id: 'section-one',
      display: 'Section test',
      description: 'Section test',
      visualisations: [
        {
          type: 'bar',
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
                display: 'Has Ethnicity',
              },
              {
                id: 'ethnicity_is_missing',
                display: 'Has No Ethnicity',
              },
            ],
            ignore: [
              { id: 'count' },
              { id: 'has_nationality' },
              { id: 'nationality_is_missing' },
              { id: 'has_religion' },
              { id: 'religion_is_missing' },
            ],
          },
        },
        {
          type: 'list',
          columns: {
            keys: [
              {
                id: 'establishment_id',
                display: 'Establishment ID',
              },
            ],
            measures: [
              {
                id: 'establishment_id',
                display: 'Establishment ID',
              },
              {
                id: 'has_nationality',
                display: 'Has Nationality',
              },
              {
                id: 'nationality_is_missing',
                display: 'Has No Nationality',
              },
            ],
            ignore: [
              { id: 'count' },
              { id: 'has_ethnicity' },
              { id: 'ethnicity_is_missing' },
              { id: 'has_religion' },
              { id: 'religion_is_missing' },
            ],
          },
        },
        {
          type: 'scorecard',
          columns: {
            keys: [
              {
                id: 'establishment_id',
              },
            ],
            measures: [
              {
                id: 'has_nationality',
                display: 'No of prisoners with nationality',
              },
            ],
            ignore: [
              { id: 'count' },
              { id: 'has_ethnicity' },
              { id: 'ethnicity_is_missing' },
              { id: 'nationality_is_missing' },
              { id: 'has_religion' },
              { id: 'religion_is_missing' },
            ],
          },
        },
        {
          type: 'scorecard',
          columns: {
            keys: [
              {
                id: 'establishment_id',
              },
            ],
            measures: [
              {
                id: 'has_nationality',
                display: 'No of prisoners with nationality',
              },
            ],
            ignore: [
              { id: 'count' },
              { id: 'has_ethnicity' },
              { id: 'ethnicity_is_missing' },
              { id: 'nationality_is_missing' },
              { id: 'has_religion' },
              { id: 'religion_is_missing' },
            ],
          },
        },
        {
          type: 'list',
          columns: {
            keys: [
              {
                id: 'establishment_id',
                display: 'Establishment ID',
              },
            ],
            measures: [
              {
                id: 'establishment_id',
                display: 'Establishment ID',
              },
              {
                id: 'has_nationality',
                display: 'Has Nationality',
              },
              {
                id: 'nationality_is_missing',
                display: 'Has No Nationality',
              },
            ],
            ignore: [
              { id: 'count' },
              { id: 'has_ethnicity' },
              { id: 'ethnicity_is_missing' },
              { id: 'has_religion' },
              { id: 'religion_is_missing' },
            ],
          },
        },
        {
          type: 'scorecard',
          columns: {
            keys: [
              {
                id: 'establishment_id',
              },
            ],
            measures: [
              {
                id: 'has_nationality',
                display: 'No of prisoners with nationality',
              },
            ],
            ignore: [
              { id: 'count' },
              { id: 'has_ethnicity' },
              { id: 'ethnicity_is_missing' },
              { id: 'nationality_is_missing' },
              { id: 'has_religion' },
              { id: 'religion_is_missing' },
            ],
          },
        },
        {
          type: 'scorecard',
          columns: {
            keys: [
              {
                id: 'establishment_id',
              },
            ],
            measures: [
              {
                id: 'has_nationality',
                display: 'No of prisoners with nationality',
              },
            ],
            ignore: [
              { id: 'count' },
              { id: 'has_ethnicity' },
              { id: 'ethnicity_is_missing' },
              { id: 'nationality_is_missing' },
              { id: 'has_religion' },
              { id: 'religion_is_missing' },
            ],
          },
        },
      ],
    },
  ],
}

module.exports = {
  mockDashboardNewDefinition,
}
