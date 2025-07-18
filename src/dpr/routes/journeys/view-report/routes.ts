/* eslint-disable no-param-reassign */
import { Router } from 'express'
import { Services } from '../../../types/Services'
import ViewReportController from './controller'

// Routes
import viewSyncReportRoutes from './sync/routes'
import viewAyncReportRoutes from './async/routes'

export function Routes({ layoutPath, services }: { services: Services; layoutPath: string }) {
  const router = Router({ mergeParams: true })

  const controller = new ViewReportController(layoutPath, services)
  router.use(`/sync/:type/:reportId/:id`, viewSyncReportRoutes({ layoutPath, services }), controller.errorHandler)
  router.use(
    `/async/:type/:reportId/:id/:tableId`,
    viewAyncReportRoutes({ layoutPath, services }),
    controller.errorHandler,
  )

  return router
}

export function Redirects() {
  const router = Router({ mergeParams: true })

  // Request route redirect
  router.get(`/async/:type/:reportId/:id/request/:tableId/report`, (req, res) => {
    const { type, reportId, id, tableId } = req.params
    res.redirect(`/dpr/view-report/async/${type}/${reportId}/${id}/${tableId}/${type}`)
  })

  router.get(`/async/:type/:reportId/:id/request/:tableId/report/:download`, (req, res) => {
    const { type, reportId, id, tableId } = req.params
    res.redirect(`/dpr/view-report/async/${type}/${reportId}/${id}/${tableId}/${type}/download-disabled`)
  })

  return router
}

export const ViewReportRoutes = ({
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
