/* eslint-disable no-param-reassign */
import { Router } from 'express'
import ParentChildSectionTemplateController from './controller'

export default function routes(): Router {
  const router = Router({ mergeParams: true })
  const controller = new ParentChildSectionTemplateController()
  router.get('/', controller.GET)
  return router
}
