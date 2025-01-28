const mockDashboardDataAnalticsScoreCardGroup = {
  id: 'test-scorecards',
  name: 'data-analytics',
  display: 'Data Analytics',
  description: 'Mocked data to display analytics data witin scorecards',
  scorecards: [
    {
      label: 'No. of Prisoners with ethnicity',
      unit: 'number',
      column: 'has_ethnicity',
    },
    {
      label: 'No. of Prisoners with no ethnicity',
      unit: 'number',
      column: 'ethnicity_is_missing',
    },
    {
      label: 'No. of Prisoners with nationality',
      unit: 'number',
      column: 'has_nationality',
    },
    {
      label: 'No. of Prisoners with no nationality',
      unit: 'number',
      column: 'nationality_is_missing',
    },
    {
      label: 'No. of Prisoners with religion',
      unit: 'number',
      column: 'has_religion',
    },
    {
      label: 'No. of Prisoners with no religion',
      unit: 'number',
      column: 'religion_is_missing',
    },
  ],
}

module.exports = {
  mockDashboardDataAnalticsScoreCardGroup,
}
