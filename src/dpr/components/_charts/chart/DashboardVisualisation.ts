/* eslint-disable prefer-destructuring */
import { ChartType, UnitType } from '../../../types/Charts'
import { DashboardDataResponse } from '../../../types/Metrics'
import {
  DashboardVisualisation,
  DashboardVisualisationColumnKey,
  DashboardVisualisationColumnMeasure,
  DashboardVisualisationColumns,
} from '../../_dashboards/dashboard/types'

class DashboardVisualisationClass {
  responseData: DashboardDataResponse[]

  definition: DashboardVisualisation

  columns: DashboardVisualisationColumns

  measures: DashboardVisualisationColumnMeasure[]

  keys: DashboardVisualisationColumnKey[]

  unit: UnitType

  type: ChartType

  constructor(responseData: DashboardDataResponse[], definition: DashboardVisualisation) {
    this.definition = definition
    this.columns = definition.columns
    this.measures = this.columns.measures
    this.keys = this.columns.keys
    this.type = this.definition.type.split('-')[0] as ChartType
    this.initUnit()
    this.responseData = responseData
  }

  initUnit = () => {
    // todo
    this.unit = this.columns.measures[0].unit ? this.columns.measures[0].unit : undefined
  }
}

export { DashboardVisualisationClass }
export default DashboardVisualisationClass
