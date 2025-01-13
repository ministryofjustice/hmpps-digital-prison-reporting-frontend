const mockDashboardScorecard = {
  id: 'test-scorecards',
  name: 'test-scorecard-group',
  display: 'Test scorecard group',
  description: 'test scorecard group',
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
    {
      label: 'Percentage of Prisoners with religion',
      unit: 'percentage',
      column: 'has_religion_percentage',
    },
    {
      label: 'Percentage of Prisoners with no religion',
      unit: 'percentage',
      column: 'religion_is_missing_percentage',
    },
  ],
}

module.exports = {
  mockDashboardScorecard,
}
