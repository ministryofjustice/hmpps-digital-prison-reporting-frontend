/* eslint-disable no-param-reassign */
import type { RequestHandler, Router } from 'express'
import LocalsHelper from '../utils/localsHelper'

import { Services } from '../types/Services'
import { components } from '../types/api'

export default function routes({
  router,
  services,
  layoutPath,
}: {
  router: Router
  services: Services
  layoutPath: string
}) {
  const requestMissingReportFormHandler: RequestHandler = async (req, res, next) => {
    const { token, csrfToken, definitionsPath } = LocalsHelper.getValues(res)
    const { reportId, variantId } = req.params

    const reportDefinition: components['schemas']['SingleVariantReportDefinition'] =
      await services.reportingService.getDefinition(token, reportId, variantId, definitionsPath)

    const { variant, name } = reportDefinition

    try {
      res.render(`dpr/views/forms/request-missing-report/form`, {
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
        layoutPath,
        postEndpoint: `/dpr/submitRequestMissingReport/`,
      })
    } catch (error) {
      next()
    }
  }

  const submitFormHandler: RequestHandler = async (req, res, next) => {
    const { body } = req
    const { reportId, variantId, reportName, variantName } = body

    // TODO:
    // Post to API here. When available from this ticket - https://dsdmoj.atlassian.net/browse/DPR2-2059
    // const { token } = LocalsHelper.getValues(res)
    // const doTheThing = await services.reportingService.addToLogs(token, body) // Or something like that

    // If succesful redirect to submitted page
    const queryParams = `reportName=${reportName}&variantName=${variantName}&reportId=${reportId}&variantId=${variantId}`
    const redirect = `/dpr/request-missing-report/submitted?${queryParams}`

    // TODO: Redirect to failed page

    res.redirect(redirect)
  }

  const submittedHandler: RequestHandler = async (req, res, next) => {
    const { token, definitionsPath } = LocalsHelper.getValues(res)
    const { reportId, variantId } = req.query

    const reportDefinition: components['schemas']['SingleVariantReportDefinition'] =
      await services.reportingService.getDefinition(token, reportId, variantId, definitionsPath)

    const { variant, name } = reportDefinition
    try {
      res.render(`dpr/views/forms/request-missing-report/submitted`, {
        title: 'Request submitted',
        report: {
          reportId,
          variantId,
          reportName: name,
          name: variant.name,
          description: variant.description || reportDefinition.description,
        },
        layoutPath,
      })
    } catch (error) {
      next()
    }
  }

  // Render form
  router.get(`/dpr/request-missing-report/:reportId/:variantId/form`, requestMissingReportFormHandler)

  // Submit
  router.post('/dpr/submitRequestMissingReport/', submitFormHandler)

  // Submitted
  router.get(`/dpr/request-missing-report/submitted`, submittedHandler)
}
