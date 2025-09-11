/* eslint-disable no-param-reassign */
import { MoJTable, MoJTableRow } from '../../../types/Charts'
import { DashboardDataResponse } from '../../../types/Metrics'
import {
  DashboardVisualisationColumn,
  DashboardVisualisationColumnMeasure,
  ListVisualisation,
} from '../dashboard/types'
import DatasetHelper from '../../../utils/datasetHelper'

const createList = (
  listDefinition: ListVisualisation,
  dashboardData: DashboardDataResponse[],
): { table: MoJTable; ts: string } => {
  const { columns, showLatest = true, columnsAsList } = listDefinition
  const { measures, keys } = columns
  const showAllData = (!measures && !keys) || (!measures.length && !keys)

  let datasetData: DashboardDataResponse[] = [...dashboardData]
  if (showLatest) {
    datasetData = DatasetHelper.getLastestDataset(datasetData)
  }

  let head
  let rows
  let ts

  if (showAllData) {
    ;({ head, rows, ts } = createFullList(datasetData))
  } else if (columnsAsList) {
    ;({ head, rows, ts } = createListFromColumns(listDefinition, datasetData))
  } else {
    ;({ head, rows, ts } = creatListFromRows(listDefinition, datasetData))
  }

  if (rows.length && measures) rows = sumColumns(rows, measures)

  return {
    table: {
      head,
      rows,
    },
    ts,
  }
}

const createListFromColumns = (listDefinition: ListVisualisation, dashboardData: DashboardDataResponse[]) => {
  const { columns } = listDefinition
  const { keys, measures } = columns
  const groupKey = DatasetHelper.getGroupKey(keys || [], dashboardData)

  const timestampData = dashboardData[0]?.ts?.raw
  const ts = timestampData ? `${timestampData}` : ''

  const head = []
  head.push({ text: '' })
  dashboardData.forEach((row) => {
    head.push({
      text: groupKey ? row[groupKey.id].raw : '',
    })
  })

  const rows: MoJTableRow[][] = []
  measures.forEach((measure) => {
    rows.push([{ text: measure.display }] as MoJTableRow[])
  })

  measures.forEach((measure, index) => {
    dashboardData.forEach((row) => {
      rows[index].push({ text: `${row[measure.id].raw}` })
    })
  })

  return {
    rows,
    head,
    ts,
  }
}

const createTableRows = (data: DashboardDataResponse[], measures?: DashboardVisualisationColumn[]): MoJTableRow[][] => {
  return data.map((dataRow) => {
    const row: MoJTableRow[] = measures?.length ? Array(measures.length) : Array(Object.keys(data[0]).length)
    Object.keys(dataRow).forEach((key, index) => {
      const headIndex = measures?.length ? measures.findIndex((m) => m.id === key) : index
      const text = dataRow[key].raw
      row.splice(headIndex, 1, { text } as MoJTableRow)
    })

    return row
  })
}

const creatListFromRows = (listDefinition: ListVisualisation, dashboardData: DashboardDataResponse[]) => {
  const { measures } = listDefinition.columns

  const head = measures.map((column) => {
    return { text: column.display }
  })

  const dataSetRows = DatasetHelper.getDatasetRows(listDefinition, dashboardData)
  const displayRows = DatasetHelper.filterRowsByDisplayColumns(listDefinition, dataSetRows)
  const rows = createTableRows(displayRows, measures)

  const timestampData = dataSetRows[0]?.ts?.raw
  const ts = timestampData ? `${timestampData}` : ''

  return {
    head,
    rows,
    ts,
  }
}

const createFullList = (dashboardData: DashboardDataResponse[]) => {
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

const sumColumns = (rowsData: MoJTableRow[][], measures: DashboardVisualisationColumnMeasure[]) => {
  const sumColumnIndexes: number[] = measures.flatMap((col, idx) => (col.aggregate ? [idx] : []))

  if (sumColumnIndexes.length) {
    const sumRow: MoJTableRow[] = [{ html: `<strong>Total<strong>` }]
    for (let index = 1; index < measures.length; index += 1) {
      sumRow[index] = { text: '' }
    }

    rowsData.push(sumRow)
    sumColumnIndexes.forEach((index) => {
      const total = rowsData.reduce((acc, row) => {
        const rowIndex = row[index]
        if (rowIndex && rowIndex.text) {
          acc += Number(rowIndex.text)
        }
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
