import Dict = NodeJS.Dict
import { SummaryTemplate, Template } from './Templates'
import { FieldDefinition } from '../utils/DataTableBuilder/types'
import { ChildReportExecutionData } from './ExecutionData'

export interface StoredReportData {
  reportId: string
  variantId?: string // NOTE variant ID exists fir V1 async routes
  id: string
  executionId?: string
  tableId?: string
  reportName: string
  variantName?: string
  name?: string
  description: string
  status?: RequestStatus
  timestamp: AsyncReportsTimestamp
  dataProductDefinitionsPath?: string
  dpdPathFromQuery?: boolean
  query?: AsyncReportQueryData
  interactiveQuery?: AsyncReportQueryData
  url?: AsyncReportUrlData
  type: ReportType
  loadType?: LoadType
  childExecutionData?: Array<ChildReportExecutionData>
}

export interface RequestedReport extends StoredReportData {
  template: Template
  errorMessage?: string
  filters: ParamsConfig
  sortBy: ParamsConfig
}

export interface RequestedDashboard extends StoredReportData {
  metrics: { name: string }[]
}

export type RecentlyViewedReport = StoredReportData
export type UserReportData = RequestedReport | RecentlyViewedReport | StoredReportData | RequestedDashboard

export interface AsyncReportUrlData {
  origin: string
  request?: AsyncReportUrlItemData
  report?: AsyncReportUrlItemData
  polling?: AsyncReportUrlItemData
}

export interface AsyncReportUrlItemData {
  pathname?: string
  fullUrl?: string
  search?: string
  default?: string
}

export interface AsyncReportQueryData {
  data: Dict<string>
  summary: Array<Dict<string>>
}

export interface ParamsConfig {
  data: Dict<string>
  queryString: string
}

export enum RequestStatus {
  SUBMITTED = 'SUBMITTED',
  STARTED = 'STARTED',
  PICKED = 'PICKED',
  FINISHED = 'FINISHED',
  FAILED = 'FAILED',
  ABORTED = 'ABORTED',
  EXPIRED = 'EXPIRED',
  READY = 'READY',
  ALL = 'ALL',
}

export enum ReportType {
  REPORT = 'report',
  DASHBOARD = 'dashboard',
  UNAVAILABLE = 'unavailable',
}

export interface AsyncReportsTimestamp {
  lastViewed?: Date
  requested?: Date
  completed?: Date
  expired?: Date
  failed?: Date
  retried?: Date
  aborted?: Date
  refresh?: Date
}

export interface AsyncSummary {
  id: string
  template: SummaryTemplate
  fields: Array<FieldDefinition>
  data: Array<Dict<string>>
}

export interface FormattedUserReportData {
  id: string
  href: string
  text: string
  reportName: string
  description: string
  timestamp?: string
  tag?: string
  status?: string
  type: ReportType
  summary?: { name: string; value: string }[]
  interactiveSummary?: { name: string; value: string }[]
  meta?: meta
}

export interface meta {
  reportId: string
  id: string
  executionId: string
  tableId: string
  status?: string
  type: ReportType
  requestedAt?: Date
  dataProductDefinitionsPath?: string
  pollingUrl: string
  reportUrl: string
}

export interface RequestFormData {
  dataProductDefinitionsPath: string
  _csrf: string
  reportId: string
  name: string
  reportName: string
  description: string
  type: string
  pathname: string
  origin: string
  href: string
  search: string
  id: string
  variantId?: string
  template?: string
  metrics?: { name: string }[]
  defaultInteractiveQueryString: string
}

export enum LoadType {
  SYNC = 'sync',
  ASYNC = 'async',
  SCHEDULED = 'scheduled',
}

export interface DefinitionData {
  reportName: string
  reportId: string
  id: string
  name: string
  description?: string
  type: ReportType
  reportDescription?: string
  loadType: LoadType
  authorised: boolean
  isMissing?: boolean
}
