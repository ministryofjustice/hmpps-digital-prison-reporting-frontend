/* eslint-disable no-param-reassign */
import { Router } from 'express'
import SummaryTemplateController from './controller'

export default function routes() {
  const router = Router({ mergeParams: true })
  const controller = new SummaryTemplateController()
  router.get('/', controller.GET)
  return router
}
