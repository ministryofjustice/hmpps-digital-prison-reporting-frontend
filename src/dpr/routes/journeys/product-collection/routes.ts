/* eslint-disable no-param-reassign */
import { Router } from 'express'

// Routes
import { routes as selectedRoutes } from './selected/routes'
import { Services } from '../../../types/Services'

export function Routes({ layoutPath, services }: { services: Services; layoutPath: string }) {
  const router = Router({ mergeParams: true })
  router.use(`/selected`, selectedRoutes({ layoutPath, services }))

  return router
}

export const ProductCollectionRoutes = ({
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
