const { establishmentIdFilter, granularDateRangeFilter } = require('../../filter-definitions')

const syncDashboard = {
  id: 'sync-dashboard',
  name: 'Sync Dashboard',
  description: 'Sync Dashboard used for testing',
  sections: [],
  loadType: 'sync',
  filterFields: [establishmentIdFilter, granularDateRangeFilter],
}

module.exports = syncDashboard
