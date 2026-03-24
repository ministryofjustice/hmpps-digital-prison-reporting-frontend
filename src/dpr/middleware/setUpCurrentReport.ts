import type { Request, Response, NextFunction, RequestHandler } from 'express'
import { ReportType } from '../types/UserReports'
import { Services } from '../types/Services'
import { BookmarkService, DownloadPermissionService } from '../services'
import { setNestedPath } from '../utils/urlHelper'

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

    // only set the session on get requests
    if (req.method !== 'GET') return

    // Get the bits we need from the req params
    const { id, reportId, type, tableId, executionId } = req.params

    // Get the rest of things about a current report
    const reportIsBookmarked = await setUpBookmark(req, res, services.bookmarkService)
    const downloadEnabled = await setUpDownloadConfig(req, res, services.downloadPermissionService)
    const feedbackSubmissionFormPath = setupDownloadFeedbackPaths(req, res)
    const reportUrls = setUpReportUrls(req)

    const params = {
      ...(type && { type: type as ReportType }),
      ...(tableId && { tableId }),
      ...(executionId && { executionId }),
      ...(feedbackSubmissionFormPath && { feedbackSubmissionFormPath }),
      ...reportUrls,
      downloadEnabled,
      reportIsBookmarked,
    }

    // Check whether the id or reportId has changed at all.
    const existing = req.session.currentReportJourney as CurrentReportJourneySessionData | undefined
    const idChanged = !existing || [existing.id !== id, existing.reportId !== reportId].some((v) => v)

    if (idChanged) {
      // Completely replace the journey object
      req.session.currentReportJourney = {
        id,
        reportId,
        ...params,
      }
    } else {
      req.session.currentReportJourney = {
        ...existing,
        ...params,
      }
    }

    console.log(JSON.stringify(req.session.currentReportJourney, null, 2))

    next()
  }
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
  const { nestedBaseUrl } = res.locals
  const { reportId, id, tableId } = <{ id: string; reportId: string; tableId: string }>req.params

  let feedbackSubmissionFormPath
  if (reportId && id) {
    feedbackSubmissionFormPath = tableId
      ? `/dpr/download-report/request-download/${reportId}/${id}/tableId/${tableId}/form`
      : `/dpr/download-report/request-download/${reportId}/${id}/form`

    feedbackSubmissionFormPath = setNestedPath(feedbackSubmissionFormPath, nestedBaseUrl)
  }

  return feedbackSubmissionFormPath
}
