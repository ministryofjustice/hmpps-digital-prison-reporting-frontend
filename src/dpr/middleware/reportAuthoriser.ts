import { RequestHandler } from 'express'
import LocalsHelper from '../utils/localsHelper'
import { Services } from '../types/Services'

export const reportAuthoriser = (services: Services, layoutPath: string): RequestHandler => {
  return async (req, res, next) => {
    const { token } = LocalsHelper.getValues(res)
    const { reportId } = req.params as {
      reportId: string
    }

    const dataProductDefinitionsPath = res.locals.definitionsPath

    const definitionSummary =
      res.locals['reportDefinitionSummary'] ??
      (await services.reportingService.getDefinitionSummary(token, reportId as string, dataProductDefinitionsPath))
    const userIsAuthorisedToViewReport = definitionSummary.authorised ?? false

    if (userIsAuthorisedToViewReport || !token) {
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
