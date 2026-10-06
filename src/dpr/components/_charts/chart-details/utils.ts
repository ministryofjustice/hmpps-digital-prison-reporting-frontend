import { components } from '../../../types/api'
import { ChartDetails, ChartMetaData } from '../../../types/Charts'
import { DashboardDataResponse } from '../../../types/Metrics'
import {
  getTimestampColumn,
  getDateValue,
  getTimestampMeasure,
} from '../../../utils/Dashboards/VisualisationDatasetHelper'

export const getChartDetails = (
  chartDefinition: components['schemas']['DashboardVisualisationDefinition'],
  data: DashboardDataResponse[],
  timeseries = false,
): ChartDetails => {
  const { columns } = chartDefinition
  const meta: ChartMetaData[] = []
  const headlines: ChartMetaData[] = createHeadlines(chartDefinition, data, timeseries)

  const dateColumn = getTimestampColumn(columns)
  const dateData = getDateValue(data, dateColumn)

  if (dateData) {
    const { value } = dateData
    meta.push({
      label: 'Values for:',
      value,
    })
  }

  return {
    meta,
    headlines,
  }
}

export const createHeadlines = (
  chartDefinition: components['schemas']['DashboardVisualisationDefinition'],
  data: DashboardDataResponse[],
  timeseries = false,
) => {
  const headlines: ChartMetaData[] = []
  const { columns } = chartDefinition
  const { measures } = columns
  const isListChart = !!measures.find(col => col.axis)
  let headline: ChartMetaData | undefined
  let headlineColumn: components['schemas']['DashboardVisualisationColumnDefinition'] | undefined
  let value: number | undefined
  let label: string = ''

  if (timeseries) {
    headlineColumn = measures.find(col => col.type !== 'timestamp')

    if (headlineColumn) {
      const { id } = headlineColumn
      const rawValue = data[0][id]?.raw

      const dateColumn = getTimestampMeasure(measures)
      const dateData = getDateValue(data, dateColumn)

      if (dateData) {
        label = dateData.value
      }

      const numericValue = Number(rawValue)
      value = Number.isNaN(numericValue) ? undefined : numericValue

      if (value) {
        headline = {
          label,
          value,
        }
      }
    }
  } else {
    headlineColumn = !isListChart ? measures[0] : measures.find(col => col.axis && col.axis === 'y')

    if (headlineColumn) {
      const display = headlineColumn.display?.toLowerCase()
      label = display ? `Total ${display}` : 'Total'
      value = data.reduce((acc: number, d: DashboardDataResponse) => {
        if (headlineColumn) {
          const { id } = headlineColumn
          const { raw } = d[id]
          if (raw) {
            return acc + Number(raw)
          }
        }
        return acc
      }, 0)

      headline = {
        label,
        value,
      }
    }
  }

  if (headline) headlines.push(headline)

  return headlines
}
