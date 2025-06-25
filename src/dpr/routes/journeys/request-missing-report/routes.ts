/* eslint-disable no-param-reassign */
import { Router } from 'express'

// Routes
import formRoutes from './form/routes'
import submittedRoutes from './submitted/routes'
import { Services } from '../../../types/Services'

export function Routes({ layoutPath, services }: { services: Services; layoutPath: string }) {
  const router = Router({ mergeParams: true })

  router.use(`/submitted`, submittedRoutes({ layoutPath }))
  router.use(`/:reportId/:variantId/form`, formRoutes({ layoutPath, services }))

  return router
}

export const RequestMissingReportRoutes = ({
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

  return router
}
