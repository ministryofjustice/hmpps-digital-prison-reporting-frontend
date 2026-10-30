import { Granularity } from 'src/dpr/components/_inputs/granular-date-range/types'
import { DashboardDataResponse } from '../../types/Metrics'
import { components } from '../../types/api'
import { apiDateToUi, getGranularityFromDateFormat } from '../dateHelper'

/**
 * Creates the dataset for a single visualisation
 * - given the visualisation definition will extract the relevant
 * - rows from the master dataset to produce a visualisation dataset
 *
 * @param {components['schemas']['DashboardVisualisationDefinition']} visDefinition
 * @param {DashboardDataResponse[]} dashboardData
 * @return {DashboardDataResponse[]} the visualisation dataset
 */
export const getDatasetRows = (
  visDefinition: components['schemas']['DashboardVisualisationDefinition'],
  dashboardData: DashboardDataResponse[],
) => {
  const { columns } = visDefinition
  const { measures, filters, expectNulls, keys } = columns

  const requiredColumnIds = new Set(keys?.map(col => col.id))
  const measureIds = new Set(measures.map(col => col.id))

  const dateColumn = getTimestampColumn(columns)
  const dateData = getDateValue(dashboardData, dateColumn)

  if (dashboardData.length && dateData) {
    requiredColumnIds.add(dateData.measure.id)
  }

  return dashboardData.filter(row =>
    Object.entries(row).every(([fieldId, field]) =>
      isValidField(fieldId, field.raw, requiredColumnIds, measureIds, filters ?? [], expectNulls),
    ),
  )
}

/**
 * Validates a dataset field against the validation rules
 *
 * @param {string} fieldId
 * @param {unknown} value
 * @param {Set<string>} requiredColumnIds
 * @param {Set<string>} measureIds
 * @param {components['schemas']['ValueVisualisationColumnDefinition'][]} filters
 * @param {(boolean | undefined)} expectNulls
 * @return {*}  {boolean}
 */
const isValidField = (
  fieldId: string,
  value: unknown,
  requiredColumnIds: Set<string>,
  measureIds: Set<string>,
  filters: components['schemas']['ValueVisualisationColumnDefinition'][],
  expectNulls: boolean | undefined,
): boolean => {
  return (
    matchesFilterRule(fieldId, value, filters) ??
    matchesRequiredRule(fieldId, value, requiredColumnIds) ??
    matchesMeasureRule(fieldId, value, measureIds, expectNulls) ??
    matchesExpectNullsRule(fieldId, value, requiredColumnIds, measureIds, expectNulls) ??
    true
  )
}

/**
 * Filter validation rule
 *
 * @param {string} fieldId
 * @param {unknown} value
 * @param {components['schemas']['ValueVisualisationColumnDefinition'][]} filters
 * @return {*}  {(boolean | undefined)}
 */
const matchesFilterRule = (
  fieldId: string,
  value: unknown,
  filters: components['schemas']['ValueVisualisationColumnDefinition'][],
): boolean | undefined => {
  const matchingFilters = filters.filter(f => f.id === fieldId)

  if (!matchingFilters.length) {
    return undefined
  }

  return matchingFilters.some(filter => {
    if (filter.equals === null) {
      return isEmpty(value)
    }

    return filter.equals === value
  })
}

/**
 * Validates that required fields have data
 *
 * @param {string} fieldId
 * @param {unknown} value
 * @param {Set<string>} requiredColumnIds
 * @return {*}  {(boolean | undefined)}
 */
const matchesRequiredRule = (fieldId: string, value: unknown, requiredColumnIds: Set<string>): boolean | undefined => {
  if (!requiredColumnIds.has(fieldId)) {
    return undefined
  }

  return !isEmpty(value)
}

const matchesMeasureRule = (
  fieldId: string,
  value: unknown,
  measureIds: Set<string>,
  expectNulls?: boolean,
): boolean | undefined => {
  if (!expectNulls || !measureIds.has(fieldId)) {
    return undefined
  }

  return !isEmpty(value)
}

