import { RequestHandler } from 'express'
import LocalsHelper from '../../../../utils/localsHelper'
import { components } from '../../../../types/api'
import { Services } from '../../../../types/Services'

export default class MissingReportFormController {
  layoutPath: string

  services: Services

  constructor(layoutPath: string, services: Services) {
    this.layoutPath = layoutPath
    this.services = services
  }

  GET: RequestHandler = async (req, res, next) => {
    const { token, csrfToken, definitionsPath } = LocalsHelper.getValues(res)
    const { reportId, variantId } = req.params

    const reportDefinition: components['schemas']['SingleVariantReportDefinition'] =
      await this.services.reportingService.getDefinition(token, reportId, variantId, definitionsPath)

    const { variant, name } = reportDefinition

    try {
      res.render(`dpr/routes/journeys/request-missing-report/form/view`, {
        title: 'Request a missing report',
        report: {
          reportId,
          variantId,
          reportName: name,
          name: variant.name,
          description: variant.description || reportDefinition.description,
        },
        user: res.locals.user,
        csrfToken,
        layoutPath: this.layoutPath,
        postEndpoint: `/dpr/request-missing-report/${reportId}/${variantId}/form/submit`,
      })
    } catch (error) {
      next()
    }
  }

  POST: RequestHandler = async (req, res, next) => {
    const { body } = req
    const { reportId, variantId, reportName, variantName } = body

    // TODO:
    // Post to API here. When available from this ticket - https://dsdmoj.atlassian.net/browse/DPR2-2059
    // const { token } = LocalsHelper.getValues(res)
    // const doTheThing = await services.reportingService.addToLogs(token, body) // Or something like that

    // If succesful redirect to submitted page
    const queryParams = `reportName=${reportName}&name=${variantName}&reportId=${reportId}&variantId=${variantId}`
    const redirect = `/dpr/request-missing-report/submitted?${queryParams}`

    // TODO: Redirect to failed page

    res.redirect(redirect)
  }
}
