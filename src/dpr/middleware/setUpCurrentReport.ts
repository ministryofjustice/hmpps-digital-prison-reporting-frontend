import type { Request, Response, NextFunction, RequestHandler } from 'express'
import { ReportType } from '../types/UserReports'
import { Services } from '../types/Services'
import { BookmarkService, DownloadPermissionService } from '../services'
import { setNestedPath } from '../utils/urlHelper'
import { getRouteLocals } from '../utils/localsHelper'

interface CurrentReportJourneySessionData {
  id: string
  reportId: string
  tableId?: string
  executionId?: string
  type?: ReportType
  reportIsBookmarked?: boolean
  downloadEnabled?: boolean
  feedbackSubmissionFormPath?: string
  currentReportPathname?: string
  currentReportSearch?: string
  currentReportUrl?: string
}

/**
 * Handles the session data for a report journey
 * from pre-request filters to viewing a report.
 *
 * - If the ID or report ID change the session is scrubbed.
 * - Updates the session with the relevant data along the report journey
 *
 * @return {*}  {RequestHandler}
 */
export const storeCurrentReportJourneySessionParams = (services: Services): RequestHandler => {
  return async (req: Request, res: Response, next: NextFunction) => {
    if (!req.session) {
      next(new Error('Session not initialized'))
    }

    req.session.currentReportJourney ??= {}

    // only set the session on get requests
    if (req.method !== 'GET') return next()

    // Get the bits we need from the req params
    const { id, reportId, type, tableId, executionId } = req.params as Record<string, string>

    // Build keys
    const baseKey = buildJourneyKey(id, reportId, type)
    const fullKey = buildJourneyKey(id, reportId, type, executionId)

    // Get the rest of things about a current report
    const reportIsBookmarked = await setUpBookmark(req, res, services.bookmarkService)
    const downloadEnabled = await setUpDownloadConfig(req, res, services.downloadPermissionService)
    const feedbackSubmissionFormPath = setupDownloadFeedbackPaths(req, res)
    const reportUrls = setUpReportUrls(req)

    const params: Partial<CurrentReportJourneySessionData> = {
      ...(type && { type: type as ReportType }),
      ...(tableId && { tableId }),
      ...(executionId && { executionId }),
      ...(feedbackSubmissionFormPath && { feedbackSubmissionFormPath }),
      ...reportUrls,
      downloadEnabled,
      reportIsBookmarked,
    }

    const sessionJourneys = req.session.currentReportJourney

    const hasExecutionId = Boolean(executionId)
    const preExecutionEntry = sessionJourneys[baseKey]
    const postExecutionEntry = sessionJourneys[fullKey]

    /**
     * CASE A: executionId becomes available now (rollback)
     * We need to MOVE the old entry to the new key.
     */
    if (hasExecutionId && preExecutionEntry && !postExecutionEntry) {
      sessionJourneys[fullKey] = {
        ...preExecutionEntry,
        executionId,
        ...params,
      }

      delete sessionJourneys[baseKey]
      return next()
    }

    /**
     * CASE B: new entry entirely
     */
    if (!sessionJourneys[fullKey]) {
      sessionJourneys[fullKey] = {
        id,
        reportId,
        ...params,
      }
      return next()
    }

    /**
     * CASE C: existing entry so merge updates
     */
    sessionJourneys[fullKey] = {
      ...sessionJourneys[fullKey],
      ...params,
    }

    return next()
  }
}

function buildJourneyKey(id: string, reportId: string, type?: string, executionId?: string): string {
  const parts = [reportId, id]
  if (type) parts.push(type)
  if (executionId) parts.push(executionId)
  return parts.join(':')
}

const setUpReportUrls = (req: Request) => {
  let currentReportPathname
  let currentReportSearch
  let currentReportUrl

  if (req.originalUrl.includes('view-report')) {
    const url = new URL(req.originalUrl, `${req.protocol}://${req.get('host')}`)
    currentReportPathname = url.pathname
    currentReportSearch = url.search
    currentReportUrl = req.originalUrl
  }

  return {
    ...(currentReportPathname && { currentReportPathname }),
    ...(currentReportSearch && { currentReportSearch }),
    ...(currentReportUrl && { currentReportUrl }),
  }
}

const setUpBookmark = async (req: Request, res: Response, service: BookmarkService) => {
  const { reportId, id } = <{ id: string; reportId: string }>req.params
  const userId = res.locals['dprUser'].id

  let reportIsBookmarked = false
  if (reportId && id && userId) {
    reportIsBookmarked = (await service.isBookmarked(id, reportId, userId)) || false
  }

  return reportIsBookmarked
}

const setUpDownloadConfig = async (req: Request, res: Response, service: DownloadPermissionService) => {
  const { reportId, id } = <{ id: string; reportId: string }>req.params
  const userId = res.locals['dprUser'].id

  let downloadEnabled = false
  if (reportId && id && userId) {
    downloadEnabled = await service.downloadEnabledForReport(userId, reportId, id)
  }

  return downloadEnabled
}

const setupDownloadFeedbackPaths = (req: Request, res: Response) => {
  const { reportId, id, tableId } = <{ id: string; reportId: string; tableId: string }>req.params
  const { nestedBaseUrl } = getRouteLocals(res)

  let feedbackSubmissionFormPath
  if (reportId && id) {
    feedbackSubmissionFormPath = tableId
      ? `/dpr/download-report/request-download/${reportId}/${id}/tableId/${tableId}/form`
      : `/dpr/download-report/request-download/${reportId}/${id}/form`

    feedbackSubmissionFormPath = setNestedPath(feedbackSubmissionFormPath, nestedBaseUrl)
  }

  return feedbackSubmissionFormPath
}
