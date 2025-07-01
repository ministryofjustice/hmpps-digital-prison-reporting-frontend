/* eslint-disable no-param-reassign */
import { Router } from 'express'
import { Services } from '../../../../types/Services'
import BookmarkController from './controller'
import listRoutes from './list/routes'

export default function routes({ layoutPath, services }: { layoutPath: string; services: Services }) {
  const router = Router({ mergeParams: true })

  const controller = new BookmarkController(layoutPath, services)

  router.post('/', controller.POST)
  router.delete('/', controller.DELETE)

  router.use(`/list`, listRoutes({ layoutPath, services }))
  return router
}
