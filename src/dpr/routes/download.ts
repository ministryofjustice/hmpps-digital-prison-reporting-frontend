import type { RequestHandler, Router } from 'express'
import { Services } from '../types/Services'
import logger from '../utils/logger'
import DownloadUtils from '../utils/downloadUtils'
import { LoadType } from '../types/UserReports'

/**
 * DOWNLOAD PROCESS
 *
 * 1. User clicks download button on the report for the first time.
 * 2. The users download permissions are checked.
 * 3. No permission is found - redirect to report with disabled message - leave feedback to download
 * 4. Fill feeedback form and submit - POST to submission handler
 * 5. Log Feedback, add download permission for report to user config
 * 6. User navigates back to the report
 * 7. Clicks download - POST to download handler
 * 8. Check if user has permission - permission is present
 * 9. Handler gets report data, converts to CSV, saves to file, download the file and clears up
 */

export default function routes({
  router,
  layoutPath,
  services,
  templatePath = 'dpr/views/',
}: {
  router: Router
  layoutPath: string
  services: Services
  templatePath?: string
}) {
  const feedbackFormHandler: RequestHandler = async (req, res, next) => {
    const csrfToken = (res.locals.csrfToken as unknown as string) || 'csrfToken'
    const { reportId, variantId, tableId } = req.params
    const loadType = tableId ? LoadType.ASYNC : LoadType.SYNC
    try {
      res.render(`${templatePath}feedback-form`, {
        title: 'Let us know why you download',
        user: res.locals.user,
        report: {
          reportId,
          variantId,
          tableId,
          loadType,
        },
        csrfToken,
        layoutPath,
        postEndpoint: '/submitFeedback/',
      })
    } catch (error) {
      next()
    }
  }

  const feedbackSubmitHandler: RequestHandler = async (req, res, next) => {
    const { body } = req
    const { reportId, variantId, tableId } = body
    logger.info('Download Feedback Submission:', `${JSON.stringify(body)}`)
    res.redirect(`/download/${reportId}/${variantId}/${tableId}/feedback/submitted`)
  }

  const feedbackSuccessHandler: RequestHandler = async (req, res, next) => {
    const userId = res.locals.user?.uuid ? res.locals.user.uuid : 'userId'
    const { reportId, variantId, tableId } = req.params

    await services.downloadPermissionService.saveDownloadPermissionData(userId, reportId, variantId)

    res.render(`${templatePath}feedback-form-success`, {
      title: 'success',
      layoutPath,
      report: {
        reportId,
        variantId,
        tableId,
      },
    })
  }

  const downloadRequestHandler: RequestHandler = async (req, res, next) => {
    const userId = res.locals.user?.uuid ? res.locals.user.uuid : 'userId'
    const { reportId, id, type, tableId, dataProductDefinitionsPath, loadType } = req.body

    const canDownload = await services.downloadPermissionService.downloadEnabled(userId, reportId, id)
    if (canDownload) {
      await DownloadUtils.downloadReport({ req, res, services })
    } else {
      let redirect = `/async/${type}/${reportId}/${id}/request/${tableId}/report/download-disabled`
      if (loadType === LoadType.SYNC) {
        redirect = `/sync/${type}/${reportId}/${id}/report/download-disabled`
      }

      redirect = dataProductDefinitionsPath
        ? `${redirect}?dataProductDefinitionsPath=${dataProductDefinitionsPath}`
        : redirect
      res.redirect(redirect)
    }
  }

  router.get(
    ['/download/:reportId/:variantId/:tableId/feedback', '/download/:reportId/:variantId/feedback'],
    feedbackFormHandler,
  )
  router.post('/submitFeedback/', feedbackSubmitHandler)
  router.get('/download/:reportId/:variantId/:tableId/feedback/submitted', feedbackSuccessHandler)
  router.post('/downloadReport/', downloadRequestHandler)
}
