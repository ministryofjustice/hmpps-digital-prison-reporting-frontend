export interface BookmarkedReportData {
  reportId: string
  variantId: string
  reportName: string
  name: string
  description: string
  href: string
  type: string
}

export interface BookmarkStoreData {
  reportId: string
  variantId: string
  reportType?: string
}
