import { MetricsDataResponse } from '../../../types/Metrics'
import { DashboardVisualisation } from '../dashboard/types'

const getDatasetRows = (listDefinition: DashboardVisualisation, dashboardData: MetricsDataResponse[]) => {
  const { keys, measures, ignore, values } = listDefinition.columns

  const displayColumnsIds = measures.map((col) => col.id)
  const keyColumnsIds = keys.map((col) => col.id)
  const ignoreIds = ignore?.map((col) => col.id) || []
  const valueIds = values?.map((col) => col.id) || []

  // console.log({ displayColumnsIds, keyColumnsIds, ignoreIds, valueIds })

  return dashboardData.filter((datasetRow: MetricsDataResponse) => {
    const validRow: boolean[] = []
    Object.keys(datasetRow).forEach((datasetField) => {
      // console.log({ datasetField })

      const value = datasetRow[datasetField].raw
      let valid = false
      if (displayColumnsIds.includes(datasetField) || keyColumnsIds.includes(datasetField)) {
        // console.log('isKeyOdDisplay', { value })
        valid = value !== '' && value !== undefined && value !== null
      } else if (ignoreIds.includes(datasetField)) {
        // console.log('isIgnored', { value })
        valid = true
      } else if (valueIds.includes(datasetField)) {
        // console.log('isValue', { value })
        const valueColumn = values.find((col) => col.id === datasetField)
        valid = value === valueColumn.equals
      } else {
        // console.log('else', { value })
        valid = value === '' || value === undefined || value === null
      }

      // console.log({ valid })
      validRow.push(valid)
    })

    // console.log({ validRow })

    return validRow.every((val) => val)
  })
}

const filterByMeasures = (listDefinition: DashboardVisualisation, dashboardData: MetricsDataResponse[]) => {
  const { measures } = listDefinition.columns
  const displayColumnsIds = measures.map((col) => col.id)

  return dashboardData.map((datasetRow: MetricsDataResponse) => {
    return Object.keys(datasetRow)
      .filter((key) => displayColumnsIds.includes(key))
      .reduce((acc, key) => {
        acc[key] = datasetRow[key]
        return acc
      }, {} as unknown as MetricsDataResponse)
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
  filterByMeasures,
  filterRowsByDisplayColumns,
}
