import Dict = NodeJS.Dict

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
}

interface AsyncReportUrlData {
  origin: string
  request: AsyncReportUrlItemData
  report?: AsyncReportUrlItemData
  polling?: AsyncReportUrlItemData
}

interface AsyncReportUrlItemData {
  pathname?: string
  fullUrl?: string
  search?: string
}

interface AsyncReportQueryData {
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
  ALL = 'ALL',
}

interface AsyncReportsTimestamp {
  lastViewed?: string
  requested?: string
  completed?: string
  expired?: string
  failed?: string
}
