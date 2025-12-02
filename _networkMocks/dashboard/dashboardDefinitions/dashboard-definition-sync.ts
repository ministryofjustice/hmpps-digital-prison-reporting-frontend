import { establishmentIdFilter, granularDateRangeFilter } from '@networkMocks/dashboard/filter-definitions'

export const syncDashboard = {
  id: 'sync-dashboard',
  name: 'Sync Dashboard',
  description: 'Sync Dashboard used for testing',
  sections: [],
  loadType: 'sync',
  filterFields: [establishmentIdFilter, granularDateRangeFilter],
}
