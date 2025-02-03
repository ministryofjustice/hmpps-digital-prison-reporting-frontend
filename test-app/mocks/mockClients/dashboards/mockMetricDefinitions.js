const { mockListDefinitionAgeRange1, mockListDefinitionAgeRange2 } = require('./mockDashboardListDefinition')

const metricDefDefault = {
  id: 'age-range-metric',
  name: 'Age range totals',
  display: 'Age range totals',
  description: 'Age range totals',
  list: [mockListDefinitionAgeRange1],
  charts: [],
}

module.exports = { metricDefDefault }
