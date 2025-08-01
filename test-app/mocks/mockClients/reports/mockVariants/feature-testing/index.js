const emptyQuery = require('./emptyQuery')
const interactiveFilters = require('./interactiveFilters')
const missing1 = require('./missing1')
const missing2 = require('./missing2')
const missing3 = require('./missing3')
const missingDescription = require('./missingDescription')
const selectedFilters = require('./selectedFilters')
const sorting = require('./sorting')
const sync = require('./sync')
const unprintable = require('./unprintable')
const userDefinedDefaults = require('./userDefinedDefaults')
const validation = require('./validation')

module.exports = [
  emptyQuery,
  interactiveFilters,
  missing1,
  missing2,
  missing3,
  missingDescription,
  selectedFilters,
  sorting,
  sync,
  unprintable,
  userDefinedDefaults,
  validation,
]
