import type { RequestHandler, Router } from 'express'
import ErrorSummaryUtils from '../components/error-summary/utils'
import AysncRequestUtils from '../utils/asyncRequestUtils'

import { Services } from '../types/Services'
import logger from '../utils/logger'

export default function routes({
  router,
  services,
  layoutPath,
  templatePath = 'dpr/views/',
}: {
  router: Router
  services: Services
  layoutPath: string
  templatePath?: string
}) {
  const requestDashboardPageHandler: RequestHandler = async (req, res, next) => {
    try {
      res.render(`${templatePath}async-request-report`, {
        title: 'Request Dashboard',
        description: 'Request Dashboard!',
        layoutPath,
        postEndpoint: '/requestDashboard/',
      })
    } catch (error) {
      next()
    }
  }

  const requestDashboardHandler: RequestHandler = async (req, res, next) => {
    try {
      const redirectToPollingPage = await AysncRequestUtils.request({
        req,
        res,
        services,
        next,
      })
      if (redirectToPollingPage) {
        res.redirect(redirectToPollingPage)
      } else {
        res.end()
      }
    } catch (error) {
      next()
    }
  }

  const asyncErrorHandler: RequestHandler = async (req, res) => {
    logger.error(`Error: ${JSON.stringify(req.body)}`)
    let { error } = req.body

    if (error && error.data) {
      error = error.data
    } else if (error && error.message) {
      error = { userMessage: `${error.name}: ${error.message}`, status: 'FAILED', stack: error.stack }
    }

    error.userMessage = ErrorSummaryUtils.mapError(error.userMessage)

    res.render(`${templatePath}/async-error`, {
      layoutPath,
      ...req.body,
      error,
      ...req.params,
    })
  }

  // 1. Request
  router.get('/async-dashboards/:reportId/:variantId/request', requestDashboardPageHandler, asyncErrorHandler)
  router.post('/requestReport/', requestDashboardHandler, asyncErrorHandler)
}
