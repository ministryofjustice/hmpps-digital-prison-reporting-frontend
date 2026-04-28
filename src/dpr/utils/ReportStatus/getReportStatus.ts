import {
  RequestStatus,
  UpstreamSignal,
  StatusResolution,
  FailureInfo,
  EvaluateAndUpdateReportStatusOptions,
  GetReportStatusOptions,
  TERMINAL_STATUSES,
  FIFTEEN_MINUTES_MS,
} from './types'
import ErrorHandler, { DprErrorMessage } from '../ErrorHandler/ErrorHandler'
import { Services } from '../../types/Services'
import { StoredReportData, ReportType, RequestedReport } from '../../types/UserReports'
import { getValues } from '../localsHelper'

/**
 * ------------------------------------------------------------
 * API
 * ------------------------------------------------------------
 */

async function getStatusByType({
  reportType,
  services,
  token,
  reportId,
  id,
  executionId,
  definitionsPath,
  tableId,
}: GetReportStatusOptions): Promise<UpstreamSignal> {
  try {
    const response =
      reportType === ReportType.DASHBOARD
        ? await services.dashboardService.getAsyncStatus(token, reportId, id, executionId, definitionsPath, tableId)
        : await services.reportingService.getAsyncReportStatus(
            token,
            reportId,
            id,
            executionId,
            definitionsPath,
            tableId,
          )

    const raw: unknown = response

    if (!raw || typeof raw !== 'object') {
      return { kind: 'EMPTY' }
    }

    if ('status' in raw) {
      const { status } = raw as { status?: unknown }

      if (typeof status === 'string') {
        return {
          kind: 'STATUS',
          status: status as RequestStatus,
        }
      }

      if (typeof status === 'number') {
        const formatted = new ErrorHandler({ data: raw }).formatError()
        return {
          kind: 'ERROR',
          failure: toFailureInfo(formatted),
        }
      }
    }

    return { kind: 'EMPTY' }
  } catch (error) {
    // Transport / thrown error
    const formatted = new ErrorHandler(error).formatError()
    return {
      kind: 'ERROR',
      failure: toFailureInfo(formatted),
    }
  }
}

/**
 * ------------------------------------------------------------
 * ORCHESTRATION
 * ------------------------------------------------------------
 */

async function getStatus({
  stored,
  services,
  token,
}: {
  stored: StoredReportData
  services: Services
  token: string
}): Promise<{
  parentSignal: UpstreamSignal
  childSignals: UpstreamSignal[]
}> {
  const { reportId, id, tableId, executionId, dataProductDefinitionsPath } = stored
  const definitionsPath = dataProductDefinitionsPath || ''

  if (!executionId || !tableId) {
    throw new Error('Stored report missing executionId or tableId')
  }

  const parentSignal = await getStatusByType({
    reportType: stored.type,
    services,
    token,
    reportId,
    id,
    executionId,
    definitionsPath,
    tableId,
  })

  const childSignals = stored.childExecutionData
    ? await Promise.all(
        stored.childExecutionData.map((child) => {
          const { tableId: childTableId, executionId: childExecutionId } = child

          if (!childExecutionId || !childTableId) {
            throw new Error('Stored child report missing executionId or tableId')
          }

          return getStatusByType({
            services,
            reportType: ReportType.REPORT,
            token,
            reportId,
            id,
            executionId: childExecutionId,
            definitionsPath,
            tableId: childTableId,
          })
        }),
      )
    : []

  return {
    parentSignal,
    childSignals,
  }
}

function toFailureInfo(error: DprErrorMessage): FailureInfo {
  const normalize = (msg?: string | string[]): string =>
    Array.isArray(msg) ? msg.join('. ') : msg || 'An unexpected error occurred'

  return {
    userMessage: normalize(error.userMessage),
    ...(error.developerMessage && {
      developerMessage: normalize(error.developerMessage),
    }),
    ...(error.moreInfo && { moreInfo: error.moreInfo }),
    ...(typeof error.status === 'number' && {
      errorCode: error.status,
    }),
  }
}

/**
 * ------------------------------------------------------------
 * RESOLVER
 * ------------------------------------------------------------
 */

function isTerminal(status?: RequestStatus): boolean {
  return status ? TERMINAL_STATUSES.has(status) : false
}

/**
 * Decides the authoritative status of a report.
 *
 * @export
 * @param {{
 *   stored: StoredReportData
 *   parentSignal: UpstreamSignal
 *   childSignals: UpstreamSignal[]
 *   now: number
 * }} {
 *   stored,
 *   parentSignal,
 *   childSignals,
 *   now,
 * }
 * @return {*}  {StatusResolution}
 */
