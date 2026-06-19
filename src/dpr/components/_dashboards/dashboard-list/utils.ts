/* eslint-disable no-param-reassign */
import { components } from '../../../types/api'
import { DashboardDataResponse } from '../../../types/Metrics'
import DatasetHelper, { getDateColumn, getDateValue } from '../../../utils/Dashboards/VisualisationDatasetHelper'
import {
  ListDashboardVisualisationOptions,
  MoJTable,
  MoJTableHead,
  MoJTableRow,
} from '../dashboard-visualisation/types'
import ListVisSchemas from './validate'
import { apiDateToUi } from '../../../utils/dateHelper'

export const createList = (
  listDefinition: components['schemas']['DashboardVisualisationDefinition'],
  dashboardData: DashboardDataResponse[],
): { table: MoJTable; ts: string } => {
  ListVisSchemas.ListSchema.parse(listDefinition)

  const { columns, options } = listDefinition
  const { measures, keys } = columns

  const listOptions = <ListDashboardVisualisationOptions>options
  const columnsAsList = listOptions?.columnsAsList
  const showAllData = (!measures && !keys) || (!measures.length && !keys)

  let datasetData: DashboardDataResponse[] = [...dashboardData]

  if (listOptions?.showLatest ?? true) {
    const dateColumn = DatasetHelper.getDateColumn(columns)
    datasetData = DatasetHelper.getLastestDataset(datasetData, dateColumn)
  }

  let head
  let rows
  let ts

  if (showAllData) {
    ;({ head, rows, ts } = createFullList(listDefinition, datasetData))
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

const createListFromColumns = (
  listDefinition: components['schemas']['DashboardVisualisationDefinition'],
  dashboardData: DashboardDataResponse[],
) => {
  const { columns } = listDefinition
  const { keys, measures } = columns
  const groupKey = DatasetHelper.getGroupKey(dashboardData, keys || [])

  const dateColumn = getDateColumn(columns)
  const dateData = getDateValue(dashboardData, dateColumn)
  const ts = dateData?.value ? `${dateData.value}` : ''

  const head: MoJTableHead[] = []
  head.push({
    html: '<p class="govuk-visually-hidden">list values</p>',
  })
  dashboardData.forEach(row => {
    head.push({
      text: groupKey ? `${row[groupKey.id].raw}` : '',
    })
  })

  const rows: MoJTableRow[][] = []
  measures.forEach(measure => {
    rows.push([{ text: measure.display }] as MoJTableRow[])
  })

  measures.forEach((measure, index) => {
    dashboardData.forEach(row => {
      rows[index].push({ text: `${row[measure.id].raw}` })
    })
  })

  return {
    rows,
    head,
    ts,
  }
}

/**
 * Creates the table rows for a dashboard list visualisation
 * - If no measures are passed in it will present the full data
 *
 * @param {DashboardDataResponse[]} data
 * @param {components['schemas']['DashboardVisualisationColumnDefinition'][]} [measures]
 * @return {*}  {MoJTableRow[][]}
 */
export const createTableRows = (
  data: DashboardDataResponse[],
  measures?: components['schemas']['DashboardVisualisationColumnDefinition'][],
): MoJTableRow[][] => {
  if (!data || data.length === 0 || !data[0]) {
    return []
  }

  // Set the list data using the measure
  if (measures && measures.length) {
    return data.map(dataRow => {
      const row: MoJTableRow[] = Array.from({ length: measures.length }, () => ({ text: '' }))

      Object.keys(dataRow).forEach(key => {
        const headIndex = measures.findIndex(m => m.id === key)
        if (headIndex === -1) {
          return
        }
        const measure = measures[headIndex]

        const raw = dataRow[key]?.raw
        if (raw == null) {
          return
        }
        let cellContent = String(raw)

        const { type } = measure
        if (type === 'date') {
          cellContent = apiDateToUi(cellContent) || cellContent
        }

        const cell: MoJTableRow = measure.type === 'HTML' ? { html: cellContent } : { text: cellContent }

        row[headIndex] = cell
      })

      return row
    })
  }

  // Return the data unfiltered by measures
  return data.map(dataRow => {
    const row: MoJTableRow[] = Array(Object.keys(data[0]).length)

    Object.keys(dataRow).forEach((key, index) => {
      const text = dataRow[key].raw
      row.splice(index, 1, { text } as MoJTableRow)
    })

    return row
  })
}

const creatListFromRows = (
  listDefinition: components['schemas']['DashboardVisualisationDefinition'],
  dashboardData: DashboardDataResponse[],
) => {
  const { columns } = listDefinition
  const { measures } = columns

  const head: MoJTableHead[] = measures.map(column => {
    return { text: column.display || '' }
  })

  const dataSetRows = DatasetHelper.getDatasetRows(listDefinition, dashboardData)
  const displayRows = DatasetHelper.filterRowsByDisplayColumns(listDefinition, dataSetRows)
  const rows = createTableRows(displayRows, measures)

  const dateColumn = getDateColumn(columns)
  const dateData = getDateValue(dataSetRows, dateColumn)
  const ts = dateData?.value ? `${dateData.value}` : ''

  return {
    head,
    rows,
    ts,
  }
}

const createFullList = (
  listDefinition: components['schemas']['DashboardVisualisationDefinition'],
  dashboardData: DashboardDataResponse[],
) => {
  if (!dashboardData || dashboardData.length === 0 || !dashboardData[0]) {
    return {
      head: [],
      rows: [],
      ts: '',
    }
  }

  const { columns } = listDefinition

  const firstRow = dashboardData[0]
  const head: MoJTableHead[] = Object.keys(firstRow).map(key => {
    return { text: key || '' }
  })

  const rows = createTableRows(dashboardData)
  const dateColumn = getDateColumn(columns)

  const latestData = DatasetHelper.getLastestDataset(dashboardData, dateColumn)

  const dateData = getDateValue(latestData, dateColumn)
  const ts = dateData?.value ? `${dateData.value}` : ''

  return {
    head,
    rows,
    ts,
  }
}

const sumColumns = (
  rowsData: MoJTableRow[][],
  measures: components['schemas']['DashboardVisualisationColumnDefinition'][],
) => {
  const sumColumnIndexes: number[] = measures.flatMap((col, idx) => (col.aggregate ? [idx] : []))

  if (sumColumnIndexes.length) {
    const sumRow: MoJTableRow[] = [{ html: `<strong>Total<strong>` }]
    for (let index = 1; index < measures.length; index += 1) {
      sumRow[index] = { text: '' }
    }

    rowsData.push(sumRow)
    sumColumnIndexes.forEach(index => {
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
