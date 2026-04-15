import { RequestHandler, Request, Response } from 'express'
import { Services } from '../../../../types/Services'
import { RequestDataResult } from '../../../../types/AsyncReportUtils'
import AysncRequestUtils from './utils'
import PersonalisationUtils from '../../../../utils/Personalisation/personalisationUtils'
import { FiltersType } from '../../../../components/_filters/filtersTypeEnum'
import ErrorHandler from '../../../../utils/ErrorHandler/ErrorHandler'
import { getActiveJourneyValue } from '../../../../utils/sessionHelper'
import { joinQueryStrings } from '../../../../utils/urlHelper'

class RequestReportController {
  layoutPath: string

  services: Services

  constructor(layoutPath: string, services: Services) {
    this.layoutPath = layoutPath
    this.services = services
  }

  GET: RequestHandler = async (req, res, next) => {
    try {
      const { id, reportId } = req.params as {
        id: string
        reportId: string
      }

      if (this.redirectWithDefaults(res, req)) {
        return
      }

      const sessionKey = { id, reportId }
      const defaultFiltersSearch = getActiveJourneyValue(req, sessionKey, 'defaultFiltersSearch')

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
        defaultFiltersSearch,
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
      const effectiveQueryString = this.setDefaultQueryString(req)
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

  /**
   * Ensures that the request will always contain the correct qs on first render
   *
   * @param {Response} res
   * @param {Request} req
   * @return {*}
   */
  redirectWithDefaults = (res: Response, req: Request) => {
    const effectiveQueryString = this.setDefaultQueryString(req)
    if (effectiveQueryString && Object.keys(req.query).length === 0) {
      const baseUrl = req.originalUrl.split('?')[0].replace(/\/$/, '')
      res.redirect(`${baseUrl}?${effectiveQueryString}`)
      return true
    }
    return false
  }

  setDefaultQueryString = (req: Request) => {
    const { id, reportId } = req.params as {
      id: string
      reportId: string
    }
    const sessionKey = { id, reportId }
    const defaultFiltersSearch = getActiveJourneyValue(req, sessionKey, 'defaultFiltersSearch')
    const savedRequestDefaultsSearch = getActiveJourneyValue(req, sessionKey, 'savedRequestDefaultsSearch')
    const defautltSortQueryString = getActiveJourneyValue(req, sessionKey, 'defautltSortQueryString')

    // If DPD defaults, use those unless there are saved defaults
    const effectiveQueryString =
      savedRequestDefaultsSearch && savedRequestDefaultsSearch.length > 0
        ? savedRequestDefaultsSearch
        : defaultFiltersSearch

    if (defautltSortQueryString && defautltSortQueryString.length > 0) {
      return joinQueryStrings(effectiveQueryString, defautltSortQueryString)
    }

    return effectiveQueryString
  }
}

export { RequestReportController }
export default RequestReportController
