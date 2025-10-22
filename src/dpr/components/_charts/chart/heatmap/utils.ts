/* eslint-disable prefer-destructuring */
import dayjs from 'dayjs'
import { withAlphaHex } from 'with-alpha-hex'
import {
  DashboardVisualisation,
  DashboardVisualisationColumns,
  MatrixDashboardVisualisationOptions,
} from '../../../_dashboards/dashboard/types'
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
  return timeBlockData.map((tsData) => {
    const { raw, rag } = tsData[0][measures[1].id]
    const v = Number(raw)
    const r = rag ? Number(tsData[0][measures[1].id].rag) : undefined

    let x
    let y
    switch (granularity) {
      case 'hourly':
        break
      case 'weekly':
        x = dayjs(tsData[0].ts.raw, 'DD/MM/YYYY').format('ddd')
        y = dayjs(tsData[0].ts.raw, 'DD/MM/YYYY').week()
        break
      case 'daily':
        x = dayjs(tsData[0].ts.raw, 'DD/MM/YYYY').format('MMM YY')
        y = dayjs(tsData[0].ts.raw, 'DD/MM/YYYY').format('D')
        break
      case 'monthly':
        {
          const ts = (<string>tsData[0].ts.raw).split(' ')
          x = ts[1]
          y = ts[0]
        }
        break
      case 'annually':
        x = 'year'
        y = <string>tsData[0].ts.raw
        break
      default:
        x = dayjs(tsData[0].ts.raw, 'DD/MM/YYYY').format('MMM YY')
        y = dayjs(tsData[0].ts.raw, 'DD/MM/YYYY').format('D')
        break
    }

    return { y, x, v, r }
  })
}

const createMatrixDataSet = (
  timeBlockData: DashboardDataResponse[][],
  granularity: Granularity,
  columns: DashboardVisualisationColumns,
  options: MatrixDashboardVisualisationOptions,
) => {
  let dataset: MatrixChartData[] = initTimeseriesMatrixAxis(timeBlockData, granularity, columns)
  dataset = addBucketData(dataset, options)

  return [{ label: 'test', data: dataset }]
}

const addBucketData = (matrixDataSets: MatrixChartData[], options: MatrixDashboardVisualisationOptions) => {
  const { useRagColours } = options
  const hasRag = hasRagNumber(matrixDataSets)
  const bucketCount = hasRag ? getBucketCount(matrixDataSets) : 3
  const bucketColours = createRagColours(bucketCount, useRagColours)
  return hasRag ? setColoursForRag(matrixDataSets, bucketColours) : setColoursWithoutRag(matrixDataSets, bucketColours)
}

const setColoursWithoutRag = (matrixDataSets: MatrixChartData[], bucketColours: string[]) => {
  const bucketSizes = getBucketSizes(matrixDataSets, bucketColours.length)
  const colours = bucketColours.slice().reverse()

  return matrixDataSets.map((dataPoint) => {
    let bucketNumber = 0
    bucketSizes.forEach((bucket, i) => {
      if (dataPoint.v <= bucket) bucketNumber = i
    })
    return { ...dataPoint, r: bucketNumber, c: colours[bucketNumber] }
  })
}

const setColoursForRag = (matrixDataSets: MatrixChartData[], bucketColours: string[]) => {
  return matrixDataSets.map((dataPoint) => {
    return { ...dataPoint, c: bucketColours[dataPoint.r] }
  })
}

const createRagColours = (bucketCount: number, useRagColours: boolean) => {
  const ragColours = ['#00703c', '#ffdd00', '	#d4351c']
  return useRagColours ? ragColours : generateBucketColours(bucketCount)
}

const generateBucketColours = (bucketCount: number) => {
  const baseColour = '#1d70b8'
  const alphaDivision = 1 / bucketCount
  return Array.from(Array(bucketCount)).map((d, i) => {
    const division = alphaDivision * (i + 1)
    return withAlphaHex(baseColour, division)
  })
}

const getBucketCount = (matrixDataSets: MatrixChartData[]) => {
  return Math.max(...matrixDataSets.map((o) => o.r)) + 1
}

const hasRagNumber = (matrixDataSets: MatrixChartData[]) => {
  return matrixDataSets[0].r !== undefined
}

const getBucketSizes = (matrixDataSets: MatrixChartData[], bucketCount: number) => {
  const values = matrixDataSets.map((dataPoint) => dataPoint.v)
  const min = Math.min(...values)
  const max = Math.max(...values)
  const threshholdSize = Math.ceil((max - min) / bucketCount)
  return Array.from(Array(bucketCount))
    .map((d, i) => {
      return threshholdSize * (i + 1)
    })
    .reverse()
}

export const createTimeseriesMatrixChart = (
  chartDefinition: DashboardVisualisation,
  timeseriesData: DashboardDataResponse[],
  granularity: Granularity,
): ChartData => {
  const { columns, options } = chartDefinition
  const { measures } = columns

  const unit = measures[0].unit ? measures[0].unit : undefined
  const type = chartDefinition.type.split('-')[0]
  const timeBlockData = DatasetHelper.groupRowsByTimestamp(timeseriesData)
  const matrixDataSets: ChartDataset[] = createMatrixDataSet(
    timeBlockData,
    granularity,
    columns,
    <MatrixDashboardVisualisationOptions>options,
  )

  console.log(JSON.stringify({ matrixDataSets }, null, 2))

  return {
    type: type as unknown as ChartType,
    unit,
    timeseries: true,
    data: {
      datasets: matrixDataSets,
    },
  }
}