/**
 * Expect nulls validation rule
 * - validates that all remaining columns are empty
 *
 * @param {string} fieldId
 * @param {unknown} value
 * @param {Set<string>} measureIds
 * @param {boolean} [expectNulls]
 * @return {*}  {(boolean | undefined)}
 */
const matchesExpectNullsRule = (
  fieldId: string,
  value: unknown,
  requiredColumnIds: Set<string>,
  measureIds: Set<string>,
  expectNulls?: boolean,
): boolean | undefined => {
  if (!expectNulls) {
    return undefined
  }

  if (requiredColumnIds.has(fieldId) || measureIds.has(fieldId)) {
    return undefined
  }

  return isEmpty(value)
}

/**
 * Checks if a value has data
 *
 * @param {unknown} value
 * @return {*}  {boolean}
 */
const isEmpty = (value: unknown): boolean => value === '' || value === undefined || value === null

/**
 * Returns the most recent set of data from a dataset
 *
 * @param {DashboardDataResponse[]} dashboardData
 * @param {components['schemas']['DashboardVisualisationColumnDefinition']} [dateMeasure]
 * @return {*}  {DashboardDataResponse[]}
 */
export const getLatestDataset = (
  dashboardData: DashboardDataResponse[],
  dateColumn?: components['schemas']['DashboardVisualisationColumnDefinition'],
): DashboardDataResponse[] => {
  // The definition does not specify a date column, so return all rows unchanged.
  if (!dateColumn) {
    return dashboardData
  }

  // Find the most recent date value present in the dataset.
  const latestTimestamp = dashboardData.reduce<string | undefined>((latest, row) => {
    const value = row[dateColumn.id]?.raw

    // Ignore rows that do not contain a valid date value.
    if (typeof value !== 'string') {
      return latest
    }

    // Dates are stored as YYYY, YYYY-MM or YYYY-MM-DD, so string comparison works.
    return !latest || value > latest ? value : latest
  }, undefined)

  // Return all rows that belong to the latest date period.
  return latestTimestamp ? dashboardData.filter(row => row[dateColumn.id]?.raw === latestTimestamp) : dashboardData
}

/**
 * Returns the earliest set of data from a dataset
 *
 * @param {DashboardDataResponse[]} dashboardData
 * @param {components['schemas']['DashboardVisualisationColumnDefinition']} [dateMeasure]
 * @return {*}  {DashboardDataResponse[]}
 */
export const getEarliestDataset = (
  dashboardData: DashboardDataResponse[],
  dateColumn?: components['schemas']['DashboardVisualisationColumnDefinition'],
): DashboardDataResponse[] => {
  // The definition does not specify a date column, so return all rows unchanged.
  if (!dateColumn) {
    return dashboardData
  }

  // Find the earliest date value in the configured date column.
  const earliestTimestamp = dashboardData.reduce<string | undefined>((earliest, row) => {
    const value = row[dateColumn.id]?.raw

    // Skip rows that do not contain the configured date field.
    if (typeof value !== 'string') {
      return earliest
    }

    // Dates use YYYY, YYYY-MM or YYYY-MM-DD formats, so string comparison works.
    return !earliest || value < earliest ? value : earliest
  }, undefined)

  // Return all rows that belong to the earliest date period.
  return earliestTimestamp ? dashboardData.filter(row => row[dateColumn.id]?.raw === earliestTimestamp) : dashboardData
}

export const groupRowsByTimestamp = (
  dashboardData: DashboardDataResponse[],
  dateMeasure: components['schemas']['DashboardVisualisationColumnDefinition'],
): DashboardDataResponse[][] => {
  const { id } = dateMeasure

  const uniqueTimestamps = [...new Set(dashboardData.map(item => item[id].raw))]

  return uniqueTimestamps.map(ts => {
    return dashboardData.filter(d => d[id].raw === ts)
  })
}

export const groupRowsByKey = (dashboardData: DashboardDataResponse[], key: string): DashboardDataResponse[][] => {
  const uniqueKeyValues = [...new Set(dashboardData.map(item => item[key].raw))]
  return uniqueKeyValues.map(keyValue => {
    return dashboardData.filter(d => d[key].raw === keyValue)
  })
}

