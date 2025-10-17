/* eslint-disable no-param-reassign */
import { Router } from 'express'
import RequestDownloadController from './controller'
import submittedRoutes from './submitted/routes'
import { Services } from '../../../../../types/Services'

export function routes({ layoutPath, services }: { layoutPath: string; services: Services }) {
  const router = Router({ mergeParams: true })
  const controller = new RequestDownloadController(layoutPath, services)

  router.get('/', controller.GET)
  router.post('/', controller.POST)

  router.use('/submitted', submittedRoutes({ layoutPath, services }))

  return router
}

export default routes