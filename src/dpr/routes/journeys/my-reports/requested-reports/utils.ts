import { RequestStatus } from 'src/dpr/types/UserReports'

const TERMINAL_STATUSES = new Set<RequestStatus>([
  RequestStatus.FINISHED,
  RequestStatus.EXPIRED,
  RequestStatus.FAILED,
  RequestStatus.ABORTED,
])

const FIFTEEN_MINUTES_MS = 15 * 60 * 1000

export type StatusDecision = { action: 'NO_CHANGE' } | { action: 'UPDATE_STATUS'; newStatus: RequestStatus }

export function decideReportStatus({
  oldStatus,
  requestedAt,
  now,
  latestExternalStatus,
  latestStatusInvalid,
}: {
  oldStatus: RequestStatus
  requestedAt?: Date
  now: number
  latestExternalStatus?: RequestStatus
  latestStatusInvalid?: boolean
}): StatusDecision {
  // 1. Already terminal → nothing to do
  if (TERMINAL_STATUSES.has(oldStatus)) {
    return { action: 'NO_CHANGE' }
  }

  // 2. Timeout rule
  if (requestedAt && now - requestedAt.getTime() >= FIFTEEN_MINUTES_MS) {
    return { action: 'UPDATE_STATUS', newStatus: RequestStatus.FAILED }
  }

  // 3. External API returned a non-string / invalid status
  if (latestStatusInvalid) {
    return { action: 'UPDATE_STATUS', newStatus: RequestStatus.FAILED }
  }

  // 4. External status changed
  if (latestExternalStatus && latestExternalStatus !== oldStatus) {
    return { action: 'UPDATE_STATUS', newStatus: latestExternalStatus }
  }

  return { action: 'NO_CHANGE' }
}