export const groupRowsBy = (dashboardData: DashboardDataResponse[], groupIds: string[]): DashboardDataResponse[][] => {
  const grouped = dashboardData.reduce<Record<string, DashboardDataResponse[]>>((acc, row) => {
    // Create a unique composite key from the grouping fields
    const key = groupIds.map(id => row[id]?.raw ?? '').join('|')

    // Build or append to the group
    acc[key] = acc[key] ? [...acc[key], row] : [row]

    return acc
  }, {})

  // Return the groups as an array of arrays
  return Object.values(grouped)
}

export const getGroupKey = (
  rawData: DashboardDataResponse[],
  keys?: Array<components['schemas']['DashboardVisualisationColumnDefinition']>,
) => {
  if (!keys || !keys.length || !rawData.length) {
    return undefined
  }

  const data = rawData[0]
  let index = keys.length - 1
  let keyFound = false
  while (!keyFound) {
    const k = `${keys[index]?.id}`
    if (k && index !== -1 && (!data[k] || !data[k].raw || data[k].raw === '' || data[k].raw === null)) {
      index -= 1
    } else {
      keyFound = true
    }
  }

  return index !== -1 ? keys[index] : undefined
}

export const filterRowsByDisplayColumns = (
  listDefinition: components['schemas']['DashboardVisualisationDefinition'],
  dashboardData: DashboardDataResponse[],
  includeKeys = false,
) => {
  const { keys: keyCols, measures } = listDefinition.columns
  const keys = keyCols || []
  let displayColumns = [...measures]
  if (includeKeys) {
    displayColumns = [...keys, ...measures]
  }
  const displayColumnsIds = displayColumns.map(col => col.id)

  return dashboardData.map((datasetRow: DashboardDataResponse) => {
    return Object.keys(datasetRow)
      .filter(key => displayColumnsIds.includes(key))
      .reduce(
        (acc, key) => {
          acc[key] = datasetRow[key]
          return acc
        },
        {} as unknown as DashboardDataResponse,
      )
  })
}

export type GetDateValueResponse = {
  measure: components['schemas']['DashboardVisualisationColumnDefinition']
  value: string
  granularity: Granularity
}

export const getDateValue = (
  dashboardData?: DashboardDataResponse[] | undefined,
  dateColumn?: components['schemas']['DashboardVisualisationColumnDefinition'] | undefined,
): GetDateValueResponse | undefined => {
  if (!dateColumn || !dashboardData || !dashboardData.length) return undefined

  const { id } = dateColumn
  const dateValue = dashboardData[0][id]?.raw

  if (!dateValue || typeof dateValue !== 'string') return undefined

  const granularity: Granularity = getGranularityFromDateFormat(dateValue)

  return {
    measure: dateColumn,
    value: apiDateToUi(dateValue, granularity) || dateValue,
    granularity,
  }
}

export const getTimestampColumn = (
  columns: components['schemas']['DashboardVisualisationColumnsDefinition'],
): components['schemas']['DashboardVisualisationColumnDefinition'] | undefined => {
  const { measures, keys } = columns

  const tsMeasure = getTimestampMeasure(measures)
  const tsKey = getTimestampKey(keys)

  return tsKey ?? tsMeasure
}

export const getTimestampMeasure = (
  measures: components['schemas']['DashboardVisualisationColumnDefinition'][],
): components['schemas']['DashboardVisualisationColumnDefinition'] | undefined => {
  return measures.find(m => m.type === 'timestamp')
}

export const getTimestampKey = (
  keys: components['schemas']['DashboardVisualisationColumnDefinition'][] | undefined | null,
): components['schemas']['DashboardVisualisationColumnDefinition'] | undefined => {
  return keys ? keys.find(m => m.type === 'timestamp') : undefined
}

export default {
  getDatasetRows,
  getLatestDataset,
  getEarliestDataset,
  filterRowsByDisplayColumns,
  groupRowsByTimestamp,
  groupRowsByKey,
  groupRowsBy,
  getGroupKey,
  getTimestampMeasure,
  getTimestampKey,
  getTimestampColumn,
  getDateValue,
}
