import type { RequestHandler, Router } from 'express'
import { Services } from '../types/Services'
import logger from '../utils/logger'

export default function routes({
  router,
  layoutPath,
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
    logger.info('Download Feedback Submission:', `${JSON.stringify(body)}`)
  }

  router.get('/download/:reportId/:variantId/:tableId/feedback', feedbackFormHandler)
  router.post('/submitFeedback/', feedbackSubmitHandler)
}
