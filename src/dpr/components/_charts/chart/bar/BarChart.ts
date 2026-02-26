/* eslint-disable prefer-destructuring */
import { DashboardDataResponse } from '../../../../types/Metrics'
import {
  DashboardVisualisationType,
  DashboardVisualisationData,
  DashboardVisualisationDataSet,
  VisualisationDefinitionKey,
} from '../../../_dashboards/dashboard-visualisation/types'
import { components } from '../../../../types/api'
import DatasetHelper from '../../../../utils/datasetHelper'
import Chart from '../Chart'
import BarChartSchemas from './validate'
import { BarDefinitionMeasure, BarDefinitionOptions, BarDefinitionType } from './types'

class BarChart extends Chart {
  private definition!: BarDefinitionType

  private measures!: BarDefinitionMeasure[]

  private keys!: VisualisationDefinitionKey[]

  private options: BarDefinitionOptions | undefined

  override responseData: DashboardDataResponse[] = []

  private isList = false

  override datasets: DashboardVisualisationDataSet[] = []

  private groupsData: DashboardDataResponse[][] = []

  private groupKey: string[] | undefined

  private xAxisColumn: BarDefinitionMeasure | undefined

  private yAxisColumn: BarDefinitionMeasure | undefined

  private barCount = 0

  withDefinition = (definition: components['schemas']['DashboardVisualisationDefinition']) => {
    this.definition = BarChartSchemas.BarSchema.parse(definition)
    this.initFromDefinitionData()
    this.initHelpers()

    return this
  }

  override withData = (responseData: DashboardDataResponse[]) => {
    this.responseData = responseData
    if (this.isList) this.initListData()
    return this
  }

  private initFromDefinitionData = () => {
    this.measures = this.definition.columns.measures
    this.options = this.definition.options
    this.keys = this.definition.columns.keys || []
    this.isList = !!this.measures.find((col) => col.axis)
    this.initUnit(this.measures)
  }

  getCanvasHeight = () => {
    this.barCount = this.datasets.length * this.datasets[0].data.length
    return this.options?.horizontal ? this.barCount : 5
  }

  build = (): DashboardVisualisationData => {
    if (!this.isList) {
      this.getBarChartData()
    } else {
      this.getListBarChartData()
    }
    const height = this.getCanvasHeight()

    return {
      type: DashboardVisualisationType.BAR,
      options: {
        height,
        unit: this.unit,
        timeseries: false,
      },
      data: {
        labels: this.labels,
        datasets: this.datasets,
        config: this.config,
      },
    }
  }

  augmentDataset = (datasets: DashboardVisualisationDataSet[]) => {
    return datasets.map((set) => {
      return {
        ...set,
        borderWidth: [0, 0],
        datalabels: {
          align: 'center',
          anchor: 'bottom',
        },
      }
    })
  }

  setBespokeOptions = () => {
    let indexAxis = 'x'
    let scales

    if (this.options) {
      const { horizontal, xStacked, yStacked } = this.options
      indexAxis = horizontal ? 'y' : indexAxis
      if (xStacked || yStacked) {
        scales = {
          ...(xStacked && { x: { stacked: xStacked } }),
          ...(yStacked && { y: { stacked: yStacked } }),
        }
      }
    }

    return {
      ...this.config,
      indexAxis,
      ...(scales && { scales }),
    }
  }

  /**
   * Creates a simple bar chart
   *
   * @private
   * @memberof BarChart
   */
  private getBarChartData = () => {
    this.createDatasets(this.measures, this.keys, this.responseData) // Chart.ts
    this.createLabels(this.measures) // Chart.ts

    // Augment the datasets with chart specific config
    this.datasets = this.augmentDataset(this.datasets)

    // Set the bespoke chart.js options for the chart
    this.config = this.setBespokeOptions()
  }

  /**
   * Creates a bar chart from a list
   *
   * @private
   * @memberof BarChart
   */
  private getListBarChartData = () => {
    this.createListLabels()
    this.createListDatasets()

    // Augment the datasets with chart specific config
    this.datasets = this.augmentDataset(this.datasets)

    // Set the bespoke chart.js options for the chart
    this.config = this.setBespokeOptions()
  }

  private initListData = () => {
    this.xAxisColumn = this.measures.find((col) => col.axis === 'x')
    this.yAxisColumn = this.measures.find((col) => col.axis === 'y')
    this.groupKey = this.keys.map((key) => key.id)
    this.groupsData =
      this.groupKey && this.groupKey.length
        ? DatasetHelper.groupRowsBy(this.responseData, this.groupKey)
        : [this.responseData]
  }

  private createListDatasets = () => {
    this.datasets = this.groupsData.map((groupData, groupIndex) => {
      const data = Array(this.labels.length)
      groupData.forEach((row) => {
        // Validation will ensure these columns exist
        const yId = this.yAxisColumn?.id || ''
        const xId = this.xAxisColumn?.id || ''

        const labelField = row[xId]
        const valueField = row[yId]

        const raw = valueField && valueField.raw ? Number(valueField.raw) : 0
        const dataIndex = this.labels.findIndex((l) => l === labelField.raw)
        if (dataIndex !== -1) {
          data[dataIndex] = Number(raw)
        }
      })

      const label = this.chartLabelsHelper.getDatasetLabel(this.keys, groupData[0])

      return {
        label,
        data,
        total: data.reduce((acc: number, val: number) => acc + val, 0),
        ...this.setStyles(groupIndex),
      }
    })
  }

  private createListLabels = () => {
    const axisId = this.xAxisColumn?.id || ''
    this.labels = this.chartLabelsHelper.getListLabels(this.groupsData, axisId)
  }
}

export { BarChart }
export default BarChart
