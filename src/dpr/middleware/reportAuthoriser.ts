import { RequestHandler } from 'express'
import LocalsHelper from '../utils/localsHelper'
import { Services } from '../types/Services'
import { ReportType } from '../types/UserReports'

export default (services: Services, layoutPath: string): RequestHandler => {
  return async (req, res, next) => {
    const { token } = LocalsHelper.getValues(res)
    const { reportId, id, variantId, type } = req.params
    const { dataProductDefinitionsPath } = req.query

    let definition
    if (type === ReportType.REPORT) {
      definition = await services.reportingService.getDefinition(
        token,
        reportId,
        variantId || id,
        dataProductDefinitionsPath,
      )
    }

    if (type === ReportType.DASHBOARD) {
      definition = await services.dashboardService.getDefinition(
        token,
        reportId,
        variantId || id,
        dataProductDefinitionsPath,
      )
    }

    req.body.definition = definition
    if (definition?.authorised !== undefined && !definition.authorised) {
      res.render(`dpr/routes/journeys/view-report/unauthorised`, {
        layoutPath,
        ...req.body,
      })
    } else {
      next()
    }
  }
}
