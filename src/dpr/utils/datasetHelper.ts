import { DashboardDataResponse } from '../types/Metrics'
import { DashboardVisualisation, DashboardVisualisationColumn } from '../components/_dashboards/dashboard/types'

const getDatasetRows = (listDefinition: DashboardVisualisation, dashboardData: DashboardDataResponse[]) => {
  const { keys, measures, filters, expectNulls } = listDefinition.columns

  const displayColumnsIds = measures.map((col) => col.id)
  const keyColumnsIds = keys?.map((col) => col.id) || []
  const filterColIds = filters?.map((col) => col.id) || []
  const hasOptionalKeys = keys?.some((key) => key.optional)

  if (dashboardData.length && dashboardData[0].ts) keyColumnsIds.unshift('ts')

  const filtered = dashboardData.filter((datasetRow: DashboardDataResponse) => {
    const validRow: boolean[] = []

    Object.keys(datasetRow).forEach((datasetField) => {
      const value = datasetRow[datasetField].raw
      // All rows are valid until proven otherwise
      let valid = true

      // 1. check if the column value is equal to a defined column value
      if (filterColIds.includes(datasetField)) {
        const filterColumn = filters.find((col) => col.id === datasetField)
        valid = value === filterColumn.equals

        // 3. check keys exist in the defined columns
      } else if (keyColumnsIds.includes(datasetField) && hasOptionalKeys) {
        valid = true

        // 3. check keys exist in the defined columns
      } else if (keyColumnsIds.includes(datasetField) && !hasOptionalKeys) {
        valid = value !== '' && value !== undefined && value !== null

        // 2. check values exist in the defined columns
      } else if (displayColumnsIds.includes(datasetField)) {
        valid = value !== '' && value !== undefined && value !== null

        // 3. check that all remaining columns are null.
      } else if (expectNulls) {
        valid = value === '' || value === undefined || value === null
      }

      validRow.push(valid)
    })

    return validRow.every((val) => val)
  })

  if (hasOptionalKeys) {
    return filterKeys(filtered, keyColumnsIds, keys)
  }

  return filtered
}

const getKeyVariations = (
  dashboardData: DashboardDataResponse[],
  keyColumnsIds: string[],
  keys: DashboardVisualisationColumn[],
) => {
  const colIdVariations: string[][] = []
  const colIdCopy = [...keyColumnsIds]
  keyColumnsIds.reverse().forEach((id) => {
    const key = keys.find((k) => k.id === id)
    colIdVariations.push([...colIdCopy])
    if (key && key.optional) {
      colIdCopy.pop()
    }
  })

  return colIdVariations
}

const getKeyIds = (dashboardData: DashboardDataResponse[], colIdVariations: string[][]) => {
  let validHeadIds: string[] = []
  colIdVariations.every((ids: string[]) => {
    const validRows = []

    dashboardData.forEach((datasetRow: DashboardDataResponse) => {
      const validRow: boolean[] = []

      Object.keys(datasetRow).forEach((datasetField) => {
        const value = datasetRow[datasetField].raw
        let valid = true
        if (ids.includes(datasetField)) {
          valid = value !== '' && value !== undefined && value !== null
        }
        validRow.push(valid)
      })

      if (validRow.every((val) => val)) {
        validRows.push(datasetRow)
      }
    })

    if (validRows.length > 0) {
      validHeadIds = ids
      return false
    }
    validHeadIds = ids
    return true
  })

  return validHeadIds
}

const filterKeys = (
  dashboardData: DashboardDataResponse[],
  keyColumnsIds: string[],
  keys: DashboardVisualisationColumn[],
) => {
  const colIdVariations = getKeyVariations(dashboardData, keyColumnsIds, keys)
  const validHeadIds = getKeyIds(dashboardData, colIdVariations)

  return dashboardData.filter((datasetRow: DashboardDataResponse) => {
    const validRow: boolean[] = []
    Object.keys(datasetRow).forEach((datasetField) => {
      const value = datasetRow[datasetField].raw
      let valid = true
      if (validHeadIds.includes(datasetField)) {
        valid = value !== '' && value !== undefined && value !== null
      }
      validRow.push(valid)
    })

    return validRow.every((val) => val)
  })
}

const getLastestDataset = (dashboardData: DashboardDataResponse[]): DashboardDataResponse[] => {
  const latestTimestamp = dashboardData[dashboardData.length - 1]?.ts?.raw
  if (latestTimestamp) {
    return dashboardData.filter((data) => data.ts.raw === latestTimestamp)
  }
  return dashboardData
}

const getEarliestDataset = (dashboardData: DashboardDataResponse[]): DashboardDataResponse[] => {
  const latestTimestamp = dashboardData[0]?.ts?.raw
  if (latestTimestamp) {
    return dashboardData.filter((data) => data.ts.raw === latestTimestamp)
  }
  return dashboardData
}

const groupRowsByTimestamp = (dashboardData: DashboardDataResponse[]): DashboardDataResponse[][] => {
  const uniqueTimestamps = [...new Set(dashboardData.map((item) => item.ts.raw))]
  return uniqueTimestamps.map((ts) => {
    return dashboardData.filter((d) => d.ts.raw === ts)
  })
}

const groupRowsByKey = (dashboardData: DashboardDataResponse[], key: string): DashboardDataResponse[][] => {
  const uniqueKeyValues = [...new Set(dashboardData.map((item) => item[key].raw))]
  return uniqueKeyValues.map((keyValue) => {
    return dashboardData.filter((d) => d[key].raw === keyValue)
  })
}

const getGroupKey = (keys: DashboardVisualisationColumn[], rawData: DashboardDataResponse[]) => {
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

const filterRowsByDisplayColumns = (
  listDefinition: DashboardVisualisation,
  dashboardData: DashboardDataResponse[],
  includeKeys = false,
) => {
  const { keys: keyCols, measures } = listDefinition.columns
  const keys = keyCols || []
  let displayColumns = [...measures]
  if (includeKeys) {
    displayColumns = [...keys, ...measures]
  }
  const displayColumnsIds = displayColumns.map((col) => col.id)

  return dashboardData.map((datasetRow: DashboardDataResponse) => {
    return Object.keys(datasetRow)
      .filter((key) => displayColumnsIds.includes(key))
      .reduce((acc, key) => {
        acc[key] = datasetRow[key]
        return acc
      }, {} as unknown as DashboardDataResponse)
  })
}

export default {
  getDatasetRows,
  getLastestDataset,
  getEarliestDataset,
  filterRowsByDisplayColumns,
  groupRowsByTimestamp,
  groupRowsByKey,
  getGroupKey,
}
