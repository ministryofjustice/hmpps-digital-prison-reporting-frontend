import { DashboardDataResponse } from '../../types/Metrics'
import { components } from '../../types/api'
import { apiDateToUi } from '../dateHelper'
import * as OptionalKeysHelper from './VisualisationOptionalKeysHelper'

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
  const { measures, filters, expectNulls } = visDefinition.columns
  const { keys } = visDefinition.columns

  const displayColumnsIds = measures.map(col => col.id)
  const keyColumnsIds = keys?.map(col => col.id) || []
  let filterColIds = filters?.map(col => col.id) || []
  filterColIds = [...new Set(filterColIds)]
  const hasOptionalKeys = OptionalKeysHelper.hasOptionalKeys(keys || [])

  const dateColumn = getDateColumn(columns)
  const dateData = getDateValue(dashboardData, dateColumn)

  if (dashboardData.length && dateData) {
    keyColumnsIds.unshift(dateData.measure.id)
  }

  const filtered = dashboardData.filter((datasetRow: DashboardDataResponse) => {
    const validRow: boolean[] = []

    Object.keys(datasetRow).forEach(fieldId => {
      const value = datasetRow[fieldId].raw
      // All rows are valid until proven otherwise
      let valid = true

      // 1. check if the column value is equal to a defined column value
      if (filterColIds.includes(fieldId) && filters) {
        const filterValues = filters ? filters.filter(f => f.id === fieldId).map(f => f.equals) : []
        const validFilters: boolean[] = []
        filterValues.forEach(filterValue => {
          if (filterValue === null) {
            validFilters.push(value === '' || value === undefined || value === null)
          } else {
            validFilters.push(filterValue === value)
          }
        })
        valid = validFilters.some(Boolean)

        // 3. check keys exist in the defined columns
      } else if (keyColumnsIds.includes(fieldId) && hasOptionalKeys) {
        valid = true

        // 3. check keys exist in the defined columns
      } else if (keyColumnsIds.includes(fieldId) && !hasOptionalKeys) {
        valid = value !== '' && value !== undefined && value !== null

        // 2. check values exist in the defined columns
      } else if (displayColumnsIds.includes(fieldId)) {
        valid = value !== '' && value !== undefined && value !== null

        // 3. check that all remaining columns are null.
      } else if (expectNulls) {
        valid = value === '' || value === undefined || value === null
      }

      validRow.push(valid)
    })

    return validRow.every(val => val)
  })

  if (hasOptionalKeys) {
    return OptionalKeysHelper.filterRowsByKeys(filtered, keys || [])
  }

  return filtered
}

export const getLastestDataset = (
  dashboardData: DashboardDataResponse[],
  dateMeasure?: components['schemas']['DashboardVisualisationColumnDefinition'],
): DashboardDataResponse[] => {
  if (dateMeasure) {
    const latestTimestamp = dashboardData[dashboardData.length - 1]?.[dateMeasure.id]?.raw

    if (latestTimestamp) {
      return dashboardData.filter(data => data[dateMeasure.id].raw === latestTimestamp)
    }
  }

  return dashboardData
}

export const getEarliestDataset = (
  dashboardData: DashboardDataResponse[],
  dateMeasure?: components['schemas']['DashboardVisualisationColumnDefinition'],
): DashboardDataResponse[] => {
  if (dateMeasure) {
    const earliestTimestamp = dashboardData[0]?.[dateMeasure.id]?.raw

    if (earliestTimestamp) {
      return dashboardData.filter(data => data[dateMeasure.id].raw === earliestTimestamp)
    }
  }

  return dashboardData
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
}

export const getDateValue = (
  dashboardData?: DashboardDataResponse[] | undefined,
  dateColumn?: components['schemas']['DashboardVisualisationColumnDefinition'] | undefined,
): GetDateValueResponse | undefined => {
  if (!dateColumn || !dashboardData || !dashboardData.length) return undefined

  const { id } = dateColumn
  const dateValue = dashboardData[0][id].raw

  if (!dateValue || typeof dateValue !== 'string') return undefined

  return {
    measure: dateColumn,
    value: apiDateToUi(dateValue) || dateValue,
  }
}

export const getDateColumn = (
  columns: components['schemas']['DashboardVisualisationColumnsDefinition'],
): components['schemas']['DashboardVisualisationColumnDefinition'] | undefined => {
  const { measures, keys } = columns

  const dateMeasure = getDateMeasure(measures)
  const dateKey = getDateKey(keys)

  return dateKey ?? dateMeasure
}

export const getDateMeasure = (
  measures: components['schemas']['DashboardVisualisationColumnDefinition'][],
): components['schemas']['DashboardVisualisationColumnDefinition'] | undefined => {
  return measures.find(m => m.type === 'date')
}

export const getDateKey = (
  keys: components['schemas']['DashboardVisualisationColumnDefinition'][] | undefined | null,
): components['schemas']['DashboardVisualisationColumnDefinition'] | undefined => {
  return keys ? keys.find(m => m.type === 'date') : undefined
}

export default {
  getDatasetRows,
  getLastestDataset,
  getEarliestDataset,
  filterRowsByDisplayColumns,
  groupRowsByTimestamp,
  groupRowsByKey,
  groupRowsBy,
  getGroupKey,
  getDateMeasure,
  getDateKey,
  getDateColumn,
  getDateValue,
}
