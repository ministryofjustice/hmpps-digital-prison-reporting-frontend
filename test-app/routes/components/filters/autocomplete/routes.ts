/* eslint-disable no-param-reassign */
import { Router } from 'express'
import AutocompleteController from './controller'

export default function routes() {
  const router = Router({ mergeParams: true })
  const controller = new AutocompleteController()
  router.get('/', controller.GET)
  return router
}
