/* eslint-disable no-param-reassign */
import { MoJTable, MoJTableHead, MoJTableRow } from '../../../types/Charts'
import { MetricsDataResponse } from '../../../types/Metrics'
import { DashboardList, DashboardListsColumn } from './types'

const createList = (listDefinition: DashboardList, dashboardData: MetricsDataResponse[][]): MoJTable => {
  const dataSnapshot = dashboardData[dashboardData.length - 1]
  const columns: DashboardListsColumn[] = [...listDefinition.columns.dimensions]
  let rowsData = filterDataset(listDefinition, dataSnapshot)
  rowsData = sumColumns(rowsData, columns)
  return createTable(columns, rowsData)
}

const createTable = (columns: DashboardListsColumn[], filterFields: MoJTableRow[][]) => {
  const rows: MoJTableRow[][] = filterFields
  const head: MoJTableHead[] = columns.map((column) => {
    return { text: column.display }
  })

  return {
    rows,
    head,
  }
}

const sumColumns = (rowsData: MoJTableRow[][], columns: DashboardListsColumn[]) => {
  const sumColumnIndexes: number[] = columns
    .map((col, index) => (col.aggregate ? index : undefined))
    .filter((index) => index)

  if (sumColumnIndexes.length) {
    const sumRow: MoJTableRow[] = [{ html: `<strong>Total<strong>` }]
    for (let index = 1; index < columns.length; index += 1) {
      sumRow[index] = { text: '0' }
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

const filterDataset = (listDefinition: DashboardList, dashboardData: MetricsDataResponse[]) => {
  const { keys, dimensions } = listDefinition.columns
  const displayColumnsIds = dimensions.map((col) => col.id)
  const keyColumnsIds = keys.map((col) => col.id)

  const filtered: MoJTableRow[][] = dashboardData
    .filter((datasetRow: MetricsDataResponse) => {
      const validRow: boolean[] = []
      Object.keys(datasetRow).forEach((datasetField) => {
        const value = datasetRow[datasetField].raw
        let valid = false
        if (displayColumnsIds.includes(datasetField) || keyColumnsIds.includes(datasetField)) {
          valid = value !== '' && value !== undefined && value !== null
        } else {
          valid = value === '' || value === undefined || value === null
        }
        validRow.push(valid)
      })

      return validRow.every((val) => val)
    })
    .map((datasetRow: MetricsDataResponse) => {
      return Object.keys(datasetRow)
        .filter((key) => displayColumnsIds.includes(key))
        .reduce((acc, key) => {
          acc[key] = datasetRow[key]
          return acc
        }, {} as unknown as MetricsDataResponse)
    })
    .map((dataRow) => {
      return Object.keys(dataRow).map((key) => {
        return { text: dataRow[key].raw } as MoJTableRow
      })
    })

  return filtered
}

export default {
  createList,
}
