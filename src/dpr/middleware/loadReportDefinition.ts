import { RequestHandler } from 'express'
import LocalsHelper from '../utils/localsHelper'
import { Services } from '../types/Services'
import { ReportType } from '../types/UserReports'
import { getDefinitionByType } from '../utils/definitionUtils'

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
      const { reportId, id, type: reportType } = req.params as Record<string, string>
      const { definition } = await getDefinitionByType(
        <ReportType>reportType,
        services,
        token,
        reportId,
        id,
        definitionsPath,
      )
      res.locals.definition = definition
      next()
    } catch (err) {
      next(err)
    }
  }
}
