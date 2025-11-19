import { z } from 'zod'

// BUCKETS

const dashboardBucket = z.object({
  min: z.number().optional(),
  max: z.number().optional(),
  hexColour: z.string().optional(),
})

const bucketOptions = z.object({
  useRagColour: z.boolean().default(false),
  buckets: z.array(dashboardBucket).default([]),
  baseColour: z.string().regex(/^#/).optional(),
})

// GENERAL

const dashboardVisFilter = z.object({
  id: z.string(),
  equals: z.string(),
})

const dashboardVisKey = z.object({
  id: z.string(),
  display: z.string().optional(),
  optional: z.boolean().default(false),
})

const dashboardVisMeasure = z.object({
  id: z.string(),
  display: z.string().optional(),
  unit: z.enum(['NUMBER', 'PERCENTAGE']).optional(),
  aggregate: z.enum(['sum', 'average']).optional(),
})

const dashboardColumns = z.object({
  keys: z.array(dashboardVisKey).min(1, 'Key array cannot be empty').optional(),
  measures: z.array(dashboardVisMeasure).length(1, 'Measure must contain a single item'),
  filters: z.array(dashboardVisFilter).min(1).optional(),
  expectNulls: z.boolean().default(false),
})

const dashboardOptions = z.object({
  ...dashboardBucket,
  showLatest: z.boolean().default(true),
  columnsAsList: z.boolean().optional(),
})

const DashboardVisualisationSchema = z.object({
  id: z.string(),
  type: z.enum([
    'list',
    'doughnut',
    'bar',
    'bar-timeseries',
    'line',
    'scorecard',
    'scorecard-group',
    'matrix-timeseries',
    'line-timeseries',
  ]),
  display: z.string().optional(),
  description: z.string().optional(),
  options: z.object(dashboardOptions.shape),
  columns: z.object(dashboardColumns.shape),
})

// SCORECARD

const scorecardKey = z.object({
  id: z.string(),
  optional: z.boolean().default(false),
})

const scorecardMeasure = z.object({
  id: z.string(),
})

const ScorecardSchema = z.object({
  ...DashboardVisualisationSchema.shape,
  type: z.literal('scorecard'),
  display: z.string(),
  description: z.undefined(),
  options: z.object(bucketOptions.shape).optional(),
  columns: z.object({
    ...dashboardColumns.shape,
    keys: z.array(scorecardKey).min(1),
    measures: z.array(scorecardMeasure).length(1, 'Measure must contain a single item'),
  }),
})

// SCORECARD GROUP

const scorecardGroupColumn = z.object({
  id: z.string(),
  display: z.string().optional(),
  displayValue: z.boolean().optional(),
})

const ScorecardGroupSchema = z.object({
  ...DashboardVisualisationSchema.shape,
  type: z.literal('scorecard-group'),
  options: z.object(bucketOptions.shape).optional(),
  columns: z.object({
    ...dashboardColumns.shape,
    measures: z
      .array(scorecardGroupColumn)
      .min(2, 'Measure must contain two or more items')
      .refine(
        (measures) => {
          const displayValue = measures.find((m) => m.displayValue !== undefined)
          return displayValue ? measures.length === 2 : true
        },
        { error: 'Measure must have length 2 when displayValue is defined' },
      ),
  }),
})

// LIST

const listOptions = z.object({
  showLatest: z.boolean().default(true),
  columnsAsList: z.boolean().optional(),
})

const ListSchema = z.object({
  ...DashboardVisualisationSchema.shape,
  type: z.literal('list'),
  options: z.object(listOptions.shape),
  columns: z.object({
    ...dashboardColumns.shape,
    measures: z.array(dashboardVisMeasure).min(1, 'Measure must contain a single item'),
  }),
})

// MATRIX

const matrixKeys = z.object({
  id: z.string(),
  optional: z.boolean().default(false),
})

const MatrixTimeseriesSchema = z.object({
  ...DashboardVisualisationSchema.shape,
  type: z.literal('matrix-timeseries'),
  options: z.object(bucketOptions.shape).optional(),
  columns: z.object({
    ...dashboardColumns.shape,
    keys: z.array(matrixKeys).min(1, 'Key array cannot be empty').optional(),
    measures: z.array(dashboardVisMeasure).length(2, 'Measure must contain a single item'),
  }),
})

// BAR

const barMeasure = z.object({
  id: z.string(),
  display: z.string().optional(),
  unit: z.enum(['NUMBER', 'PERCENTAGE']).optional(),
  axis: z.enum(['x', 'y']).optional(),
})

const barOptions = z.object({
  showLatest: z.boolean().default(true),
})

const BarSchema = z.object({
  ...DashboardVisualisationSchema.shape,
  type: z.literal('bar'),
  display: z.string(),
  options: z.object(barOptions.shape),
  columns: z.object({
    ...dashboardColumns.shape,
    measures: z
      .array(barMeasure)
      .length(2, 'Measure must contain 2 items')
      .refine(
        (measures) => {
          const xAxis = measures.find((m) => m.axis === 'x')
          const yAxis = measures.find((m) => m.axis === 'y')
          return xAxis !== undefined && yAxis !== undefined
        },
        { error: 'X and Y axis must be defined in measure' },
      ),
  }),
})

// LINE

const lineMeasure = z.object({
  id: z.string(),
  display: z.string().optional(),
  unit: z.enum(['NUMBER', 'PERCENTAGE']).optional(),
})

const lineOptions = z.object({
  showLatest: z.boolean().default(true),
})

const LineSchema = z.object({
  ...DashboardVisualisationSchema.shape,
  type: z.literal('line'),
  options: z.object(lineOptions.shape),
  columns: z.object({
    ...dashboardColumns.shape,
    measures: z.array(lineMeasure).length(2, 'Measure must contain 2 items'),
  }),
})

// BAR

const DoughnutSchema = z.object({
  ...LineSchema.shape,
  type: z.literal('doughnut'),
})

// TIMESERIES

const TimeSeriesOptions = z.object({
  showLatest: z.literal(true).default(true),
})

const LineTimeseriesSchema = z.object({
  ...LineSchema.shape,
  type: z.literal('line-timeseries'),
  options: z.object(TimeSeriesOptions.shape),
})

const BarTimeseriesSchema = z.object({
  ...BarSchema.shape,
  type: z.literal('bar-timeseries'),
  options: z.object(TimeSeriesOptions.shape),
})

const DashboardVisualisationSchemas = {
  DashboardVisualisationSchema,
  ScorecardSchema,
  ScorecardGroupSchema,
  ListSchema,
  BarSchema,
  LineSchema,
  DoughnutSchema,
  LineTimeseriesSchema,
  BarTimeseriesSchema,
  MatrixTimeseriesSchema,
}

export default DashboardVisualisationSchemas
