import { MetricsDataResponse } from '../../../types/Metrics'
import { DashboardVisualisation } from '../dashboard/types'

const getDatasetRows = (listDefinition: DashboardVisualisation, dashboardData: MetricsDataResponse[]) => {
  const { keys, measures, filters, expectNulls } = listDefinition.columns

  const displayColumnsIds = measures.map((col) => col.id)
  const keyColumnsIds = keys?.map((col) => col.id) || []
  const filterColIds = filters?.map((col) => col.id) || []

  if (dashboardData.length && dashboardData[0].ts) keyColumnsIds.push('ts')

  return dashboardData.filter((datasetRow: MetricsDataResponse) => {
    const validRow: boolean[] = []
    Object.keys(datasetRow).forEach((datasetField) => {
      const value = datasetRow[datasetField].raw
      // All rows are valid until proven otherwise
      let valid = true

      // 1. check if the column value is equal to a defined column value
      if (filterColIds.includes(datasetField)) {
        const filterColumn = filters.find((col) => col.id === datasetField)
        valid = value === filterColumn.equals

        // 2. check values exist in the defined columns
      } else if (displayColumnsIds.includes(datasetField) || keyColumnsIds.includes(datasetField)) {
        valid = value !== '' && value !== undefined && value !== null

        // 3. check that all remaining columns are null.
      } else if (expectNulls) {
        valid = value === '' || value === undefined || value === null
      }

      validRow.push(valid)
    })

    return validRow.every((val) => val)
  })
}

const filterRowsByDisplayColumns = (
  listDefinition: DashboardVisualisation,
  dashboardData: MetricsDataResponse[],
  includeKeys = false,
) => {
  const { keys, measures } = listDefinition.columns
  let displayColumns = [...measures]
  if (includeKeys) {
    displayColumns = [...keys, ...measures]
  }
  const displayColumnsIds = displayColumns.map((col) => col.id)

  return dashboardData.map((datasetRow: MetricsDataResponse) => {
    return Object.keys(datasetRow)
      .filter((key) => displayColumnsIds.includes(key))
      .reduce((acc, key) => {
        acc[key] = datasetRow[key]
        return acc
      }, {} as unknown as MetricsDataResponse)
  })
}

export default {
  getDatasetRows,
  filterRowsByDisplayColumns,
}
