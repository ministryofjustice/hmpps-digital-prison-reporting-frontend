import { getMyReport } from 'src/dpr/routes/journeys/my-reports/utils'
import {
  RequestStatus,
  UpstreamSignal,
  StatusResolution,
  FailureInfo,
  EvaluateAndUpdateReportStatusOptions,
  GetReportStatusOptions,
  TERMINAL_STATUSES,
  FIFTEEN_MINUTES_MS,
  ExpireFinishedReportsOptions,
} from './types'
import ErrorHandler, { DprErrorMessage } from '../ErrorHandler/ErrorHandler'
import { Services } from '../../types/Services'
import { StoredReportData, ReportType, RequestedReport } from '../../types/UserReports'
import { getValues } from '../localsHelper'
import { getAllMyReports } from '../reportStoreHelper'
import { components } from '../../types/api'

/**
 * ------------------------------------------------------------
 * API
 * ------------------------------------------------------------
 */

/**
 * Get the status by report type
 *
 * @param {GetReportStatusOptions} {
 *   reportType,
 *   services,
 *   token,
 *   reportId,
 *   id,
 *   executionId,
 *   definitionsPath,
 *   tableId,
 * }
 * @return {*}  {Promise<UpstreamSignal>}
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
        ? await services.dashboardService.getAsyncStatus(token, reportId, id, executionId, tableId, definitionsPath)
        : await services.reportingService.getAsyncReportStatus(
            token,
            reportId,
            id,
            executionId,
            definitionsPath,
            tableId,
          )

    const data = response as {
      status?: string
      error: string
      errorCategory?: number
      stateChangeReason?: string
    }

    if (!data.status) {
      return { kind: 'EMPTY' }
    }

    if (data.status === RequestStatus.FAILED) {
      const formatted = failedPayloadToDprError(data)
      return {
        kind: 'ERROR',
        failure: toFailureInfo(formatted),
      }
    }

    return {
      kind: 'STATUS',
      status: data.status as RequestStatus,
    }
  } catch (error) {
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

/**
 * Gets the status for a reports and its child reports
 *
 * @param {{
 *   stored: StoredReportData
 *   services: Services
 *   token: string
 * }} {
 *   stored,
 *   services,
 *   token,
 * }
 * @return {*}  {Promise<{
 *   parentSignal: UpstreamSignal
 *   childSignals: UpstreamSignal[]
 * }>}
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
        stored.childExecutionData.map(child => {
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

/**
 * Converts a normalized internal error (`DprErrorMessage`) into a `FailureInfo`
 * object that is safe and consistent to store and return to clients.
 *
 * @param {DprErrorMessage} error
 * @return {*}  {FailureInfo}
 */
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
 * Adapts a successful (200 OK) response that represents a semantic
 * failure (`status: FAILED`) into the standard `DprErrorMessage` shape.
 *
 * @param {*} raw
 * @return {*}  {DprErrorMessage}
 */
