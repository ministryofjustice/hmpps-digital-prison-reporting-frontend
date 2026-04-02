import { Router } from 'express'
import { getRouteLocals } from 'src/dpr/utils/localsHelper'
import { Services } from '../../types/Services'

// Routes
import { RequestMissingReportRoutes } from './request-missing-report/routes'
import { DownloadReportRoutes } from './download-report/routes'
import { MyReportsRoutes } from './my-reports/routes'
import { ViewReportRoutes } from './view-report/routes'
import { RequestReportRoutes } from './request-report/routes'
import { ProductCollectionRoutes } from './product-collection/routes'
import { ReportCatalogueRoutes } from './report-catalogue/routes'
import { MyReportsCatalogueRoutes } from './my-reports-catalogue/routes'
import { setNestedPath } from '../../utils/urlHelper'

export function DprRoutes({ layoutPath, services }: { services: Services; layoutPath: string }): Router {
  const router = Router({ mergeParams: true })

  router.use('/', RequestMissingReportRoutes({ path: '/request-missing-report', layoutPath, services }))
  router.use('/', DownloadReportRoutes({ path: '/download-report', layoutPath, services }))
  router.use('/', MyReportsRoutes({ path: '/my-reports', layoutPath, services }))
  router.use('/', ViewReportRoutes({ path: '/view-report', layoutPath, services }))
  router.use('/', RequestReportRoutes({ path: '/request-report', layoutPath, services }))
  router.use('/', ProductCollectionRoutes({ path: '/product-collection', layoutPath, services }))
  router.use('/', ReportCatalogueRoutes({ path: '/report-catalogue', layoutPath, services }))
  router.use('/', MyReportsCatalogueRoutes({ layoutPath, services }))

  return router
}

export function Redirects(): Router {
  const router = Router({ mergeParams: true })

  // Request route redirect
  router.get(`/async/:type/:reportId/:id/request`, (req, res) => {
    const { type, reportId, id } = req.params
    const { nestedBaseUrl } = getRouteLocals(res)
    const path = setNestedPath(`/dpr/request-report/${type}/${reportId}/${id}/filters`, nestedBaseUrl)
    res.redirect(path)
  })

  // Status route redirect
  router.get(`/async/:type/:reportId/:id/request/:executionId`, (req, res) => {
    const { type, reportId, id, executionId } = req.params
    const { nestedBaseUrl } = getRouteLocals(res)
    const path = setNestedPath(`/dpr/request-report/${type}/${reportId}/${id}/${executionId}/status`, nestedBaseUrl)
    res.redirect(path)
  })

  return router
}

export function Routes({ layoutPath, services }: { services: Services; layoutPath: string }): Router {
  const router = Router({ mergeParams: true })
  router.use('/dpr', DprRoutes({ layoutPath, services }))
  router.use('/', Redirects())
  return router
}

export default Routes
