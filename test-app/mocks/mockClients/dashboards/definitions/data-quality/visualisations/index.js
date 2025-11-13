// @ts-nocheck
// const ListDefinitions = require('./list-definitions')
const ChartDefinitions = require('./chart-definitions')
const ScorecardDefinitions = require('./scorecard-definitions')

module.exports = {
  // ...ListDefinitions,
  ...ChartDefinitions,
  ...ScorecardDefinitions,
}
