// const ListDefinitions = require('./visualisations/list-definitions')
const ChartDefinitions = require('./visualisations/chart-definitions')
const ScorecardDefinitions = require('./visualisations/scorecard-definitions')

module.exports = {
  // ...ListDefinitions,
  ...ChartDefinitions,
  ...ScorecardDefinitions,
}
