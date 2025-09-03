/* eslint-disable no-param-reassign */
import { Router, Request, Response } from 'express'
import platformRoutes from '../../../../dist/dpr/routes'

import initMockClients from '../../../utils/initMockClients'
import PlatformController from './controller'
import { ReportStoreConfig } from '../../../../src/dpr/types/ReportStore'

// Routes
export default function routes() {
  const router = Router({ mergeParams: true })

  const { services } = initMockClients(router)
  const controller = new PlatformController(services)

  router.get('/', controller.GET)
  router.post('/setRedisState', (req: Request, res: Response) => {
    const { userId, data } = req.body
    services.bookmarkService.saveState(userId, data as ReportStoreConfig)
    res.sendStatus(200)
  })
  router.use('/', platformRoutes({ services, layoutPath: 'views/page.njk' }))

  return router
}
