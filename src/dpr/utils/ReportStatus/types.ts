import { Response } from 'express'
import { Services } from 'src/dpr/types/Services'
import { ReportType, StoredReportData } from 'src/dpr/types/UserReports'

export enum RequestStatus {
  SUBMITTED = 'SUBMITTED',
  STARTED = 'STARTED',
  PICKED = 'PICKED',
  FINISHED = 'FINISHED',
  FAILED = 'FAILED',
  ABORTED = 'ABORTED',
  EXPIRED = 'EXPIRED',
  READY = 'READY',
  ALL = 'ALL',
}

export const FIFTEEN_MINUTES_MS = 15 * 60 * 1000

export const TERMINAL_STATUSES = new Set<RequestStatus>([
  RequestStatus.FINISHED,
  RequestStatus.FAILED,
  RequestStatus.ABORTED,
  RequestStatus.EXPIRED,
])

export type FailureInfo = {
  userMessage: string
  developerMessage?: string
  errorCode?: number
}

export type UpstreamSignal =
  | { kind: 'STATUS'; status: RequestStatus }
  | { kind: 'ERROR'; failure: FailureInfo }
  | { kind: 'EMPTY' }

export type StatusResolution =
  | { type: 'NO_CHANGE' }
  | {
      type: 'UPDATE'
      newStatus: RequestStatus
      failureInfo?: FailureInfo
    }

export type EvaluateAndUpdateReportStatusOptions = {
  stored: StoredReportData
  services: Services
  token: string
  res: Response
}

export type GetReportStatusOptions = {
  services: Services
  token: string
  reportId: string
  id: string
  executionId: string
  definitionsPath: string
  tableId: string
  reportType: ReportType
}

export type ExpireFinishedReportsOptions = {
  requestedReports: StoredReportData[]
  recentlyViewedReports: StoredReportData[]
  services: Services
  res: Response
}
