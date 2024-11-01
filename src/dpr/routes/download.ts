import type { RequestHandler, Router } from 'express'
import { Services } from '../types/Services'
import logger from '../utils/logger'

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
    try {
      res.render(`${templatePath}feedback-form`, {
        title: 'Let us know why you download',
        user: res.locals.user,
        report: {
          reportId,
          variantId,
          tableId,
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

  const downloadHandler: RequestHandler = async (req, res, next) => {
    const userId = res.locals.user?.uuid ? res.locals.user.uuid : 'userId'
    const { reportId, id, type, tableId } = req.body

    // Can download?
    const canDownload = await services.downloadPermissionService.downloadEnabled(userId, reportId, id)

    if (canDownload) {
      // Do the downloading
    } else {
      res.send({ redirect: `/async/${type}/${reportId}/${id}/request/${tableId}/report/download-disabled` })
    }
  }

  router.get('/download/:reportId/:variantId/:tableId/feedback', feedbackFormHandler)
  router.post('/submitFeedback/', feedbackSubmitHandler)
  router.get('/download/:reportId/:variantId/:tableId/feedback/submitted', feedbackSuccessHandler)
  router.post('/downloadReport/', downloadHandler)
}
