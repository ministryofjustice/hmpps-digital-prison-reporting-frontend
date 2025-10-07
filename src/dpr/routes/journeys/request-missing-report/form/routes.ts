/* eslint-disable no-param-reassign */
import { Router } from 'express'
import MissingReportFormController from './controller'
import { Services } from '../../../../types/Services'
import { schema } from './validation'
import { validate } from '../../../../validation/validate'

export default function routes({ layoutPath, services }: { layoutPath: string; services: Services }) {
  const router = Router({ mergeParams: true })
  const controller = new MissingReportFormController(layoutPath, services)

  router.get(`/`, controller.GET)
  router.post('/', validate(schema), controller.POST)

  return router
}
