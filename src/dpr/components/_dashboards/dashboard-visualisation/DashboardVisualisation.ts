/* eslint-disable prefer-destructuring */
import { components } from '../../../types/api'
import { DashboardDataResponse } from '../../../types/Metrics'
import DashboardVisualisationSchemas from './Validate'

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
    this.validate()
    this.columns = definition.columns
    this.measures = this.columns.measures
    this.keys = this.columns.keys
    this.type = this.definition.type.split('-')[0] as components['schemas']['DashboardVisualisationDefinition']['type']
    this.initUnit()
    this.responseData = responseData
  }

  initUnit = () => {
    // todo
    this.unit = this.columns.measures[0].unit ? this.columns.measures[0].unit : undefined
  }

  private validate = () => {
    switch (this.definition.type) {
      case 'scorecard':
        this.definition = DashboardVisualisationSchemas.ScorecardSchema.parse(this.definition)
        break
      case 'scorecard-group':
        this.definition = DashboardVisualisationSchemas.ScorecardGroupSchema.parse(this.definition)
        break
      case 'matrix-timeseries':
        this.definition = DashboardVisualisationSchemas.MatrixTimeseriesSchema.parse(this.definition)
        break
      default:
        this.definition = DashboardVisualisationSchemas.DashboardVisualisationSchema.parse(this.definition)
        break
    }
  }
}

export { DashboardVisualisationClass }
export default DashboardVisualisationClass
