import { mapUnitToSymbol } from '../../../utils/Dashboards/VisualisationUnitHelper'
import { components } from '../../../types/api'
import { DashboardDataResponse } from '../../../types/Metrics'
import { MoJTable } from '../../_dashboards/dashboard-visualisation/types'
import { UnitType } from '../../_dashboards/dashboard-visualisation/Validate'
import DatasetHelper from '../../../utils/Dashboards/VisualisationDatasetHelper'
import DashboardListUtils from '../../_dashboards/dashboard-list/utils'

/**
 * Creates the a table representation for a timeseries chart
 * - ensures the Date column is always at index 0 when there are multiple rows
 *
 * @param {components['schemas']['DashboardVisualisationDefinition']} chartDefinition
 * @param {DashboardDataResponse[]} timeseriesData
 * @return {*}  {MoJTable}
 */
export const createTimeseriesTable = (
  chartDefinition: components['schemas']['DashboardVisualisationDefinition'],
  timeseriesData: DashboardDataResponse[],
): MoJTable => {
  const { columns } = chartDefinition
  const { keys, measures = [] } = columns

  const safeKeys = keys ?? []
  let flatTimeseriesData = timeseriesData.flat()

  let tableColumns: components['schemas']['DashboardVisualisationColumnDefinition'][]

  if (timeseriesData.length > 1) {
    const tsMeasures = measures.filter(m => m.type === 'timestamp')

    if (tsMeasures.length !== 1) {
      throw new Error('Multi-timeseries tables require exactly one date measure')
    }

    const [tsColumn] = tsMeasures
    const valueColumns = measures.filter(m => m.id !== tsColumn.id)

    tableColumns = [tsColumn, ...safeKeys, ...valueColumns]
  } else {
    flatTimeseriesData = DatasetHelper.filterRowsByDisplayColumns(chartDefinition, flatTimeseriesData)
    tableColumns = measures
  }

  const head = mapTableHead(tableColumns)
  const rows = DashboardListUtils.createTableRows(flatTimeseriesData, tableColumns)

  return { head, rows }
}

export const createSnapshotTable = (
  chartDefinition: components['schemas']['DashboardVisualisationDefinition'],
  data: DashboardDataResponse[],
): MoJTable => {
  const { columns } = chartDefinition
  const { measures } = columns
  const keys = columns.keys || []
  const head = mapTableHead([...keys, ...measures])

  const filteredRowData = DatasetHelper.filterRowsByDisplayColumns(chartDefinition, data, true)
  const rows = DashboardListUtils.createTableRows(filteredRowData)

  return {
    head,
    rows,
  }
}

const mapTableHead = (headerColumns: components['schemas']['DashboardVisualisationColumnDefinition'][]) => {
  return headerColumns.map(column => {
    const unitSymbol = mapUnitToSymbol(column.unit as UnitType)
    const headText = unitSymbol ? `${column.display} (${unitSymbol})` : column.display
    return { text: headText || '' }
  })
}
