import Dict = NodeJS.Dict
import { SummaryTemplate } from './Templates'
import { ChildReportExecutionData } from './ExecutionData'
import { components } from './api'
import { QuerySummaryItem } from '../components/_async/request-details/types'

export interface StoredReportData {
  reportId: string
  variantId?: string | undefined
  id: string
  executionId?: string | undefined
  tableId?: string | undefined
  reportName: string
  variantName?: string | undefined
  name: string
  description: string
  schedule?: string | undefined
  status?: RequestStatus | undefined
  timestamp: AsyncReportsTimestamp
  dataProductDefinitionsPath?: string | undefined
  dpdPathFromQuery?: boolean | undefined
  query?: AsyncReportQueryData | undefined
  interactiveQuery?: AsyncReportQueryData | undefined
  url?: AsyncReportUrlData | undefined
  type: ReportType
  loadType?: LoadType | undefined
  childExecutionData?: Array<ChildReportExecutionData> | undefined
}

export interface RequestedReport extends StoredReportData {
  errorMessage?: string | undefined
  filters?: ParamsConfig | undefined
  sortBy?: ParamsConfig | undefined
}

export interface RequestedDashboard extends StoredReportData {
  metrics: { name: string }[]
}

export type RecentlyViewedReport = StoredReportData
export type SubscribedReport = StoredReportData
export type UserReportData =
  | RequestedReport
  | RecentlyViewedReport
  | StoredReportData
  | RequestedDashboard
  | SubscribedReport

export interface AsyncReportUrlData {
  origin: string
  request?: AsyncReportUrlItemData | undefined
  report?: AsyncReportUrlItemData | undefined
  polling?: AsyncReportUrlItemData | undefined
}

export interface AsyncReportUrlItemData {
  pathname?: string | undefined
  fullUrl?: string | undefined
  search?: string | undefined
  default?: string | undefined
}

export interface AsyncReportQueryData {
  data: Dict<string | string[]>
  summary: QuerySummaryItem[]
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
  lastViewed?: Date | undefined
  requested?: Date | undefined
  completed?: Date | undefined
  expired?: Date | undefined
  failed?: Date | undefined
  retried?: Date | undefined
  aborted?: Date | undefined
  refresh?: Date | undefined
}

export interface AsyncSummary {
  id: string
  template: SummaryTemplate
  fields: Array<components['schemas']['SummaryField']>
  data: Array<Record<string, string>>
}

export interface FormattedUserReportData {
  id?: string | undefined
  href?: string | undefined
  text: string
  reportName: string
  description: string
  timestamp?: string
  tag?: string
  status?: string | undefined
  type: ReportType
  summary?: { name: string; value: string }[]
  interactiveSummary?: { name: string; value: string }[]
  meta: meta
}

export interface FormattedBookmarkData {
  id?: string
  href?: string
  text: string
  reportName: string
  description: string
  timestamp?: string
  tag?: string
  status?: string
  type: ReportType
  summary?: { name: string; value: string }[]
  interactiveSummary?: { name: string; value: string }[]
}

export interface meta {
  reportId: string
  id: string
  executionId?: string | undefined
  tableId?: string | undefined
  status?: string | undefined
  type: ReportType
  requestedAt?: Date | undefined
  dataProductDefinitionsPath?: string | undefined
  pollingUrl?: string | undefined
  reportUrl?: string | undefined
  endpoint?: string
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
  schedule?: string | undefined
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
  schedule?: string | undefined
}
