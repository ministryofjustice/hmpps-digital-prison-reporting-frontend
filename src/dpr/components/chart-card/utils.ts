import { ChartCardData, MoJTable, MoJTableHead, MoJTableRow } from '../../types/Charts'
import { MetricsDefinition, MetricsDataResponse } from '../../types/Metrics'

export default {
  getChartData: ({
    definition,
    table,
  }: {
    definition: MetricsDefinition
    metric: MetricsDataResponse
    table: MoJTable
  }): ChartCardData => {
    const { id, name: title, description, visualisationType: type } = definition

    const labels = createLabels(table.rows)
    const datasets = createDatasets(table)

    const chartCardData = {
      id,
      title,
      description,
      type,
      data: {
        chart: {
          labels,
          datasets,
        },
        table,
      },
    }

    return chartCardData
  },
}

const createDatasets = (table: MoJTable) => {
  const tableCopy = JSON.parse(JSON.stringify(table))

  let { rows } = tableCopy
  rows = tableCopy.rows.map((row: MoJTableRow[]) => {
    row.shift()
    return row
  })

  const { head } = tableCopy
  head.shift()

  return head.map((h: MoJTableHead, index: number) => {
    const data = rows.map((r: MoJTableRow[]) => {
      return +r[index].text
    })
    return {
      label: h.text,
      data,
      total: data.reduce((acc: number, val: number) => acc + val, 0),
    }
  })
}

const createLabels = (rows: MoJTableRow[][]) => {
  return rows.map((row: MoJTableRow[]) => {
    return row[0].text
  })
}
