/* eslint-disable no-param-reassign */
import { Router } from 'express'
import logger from '../../../src/dpr/utils/logger'

// Routes
import ListRoutes from './list/routes'
import listSectionRoutes from './list-section/routes'
import parentChildRoutes from './parent-child/routes'
import parentChildSectionRoutes from './parent-child-section/routes'
import rowSectionRoutes from './row-section/routes'
import rowSectionChildRoutes from './row-section-child/routes'
import summarySectionRoutes from './summary-section/routes'
import summaryRoutes from './summary/routes'

import TemplateController from './controller'

export function Routes() {
  const router = Router({ mergeParams: true })
  const controller = new TemplateController()

  router.get('/', controller.GET)

  router.use(`/list`, ListRoutes())
  router.use(`/list-section`, listSectionRoutes())
  router.use(`/parent-child-section`, parentChildSectionRoutes())
  router.use(`/parent-child`, parentChildRoutes())
  router.use(`/row-section`, rowSectionRoutes())
  router.use(`/row-section-child`, rowSectionChildRoutes())
  router.use(`/summary-section`, summarySectionRoutes())
  router.use(`/summary`, summaryRoutes())

  return router
}

export const TemplateRoutes = ({ path }: { path: string }) => {
  logger.info('Initialiasing routes: components')

  const router = Router({ mergeParams: true })
  router.use(path, Routes())
  return router
}
