const emptyQuery = require('./emptyQuery')
const interactiveFilters = require('./interactiveFilters')
const {featureTestingMissing1} = require('./missing1')
const missing2 = require('./missing2')
const missing3 = require('./missing3')
const {featureTestingMissingDescription} = require('./missingDescription')
const selectedFilters = require('./selectedFilters')
const sorting = require('./sorting')
const sync = require('./sync')
const unprintable = require('./unprintable')
const userDefinedDefaults = require('./userDefinedDefaults')
const validation = require('./validation')
const bigReport = require('./bigReport')

module.exports = [
  emptyQuery,
  interactiveFilters,
  featureTestingMissing1,
  missing2,
  missing3,
  featureTestingMissingDescription,
  selectedFilters,
  sorting,
  sync,
  unprintable,
  userDefinedDefaults,
  validation,
  bigReport,
]
