/* eslint-disable prefer-destructuring */
import { components } from '../../../types/api'
import { DashboardDataResponse } from '../../../types/Metrics'

class DashboardVisualisationClass {
  responseData: DashboardDataResponse[]

  definition: components['schemas']['DashboardVisualisationDefinition']

  columns: components['schemas']['DashboardVisualisationColumnsDefinition']

  measures: components['schemas']['DashboardVisualisationColumnDefinition'][]

  keys: components['schemas']['DashboardVisualisationColumnDefinition'][]

  unit: components['schemas']['DashboardVisualisationColumnDefinition']['unit']

  type: components['schemas']['DashboardVisualisationDefinition']['type']

  constructor(
    responseData: DashboardDataResponse[],
    definition: components['schemas']['DashboardVisualisationDefinition'],
  ) {
    this.definition = definition
    this.columns = definition.columns
    this.measures = this.columns.measures
    this.keys = this.columns.keys || []
    this.type = this.definition.type.split('-')[0] as components['schemas']['DashboardVisualisationDefinition']['type']
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
