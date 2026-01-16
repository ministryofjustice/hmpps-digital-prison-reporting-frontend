/* eslint-disable no-param-reassign */
import { Router } from 'express'

// Routes
import formRoutes from './form/routes'
import { Services } from '../../../../types/Services'

export function routes({ layoutPath, services }: { layoutPath: string; services: Services }) {
  const router = Router({ mergeParams: true })

  router.use(`/form`, formRoutes({ layoutPath, services }))

  return router
}

export default routes
