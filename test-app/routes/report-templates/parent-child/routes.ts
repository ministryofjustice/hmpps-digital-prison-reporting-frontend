/* eslint-disable no-param-reassign */
import { Router } from 'express'
import ParentChildTemplateController from './controller'

export default function routes() {
  const router = Router({ mergeParams: true })
  const controller = new ParentChildTemplateController()
  router.get('/', controller.GET)
  return router
}
