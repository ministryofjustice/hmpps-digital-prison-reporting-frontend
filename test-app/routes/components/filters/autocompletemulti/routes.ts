import { Router } from 'express'
import AutocompleteMultiController from './controller'

export default function routes(): Router {
  const router = Router({ mergeParams: true })
  const controller = new AutocompleteMultiController()
  router.get('/', controller.GET)
  return router
}
