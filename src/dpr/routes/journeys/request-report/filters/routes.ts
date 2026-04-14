/* eslint-disable no-param-reassign */
import { Router } from 'express'
import RequestReportController from './controller'
import { Services } from '../../../../types/Services'

// middleware
import { loadReportDefinition } from '../../../../middleware/loadReportDefinition'
import { validateFilters } from '../../../../validation/validateFIlters'

export function routes({ layoutPath, services }: { layoutPath: string; services: Services }): Router {
  const router = Router({ mergeParams: true })
  const controller = new RequestReportController(layoutPath, services)

  /**
   *  Get the request page
   */
  router.get('/', controller.GET)

  /**
   *  Apply request filters
   */
  router.post(
    '/',
    // get the definition needed to get validation rules
    loadReportDefinition(services),
    // validate the filters based
    validateFilters({ interactive: false }),
    // if valid continue with post
    controller.POST,
  )

  /**
   * Filter actions
   */
  router.post('/resetFilters', controller.resetFilters)
  router.post('/save-defaults', controller.saveDefaultFilterValues)
  router.post('/remove-defaults', controller.removeDefaultFilterValues)

  return router
}

export default routes
