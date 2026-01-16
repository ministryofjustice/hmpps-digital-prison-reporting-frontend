/* eslint-disable no-param-reassign */
import { Router } from 'express'

import DownloadReportController from './controller'

// Routes
import RequestDownloadRoutes from './request-download/routes'
import { Services } from '../../../types/Services'

export function Routes({ layoutPath, services }: { services: Services; layoutPath: string }) {
  const router = Router({ mergeParams: true })

  const controller = new DownloadReportController(layoutPath, services)

  // Download report
  router.post('/', controller.POST)

  // Request download form routes
  router.use(
    [`/request-download/:reportId/:variantId/tableId/:tableId`, `/request-download/:reportId/:variantId`],
    RequestDownloadRoutes({ layoutPath, services }),
  )

  return router
}

export const DownloadReportRoutes = ({
  services,
  path,
  layoutPath,
}: {
  services: Services
  path: string
  layoutPath: string
}) => {
  const router = Router({ mergeParams: true })
  if (services.downloadPermissionService.enabled) {
    router.use(path, Routes({ services, layoutPath }))
  }
  return router
}
