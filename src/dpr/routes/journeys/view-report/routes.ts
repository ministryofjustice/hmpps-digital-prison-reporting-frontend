/* eslint-disable no-param-reassign */
import { Router } from 'express'
import setUpViewReportActionsPaths from '../../../middleware/setUpReportActionsPaths'
import { Services } from '../../../types/Services'
import ViewReportController from './controller'

// Routes
import viewSyncReportRoutes from './sync/routes'
import viewAyncReportRoutes from './async/routes'

export function Routes({ layoutPath, services }: { services: Services; layoutPath: string }): Router {
  const router = Router({ mergeParams: true })

  const controller = new ViewReportController(layoutPath, services)

  // -------------------
  // SYNC
  // -------------------
  router.use(
    `/sync/:type/:reportId/:id`,
    setUpViewReportActionsPaths(services),
    viewSyncReportRoutes({ layoutPath, services }),
    controller.errorHandler,
  )

  // -------------------
  // ASYNC
  // -------------------
  router.use(
    `/async/:type/:reportId/:id/:tableId`,
    setUpViewReportActionsPaths(services),
    viewAyncReportRoutes({ layoutPath, services }),
    controller.errorHandler,
  )

  return router
}

export function Redirects(): Router {
  const router = Router({ mergeParams: true })

  // View Report
  router.get([`/async/:type/:reportId/:id/request/:tableId/:type`], (req, res) => {
    const { type, reportId, id, tableId } = req.params
    res.redirect(`${res.locals['nestedBaseUrl']}/dpr/view-report/async/${type}/${reportId}/${id}/${tableId}/${type}`)
  })

  // Download
  router.get(`/async/:type/:reportId/:id/request/:tableId/report/:download`, (req, res) => {
    const { type, reportId, id, tableId } = req.params
    res.redirect(
      `${res.locals['nestedBaseUrl']}/dpr/view-report/async/${type}/${reportId}/${id}/${tableId}/${type}/download-disabled`,
    )
  })

  // Expired Status
  router.post('/async/:type/:reportId/:id/request/:tableId/:type', (req, res) => {
    const { type, reportId, id, tableId } = req.params
    res.redirect(
      308,
      `${res.locals['nestedBaseUrl']}/dpr/view-report/async/${type}/${reportId}/${id}/${tableId}/${type}`,
    )
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
}): Router => {
  const router = Router({ mergeParams: true })
  router.use(path, Routes({ services, layoutPath }))
  router.use('/', Redirects())

  return router
}
