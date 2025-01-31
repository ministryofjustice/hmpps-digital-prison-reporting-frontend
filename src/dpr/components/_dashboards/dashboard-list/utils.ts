import { MoJTable, MoJTableHead, MoJTableRow } from '../../../types/Charts'
import { MetricsDataResponse } from '../../../types/Metrics'
import { DashboardList, DashboardListsColumn } from './types'

const createList = (listDefinition: DashboardList, dashboardData: MetricsDataResponse[][]): MoJTable => {
  const dataSnapshot = dashboardData[dashboardData.length - 1] // the last element
  const { dimensions, values } = listDefinition.columns
  const columns: DashboardListsColumn[] = [...dimensions, ...values]

  const filterFields = filterDataSetForList(columns, dataSnapshot)
  return createTable(columns, filterFields)
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

const filterDataSetForList = (
  columns: DashboardListsColumn[],
  dashboardData: MetricsDataResponse[],
): MoJTableRow[][] => {
  const colIds = columns.map((column) => column.id)
  const allFields = getAllListFields(dashboardData, colIds)
  const filteredFields = filterFields(allFields)
  return filteredFields as unknown as MoJTableRow[][]
}

const filterFields = (allFields: MetricsDataResponse[]) => {
  return allFields
    .filter((dataRow: MetricsDataResponse) => {
      return Object.keys(dataRow).every((key) => dataRow[key].raw !== '')
    })
    .map((dataRow) => {
      return Object.keys(dataRow).map((key) => {
        return { text: dataRow[key].raw }
      })
    })
}

const getAllListFields = (dashboardData: MetricsDataResponse[], colIds: string[]) => {
  return dashboardData.map((dataRow) => {
    return Object.keys(dataRow)
      .filter((key) => {
        return colIds.includes(key)
      })
      .reduce((acc, key) => {
        acc[key] = dataRow[key]
        return acc
      }, {} as unknown as MetricsDataResponse)
  })
}

export default {
  createList,
}
