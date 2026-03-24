import { ZodError, ZodType } from 'zod'
import { components } from '../../../types/api'
import BarChartSchemas from '../../_charts/chart/bar/validate'
import DoughnutChartSchemas from '../../_charts/chart/doughnut/validate'
import lineChartSchemas from '../../_charts/chart/line/validate'
import lineTimeseriesChartSchemas from '../../_charts/chart/line-timeseries/validate'
import barTimeseriesChartSchemas from '../../_charts/chart/bar-timeseries/validate'
import HeatmapTimeseriesChartSchemas from '../../_charts/chart/heatmap/validate'
import ListChartSchemas from '../dashboard-list/validate'
import ScorecardChartSchemas from '../scorecard/validate'
import ScorecardGroupChartSchemas from '../scorecard-group/validate'
import { AggregatedValidationError } from '../../../utils/ErrorHandler/AggregatedValidationError'
import { VisualisationDefinitionUnitType } from './types'
import { DashboardVisualisationType } from './types'
import { FEATURE_FLAG_KEYS } from '../../../utils/featureFlagsHelper'

const schemaMap: Record<string, ZodType<unknown>> = {
  list: ListChartSchemas.ListSchema,
  bar: BarChartSchemas.BarSchema,
  'bar-timeseries': barTimeseriesChartSchemas.BarTimeseriesSchema,
  'line-timeseries': lineTimeseriesChartSchemas.LineTimeseriesSchema,
  doughnut: DoughnutChartSchemas.DounutMeasureSchema,
  'matrix-timeseries': HeatmapTimeseriesChartSchemas,
  line: lineChartSchemas.LineSchema,
  scorecard: ScorecardChartSchemas.ScorecardSchema,
  'scorecard-group': ScorecardGroupChartSchemas.ScorecardGroupSchema,
} as const

type Success<T> = { index: number; success: true; data: T }
type Failure = {
  index: number
  success: false
  type: string
  id: unknown
  error: ZodError
}
type Result<T> = Success<T> | Failure

export async function validateDashboardVisualisations(
  dashboardDefinition: components['schemas']['DashboardDefinition'],
) {
  const visualisationDefs = dashboardDefinition.sections.flatMap((section) => {
    return section.visualisations
  })

  const results: Array<Result<unknown>> = await Promise.all(
    visualisationDefs.map(async (item, index) => {
      const { type, id } = item
      const schema = schemaMap[type]

      if (!schema) {
        const error = new ZodError([{ code: 'custom', path: ['type'], message: `Unknown type: ${String(item.type)}` }])
        return {
          index,
          success: false,
          type,
          id,
          error,
        }
      }

      const parsed = await schema.safeParseAsync(item)

      if (parsed.success) {
        return { index, success: true, data: parsed.data }
      }

      return {
        index,
        success: false,
        type,
        id,
        error: parsed.error,
      }
    }),
  )

  const failures = results.filter((r): r is Failure => r.success === false)

  if (failures.length > 0) {
    const indexedIssues = failures.flatMap((f) =>
      f.error.issues.map((issue) => ({
        ...issue,
        path: [f.index, ...issue.path],
      })),
    )
    const aggregatedZod = new ZodError(indexedIssues)
    const details = failures.map((f) => ({
      index: f.index,
      type: f.type,
      id: f.id,
      issues: f.error.issues,
    }))

    throw new AggregatedValidationError(
      'Error: Schema validation: Dashboard Visualisation validation failed:',
      aggregatedZod,
      details,
    )
  }

  return results.filter((r): r is Success<unknown> => r.success).map((r) => r.data)
}

export const mapUnitType = (unit: VisualisationDefinitionUnitType): string => {
  switch (unit) {
    case VisualisationDefinitionUnitType.PERCENTAGE:
      return '%'
    default:
      return ''
  }
}

export const getFeatureFlagVisTypeMap = (dashboardFeatureFlags: Record<string, boolean>) => {
  return {
    [DashboardVisualisationType.LIST]: true,
    [DashboardVisualisationType.BAR]: dashboardFeatureFlags[FEATURE_FLAG_KEYS.BAR_CHARTS],
    [DashboardVisualisationType.LINE]: dashboardFeatureFlags[FEATURE_FLAG_KEYS.LINE_CHARTS],
    [DashboardVisualisationType.DONUT]: dashboardFeatureFlags[FEATURE_FLAG_KEYS.DONUT_CHARTS],
    [DashboardVisualisationType.SCORECARD]: dashboardFeatureFlags[FEATURE_FLAG_KEYS.SCORECARD_CHARTS],
    [DashboardVisualisationType.SCORECARD_GROUP]: dashboardFeatureFlags[FEATURE_FLAG_KEYS.SCORECARD_GROUP_CHARTS],
    [DashboardVisualisationType.MATRIX_TIMESERIES]: dashboardFeatureFlags[FEATURE_FLAG_KEYS.MATRIX_TIMESERIES_CHARTS],
    [DashboardVisualisationType.BAR_TIMESERIES]: dashboardFeatureFlags[FEATURE_FLAG_KEYS.BAR_TIMESERIES_CHARTS],
    [DashboardVisualisationType.LINE_TIMESERIES]: dashboardFeatureFlags[FEATURE_FLAG_KEYS.LINE_TIMESERIES_CHARTS],
  }
}
