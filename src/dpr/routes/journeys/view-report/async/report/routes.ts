/* eslint-disable no-param-reassign */
import { Router } from 'express'
import ViewAsyncReportController from './controller'
import { Services } from '../../../../../types/Services'

export default function routes({ layoutPath, services }: { layoutPath: string; services: Services }) {
  const router = Router({ mergeParams: true })
  const controller = new ViewAsyncReportController(layoutPath, services)

  router.get([`/`, `/download-disabled`], controller.GET)

  return router
}
