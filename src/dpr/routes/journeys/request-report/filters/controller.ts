import { RequestHandler } from 'express'
import { Services } from '../../../../types/Services'
import { RequestDataResult } from '../../../../types/AsyncReportUtils'
import AysncRequestUtils from './utils'
import FiltersUtils from '../../../../components/_filters/utils'
import ErrorSummaryUtils from '../../../../components/error-summary/utils'
import localsHelper from '../../../../utils/localsHelper'

export default class RequestReportController {
  layoutPath: string

  services: Services

  constructor(layoutPath: string, services: Services) {
    this.layoutPath = layoutPath
    this.services = services
  }

  // Render request page
  GET: RequestHandler = async (req, res, next) => {
    try {
      const requestRenderData = <RequestDataResult>await AysncRequestUtils.renderRequest({
        req,
        res,
        services: this.services,
        next,
      })

      res.render(`dpr/routes/journeys/request-report/filters/view`, {
        layoutPath: this.layoutPath,
        ...requestRenderData,
      })
    } catch (error) {
      req.body.title = 'Request failed'
      req.body.errorDescription = `Your ${req.params.type} has failed to generate.`
      req.body.error = ErrorSummaryUtils.handleError(error, req.params.type)
      next()
    }
  }

  // Request report
  POST: RequestHandler = async (req, res, next) => {
    try {
      const { reportId, type, id } = req.params
      const executionId = await AysncRequestUtils.request({
        req,
        res,
        services: this.services,
        next,
      })

      if (executionId) {
        const redirect = `/dpr/request-report/${type}/${reportId}/${id}/${executionId}/status`
        res.redirect(redirect)
      } else {
        res.end()
      }
    } catch (error) {
      const dprError = ErrorSummaryUtils.handleError(error, req.params.type)
      const filters = AysncRequestUtils.getFiltersFromReqBody(req)

      req.body = {
        title: 'Request Failed',
        errorDescription: `Your ${req.params.type} has failed to generate.`,
        error: dprError,
        retry: true,
        filters,
        ...req.body,
      }
      next()
    }
  }

  // Save filter values
  saveDefaultFilterValues: RequestHandler = async (req, res, next) => {
    try {
      const defaultValuesForReport = await FiltersUtils.setUserDefinedDefaultValuesForReport(req, res, this.services)
      const { userId } = localsHelper.getValues(res)
      const { reportId, id } = req.body
      await this.services.defaultFilterValuesService.save(userId, reportId, id, defaultValuesForReport)
      res.redirect(`${req.baseUrl}?defaultsSaved=true`)
    } catch (error) {
      const dprError = ErrorSummaryUtils.handleError(error, req.params.type)
      const filters = AysncRequestUtils.getFiltersFromReqBody(req)

      req.body = {
        title: 'Failed to save defaults',
        errorDescription: `Your ${req.params.type} has failed to generate.`,
        error: dprError,
        retry: true,
        filters,
        ...req.body,
      }
      next()
    }
  }

  // Save filter values
  removeDefaultFilterValues: RequestHandler = async (req, res, next) => {
    try {
      const { userId } = localsHelper.getValues(res)
      const { reportId, id } = req.params
      await this.services.defaultFilterValuesService.delete(userId, reportId, id)
      res.redirect(req.baseUrl)
    } catch (error) {
      const dprError = ErrorSummaryUtils.handleError(error, req.params.type)
      const filters = AysncRequestUtils.getFiltersFromReqBody(req)

      req.body = {
        title: 'Failed to save defaults',
        errorDescription: `Your ${req.params.type} has failed to generate.`,
        error: dprError,
        retry: true,
        filters,
        ...req.body,
      }
      next()
    }
  }
}
