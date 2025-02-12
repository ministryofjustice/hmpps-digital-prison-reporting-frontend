/* eslint-disable no-param-reassign */
import { MoJTable, MoJTableRow } from '../../../types/Charts'
import { DashboardDataResponse } from '../../../types/Metrics'
import { DashboardVisualisation, DashboardVisualisationColumn } from '../dashboard/types'
import DatasetHelper from '../../../utils/datasetHelper'

const createList = (
  listDefinition: DashboardVisualisation,
  dashboardData: DashboardDataResponse[][],
): { table: MoJTable; ts: string } => {
  const dataSnapshot = dashboardData[dashboardData.length - 1]
  const { columns } = listDefinition
  const { measures, keys } = columns

  let visData: DashboardDataResponse[]
  let head
  let rows
  let timestampData
  let ts

  // If none specified, return all data
  if (!measures && !keys) {
    const timeseriesVisData = [...dashboardData]
    head = Object.keys(timeseriesVisData[0][0]).map((key) => {
      return { text: key }
    })
    rows = timeseriesVisData.flatMap((periodData) => {
      return createTableRows(periodData)
    })
    timestampData = timeseriesVisData[0][0]?.ts?.raw
    ts = timestampData ? `${timestampData}` : ''
  } else {
    head = measures.map((column) => {
      return { text: column.display }
    })
    const dataSetRows = DatasetHelper.getDatasetRows(listDefinition, dataSnapshot)
    timestampData = dataSetRows[0]?.ts?.raw
    ts = timestampData ? `${timestampData}` : ''
    visData = DatasetHelper.filterRowsByDisplayColumns(listDefinition, dataSetRows)
    rows = createTableRows(visData)
    if (rows.length && measures) rows = sumColumns(rows, measures)
  }

  return {
    table: {
      head,
      rows,
    },
    ts,
  }
}

const sumColumns = (rowsData: MoJTableRow[][], columns: DashboardVisualisationColumn[]) => {
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
      rowsData[rowsData.length - 1][index] = {
        html: `<strong>${total}<strong>`,
      }
    })
  }

  return rowsData
}

const createTableRows = (data: DashboardDataResponse[]): MoJTableRow[][] => {
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
