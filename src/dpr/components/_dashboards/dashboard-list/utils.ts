/* eslint-disable no-param-reassign */
import { MoJTable, MoJTableRow } from '../../../types/Charts'
import { MetricsDataResponse } from '../../../types/Metrics'
import { DashboardVisualisation } from '../dashboard/types'
import { DashboardListsColumn } from './types'
import DashboardSectionUtils from '../dashboard-section/utils'

const createList = (
  listDefinition: DashboardVisualisation,
  dashboardData: MetricsDataResponse[][],
): { table: MoJTable; ts: string } => {
  const dataSnapshot = dashboardData[dashboardData.length - 1]
  const head = listDefinition.columns.measures.map((column) => {
    return { text: column.display }
  })
  const dataSetRows = DashboardSectionUtils.getDatasetRows(listDefinition, dataSnapshot)
  const ts = `${dataSetRows[0]?.timestamp?.raw}`
  const filtered = DashboardSectionUtils.filterByMeasures(listDefinition, dataSetRows)

  let rows = createTableRows(filtered)
  rows = sumColumns(rows, listDefinition.columns.measures)

  return {
    table: {
      head,
      rows,
    },
    ts,
  }
}

const sumColumns = (rowsData: MoJTableRow[][], columns: DashboardListsColumn[]) => {
  const sumColumnIndexes: number[] = columns
    .map((col, index) => (col.aggregate ? index : undefined))
    .filter((index) => index)

  if (sumColumnIndexes.length) {
    const sumRow: MoJTableRow[] = [{ html: `<strong>Total<strong>` }]
    for (let index = 1; index < columns.length; index += 1) {
      sumRow[index] = { text: '' }
    }

    rowsData.push(sumRow)
    sumColumnIndexes.forEach((index) => {
      const total = rowsData.reduce((acc, row) => {
        acc += +row[index].text
        return acc
      }, 0)
      rowsData[rowsData.length - 1][index] = { html: `<strong>${total}<strong>` }
    })
  }

  return rowsData
}

const createTableRows = (data: MetricsDataResponse[]): MoJTableRow[][] => {
  return data.map((dataRow) => {
    return Object.keys(dataRow).map((key) => {
      const text = dataRow[key].raw
      return { text } as MoJTableRow
    })
  })
}

export default {
  createList,
  createTableRows,
}
