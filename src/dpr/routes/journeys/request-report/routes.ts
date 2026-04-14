/* eslint-disable no-param-reassign */
import { Router } from 'express'
import { captureException } from '@sentry/node'
import { storeActiveReportSessionData } from '../../../middleware/setUpActiveReport'
import { Services } from '../../../types/Services'
import RequestReportController from './controller'

// Routes
import requestReportRoutes from './filters/routes'
import requestStatusRoutes from './status/routes'

// middleware
import reportAuthoriser from '../../../middleware/reportAuthoriser'

export function Routes({ layoutPath, services }: { services: Services; layoutPath: string }): Router {
  const router = Router({ mergeParams: true })

  const controller = new RequestReportController(layoutPath, services)

  router.post(`/:type/:reportId/:id/:executionId/cancel`, controller.CANCEL)
  router.use(
    `/:type/:reportId/:id/filters`,
    reportAuthoriser(services, layoutPath),
    storeActiveReportSessionData({ services }),
    requestReportRoutes({ layoutPath, services }),
    controller.errorHandler,
  )
  router.use(
    `/:type/:reportId/:id/:executionId/status`,
    reportAuthoriser(services, layoutPath),
    storeActiveReportSessionData({ services }),
    requestStatusRoutes({ layoutPath, services }),
    controller.errorHandler,
  )

  router.get(`/:type/:reportId/:id/:executionId/cancel/failed`, (req, res, _next) => {
    const body = JSON.parse(req.flash('ERROR_BODY')?.[0] || '')
    const params = JSON.parse(req.flash('ERROR_PARAMS')?.[0] || '')
    const error = req.flash('ERROR')

    captureException(error)
    res.render(`dpr/routes/journeys/view-report/error`, {
      layoutPath,
      ...(body && { ...body }),
      ...(params && { ...params }),
      error,
      params,
    })
  })

  return router
}

export const RequestReportRoutes = ({
  services,
  path,
  layoutPath,
}: {
  services: Services
  path: string
  layoutPath: string
}): Router => {
  const router = Router({ mergeParams: true })
  router.use(path, Routes({ services, layoutPath }))

  return router
}
