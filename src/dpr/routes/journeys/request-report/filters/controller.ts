import { RequestHandler } from 'express'
import { Services } from '../../../../types/Services'
import { RequestDataResult } from '../../../../types/AsyncReportUtils'
import AysncRequestUtils from './utils'
import PersonalisationUtils from '../../../../utils/Personalisation/personalisationUtils'
import { FiltersType } from '../../../../components/_filters/filtersTypeEnum'
import ErrorHandler from '../../../../utils/ErrorHandler'

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
      req.body.errorDescription = `Your ${req.params['type']} has failed to generate.`
      req.body.error = new ErrorHandler(error).formatError()
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
      console.log('\n\n **** ERROR **** \n\n')
      const filters = AysncRequestUtils.getFiltersFromReqBody(req)

      req.body = {
        title: 'Request Failed',
        errorDescription: `Your ${req.params['type']} has failed to generate.`,
        error: new ErrorHandler(error).formatError(),
        retry: true,
        filters,
        ...req.body,
      }
      next(error)
    }
  }

  saveDefaultFilterValues: RequestHandler = async (req, res, next) => {
    try {
      await PersonalisationUtils.saveDefaults(FiltersType.REQUEST, res, req, this.services)
      res.redirect(`${req.baseUrl}?defaultsSaved=true`)
    } catch (error) {
      req.body = {
        title: 'Failed to save defaults',
        error: new ErrorHandler(error).formatError(),
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
        error: new ErrorHandler(error).formatError(),
        ...req.body,
      }
      next()
    }
  }
}

export { RequestReportController }
export default RequestReportController
