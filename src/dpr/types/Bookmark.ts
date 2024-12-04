import { LoadType, ReportType } from './UserReports'

export interface BookmarkedReportData {
  reportId: string
  id: string
  reportName: string
  name: string
  description: string
  href: string
  type: ReportType
  loadType: LoadType
}

export interface BookmarkStoreData {
  reportId: string
  variantId?: string
  id?: string
  type?: ReportType
}
