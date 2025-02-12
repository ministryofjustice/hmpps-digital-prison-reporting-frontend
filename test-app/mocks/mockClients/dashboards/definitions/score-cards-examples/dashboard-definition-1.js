const { establishmentIdFilter, granularDateRangeFilter, wingFilter } = require('../../filter-definitions')

const datasetListDefinition = {
  id: 'allData',
  type: 'list',
  display: 'All Data in dataset',
  columns: {},
}

const scoreCardsExample1 = {
  id: 'scorecards-examples-1',
  name: 'Scorecards examples',
  description: 'A dashboard of scorecard examples',
  sections: [
    {
      id: 'score-card-dataset',
      display: 'The Dataset',
      visualisations: [datasetListDefinition],
    },
  ],
  filterFields: [establishmentIdFilter, wingFilter, granularDateRangeFilter],
}

module.exports = {
  scoreCardsExample1,
}
