import { RequestHandler } from 'express'
import { Services } from '../../../../types/Services'
import { RequestDataResult } from '../../../../types/AsyncReportUtils'
import AysncRequestUtils, { redirectWithDefaults, setDefaultQueryString } from './utils'
import PersonalisationUtils from '../../../../utils/Personalisation/personalisationUtils'
import { FiltersType } from '../../../../components/_filters/filtersTypeEnum'
import ErrorHandler from '../../../../utils/ErrorHandler/ErrorHandler'
import { getActiveJourneyValue } from '../../../../utils/sessionHelper'

class RequestReportController {
  layoutPath: string

  services: Services

  constructor(layoutPath: string, services: Services) {
    this.layoutPath = layoutPath
    this.services = services
  }

  GET: RequestHandler = async (req, res, next) => {
    try {
      if (redirectWithDefaults(res, req)) {
        return
      }

      // Get config to render the filters
      const requestRenderData = (await AysncRequestUtils.renderRequest({
        req,
        res,
        services: this.services,
        next,
      })) as RequestDataResult

      // Get the validation errors
      const validationErrors = res.locals['validationErrors'] || []

      // Render the filters view
      res.render('dpr/routes/journeys/request-report/filters/view', {
        layoutPath: this.layoutPath,
        ...requestRenderData,
        validationErrors,
      })
    } catch (error) {
      req.body ??= {}
      req.body.title = 'Request failed'
      req.body.errorDescription = `Your ${req.params['type']} has failed to generate.`
      req.body.error = new ErrorHandler(error).formatError()

      next(req.body.error)
    }
  }

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
      const filters = AysncRequestUtils.getFiltersFromReqBody(req)

      req.body = {
        title: 'Request Failed',
        errorDescription: `Your ${req.params['type']} has failed to generate.`,
        error: new ErrorHandler(error).formatError(),
        retry: true,
        filters,
        ...(req.body && { ...req.body }),
      }
      next(error)
    }
  }

  saveDefaultFilterValues: RequestHandler = async (req, res, next) => {
    try {
      await PersonalisationUtils.saveDefaults(FiltersType.REQUEST, res, req, this.services)

      res.redirect(req.baseUrl)
    } catch (error) {
      req.body = {
        title: 'Failed to save defaults',
        error: new ErrorHandler(error).formatError(),
        ...(req.body && { ...req.body }),
      }
      next(error)
    }
  }

  removeDefaultFilterValues: RequestHandler = async (req, res, next) => {
    try {
      const { id, reportId } = req.params as { id: string; reportId: string }
      await PersonalisationUtils.removeDefaults(FiltersType.REQUEST, res, req, this.services)

      const defaultFiltersSearch = getActiveJourneyValue(req, { id, reportId }, 'defaultFiltersSearch')
      const defaultPath = defaultFiltersSearch ? `${req.baseUrl}?${defaultFiltersSearch}` : req.baseUrl

      res.redirect(defaultPath)
    } catch (error) {
      req.body = {
        title: 'Failed to remove defaults',
        error: new ErrorHandler(error).formatError(),
        ...(req.body && { ...req.body }),
      }
      next(error)
    }
  }

  /**
   * Reset the form filters to default
   *
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  resetFilters: RequestHandler = async (req, res, next) => {
    try {
      const effectiveQueryString = setDefaultQueryString(req)
      const defaultPath = effectiveQueryString ? `${req.baseUrl}?${effectiveQueryString}` : req.baseUrl
      res.redirect(defaultPath)
    } catch (error) {
      req.body = {
        title: 'Failed to reset filters',
        error: new ErrorHandler(error).formatError(),
        ...(req.body && { ...req.body }),
      }
      next(error)
    }
  }
}

export { RequestReportController }
export default RequestReportController
