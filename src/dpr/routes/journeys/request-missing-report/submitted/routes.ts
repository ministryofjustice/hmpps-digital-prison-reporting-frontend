/* eslint-disable no-param-reassign */
import { Router } from 'express'
import MissingReportSubmittedController from './controller'

export function routes({ layoutPath }: { layoutPath: string }) {
  const router = Router({ mergeParams: true })

  const controller = new MissingReportSubmittedController(layoutPath)
  router.get(`/`, controller.GET)

  return router
}

export default routes