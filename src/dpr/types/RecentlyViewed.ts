import { AsyncReportUrlData, RequestStatus, AsyncReportQueryData, AsyncReportsTimestamp } from './AsyncReport'

export interface RecentlyViewedReportData {
  reportId: string
  variantId: string
  executionId: string
  tableId: string
  reportName: string
  variantName?: string
  name?: string
  description: string
  timestamp: AsyncReportsTimestamp
  status?: RequestStatus
  url: AsyncReportUrlData
  dataProductDefinitionsPath?: string
  query: AsyncReportQueryData
}
