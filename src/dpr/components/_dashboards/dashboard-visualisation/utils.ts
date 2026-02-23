import { ZodError, ZodType, z } from 'zod'
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

export class AggregatedValidationError extends Error {
  readonly zod: ZodError

  readonly details: Array<{
    index: number
    type: string
    id: unknown
    issues: ZodError['issues']
  }>

  constructor(message: string, zod: ZodError, details: AggregatedValidationError['details']) {
    super(message)
    this.name = 'AggregatedValidationError'
    this.zod = zod
    this.details = details
  }
}

type Success<T> = { index: number; success: true; data: T }
type Failure = {
  index: number
  success: false
  type: string
  id: unknown
  error: ZodError
}
type Result<T> = Success<T> | Failure

export async function validateDashboardDefinitions(dashboardDefinition: components['schemas']['DashboardDefinition']) {
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
    // Create a ZodError that prefixes each issue path with the array index
    const indexedIssues = failures.flatMap((f) =>
      f.error.issues.map((issue) => ({
        ...issue,
        path: [f.index, ...issue.path],
      })),
    )

    const summaryIssue = {
      code: 'custom' as const,
      path: [] as (string | number | symbol)[],
      message: `Validation failed for ${failures.length} item(s) out of ${visualisationDefs.length}`,
    }

    const aggregatedZod = new ZodError([summaryIssue, ...indexedIssues])

    const details = failures.map((f) => ({
      index: f.index,
      type: f.type,
      id: f.id,
      issues: f.error.issues,
    }))

    throw new AggregatedValidationError('Visualisation validation failed', aggregatedZod, details)
  }

  return results.filter((r): r is Success<unknown> => r.success).map((r) => r.data)
}
