/* eslint-disable no-param-reassign */
import { Router } from 'express'
import RowSectionChildTemplateController from './controller'

export default function routes() {
  const router = Router({ mergeParams: true })
  const controller = new RowSectionChildTemplateController()
  router.get('/', controller.GET)
  return router
}
