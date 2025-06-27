/* eslint-disable no-param-reassign */
import { Router } from 'express'
import ViewReportController from './controller'
import { Services } from '../../../../../types/Services'

export default function routes({ layoutPath, services }: { layoutPath: string; services: Services }) {
  const router = Router({ mergeParams: true })
  const controller = new ViewReportController(layoutPath, services)

  router.get([`/report`, `/report/:download`], controller.GET)

  return router
}
