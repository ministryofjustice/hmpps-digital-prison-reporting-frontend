import { StoredReportData } from 'src/dpr/types/UserReports'
import { FailureInfo, RequestStatus, StatusResolution } from './types'

// This represents already-normalized signals (we'll build adapters later)
export type UpstreamSignal =
  | { kind: 'STATUS'; status: RequestStatus }
  | { kind: 'ERROR'; failure: FailureInfo }
  | { kind: 'EMPTY' }

const TERMINAL_STATUSES = new Set<RequestStatus>([
  RequestStatus.FINISHED,
  RequestStatus.FAILED,
  RequestStatus.ABORTED,
  RequestStatus.EXPIRED,
])

const FIFTEEN_MINUTES_MS = 15 * 60 * 1000

function isTerminal(status?: RequestStatus): boolean {
  return status ? TERMINAL_STATUSES.has(status) : false
}

function aggregateWithChildren(parentStatus: RequestStatus, childStatuses: RequestStatus[] = []): RequestStatus {
  if (childStatuses.some((s) => s === RequestStatus.FAILED)) {
    return RequestStatus.FAILED
  }

  if (childStatuses.length > 0 && childStatuses.every((s) => s === RequestStatus.FINISHED)) {
    return RequestStatus.FINISHED
  }

  return parentStatus
}

/**
 * Resolves the authoritative status of a report at a point in time.
 * Resolution order (IMPORTANT):
 *
 * 1. If stored status is terminal → NO_CHANGE
 * 2. If polling has exceeded timeout → FAILED
 * 3. If upstream returned an ERROR → FAILED
 * 4. If children exist:
 *    - Any FAILED → FAILED
 *    - All FINISHED → FINISHED
 *    - Otherwise use parent
 * 5. If upstream STATUS differs → UPDATE
 * 6. Otherwise → NO_CHANGE
 */
export function resolveReportStatus({
  stored,
  parentSignal,
  childSignals = [],
  now,
}: {
  stored: StoredReportData
  parentSignal: UpstreamSignal
  childSignals?: UpstreamSignal[]
  now: number
}): StatusResolution {
  const currentStatus = stored.status ?? RequestStatus.SUBMITTED

  /**
   * 1. Terminal guard
   */
  if (isTerminal(currentStatus)) {
    return { type: 'NO_CHANGE' }
  }

  /**
   * 2. Timeout → FAILED
   */
  const requestedAt = stored.timestamp?.requested
  if (requestedAt) {
    const requestedTime = new Date(requestedAt).getTime()
    if (now - requestedTime >= FIFTEEN_MINUTES_MS) {
      return {
        type: 'UPDATE',
        newStatus: RequestStatus.FAILED,
        failureInfo: {
          userMessage: 'Report generation timed out',
          developerMessage: 'Polling exceeded 15 minutes',
        },
      }
    }
  }

  /**
   * 3. Upstream error → FAILED
   */
  if (parentSignal.kind === 'ERROR' || childSignals.some((s) => s.kind === 'ERROR')) {
    const failure =
      parentSignal.kind === 'ERROR' ? parentSignal.failure : childSignals.find((s) => s.kind === 'ERROR')!.failure

    return {
      type: 'UPDATE',
      newStatus: RequestStatus.FAILED,
      failureInfo: failure,
    }
  }

  /**
   * 4. Resolve parent status
   */
  const resolvedParentStatus = parentSignal.kind === 'STATUS' ? parentSignal.status : currentStatus

  /**
   * 5. Aggregate children
   */
  const childStatuses = childSignals.filter((s) => s.kind === 'STATUS').map((s) => s.status)
  const aggregatedStatus = aggregateWithChildren(resolvedParentStatus, childStatuses)

  /**
   * 6. Status changed?
   */
  if (aggregatedStatus !== currentStatus) {
    return {
      type: 'UPDATE',
      newStatus: aggregatedStatus,
    }
  }

  return { type: 'NO_CHANGE' }
}
