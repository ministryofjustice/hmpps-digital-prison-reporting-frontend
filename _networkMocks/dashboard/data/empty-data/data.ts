import { defaultDataSet } from '../default-data/data'

export const undefinedDashboardData = {
  tables: undefined,
}

export const emptyDashboardData = []

export const missingFirstRowDashboardData = [undefined, ...defaultDataSet.slice(1)]
