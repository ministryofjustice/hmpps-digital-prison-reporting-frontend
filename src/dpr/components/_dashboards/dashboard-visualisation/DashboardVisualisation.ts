/* eslint-disable prefer-destructuring */
import { components } from '../../../types/api'
import { DashboardDataResponse } from '../../../types/Metrics'
import DatasetHelper from '../../../utils/datasetHelper'
import {
  MatrixTimeseriesDefinitionType,
  ScorecardDefinitionType,
  ScorecardGroupDefinitionType,
  VisualisationDefinitionType,
} from './types'
import DashboardVisualisationSchemas from './Validate'

class DashboardVisualisationClass {
  responseData: DashboardDataResponse[]

  definition:
    | ScorecardDefinitionType
    | ScorecardGroupDefinitionType
    | MatrixTimeseriesDefinitionType
    | VisualisationDefinitionType

  columns: components['schemas']['DashboardVisualisationColumnsDefinition']

  measures: components['schemas']['DashboardVisualisationColumnDefinition'][]

  keys: components['schemas']['DashboardVisualisationColumnDefinition'][]

  unit: components['schemas']['DashboardVisualisationColumnDefinition']['unit']

  type: components['schemas']['DashboardVisualisationDefinition']['type']

  constructor(
    responseData: DashboardDataResponse[],
    definition: components['schemas']['DashboardVisualisationDefinition'],
  ) {
    this.definition = this.validate(definition)
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

  getDataset = (
    definition: components['schemas']['DashboardVisualisationDefinition'],
    rawData: DashboardDataResponse[],
  ) => {
    const latestData = DatasetHelper.getLastestDataset(rawData)
    const latestDataSetRows = DatasetHelper.getDatasetRows(definition, latestData)
    const latestTs = latestDataSetRows[0]?.ts?.raw
    const latestFiltered = DatasetHelper.filterRowsByDisplayColumns(definition, latestDataSetRows, true)

    const earliestData = DatasetHelper.getEarliestDataset(rawData)
    const earliestDataSetRows = DatasetHelper.getDatasetRows(definition, earliestData)
    const earliestTs = earliestDataSetRows[0]?.ts?.raw
    const earliestfiltered = DatasetHelper.filterRowsByDisplayColumns(definition, earliestDataSetRows, true)

    return {
      earliest: earliestfiltered,
      earliestTs,
      latest: latestFiltered,
      latestTs,
    }
  }

  private validate = (definition: components['schemas']['DashboardVisualisationDefinition']) => {
    switch (definition.type) {
      case 'scorecard':
        return <ScorecardDefinitionType>DashboardVisualisationSchemas.ScorecardSchema.parse(this.definition)
      case 'scorecard-group':
        return <ScorecardGroupDefinitionType>DashboardVisualisationSchemas.ScorecardGroupSchema.parse(this.definition)
      case 'matrix-timeseries':
        return <MatrixTimeseriesDefinitionType>(
          DashboardVisualisationSchemas.MatrixTimeseriesSchema.parse(this.definition)
        )
      default:
        return <VisualisationDefinitionType>(
          DashboardVisualisationSchemas.DashboardVisualisationSchema.parse(this.definition)
        )
    }
  }
}

export { DashboardVisualisationClass }
export default DashboardVisualisationClass