function resolveReportStatus({
  stored,
  parentSignal,
  childSignals,
  now,
}: {
  stored: StoredReportData
  parentSignal: UpstreamSignal
  childSignals: UpstreamSignal[]
  now: number
}): StatusResolution {
  const currentStatus = stored.status ?? RequestStatus.SUBMITTED

  /**
   * ------------------------------------------------------------
   * TERMINAL GUARD
   * ------------------------------------------------------------
   * Once a report is terminal, it never changes again.
   */
  if (isTerminal(currentStatus)) {
    return { type: 'NO_CHANGE' }
  }

  /**
   * ------------------------------------------------------------
   * TIMEOUT
   * ------------------------------------------------------------
   * If polling exceeds 15 minutes, we decide it has failed.
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
   * ------------------------------------------------------------
   * API ERROR
   * ------------------------------------------------------------
   * The API failed.
   */
  if (parentSignal.kind === 'ERROR' || childSignals.some((signal) => signal.kind === 'ERROR')) {
    const failure =
      parentSignal.kind === 'ERROR' ? parentSignal.failure : childSignals.find((s) => s.kind === 'ERROR')!.failure

    return {
      type: 'UPDATE',
      newStatus: RequestStatus.FAILED,
      failureInfo: failure,
    }
  }

  /**
   * ------------------------------------------------------------
   * STRING "FAILED" STATUS FROM API
   * ------------------------------------------------------------
   */
  if (parentSignal.kind === 'STATUS' && parentSignal.status === RequestStatus.FAILED) {
    return {
      type: 'UPDATE',
      newStatus: RequestStatus.FAILED,
    }
  }

  /**
   * ------------------------------------------------------------
   * CHILD AGGREGATION
   * ------------------------------------------------------------
   * Execution identity comes from stored.childExecutionData,
   * execution truth comes from childSignals.
   */
  const childStatuses = childSignals.filter((s) => s.kind === 'STATUS').map((s) => s.status)

  if (childStatuses.some((status) => status === RequestStatus.FAILED)) {
    return {
      type: 'UPDATE',
      newStatus: RequestStatus.FAILED,
    }
  }

  if (childStatuses.length > 0 && childStatuses.every((status) => status === RequestStatus.FINISHED)) {
    return {
      type: 'UPDATE',
      newStatus: RequestStatus.FINISHED,
    }
  }

  /**
   * ------------------------------------------------------------
   * NORMAL STATUS TRANSITION
   * ------------------------------------------------------------
   * Parent progressed (SUBMITTED → STARTED → PICKED → FINISHED)
   */
  if (parentSignal.kind === 'STATUS' && parentSignal.status !== currentStatus) {
    return {
      type: 'UPDATE',
      newStatus: parentSignal.status,
    }
  }

  /**
   * ------------------------------------------------------------
   * NOTHING CHANGED
   * ------------------------------------------------------------
   */
  return { type: 'NO_CHANGE' }
}

/**
 * ------------------------------------------------------------
 * EVALUATE STATUS
 * ------------------------------------------------------------
 */

type EvaluateReportStatusOptions = {
  stored: StoredReportData
  services: Services
  token: string
  now?: number
}

/**
 * Evaluates the current authoritative report status.
 */
async function evaluateReportStatus({
  stored,
  services,
  token,
  now = Date.now(),
}: EvaluateReportStatusOptions): Promise<StatusResolution> {
  // 1. Get the status data.
  const { parentSignal, childSignals } = await getStatus({
    stored,
    services,
    token,
  })

  // 2. Apply and resolve status rules.
  return resolveReportStatus({
    stored,
    parentSignal,
    childSignals,
    now,
  })
}

/**
 * Ensures the stored report status is correct.
 */
export async function evaluateAndUpdateReportStatus({
  stored,
  services,
  token,
  res,
}: EvaluateAndUpdateReportStatusOptions): Promise<{
  resolution: StatusResolution
  updated?: RequestedReport
}> {
  const { dprUser } = getValues(res)
  const { executionId } = stored

  if (!executionId) {
    throw new Error('Stored report missing executionId')
  }

  const resolution = await evaluateReportStatus({
    stored,
    services,
    token,
  })

  if (resolution.type === 'NO_CHANGE') {
    return { resolution }
  }

  // Set the error message if any to a string
  const errorMessage = resolution.failureInfo ? JSON.stringify(resolution.failureInfo) : undefined

  // Update the status
  await services.requestedReportService.updateStatus(executionId, dprUser.id, resolution.newStatus, errorMessage)

  // Get the updated stored state
  const updated = await services.requestedReportService.getReportByExecutionId(executionId, dprUser.id)
  if (!updated) {
    return { resolution }
  }

  return {
    resolution,
    updated,
  }
}

/**
 * ------------------------------------------------------------
 * PREFLIGHT / INITIALISATION
 * ------------------------------------------------------------
 */

/**
 * Checks all FINISHED reports to see if they have expired upstream.
 * Any report returning a 404 is marked as EXPIRED.
 *
 * Intended to run once during component initialisation,
 * before polling begins.
 */
export async function expireFinishedReportsIfNeeded({
  reports,
  services,
  token,
  res,
}: ExpireFinishedReportsOptions): Promise<StoredReportData[]> {
  const { dprUser } = getValues(res)

  const finishedReports = reports.filter((r) => r.status === RequestStatus.FINISHED)

  if (finishedReports.length === 0) {
    return reports
  }

  const checks = await Promise.all(
    finishedReports.map(async (stored) => {
      const { reportId, id, executionId, tableId, dataProductDefinitionsPath, type } = stored

      if (!executionId || !tableId) {
        return { stored, expired: false }
      }

      const signal = await getStatusByType({
        reportType: type,
        services,
        token,
        reportId,
        id,
        executionId,
        tableId,
        definitionsPath: dataProductDefinitionsPath ?? '',
      })

      const expired = signal.kind === 'ERROR' && signal.failure.errorCode === 404

      return { stored, expired }
    }),
  )

  const expiredExecutionIds = new Set(checks.filter((c) => c.expired).map((c) => c.stored.executionId))

  if (expiredExecutionIds.size === 0) {
    return reports
  }

  // Persist updates
  await Promise.all(
    checks
      .filter((c) => c.expired)
      .map((c) =>
        services.requestedReportService.updateStatus(c.stored.executionId!, dprUser.id, RequestStatus.EXPIRED),
      ),
  )

  // Hydrate updated state
  const updatedReports = await Promise.all(
    reports.map(async (report) => {
      if (!expiredExecutionIds.has(report.executionId)) {
        return report
      }

      const updated = await services.requestedReportService.getReportByExecutionId(report.executionId!, dprUser.id)

      return updated ?? report
    }),
  )

  return updatedReports
}
