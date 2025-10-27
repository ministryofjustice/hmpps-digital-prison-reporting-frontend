/* eslint-disable prefer-destructuring */
import dayjs from 'dayjs'
import { withAlphaHex } from 'with-alpha-hex'
import {
  DashboardVisualisation,
  DashboardVisualisationColumns,
  DashboardVisualisationType,
  MatrixDashboardVisualisationBucket,
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
    const r = rag !== undefined ? Number(tsData[0][measures[1].id].rag) : undefined
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
  chartDefinition: DashboardVisualisation,
  options: MatrixDashboardVisualisationOptions,
) => {
  const { columns } = chartDefinition

  // Validate the definition
  validateDefinition(chartDefinition)

  // Initialies the timeseries data
  let data: MatrixChartData[] = initTimeseriesMatrixAxis(timeBlockData, granularity, columns)

  // Bin the data into buckets
  data = addBucketData(data, options)

  // Return the dataset
  const label = getLabel(columns)
  return [{ label, data }]
}

const validateDefinition = (chartDefinition: DashboardVisualisation) => {
  const { id, columns, type } = chartDefinition

  const errors = []
  if (columns.measures.length !== 2) {
    errors.push(`Measures should only have 2 columns defined. Only found ${columns.measures.length}`)
  } else if (type === DashboardVisualisationType.MATRIX_TIMESERIES) {
    if (columns.measures[0].id !== 'ts') {
      errors.push(`measure at index 0 has incorrect ID. Expected ID to be "ts". Found "${columns.measures[0].id}"`)
    }
  }
  if (errors.length) {
    const message = `Validation: Visualisaton definition: ID: ${id}, type: ${type}, errors: ${errors.join(',')}`
    throw new Error(message)
  }
}

const getLabel = (columns: DashboardVisualisationColumns) => {
  return columns.measures[1].display
}

const addBucketData = (matrixDataSets: MatrixChartData[], options: MatrixDashboardVisualisationOptions) => {
  const { useRagColours, buckets, baseColour } = options
  const hasRagNumberInData = hasRagNumber(matrixDataSets)

  let bucketCount = 3
  if (hasRagNumberInData) {
    bucketCount = getBucketCount(matrixDataSets)
  } else if (buckets) {
    bucketCount = buckets.length
  }
  const bucketColours = getBucketColours(bucketCount, buckets, useRagColours)

  return hasRagNumberInData
    ? setColoursForRag(matrixDataSets, bucketColours)
    : setColoursWithoutRag(matrixDataSets, bucketColours)
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

const getRagColours = () => ['#00703c', '#ffdd00', '	#d4351c']

const getBucketColours = (
  bucketCount: number,
  buckets: MatrixDashboardVisualisationBucket[],
  useRagColours: boolean,
) => {
  return useRagColours ? getRagColours() : generateBucketColours(bucketCount)
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
    chartDefinition,
    <MatrixDashboardVisualisationOptions>options,
  )

  return {
    type: type as unknown as ChartType,
    unit,
    timeseries: true,
    data: {
      datasets: matrixDataSets,
    },
  }
}
