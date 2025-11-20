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
  automatic?: boolean | undefined
}

export interface BookmarkStoreData {
  reportId: string
  id: string
  type?: ReportType
  automatic?: boolean | undefined
}

export interface AutomaticBookmarkStoreData {
  reportId: string
  variantId: string
  type?: ReportType
  automatic?: boolean
}
