import { RequestHandler } from 'express'
import { captureException } from '@sentry/node'
import LocalsHelper from '../../../../utils/localsHelper'
import { components } from '../../../../types/api'
import { Services } from '../../../../types/Services'
import MissingReportService from '../../../../services/missingReport/missingReportService'
import { ReportingService } from '../../../../services'

class MissingReportFormController {
  layoutPath: string

  missingReportService: MissingReportService

  reportingService: ReportingService

  constructor(layoutPath: string, services: Services) {
    this.layoutPath = layoutPath
    this.missingReportService = services.missingReportService
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
        title: 'This report is not available',
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
      next(error)
    }
  }

  POST: RequestHandler = async (req, res, _next) => {
    const { body } = req
    const { reportId, variantId, reportName, variantName, 'more-detail': requestDetails } = body

    const { token } = LocalsHelper.getValues(res)

    try {
      const submission = this.missingReportService.submitMissingReportEntry(token, reportId, variantId, requestDetails)
      if (submission) {
        submission.then(
          () => {
            const queryParams = `reportName=${reportName}&name=${variantName}&reportId=${reportId}&variantId=${variantId}`
            const redirect = `./submitted?${queryParams}`

            res.redirect(redirect)
          },
          (err) => {
            captureException(err)
            res.render(`dpr/components/serviceError/view`)
          },
        )
      }
    } catch (error) {
      captureException(error)
      res.render(`dpr/components/serviceError/view`)
    }
  }
}

export { MissingReportFormController }
export default MissingReportFormController
