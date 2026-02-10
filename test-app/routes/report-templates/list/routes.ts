/* eslint-disable no-param-reassign */
import { Router } from 'express'
import ListTemplateController from './controller'

export default function routes(): Router {
  const router = Router({ mergeParams: true })
  const controller = new ListTemplateController()
  router.get('/', controller.GET)
  return router
}
