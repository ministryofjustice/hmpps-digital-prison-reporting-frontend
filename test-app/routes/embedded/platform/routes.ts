/* eslint-disable no-param-reassign */
import { Router, Request, Response } from 'express'
import platformRoutes from '../../../../src/dpr/routes'

import PlatformController from './controller'
import { ReportStoreConfig } from '../../../../src/dpr/types/ReportStore'
import { Services } from '../../../../src/dpr/types/Services'
// Routes
export default function routes(services: Services) {
  const router = Router({ mergeParams: true })

  const controller = new PlatformController(services)

  router.get('/', controller.GET)
  router.post('/setRedisState', async (req: Request, res: Response) => {
    const { userId, data } = req.body
    await services.bookmarkService.saveState(userId, data as ReportStoreConfig)
    res.sendStatus(200)
  })
  router.get('/getRedisState/:userId', async (req: Request, res: Response) => {
    const { userId } = req.params
    const state = await services.bookmarkService.getState(userId)
    res.status(200).send(state)
  })
  router.post('/updateRedisState', async (req: Request, res: Response) => {
    const { userId, userStoreKey, userStoreValue } = req.body
    const currentState = await services.bookmarkService.getState(userId)
    await services.bookmarkService.saveState(userId, {
      ...currentState,
      [userStoreKey]: userStoreValue,
    } as ReportStoreConfig)
    res.sendStatus(200)
  })
  router.use('/', platformRoutes({ services, layoutPath: 'views/page.njk' }))

  return router
}
