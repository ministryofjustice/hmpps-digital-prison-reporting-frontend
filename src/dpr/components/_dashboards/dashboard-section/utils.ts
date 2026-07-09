import { DashboardDataResponse } from '../../../types/Metrics'
import { components } from '../../../types/api'
import { PartialDate } from '../../_filters/types'
import {
  DashboardDefintion,
  DashboardSection,
  DashboardVisualisation,
  DashboardVisualisationType,
} from '../dashboard-visualisation/types'
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

/**
 * Add variant ID to section
 *
 * @param {components['schemas']['DashboardSectionDefinition']} section
 * @param {string} variantId
 * @return {*}  {components['schemas']['DashboardSectionDefinition']}
 */
export const addVariantIdToSection = (
  section: components['schemas']['DashboardSectionDefinition'],
  variantId: string,
): components['schemas']['DashboardSectionDefinition'] => ({
  ...section,
  visualisations: section.visualisations.map(visualisation => ({
    ...visualisation,
    variantId,
  })),
})

/**
 * Builds a master section collection from a parent dashboard and its child variants.
 *
 * @param {DashboardDefintion} definition
 * @return {*}  {components['schemas']['DashboardSectionDefinition'][]}
 */
export const buildMasterSections = (
  definition: DashboardDefintion, // TODO: Update this an type when the components['schemas']['DashboardDefinition'] is up to date
): components['schemas']['DashboardSectionDefinition'][] => {
  const parentSections = definition.sections.map(section => addVariantIdToSection(section, definition.id))

  return definition.childVariants.reduce(
    (sections, childVariant) =>
      childVariant.sections
        .map(section => addVariantIdToSection(section, childVariant.id))
        .reduce(mergeSection, sections),
    parentSections,
  )
}

/**
 * Merges the sections
 *
 * Rules:
 * - Parent sections are added first and retain their original order.
 * - Child variants are processed in array order.
 * - Child sections are processed in section order within each variant.
 * - If a child section ID matches an existing section ID, its visualisations are appended to that section.
 * - If a child section ID does not exist, the section is appended to the end of the collection.
 * - Visualisation order is preserved as defined in the source section
 *
 * @param {components['schemas']['DashboardSectionDefinition'][]} sections
 * @param {components['schemas']['DashboardSectionDefinition']} section
 * @return {*}
 */
const mergeSection = (
  sections: components['schemas']['DashboardSectionDefinition'][],
  section: components['schemas']['DashboardSectionDefinition'],
) => {
  const existingIndex = sections.findIndex(existing => existing.id === section.id)

  if (existingIndex === -1) {
    return [...sections, section]
  }

  return sections.map((existing, index) =>
    index === existingIndex
      ? {
          ...existing,
          visualisations: [...existing.visualisations, ...section.visualisations],
        }
      : existing,
  )
}
