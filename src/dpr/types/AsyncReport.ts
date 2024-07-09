import Dict = NodeJS.Dict
import { Template } from './Template'

export interface AsyncReportData {
  reportId: string
  variantId: string
  executionId: string
  tableId: string
  reportName: string
  name: string
  description: string
  status: RequestStatus
  filters: ParamsConfig
  sortBy: ParamsConfig
  url: AsyncReportUrlData
  timestamp: AsyncReportsTimestamp
  query: AsyncReportQueryData
  dataProductDefinitionsPath?: string
  errorMessage?: string
  template: Template
}

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
