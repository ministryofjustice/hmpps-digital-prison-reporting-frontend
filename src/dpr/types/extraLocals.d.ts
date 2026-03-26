import { Flag } from '@flipt-io/flipt-client-js'
import DprUser from './DprUser'
import { components } from './api'
import { RequestedReport, StoredReportData } from './UserReports'
import { BookmarkStoreData } from './Bookmark'

export interface ExtraLocals {
  dprUser: DprUser
  csrfToken: string
  definitions: components['schemas']['ReportDefinitionSummary'][]
  definition?: components['schemas']['SingleVariantReportDefinition'] | components['schemas']['DashboardDefinition']
  bookmarkingEnabled: boolean
  downloadingEnabled: boolean
  collectionsEnabled: boolean
  requestMissingEnabled: boolean
  saveDefaultsEnabled: boolean
  dpdPathFromQuery: boolean
  dpdPathFromConfig: boolean
  definitionsPath: string
  requestedReports?: RequestedReport[]
  recentlyViewedReports?: StoredReportData[]
  bookmarks?: BookmarkStoreData[]
  validationErrors?: string
  // fields on app.locals 👇🏽
  featureFlags: {
    lastUpdated?: number | undefined
    flags: {
      [flagName: string]: Flag
    }
  }
  dprPaths: {
    nestedBaseUrl?: string | undefined
    bookmarkActionEndpoint: string
    downloadActionEndpoint: string
    productCollectionEndpoint: string
    bookmarkListPath: string
    requestedListPath: string
    recentlyViewedListPath: string
    reportsCatalogue: string
    userReportsList: string
    dprHomepage: string
  }
}
