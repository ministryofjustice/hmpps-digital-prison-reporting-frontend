import { LoadType, ReportType, RequestStatus } from 'src/dpr/types/UserReports'
import { z } from 'zod'

const RequestStatusSchema = z.enum([
  RequestStatus.SUBMITTED,
  RequestStatus.STARTED,
  RequestStatus.PICKED,
  RequestStatus.READY,
  RequestStatus.FINISHED,
  RequestStatus.EXPIRED,
  RequestStatus.FAILED,
  RequestStatus.ABORTED,
])

const ReportTypeSchema = z.enum([ReportType.REPORT, ReportType.DASHBOARD])

const LoadTypeSchema = z.enum([LoadType.ASYNC, LoadType.SYNC])

export const AsyncReportsTimestampSchema = z.object({
  lastViewed: z.coerce.date().optional(),
  requested: z.coerce.date().optional(),
  completed: z.coerce.date().optional(),
  expired: z.coerce.date().optional(),
  failed: z.coerce.date().optional(),
  retried: z.coerce.date().optional(),
  aborted: z.coerce.date().optional(),
  refresh: z.coerce.date().optional(),
})

const QuerySummaryItemSchema = z
  .object({
    name: z.string(),
    value: z.string(),
  })
  .catchall(z.unknown())

const AsyncReportQueryDataSchema = z.object({
  data: z.record(z.string(), z.union([z.string(), z.array(z.string())])),
  summary: z.array(QuerySummaryItemSchema),
})

const AsyncReportUrlItemDataSchema = z.object({
  pathname: z.string().optional(),
  fullUrl: z.string().optional(),
  search: z.string().optional(),
  default: z.string().optional(),
})

const AsyncReportUrlDataSchema = z.object({
  origin: z.string(),
  request: AsyncReportUrlItemDataSchema.optional(),
  report: AsyncReportUrlItemDataSchema.optional(),
  polling: AsyncReportUrlItemDataSchema.optional(),
})

const ChildReportExecutionDataSchema = z.object({
  variantId: z.string(),
  executionId: z.string().optional(),
  status: RequestStatusSchema.optional(),
})

export const ParamsConfigSchema = z.object({
  data: z.record(z.string(), z.string()),
  queryString: z.string(),
})

export const normalizeStoredReportData = <
  T extends {
    name?: string | undefined
    variantName?: string | undefined
  },
>(
  data: T,
) => ({
  ...data,
  name: data.name ?? data.variantName ?? '',
  // Backwards compatibility
  variantName: data.variantName ?? data.name,
})

export const StoredReportDataObjectSchema = z.object({
  reportId: z.string(),
  variantId: z.string().optional(),
  id: z.string(),

  executionId: z.string().optional(),
  tableId: z.string().optional(),

  reportName: z.string(),

  variantName: z.string().optional(),
  name: z.string().optional(),

  description: z.string(),

  status: RequestStatusSchema.optional(),

  timestamp: AsyncReportsTimestampSchema,

  dataProductDefinitionsPath: z.string().optional(),
  dpdPathFromQuery: z.boolean().optional(),

  query: AsyncReportQueryDataSchema.optional(),
  interactiveQuery: AsyncReportQueryDataSchema.optional(),

  url: AsyncReportUrlDataSchema.optional(),

  type: ReportTypeSchema,

  loadType: LoadTypeSchema.optional(),

  childExecutionData: z.array(ChildReportExecutionDataSchema).optional(),
})
