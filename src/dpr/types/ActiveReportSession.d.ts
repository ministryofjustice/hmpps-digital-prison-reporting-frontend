import { LoadType } from './UserReports'

export interface AcitveReportSessionData {
  id: string
  reportId: string
  tableId?: string
  executionId?: string
  loadType: LoadType
  reportIsBookmarked: boolean
  downloadEnabled: boolean
  feedbackSubmissionFormPath?: string
  currentReportPathname?: string | undefined
  currentReportSearch?: string | undefined
  currentReportUrl?: string | undefined
}

export interface ActiveReportSession {
  [index: string]: AcitveReportSessionData
}

export interface ActiveReportsSession {
  activeReport?: ActiveReportSession
}
