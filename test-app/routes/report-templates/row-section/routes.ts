/* eslint-disable no-param-reassign */
import { Router } from 'express'
import RowSectionTemplateController from './controller'

export default function routes() {
  const router = Router({ mergeParams: true })
  const controller = new RowSectionTemplateController()
  router.get('/', controller.GET)
  return router
}
