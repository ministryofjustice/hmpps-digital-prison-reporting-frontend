import { DashboardDataResponse } from '../../../types/Metrics'
import { components } from '../../../types/api'
import { PartialDate } from '../../_filters/types'
import { DashboardSection, DashboardVisualisation, DashboardVisualisationType } from '../dashboard-visualisation/types'
import ScorecardsUtils from '../scorecard/utils'
import ScorecardVisualisation from '../scorecard/Scorecard'
import ScorecardGroupVisualisation from '../scorecard-group/ScorecardGroup'
import DashboardListUtils from '../dashboard-list/utils'
import ChartUtils from '../../_charts/utils'
import { getFeatureFlagVisTypeMap } from '../dashboard-visualisation/utils'

export const createDashboardSections = (
  dashboardDefinition: components['schemas']['DashboardDefinition'],
  dashboardData: DashboardDataResponse[],
  query: Record<string, string | string[]>,
  dashboardFeatureFlags: Record<string, boolean>,
  partialDate?: PartialDate,
): DashboardSection[] => {
  return dashboardDefinition.sections.map((section: components['schemas']['DashboardSectionDefinition']) => {
    const { id, display: title, description } = section
    const featureFlagVisTypeMap = getFeatureFlagVisTypeMap(dashboardFeatureFlags)

    let hasScorecard = false
    const visualisations: DashboardVisualisation[] = section.visualisations.map(
      (visDefinition: components['schemas']['DashboardVisualisationDefinition']) => {
        const { type, display, description: visDescription, id: visId } = visDefinition
        const isEnabled = featureFlagVisTypeMap[type]

        let data: DashboardVisualisation['data'] | undefined

        switch (type) {
          case DashboardVisualisationType.LIST:
            data = DashboardListUtils.createList(visDefinition, dashboardData)
            break

          case DashboardVisualisationType.SCORECARD:
            hasScorecard = true
            data = new ScorecardVisualisation().withDefinition(visDefinition).withData(dashboardData).build()
            break

          case DashboardVisualisationType.SCORECARD_GROUP:
            data = new ScorecardGroupVisualisation().withDefinition(visDefinition).withData(dashboardData).build()
            break

          case DashboardVisualisationType.BAR:
          case DashboardVisualisationType.LINE:
          case DashboardVisualisationType.DONUT: {
            data = ChartUtils.createChart(visDefinition, dashboardData, type)
            break
          }
          case DashboardVisualisationType.MATRIX_TIMESERIES:
          case DashboardVisualisationType.BAR_TIMESERIES:
          case DashboardVisualisationType.LINE_TIMESERIES: {
            data = ChartUtils.createTimeseriesCharts(visDefinition, dashboardData, type, query, partialDate)
            break
          }
          default:
            break
        }

        return {
          id: visId,
          title: display || '',
          description: visDescription || '',
          type,
          data,
          isEnabled: isEnabled ?? true,
        }
      },
    )

    if (hasScorecard)
      ScorecardsUtils.mergeScorecardsIntoGroup(
        visualisations,
        featureFlagVisTypeMap[DashboardVisualisationType.SCORECARD_GROUP],
      )

    return { id, title: title || '', description: description || '', visualisations }
  })
}
