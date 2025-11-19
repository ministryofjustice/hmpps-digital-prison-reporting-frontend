/* eslint-disable prefer-destructuring */
import { components } from '../../../types/api'
import { DashboardDataResponse } from '../../../types/Metrics'
import DatasetHelper from '../../../utils/datasetHelper'

class DashboardVisualisationClass {
  responseData: DashboardDataResponse[]

  id: string

  unit: components['schemas']['DashboardVisualisationColumnDefinition']['unit']

  type: components['schemas']['DashboardVisualisationDefinition']['type']

  constructor(
    responseData: DashboardDataResponse[],
    definition: components['schemas']['DashboardVisualisationDefinition'],
  ) {
    this.responseData = responseData
    this.id = definition.id
    this.type = definition.type.split('-')[0] as components['schemas']['DashboardVisualisationDefinition']['type']
    this.unit = definition.columns.measures[0].unit ? definition.columns.measures[0].unit : undefined
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
}

export { DashboardVisualisationClass }
export default DashboardVisualisationClass
