/* eslint-disable no-param-reassign */
import { Router } from 'express'
import RequestReportAccessController from './controller'
import { Services } from '../../../types/Services'

export function Routes({ layoutPath, services }: { layoutPath: string; services: Services }): Router {
  const router = Router({ mergeParams: true })
  const controller = new RequestReportAccessController(layoutPath, services)

  router.get(`/:reportId`, controller.GET)

  return router
}

export const RequestReportAccessRoutes = ({
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
