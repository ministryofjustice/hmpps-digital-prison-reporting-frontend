import { z } from 'zod'

const dashboardBucket = z.object({
  min: z.number().optional(),
  max: z.number().optional(),
  hexColour: z.string().optional(),
})

export const BucketOptionsSchema = z.object({
  useRagColour: z.boolean().default(false),
  buckets: z.array(dashboardBucket).default([]),
  baseColour: z.string().regex(/^#/).optional(),
})

const dashboardVisFilter = z.object({
  id: z.string(),
  equals: z.number().nullable(),
})

const DashboardVisualisationKeySchema = z.object({
  id: z.string(),
  display: z.string().optional(),
  optional: z.boolean().default(false),
})

export const DashboardVisualisationMeasureSchema = z.object({
  id: z.string(),
  display: z.string().optional(),
  unit: z.enum(['NUMBER', 'PERCENTAGE']).optional(),
  aggregate: z.enum(['sum', 'average']).optional(),
})

export const DashboardColumns = z.object({
  keys: z.array(DashboardVisualisationKeySchema),
  measures: z.array(DashboardVisualisationMeasureSchema).length(1, 'Measure must contain a single item'),
  filters: z.array(dashboardVisFilter).min(1).optional(),
  expectNulls: z.boolean().default(false),
})

const dashboardOptions = z.object({
  ...dashboardBucket.shape,
  showLatest: z.boolean().default(true),
  columnsAsList: z.boolean().optional(),
})

export const DashboardVisualisationSchema = z.object({
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
  columns: z.object(DashboardColumns.shape),
})

const DashboardVisualisationSchemas = {
  DashboardVisualisationSchema,
  DashboardVisualisationMeasureSchema,
  DashboardVisualisationKeySchema,
}

export default DashboardVisualisationSchemas
