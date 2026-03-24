import { mapUnitToSymbol, setUnitOnValue } from '../../../utils/Dashboards/VisualisationUnitHelper'
import { DashboardDataResponse } from '../../../types/Metrics'
import {
  ChartMeasure,
  VisualisationDefinitionKey,
  VisualisationDefinitionUnitType,
} from '../../_dashboards/dashboard-visualisation/types'

export default class ChartLabelsHelper {
  /**
   * Gets the axis labels
   *
   * @param {ChartMeasure} measures
   * @memberof ChartLabelsHelper
   */
  getLabels = (measures: ChartMeasure[]) => {
    return measures.map((col) => {
      const { unit, display } = col
      return setUnitOnValue(display || '', mapUnitToSymbol(unit))
    })
  }

  /**
   * Gets the dataset label
   * Dataset label = the label seen in the legend
   *
   * @memberof ChartLabels
   */
  getDatasetLabel = (
    keys: VisualisationDefinitionKey[],
    row: DashboardDataResponse,
    unit?: VisualisationDefinitionUnitType,
  ) => {
    return keys
      .map((key: VisualisationDefinitionKey) => {
        // Only set the label if there is more than one key
        const label = key.display && keys.length > 1 ? `${key.display}: ` : ''
        // Use the row/col value as the value
        const value = row[key.id]?.raw ?? ''

        return `${label}${value}`
      })
      .join(', ')
  }

  /**
   * Gets the axis labels when the column values are used
   *
   * @param {DashboardDataResponse[][]} groups
   * @param {string} axisId
   * @memberof ChartLabelsHelper
   */
  getListLabels = (groups: DashboardDataResponse[][], axisId: string, unitSymbol?: string) => {
    const allLabels = groups.flatMap((gd) => {
      return gd.map((row) => {
        const field = row[axisId]
        let label = ''
        if (field) {
          label = setUnitOnValue(field.raw || '', unitSymbol)
        }
        return label
      })
    })

    return Array.from(new Set(allLabels))
  }
}
