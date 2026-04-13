import { RequestHandler } from 'express'
import LocalsHelper from '../utils/localsHelper'
import { Services } from '../types/Services'
import { components } from '../types/api'

/**
 * Middleware to load the report definition
 * and store it in locals
 *
 * @param {Services} services
 * @return {*}  {RequestHandler}
 */
export const loadReportDefinition = (services: Services): RequestHandler => {
  return async (req, res, next) => {
    try {
      const { token, definitionsPath } = LocalsHelper.getValues(res)
      const { reportId, id } = req.params as Record<string, string>

      const definition: components['schemas']['SingleVariantReportDefinition'] =
        await services.reportingService.getDefinition(token, reportId, id, definitionsPath)

      res.locals.definition = definition

      next()
    } catch (err) {
      next(err)
    }
  }
}
