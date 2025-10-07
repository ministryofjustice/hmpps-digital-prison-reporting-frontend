import { RequestHandler } from 'express'
import LocalsHelper from '../../../../utils/localsHelper'
import { components } from '../../../../types/api'
import { Services } from '../../../../types/Services'
import MissingReportClient from '../../../../services/missingReport/missingReportClient'
import { ReportingService } from '../../../../services'

export default class MissingReportFormController {
  layoutPath: string

  missingReportClient: MissingReportClient

  reportingService: ReportingService

  constructor(layoutPath: string, services: Services) {
    this.layoutPath = layoutPath
    this.missingReportClient = services.missingReportClient
    this.reportingService = services.reportingService
  }

  GET: RequestHandler = async (req, res, next) => {
    const { token, csrfToken, definitionsPath, dprUser } = LocalsHelper.getValues(res)
    const { reportId, variantId } = req.params

    const reportDefinition: components['schemas']['SingleVariantReportDefinition'] =
      await this.reportingService.getDefinition(
        token,
        reportId,
        variantId,
        definitionsPath ?? 'definitions/prisons/missing',
      )

    const { variant, name } = reportDefinition

    try {
      res.render(`dpr/routes/journeys/request-missing-report/form/view`, {
        title: 'This report is not yet available',
        report: {
          reportId,
          variantId,
          reportName: name,
          name: variant.name,
          description: variant.description || reportDefinition.description,
        },
        user: dprUser,
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

    const { token } = LocalsHelper.getValues(res)

    await this.missingReportClient
      .submitMissingReportEntry(token, reportId, variantId, body)
      .then(
        () => {
          const queryParams = `reportName=${reportName}&name=${variantName}&reportId=${reportId}&variantId=${variantId}`
          const redirect = `./submitted?${queryParams}`

          res.redirect(redirect)
        },
        () => {
          res.render(`dpr/components/serviceError/view`)
        },
      )
      .catch(() => {
        res.render(`dpr/components/serviceError/view`)
      })
  }
}
