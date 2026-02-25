import { completeDataSet } from '../complete-data/data'

export const undefinedDashboardData = {
  tables: undefined,
}

export const emptyDashboardData = []

export const missingFirstRowDashboardData = [undefined, ...completeDataSet.slice(1)]
