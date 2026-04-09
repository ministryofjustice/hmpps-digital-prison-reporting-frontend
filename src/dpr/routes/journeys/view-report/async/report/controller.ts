import { RequestHandler } from 'express'
import { Services } from '../../../../../types/Services'
import LocalsHelper from '../../../../../utils/localsHelper'
import { renderReport } from './utils2'
import ViewReportUtils from '../../utils'
import ErrorHandler from '../../../../../utils/ErrorHandler/ErrorHandler'
import { LoadType } from '../../../../../types/UserReports'
import { getActiveJourneyValue } from 'src/dpr/utils/sessionHelper'

class ViewAyncReportController {
  layoutPath: string

  services: Services

  constructor(layoutPath: string, services: Services) {
    this.layoutPath = layoutPath
    this.services = services
  }

  GET: RequestHandler = async (req, res, next) => {
    const { id, reportId, type, tableId } = req.params as {
      id: string
      reportId: string
      type: string
      tableId: string
    }

    try {
      // Get the report defaults
      const sessionKey = { id, reportId }
      const defaultFiltersSearch = getActiveJourneyValue(req, sessionKey, 'interactiveDefaultFiltersSearch')
      const defaultColumnsSearch = getActiveJourneyValue(req, sessionKey, 'defaultColumnsSearch')
      const savedInteractiveDefaultsSearch = getActiveJourneyValue(req, sessionKey, 'savedInteractiveDefaultsSearch')

      /**
       * A report will always have default columns.
       * Redirect when the request has no query params,
       * applying default columns and optional filters.
       */
      const hasIncomingQueryParams = Object.keys(req.query).length > 0
      if (!hasIncomingQueryParams && defaultColumnsSearch) {
        const params = new URLSearchParams()

        new URLSearchParams(defaultColumnsSearch).forEach((value, key) => {
          params.set(key, value)
        })
        const filtersToApply = savedInteractiveDefaultsSearch?.length
          ? savedInteractiveDefaultsSearch
          : defaultFiltersSearch

        if (filtersToApply) {
          new URLSearchParams(filtersToApply).forEach((value, key) => {
            params.set(key, value)
          })
        }

        // Only redirect if we actually have params
        // Redirect ensures the report is always loaded with the correct query string to start
        if ([...params.keys()].length > 0) {
          const baseUrl = req.originalUrl.split('?')[0].replace(/\/$/, '')
          return res.redirect(`${baseUrl}?${params.toString()}`)
        }
      }

      const renderData = await renderReport({
        req,
        res,
        services: this.services,
        next,
      })

      res.render(`dpr/routes/journeys/view-report/report`, {
        layoutPath: this.layoutPath,
        ...renderData,
        defaultFiltersSearch,
      })
    } catch (error) {
      const dprError = new ErrorHandler(error).formatError()

      let refreshLink
      const { recentlyViewedService } = this.services

      if (dprError.status === 'EXPIRED' && recentlyViewedService) {
        const { dprUser } = LocalsHelper.getValues(res)
        refreshLink = await recentlyViewedService.asyncSetToExpiredByTableId(tableId, dprUser.id)
      }

      req.body ??= {}
      req.body.title = `Failed to retrieve ${type}`
      req.body.error = dprError

      if (refreshLink) {
        req.body.refreshLink = refreshLink
      }

      next(error)
    }
  }

  applyFilters: RequestHandler = async (req, res, _next) => {
    await ViewReportUtils.applyReportInteractiveQuery(req, res, this.services, 'filters', LoadType.ASYNC)
  }

  applyColumns: RequestHandler = async (req, res, _next) => {
    await ViewReportUtils.applyReportInteractiveQuery(req, res, this.services, 'columns', LoadType.ASYNC)
  }
}

export { ViewAyncReportController }
export default ViewAyncReportController
