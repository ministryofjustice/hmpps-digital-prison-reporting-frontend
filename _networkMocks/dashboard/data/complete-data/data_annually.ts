/**
 * Mock complete dataset with annual dates
 * - "complete" refers to a dataset that does not have any undefined/null values
 * - Mocked data quality values
 * - 3 Establishments
 * - 6 months historic data - granularity: monthly
 */

import { completeDataSetDaily } from './data_daily'

export const completeDataSetAnnually = completeDataSetDaily.map(group =>
  group.map(row => ({
    ...row,
    ts: {
      ...row.ts,
      raw: row.ts.raw.substring(0, 4), // e.g. '2024-08-24' -> '2024'
    },
  })),
)
