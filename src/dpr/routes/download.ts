import type { RequestHandler, Router } from 'express'
import { Services } from '../types/Services'
import logger from '../utils/logger'
import DownloadUtils from '../utils/downloadUtils'
import { LoadType } from '../types/UserReports'
import { components } from '../types/api'

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
    const token = res.locals.user?.token ? res.locals.user.token : 'token'
    const csrfToken = (res.locals.csrfToken as unknown as string) || 'csrfToken'
    const { reportId, variantId, tableId } = req.params
    const loadType = tableId ? LoadType.ASYNC : LoadType.SYNC
    const { dataProductDefinitionsPath } = req.query

    const variantData: components['schemas']['SingleVariantReportDefinition'] =
      await services.reportingService.getDefinition(token, reportId, variantId, dataProductDefinitionsPath)

    try {
      res.render(`${templatePath}feedback-form`, {
        title: 'Download request form',
        user: res.locals.user,
        report: {
          reportId,
          reportName: variantData.name,
          variantId,
          variantName: variantData.variant.name,
          tableId,
          loadType,
          time: new Date().toDateString(),
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
    const { reportId, variantId, tableId, loadType, reportName, variantName } = body
    logger.info('Download Feedback Submission:', `${JSON.stringify(body)}`)

    const queryParams = `?reportName=${reportName}&variantName=${variantName}`
    let redirect
    if (loadType === LoadType.ASYNC) {
      redirect = `/download/${reportId}/${variantId}/${tableId}/feedback/submitted${queryParams}`
    } else {
      redirect = `/download/${reportId}/${variantId}/feedback/submitted${queryParams}`
    }

    res.redirect(redirect)
  }

  const feedbackSuccessHandler: RequestHandler = async (req, res, next) => {
    const userId = res.locals.user?.uuid ? res.locals.user.uuid : 'userId'
    const { reportId, variantId, tableId } = req.params
    const { reportName, variantName } = req.query

    await services.downloadPermissionService.saveDownloadPermissionData(userId, reportId, variantId)

    res.render(`${templatePath}feedback-form-success`, {
      title: 'success',
      layoutPath,
      report: {
        reportId,
        variantId,
        tableId,
        reportName,
        variantName,
      },
    })
  }

  const downloadRequestHandler: RequestHandler = async (req, res, next) => {
    const userId = res.locals.user?.uuid ? res.locals.user.uuid : 'userId'
    const { reportId, id, type, tableId, dataProductDefinitionsPath, loadType } = req.body

    let redirect = `/async/${type}/${reportId}/${id}/request/${tableId}/report/download-disabled`
    if (loadType === LoadType.SYNC) {
      redirect = `/dpr/embedded/sync/${type}/${reportId}/${id}/report/download-disabled`
    }

    const canDownload = await services.downloadPermissionService.downloadEnabled(userId, reportId, id)

    if (canDownload) {
      await DownloadUtils.downloadReport({ req, res, services, redirect, loadType })
    } else {
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

  router.get(
    ['/download/:reportId/:variantId/:tableId/feedback/submitted', '/download/:reportId/:variantId/feedback/submitted'],
    feedbackSuccessHandler,
  )
  router.post('/downloadReport/', downloadRequestHandler)
}
