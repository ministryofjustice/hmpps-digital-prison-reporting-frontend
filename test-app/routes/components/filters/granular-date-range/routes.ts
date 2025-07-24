/* eslint-disable no-param-reassign */
import { Router } from 'express'
import GranularDateRangeController from './controller'

export default function routes({ layoutPath }: { layoutPath: string }) {
  const router = Router({ mergeParams: true })
  const controller = new GranularDateRangeController(layoutPath)
  router.get('/', controller.GET)
  return router
}
