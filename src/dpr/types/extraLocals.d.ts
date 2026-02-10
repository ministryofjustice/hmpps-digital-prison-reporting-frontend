import { Flag } from '@flipt-io/flipt'
import DprUser from './DprUser'
import { components } from './api'
import { RequestedReport, StoredReportData } from './UserReports'
import { BookmarkStoreData } from './Bookmark'


export interface ExtraLocals {
  dprUser: DprUser
  nestedBaseUrl: string
  csrfToken: string
  definitions: components['schemas']['ReportDefinitionSummary'][]
  bookmarkingEnabled: boolean
  downloadingEnabled: boolean
  collectionsEnabled: boolean
  requestMissingEnabled: boolean
  saveDefaultsEnabled: boolean
  dpdPathFromQuery: boolean
  dpdPathFromConfig: boolean
  definitionsPath: string | undefined
  requestedReports?: RequestedReport[]
  recentlyViewedReports?: StoredReportData[]
  bookmarks?: BookmarkStoreData[]
  validationErrors?: string
  featureFlags: {
    lastUpdated: number
    flags: {
      [flagName: string]: Flag
    }
  }
}