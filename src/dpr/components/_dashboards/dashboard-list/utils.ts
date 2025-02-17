/* eslint-disable no-param-reassign */
import { MoJTable, MoJTableRow } from '../../../types/Charts'
import { DashboardDataResponse } from '../../../types/Metrics'
import { DashboardVisualisation, DashboardVisualisationColumn } from '../dashboard/types'
import DatasetHelper from '../../../utils/datasetHelper'

const createList = (
  listDefinition: DashboardVisualisation,
  dashboardData: DashboardDataResponse[],
): { table: MoJTable; ts: string } => {
  const { columns, showLatest = true, id } = listDefinition
  const { measures, keys } = columns

  let datasetData: DashboardDataResponse[] = [...dashboardData]
  if (showLatest) {
    datasetData = DatasetHelper.getLastestDataset(datasetData)
  }

  let head
  let rows
  let ts

  if (!measures && !keys) {
    ;({ head, rows, ts } = showAllData(datasetData))
  } else {
    ;({ head, rows, ts } = getHeadAndRows(listDefinition, datasetData))
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

const createTableRows = (data: DashboardDataResponse[]): MoJTableRow[][] => {
  return data.map((dataRow) => {
    return Object.keys(dataRow).map((key) => {
      const text = dataRow[key].raw
      return { text } as MoJTableRow
    })
  })
}

const getHeadAndRows = (listDefinition: DashboardVisualisation, dashboardData: DashboardDataResponse[]) => {
  const { measures } = listDefinition.columns
  // const latestData = DatasetHelper.getLastestDataset(dashboardData)

  const head = measures.map((column) => {
    return { text: column.display }
  })

  const dataSetRows = DatasetHelper.getDatasetRows(listDefinition, dashboardData)
  const displayRows = DatasetHelper.filterRowsByDisplayColumns(listDefinition, dataSetRows)
  const rows = createTableRows(displayRows)

  const timestampData = dataSetRows[0]?.ts?.raw
  const ts = timestampData ? `${timestampData}` : ''

  return {
    head,
    rows,
    ts,
  }
}

const showAllData = (dashboardData: DashboardDataResponse[]) => {
  const head = Object.keys(dashboardData[0]).map((key) => {
    return { text: key }
  })
  const rows = createTableRows(dashboardData)

  const latestData = DatasetHelper.getLastestDataset(dashboardData)
  const timestampData = latestData[0]?.ts?.raw
  const ts = timestampData ? `${timestampData}` : ''

  return {
    head,
    rows,
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

export default {
  createList,
  createTableRows,
}
