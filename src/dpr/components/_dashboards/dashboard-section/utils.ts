import { MetricsDataResponse } from '../../../types/Metrics'
import { DashboardVisualisation } from '../dashboard/types'

const getDatasetRows = (listDefinition: DashboardVisualisation, dashboardData: MetricsDataResponse[]) => {
  const { keys, measures, ignore, values } = listDefinition.columns

  const displayColumnsIds = measures.map((col) => col.id)
  const keyColumnsIds = keys.map((col) => col.id)
  const ignoreIds = ignore?.map((col) => col.id) || []
  const valueIds = values?.map((col) => col.id) || []
  const expectAllNoneDefinedColsToBeNull = ignore && ignore.length === 0

  if (dashboardData.length && dashboardData[0].timestamp) keyColumnsIds.push('timestamp')

  return dashboardData.filter((datasetRow: MetricsDataResponse) => {
    const validRow: boolean[] = []
    Object.keys(datasetRow).forEach((datasetField) => {
      // console.log({ datasetField })

      const value = datasetRow[datasetField].raw

      // All rows are valid until proven otherwise
      let valid = true

      // 2. check if the column value is equal to a defined column value
      if (valueIds.includes(datasetField)) {
        const valueColumn = values.find((col) => col.id === datasetField)
        valid = value === valueColumn.equals

        // 1. check values exist in the defined columns
      } else if (displayColumnsIds.includes(datasetField) || keyColumnsIds.includes(datasetField)) {
        valid = value !== '' && value !== undefined && value !== null

        // 3. check for values in the other columns in the row
      } else if (ignoreIds.includes(datasetField)) {
        valid = true

        // 4. check that all remaining columns are null.
      } else if (expectAllNoneDefinedColsToBeNull) {
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
