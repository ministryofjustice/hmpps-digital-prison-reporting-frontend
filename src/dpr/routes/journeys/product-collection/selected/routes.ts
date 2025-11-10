/* eslint-disable no-param-reassign */
import { Router } from 'express'
import { SelectedProductCollectionController } from './controller'
import { Services } from '../../../../types/Services'
import { schema } from './validation'
import { validate } from '../../../../validation/validate'

export const routes = ({ layoutPath, services }: { layoutPath: string; services: Services }) => {
  const router = Router({ mergeParams: true })
  const controller = new SelectedProductCollectionController(layoutPath, services)

  router.post('/', validate(schema), controller.POST)

  return router
}
