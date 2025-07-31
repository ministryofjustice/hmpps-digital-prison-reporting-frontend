/* eslint-disable no-param-reassign */
import { Router } from 'express'
import ListSectionTemplateController from './controller'

export default function routes() {
  const router = Router({ mergeParams: true })
  const controller = new ListSectionTemplateController()
  router.get('/', controller.GET)
  return router
}
