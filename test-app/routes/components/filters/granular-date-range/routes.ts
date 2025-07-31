/* eslint-disable no-param-reassign */
import { Router } from 'express'
import GranularDateRangeController from './controller'

export default function routes() {
  const router = Router({ mergeParams: true })
  const controller = new GranularDateRangeController()
  router.get('/', controller.GET)
  return router
}
