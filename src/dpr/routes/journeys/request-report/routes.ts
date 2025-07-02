/* eslint-disable no-param-reassign */
import { Router } from 'express'
import { Services } from '../../../types/Services'
import RequestReportController from './controller'

// Routes
import requestReportRoutes from './filters/routes'
import requestStatusRoutes from './status/routes'

// middleware
import reportAuthoriser from '../../../middleware/reportAuthoriser'

export function Routes({ layoutPath, services }: { services: Services; layoutPath: string }) {
  const router = Router({ mergeParams: true })

  const controller = new RequestReportController(layoutPath, services)
  router.use(
    `/:type/:reportId/:id/filters`,
    reportAuthoriser(services, layoutPath),
    requestReportRoutes({ layoutPath, services }),
    controller.errorHandler,
  )
  router.use(
    `/:type/:reportId/:id/:executionId/status`,
    reportAuthoriser(services, layoutPath),
    requestStatusRoutes({ layoutPath, services }),
    controller.errorHandler,
  )

  return router
}

export function Redirects() {
  const router = Router({ mergeParams: true })

  // Request route redirect
  router.get(`/async/:type/:reportId/:id/request`, (req, res) => {
    const { type, reportId, id } = req.params
    res.redirect(`/dpr/request-report/${type}/${reportId}/${id}/filters`)
  })

  // Request route redirect
  router.get(`/async/:type/:reportId/:id/request/:executionId`, (req, res) => {
    const { type, reportId, id, executionId } = req.params
    res.redirect(`/dpr/request-report/${type}/${reportId}/${id}/${executionId}/status`)
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
}) => {
  const router = Router({ mergeParams: true })
  router.use(path, Routes({ services, layoutPath }))
  router.use('/', Redirects())

  return router
}
