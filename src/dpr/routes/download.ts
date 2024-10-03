import type { RequestHandler, Router } from 'express'
import { Services } from '../types/Services'

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
    try {
      res.render(`${templatePath}feedback-form`, {
        title: 'Feedback Form',
        layoutPath,
        postEndpoint: '/submitFeedback/',
      })
    } catch (error) {
      next()
    }
  }

  router.get('/download/:dpdId/:reportid/feedback', feedbackFormHandler)

  // TODO: implement the post handlers for the feedback form
  // router.post('/submitFeedback/', feedbackSubmitHandler, feedbackSubmitSuccessHandler)
}
