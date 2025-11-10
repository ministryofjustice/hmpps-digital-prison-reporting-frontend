import { RequestHandler } from 'express'
import LocalsHelper from '../utils/localsHelper'
import { Services } from '../types/Services'
import { ReportType } from '../types/UserReports'

export const reportAuthoriser = (services: Services, layoutPath: string): RequestHandler => {
  return async (req, res, next) => {
    const { token } = LocalsHelper.getValues(res)
    const { reportId, id, variantId, type } = req.params
    const dataProductDefinitionsPath = <string | undefined>req.query.dataProductDefinitionsPath

    const definitionSummary = await services.reportingService.getDefinitionSummary(
      token,
      reportId,
      dataProductDefinitionsPath,
    )

    const service = type === ReportType.REPORT ? services.reportingService : services.dashboardService
    res.locals.definition = await service.getDefinition(token, reportId, variantId || id, dataProductDefinitionsPath)

    console.log(JSON.stringify(res.locals.definition), null, 2)

    if (definitionSummary?.authorised !== undefined && !definitionSummary.authorised) {
      res.render(`dpr/routes/journeys/view-report/unauthorised`, {
        layoutPath,
        ...req.body,
      })
    } else {
      next()
    }
  }
}

export default reportAuthoriser
