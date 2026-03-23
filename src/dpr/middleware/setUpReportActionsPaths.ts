import { RequestHandler, Response, Request } from 'express'
import { setNestedPath } from '../utils/urlHelper'
import { Services } from '../types/Services'
import BookmarkService from '../routes/journeys/my-reports/bookmarks/service'
import { DownloadPermissionService } from '../services'

export const setUpViewReportActionsPaths = (services: Services): RequestHandler => {
  return async (req, res, next) => {
    const { nestedBaseUrl } = res.locals

    // Bookmark from report action path
    await setupBookmarkLocals(res, req, nestedBaseUrl, services.bookmarkService)

    // Download report action path
    await setupDownloadLocals(res, req, nestedBaseUrl, services.downloadPermissionService)

    // feedback sumbit action path
    setupDownloadFeedbackPaths(res, req, nestedBaseUrl)

    console.log({
      bookmarkActionEndoint: res.locals['bookmarkActionEndoint'],
      currentReportIsBookmarked: res.locals['currentReportIsBookmarked'],
      downloadActionEndpoint: res.locals['downloadActionEndpoint'],
      downloadAvailableForCurrentReport: res.locals['downloadAvailableForCurrentReport'],
      feedbackSubmissionFormPath: res.locals['feedbackSubmissionFormPath'],
    })

    next()
  }
}

/**
 * Creates local variables for bookmarking
 * - "bookmarkActionEndoint"
 * - "currentReportIsBookmarked"
 *
 * @param {Response} res
 * @param {Request} req
 * @param {(string | undefined)} nestedBaseUrl
 * @param {BookmarkService} service
 */
const setupBookmarkLocals = async (
  res: Response,
  req: Request,
  nestedBaseUrl: string | undefined,
  service: BookmarkService,
) => {
  // Bookmark endpoint
  const bookmarkPath = `/dpr/my-reports/bookmarks`
  res.locals['bookmarkActionEndoint'] = setNestedPath(bookmarkPath, nestedBaseUrl)

  // Is bookmarked
  const { reportId, id } = <{ id: string; reportId: string }>req.params
  const userId = res.locals['dprUser'].id
  res.locals['currentReportIsBookmarked'] = (await service.isBookmarked(id, reportId, userId)) || false
}

/**
 * Creates the locals for download
 *
 * @param {Response} res
 * @param {Request} req
 * @param {(string | undefined)} nestedBaseUrl
 * @param {DownloadPermissionService} service
 */
const setupDownloadLocals = async (
  res: Response,
  req: Request,
  nestedBaseUrl: string | undefined,
  service: DownloadPermissionService,
) => {
  // Download endpoint
  const downloadPath = '/dpr/download-report/'
  res.locals['downloadActionEndpoint'] = setNestedPath(downloadPath, nestedBaseUrl)

  // Permission to download report
  const { reportId, id } = <{ id: string; reportId: string }>req.params
  const userId = res.locals['dprUser'].id
  res.locals['downloadAvailableForCurrentReport'] = await service.downloadEnabledForReport(userId, reportId, id)
}

/**
 * Feedback form paths
 *
 * @param {Response} res
 * @param {Request} req
 * @param {(string | undefined)} nestedBaseUrl
 */
const setupDownloadFeedbackPaths = (res: Response, req: Request, nestedBaseUrl: string | undefined) => {
  const currentReportJourney = req.session?.currentReportJourney
  if (!currentReportJourney) {
    throw new Error('Journey not initialized')
  }
  const { reportId, id, tableId, currentReportPathname, currentReportSearch } = currentReportJourney

  // Feedback Submission form path
  let submissionPath
  if (tableId) {
    submissionPath = `/dpr/download-report/request-download/${reportId}/${id}/tableId/${tableId}/form`
  } else {
    submissionPath = `/dpr/download-report/request-download/${reportId}/${id}/form`
  }

  if (currentReportPathname) {
    submissionPath = `${submissionPath}?reportUrl=${currentReportPathname.replaceAll('/download-disabled', '')}`
    if (currentReportSearch) {
      submissionPath = `${submissionPath}&reportSearch=${currentReportSearch}`
    }
  }

  res.locals['feedbackSubmissionFormPath'] = setNestedPath(submissionPath, nestedBaseUrl)
}
