/* eslint-disable no-param-reassign */
import { Router } from 'express'

// Routes
import ListRoutes from './list/routes'
import listSectionRoutes from './list-section/routes'
import listSectionSummariesRoutes from './list-section-with-summaries/routes'
import parentChildRoutes from './parent-child/routes'
import parentChildSectionRoutes from './parent-child-section/routes'
import summarySectionRoutes from './summary-section/routes'
import summaryRoutes from './summary/routes'

import TemplateController from './controller'

export function Routes() {
  const router = Router({ mergeParams: true })
  const controller = new TemplateController()

  router.get('/', controller.GET)

  router.use(`/list`, ListRoutes())
  router.use(`/list-section`, listSectionRoutes())
  router.use(`/list-section-summaries`, listSectionSummariesRoutes())
  router.use(`/parent-child-section`, parentChildSectionRoutes())
  router.use(`/parent-child`, parentChildRoutes())
  router.use(`/summary-section`, summarySectionRoutes())
  router.use(`/summary`, summaryRoutes())

  return router
}

export const TemplateRoutes = ({ path }: { path: string }) => {
  const router = Router({ mergeParams: true })
  router.use(path, Routes())
  return router
}
