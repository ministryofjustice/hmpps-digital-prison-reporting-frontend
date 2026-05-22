import DprUser from './DprUser'
import { components } from './api'
import { RequestedReport, StoredReportData } from './UserReports'
import { BookmarkStoreData } from './Bookmark'
import { DprAppLocals } from '../utils/localsHelper'

export interface ExtraLocals {
  dprUser: DprUser
  csrfToken: string
  definitions: components['schemas']['ReportDefinitionSummary'][]
  definition?: components['schemas']['SingleVariantReportDefinition'] | components['schemas']['DashboardDefinition']
  reportDefinitionSummary?: components['schemas']['ReportDefinitionSummary']
  fields?: components['schemas']['FieldDefinition'][]
  saveDefaultsEnabled: boolean
  dpdPathFromQuery: boolean
  dpdPathFromConfig: boolean
  definitionsPath: string
  requestedReports?: RequestedReport[]
  recentlyViewedReports?: StoredReportData[]
  bookmarks?: BookmarkStoreData[]
  validationErrors?: string
  validatedFilters?: Record<string, unknown>

  // fields on app.locals 👇🏽
  featureFlags: {
    lastUpdated?: number | undefined
    flags: Record<string, boolean>
  }

  bookmarkingEnabled: boolean
  downloadingEnabled: boolean
  collectionsEnabled: boolean
  requestMissingEnabled: boolean

  dprPaths: DprAppLocals
}
