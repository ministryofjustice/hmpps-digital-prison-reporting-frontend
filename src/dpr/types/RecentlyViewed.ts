import { AsyncReportUrlData, RequestStatus, AsyncReportQueryData } from './AsyncReport'

export interface RecentlyViewedReportData {
  reportId: string
  variantId: string
  executionId: string
  tableId: string
  reportName: string
  variantName: string
  description: string
  timestamp: {
    lastViewed: string
    expired?: string
  }
  status?: RequestStatus
  url: AsyncReportUrlData
  dataProductDefinitionsPath?: string
  query: AsyncReportQueryData
}
