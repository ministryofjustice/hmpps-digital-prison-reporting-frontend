import Dict = NodeJS.Dict
import { SummaryTemplate, Template } from './Templates'
import { FieldDefinition } from '../utils/DataTableBuilder/types'

export interface StoredReportData {
  reportId: string
  variantId?: string
  dashboardId?: string
  executionId?: string
  tableId?: string
  reportName: string
  variantName?: string
  name?: string
  description: string
  status?: RequestStatus
  timestamp?: AsyncReportsTimestamp
  dataProductDefinitionsPath?: string
  query?: AsyncReportQueryData
  url?: AsyncReportUrlData
  type: ReportType
}

export interface RequestedReport extends StoredReportData {
  template: Template
  errorMessage?: string
  filters: ParamsConfig
  sortBy: ParamsConfig
}

export type RecentlyViewedReport = StoredReportData
export type UserReportData = RequestedReport | RecentlyViewedReport | StoredReportData

export interface AsyncReportUrlData {
  origin: string
  request: AsyncReportUrlItemData
  report?: AsyncReportUrlItemData
  polling?: AsyncReportUrlItemData
}

export interface AsyncReportUrlItemData {
  pathname?: string
  fullUrl?: string
  search?: string
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
  meta?: meta
}

export interface meta {
  reportId: string
  id: string
  executionId: string
  status?: string
  type: ReportType
  requestedAt?: Date
  dataProductDefinitionsPath?: string
}

export interface RequestFormData extends RequestFormFilterData {
  dataProductDefinitionsPath: string
  _csrf: string
  reportId: string
  name: string
  description: string
  type: string
  pathname: string
  origin: string
  href: string
  search: string
  dashboardId?: string
  variantId?: string
  template?: string
  metrics?: string
}

export interface RequestFormFilterData {
  [index: string]: string
}
