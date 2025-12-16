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

  private groupKey: BarDefinitionMeasure | undefined

  private xAxisColumn: BarDefinitionMeasure | undefined

  private yAxisColumn: BarDefinitionMeasure | undefined

  withDefinition = (definition: components['schemas']['DashboardVisualisationDefinition']) => {
    this.definition = BarChartSchemas.BarSchema.parse(definition)
    this.initFromDefinitionData()

    return this
  }

  override withData = (responseData: DashboardDataResponse[]) => {
    this.responseData = responseData
    if (this.isList) this.initListData()
    return this
  }

  build = (): DashboardVisualisationData => {
    if (!this.isList) {
      this.getBarChartData()
    } else {
      this.getListBarChartData()
    }

    return {
      type: DashboardVisualisationType.BAR,
      unit: this.unit,
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

  private getBarChartData = () => {
    this.createDatasets(this.measures, this.responseData)
    this.datasets = this.augmentDataset(this.datasets)
    this.config = this.setBespokeOptions()
    this.createLabels(this.measures)
  }

  private getListBarChartData = () => {
    this.createListLabels()
    this.createListDatasets()
    this.datasets = this.augmentDataset(this.datasets)
    this.config = this.setBespokeOptions()
  }

  private initFromDefinitionData = () => {
    this.measures = this.definition.columns.measures
    this.options = this.definition.options
    this.keys = this.definition.columns.keys || []
    this.isList = !!this.measures.find((col) => col.axis)
    this.initUnit(this.measures)

    if (!this.isList) this.getLabelId(this.keys)
  }

  private initListData = () => {
    this.xAxisColumn = this.measures.find((col) => col.axis === 'x')
    this.yAxisColumn = this.measures.find((col) => col.axis === 'y')
    this.groupKey = <BarDefinitionMeasure>(
      DatasetHelper.getGroupKey(
        this.responseData,
        <Array<components['schemas']['DashboardVisualisationColumnDefinition']>>this.keys,
      )
    )
    this.groupsData = this.groupKey
      ? DatasetHelper.groupRowsByKey(this.responseData, this.groupKey.id)
      : [this.responseData]
  }

  private createListDatasets = () => {
    this.datasets = this.groupsData.map((groupData) => {
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

      let label = ''
      if (this.groupKey) {
        const groupKeyId = this.groupKey.id
        const groupRow = groupData[0]
        label = groupRow && groupRow[groupKeyId] ? `${groupRow[groupKeyId].raw}` : ''
      } else {
        label = this.yAxisColumn?.display || label
      }

      return {
        label,
        data,
        total: data.reduce((acc: number, val: number) => acc + val, 0),
      }
    })
  }

  private createListLabels = () => {
    this.labels = this.groupsData.flatMap((gd) => {
      const id = this.xAxisColumn?.id || ''
      return gd.map((row) => {
        const field = row[id]
        return field ? `${field.raw}` : ''
      })
    })
  }
}

export { BarChart }
export default BarChart
