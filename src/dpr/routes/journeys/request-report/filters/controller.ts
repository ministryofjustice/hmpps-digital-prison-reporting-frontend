import { RequestHandler } from 'express'
import { Services } from '../../../../types/Services'
import { RequestDataResult } from '../../../../types/AsyncReportUtils'
import AysncRequestUtils from './utils'
import ErrorSummaryUtils from '../../../../components/error-summary/utils'
import PersonalisationUtils from '../../../../utils/Personalisation/personalisationUtils'
import { FiltersType } from '../../../../components/_filters/filtersTypeEnum'

class RequestReportController {
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
      const executionData = await AysncRequestUtils.request({
        req,
        res,
        services: this.services,
        next,
      })

      const { executionId, dataProductDefinitionsPath } = executionData

      if (executionId) {
        const redirect = dataProductDefinitionsPath
          ? `${executionId}/status?dataProductDefinitionsPath=${dataProductDefinitionsPath}`
          : `${executionId}/status`
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

  saveDefaultFilterValues: RequestHandler = async (req, res, next) => {
    try {
      await PersonalisationUtils.saveDefaults(FiltersType.REQUEST, res, req, this.services)
      res.redirect(`${req.baseUrl}?defaultsSaved=true`)
    } catch (error) {
      req.body = {
        title: 'Failed to save defaults',
        error: ErrorSummaryUtils.handleError(error, req.params.type),
        ...req.body,
      }
      next()
    }
  }

  removeDefaultFilterValues: RequestHandler = async (req, res, next) => {
    try {
      await PersonalisationUtils.removeDefaults(FiltersType.REQUEST, res, req, this.services)
      res.redirect(req.baseUrl)
    } catch (error) {
      req.body = {
        title: 'Failed to remove defaults',
        error: ErrorSummaryUtils.handleError(error, req.params.type),
        ...req.body,
      }
      next()
    }
  }
}

export { RequestReportController }
export default RequestReportController
