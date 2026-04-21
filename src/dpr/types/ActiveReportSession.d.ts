import { LoadType } from './UserReports'

export interface ActiveReportSessionData {
  id: string
  reportId: string
  tableId?: string
  executionId?: string
  loadType: LoadType
  reportIsBookmarked: boolean
  downloadEnabled: boolean
  feedbackSubmissionFormPath?: string

  // Current viewed report search
  currentReportPathname?: string | undefined
  currentReportSearch?: string | undefined
  currentReportUrl?: string | undefined
  currentReportFiltersSearch?: string | undefined
  currentReportColumnsSearch?: string | undefined
  currentPageSizeSearch?: string | undefined
  currentSortSearch?: string | undefined

  // Defaults from the DPD
  defaultFiltersSearch?: string | undefined
  defaultColumnsSearch?: string | undefined
  defaultSortQueryString?: string | undefined
  interactiveDefaultFiltersSearch?: string | undefined

  // Pre-request
  requestedSortSearch?: string | undefined

  // Saved defaults
  savedRequestDefaultsSearch?: string | undefined
  savedInteractiveDefaultsSearch?: string | undefined
}

export interface ActiveReportSession {
  [index: string]: ActiveReportSessionData
}

export interface ActiveReportsSession {
  activeReport?: ActiveReportSession
}
