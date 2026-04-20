/* eslint-disable no-param-reassign */
import { Router } from 'express'
import RequestDownloadController from './controller'
import submittedRoutes from './submitted/routes'
import { Services } from '../../../../../types/Services'

import { schema } from './validation'
import { validate } from '../../../../../validation/validate'

export function routes({ layoutPath, services }: { layoutPath: string; services: Services }): Router {
  const router = Router({ mergeParams: true })
  const controller = new RequestDownloadController(layoutPath, services)

  router.get('/', controller.GET)
  router.post('/', validate(schema), controller.POST)

  router.use('/submitted', submittedRoutes({ layoutPath, services }))

  return router
}

export default routes
