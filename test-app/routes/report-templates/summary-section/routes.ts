/* eslint-disable no-param-reassign */
import { Router } from 'express'
import SummarySectionTemplateController from './controller'

export default function routes() {
  const router = Router({ mergeParams: true })
  const controller = new SummarySectionTemplateController()
  router.get('/', controller.GET)
  return router
}
