/* eslint-disable no-param-reassign */
import { Router } from 'express'
import SyncReportValidationController from './controller'

export default function routes() {
  const router = Router({ mergeParams: true })
  const controller = new SyncReportValidationController()
  router.get('/', controller.GET)
  return router
}