function failedPayloadToDprError(raw: {
  status?: string
  error: string
  errorCategory?: number
  stateChangeReason?: string
}): DprErrorMessage {
  const { error, stateChangeReason } = raw

  return {
    userMessage: 'An unexpected error occurred',
    developerMessage: error,
    ...(stateChangeReason && { moreInfo: stateChangeReason }),
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
  if (parentSignal.kind === 'ERROR' || childSignals.some(signal => signal.kind === 'ERROR')) {
    const failure =
      parentSignal.kind === 'ERROR' ? parentSignal.failure : childSignals.find(s => s.kind === 'ERROR')!.failure

    return {
      type: 'UPDATE',
      newStatus: RequestStatus.FAILED,
      failureInfo: failure,
    }
  }

  /**
   * ------------------------------------------------------------
   * CHILD AGGREGATION
   * ------------------------------------------------------------
   * Execution identity comes from stored.childExecutionData,
   * execution truth comes from childSignals.
   */
  const childStatuses = childSignals.filter(s => s.kind === 'STATUS').map(s => s.status)

  if (childStatuses.some(status => status === RequestStatus.FAILED)) {
    return {
      type: 'UPDATE',
      newStatus: RequestStatus.FAILED,
    }
  }

  if (childStatuses.length > 0 && childStatuses.every(status => status === RequestStatus.FINISHED)) {
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
  const updated = await getMyReport({ executionId }, 'requestedReports', services, dprUser.id)
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

async function detectExpiredFinishedReports({
  reports,
  services,
  token,
}: {
  reports: StoredReportData[]
  services: Services
  token: string
}): Promise<
  {
    executionId: string
  }[]
> {
  const finishedWithTables = reports.filter(
    r =>
      (r.status === RequestStatus.FINISHED || r.status === RequestStatus.READY) &&
      Boolean(r.executionId) &&
      Boolean(r.tableId),
  )

  if (finishedWithTables.length === 0) {
    return []
  }

  // de‑duplicate tableIds for batch lookup
  const tableIds = [...new Set(finishedWithTables.map(r => r.tableId!))]

  const batches = chunkArray(tableIds, 200)

  const expiryStates = await batches.reduce<Promise<components['schemas']['ResultTableExpiryState'][]>>(
    async (accPromise, batch) => {
      const acc = await accPromise
      const result = await services.reportingService.getTableExpiryState(token, batch)
      return [...acc, ...result]
    },
    Promise.resolve([]),
  )

  const expiredTableIds = new Set(expiryStates.filter(s => s.expired).map(s => s.tableId))

  return finishedWithTables.filter(r => expiredTableIds.has(r.tableId!)).map(r => ({ executionId: r.executionId! }))
}

const chunkArray = <T>(arr: T[], size: number): T[][] =>
  Array.from({ length: Math.ceil(arr.length / size) }, (_, i) => arr.slice(i * size, i * size + size))

/**
 * Checks the expired status of reports and updates the state
 *
 * @export
 * @param {ExpireFinishedReportsOptions} {
 *   reports,
 *   services,
 *   token,
 *   res,
 * }
 * @return {*}  {Promise<StoredReportData[]>}
 */
export async function expireFinishedReports({
  requestedReports,
  recentlyViewedReports,
  services,
  res,
}: ExpireFinishedReportsOptions): Promise<{
  requestedReports: RequestedReport[]
  recentlyViewedReports: StoredReportData[]
}> {
  const { dprUser, token } = getValues(res)

  const reports = [...requestedReports, ...recentlyViewedReports]

  const expired = await detectExpiredFinishedReports({
    reports,
    services,
    token,
  })

  if (expired.length === 0) {
    return {
      requestedReports,
      recentlyViewedReports,
    }
  }

  // de-duplicate executionIds
  const uniqueExpired = [...new Map(expired.map(e => [e.executionId, e])).values()]

  // If any expired then update the state
  await uniqueExpired.reduce(async (prev, { executionId }) => {
    await prev
    await services.requestedReportService.setToExpired(executionId, dprUser.id)
    await services.recentlyViewedService.setToExpired(executionId, dprUser.id)
  }, Promise.resolve())

  // get a fresh version of all reports
  return getAllMyReports(res, services, dprUser.id)
}

const EXPIRED_CHECK_INTERVAL_MS = 30 * 60 * 1000 // 30

/**
 * Checks if the expiry check should run
 *
 * @export
 * @param {*} session
 * @return {*}  {boolean}
 */
export function shouldRunExpiryCheck(session: { lastExpiredReportsCheckAt?: number }): boolean {
  const lastRun = session.lastExpiredReportsCheckAt
  if (!lastRun) return true
  return Date.now() - lastRun > EXPIRED_CHECK_INTERVAL_MS
}

export function recordExpiryCheck(session: { lastExpiredReportsCheckAt?: number }) {
  // eslint-disable-next-line no-param-reassign
  session.lastExpiredReportsCheckAt = Date.now()
}
