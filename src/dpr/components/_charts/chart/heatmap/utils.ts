import dayjs from 'dayjs'
import { DashboardVisualisation, DashboardVisualisationColumns } from '../../../_dashboards/dashboard/types'
import { Granularity } from '../../../_inputs/granular-date-range/types'
import { ChartData, ChartDataset, ChartType, MatrixChartData } from '../../../../types/Charts'
import { DashboardDataResponse } from '../../../../types/Metrics'
import DatasetHelper from '../../../../utils/datasetHelper'

const initTimeseriesMatrixAxis = (
  timeBlockData: DashboardDataResponse[][],
  granularity: Granularity,
  columns: DashboardVisualisationColumns,
): MatrixChartData[] => {
  const { measures } = columns
  let dataset: MatrixChartData[] = []
  switch (granularity) {
    case 'hourly':
      break
    case 'weekly':
      dataset = timeBlockData.map((tsData) => {
        const x = dayjs(tsData[0].ts.raw, 'DD/MM/YYYY').format('ddd')
        const y = dayjs(tsData[0].ts.raw, 'DD/MM/YYYY').week()
        const v = Number(tsData[0][measures[1].id].raw)
        return { y, x, v }
      })
      break
    case 'daily':
      dataset = timeBlockData
        .map((tsData) => {
          const x = dayjs(tsData[0].ts.raw, 'DD/MM/YYYY').format('MMM YY')
          const y = dayjs(tsData[0].ts.raw, 'DD/MM/YYYY').format('D')
          const v = Number(tsData[0][measures[1].id].raw)
          return { y, x, v }
        })
        .sort((a, b) => {
          return parseFloat(b.y) - parseFloat(a.y)
        })
      break
    case 'monthly':
      // Assumes ts format is MMM YY
      dataset = timeBlockData.map((tsData) => {
        const ts = (<string>tsData[0].ts.raw).split(' ')
        const value = Number(tsData[0][measures[1].id].raw)
        return { y: ts[0], x: ts[1], v: value }
      })
      break
    case 'annually':
      dataset = timeBlockData
        .map((tsData) => {
          const x = 'year'
          const y = <string>tsData[0].ts.raw
          const v = Number(tsData[0][measures[1].id].raw)
          return { y, x, v }
        })
        .sort((a, b) => {
          return parseFloat(b.y) - parseFloat(a.y)
        })
      break
    default:
      break
  }

  return dataset
}

const createMatrixDataSet = (
  timeBlockData: DashboardDataResponse[][],
  granularity: Granularity,
  columns: DashboardVisualisationColumns,
) => {
  const dataset: MatrixChartData[] = initTimeseriesMatrixAxis(timeBlockData, granularity, columns)
  return [{ label: 'test', data: dataset }]
}

export const createTimeseriesMatrixChart = (
  chartDefinition: DashboardVisualisation,
  timeseriesData: DashboardDataResponse[],
  granularity: Granularity,
): ChartData => {
  const { columns } = chartDefinition
  const { measures } = columns

  const unit = measures[0].unit ? measures[0].unit : undefined
  const type = chartDefinition.type.split('-')[0]
  const timeBlockData = DatasetHelper.groupRowsByTimestamp(timeseriesData)
  const matrixDataSets: ChartDataset[] = createMatrixDataSet(timeBlockData, granularity, columns)

  return {
    type: type as unknown as ChartType,
    unit,
    timeseries: true,
    data: {
      datasets: matrixDataSets,
    },
  }
}
