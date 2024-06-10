import { components } from '../../types/api'
import FilterUtils from '../filters/utils'
import { DateFilterValue, FilterValue } from '../filters/types'
import { FilterType } from '../filters/enum'
import SortHelper from './sortByTemplate'
import { AsyncReportUtilsParams } from '../../types/AsyncReportUtils'

/**
 * Initialises the filters from the definition data
 *
 * @param {components['schemas']['VariantDefinition']} definition
 * @return {*}
 */
const initFiltersFromDefinition = (definition: components['schemas']['VariantDefinition']) => {
  const sortBy = SortHelper.sortByTemplate()
  const filters = definition.specification.fields
    .filter((f) => f.filter)
    .map((f) => {
      const { display: text, name, filter, sortable, defaultsort } = f
      const { type, staticOptions, dynamicOptions, defaultValue } = filter

      let filterData: FilterValue = {
        text,
        name,
        type: type as FilterType,
        options: staticOptions ? staticOptions.map((o) => ({ value: o.name, text: o.display })) : null,
        value: defaultValue || null,
        minimumLength: dynamicOptions ? dynamicOptions.minimumLength : null,
        dynamicResourceEndpoint: null,
      }

      if (type === FilterType.dateRange.toLowerCase()) {
        const { min, max } = filter
        let startValue = min
        let endValue = max
        if (defaultValue) {
          const dateValues = defaultValue.split(' - ')
          ;[startValue, endValue] = dateValues
        }

        filterData = filterData as unknown as DateFilterValue
        filterData = {
          ...filterData,
          value: FilterUtils.setMinMax(filter, startValue, endValue),
          min,
          max,
        }
      }

      if (sortable) sortBy[0].options.push({ value: name, text })
      if (defaultsort) sortBy[0].value = name

      return filterData
    })

  return {
    filters,
    sortBy,
  }
}

export default {
  /**
   * Returns the data required for rendering the async filters component
   *
   * @param {AsyncReportUtilsParams} { req, res, dataSources }
   * @return {*}
   */
  renderFilters: async ({ req, res, dataSources, next }: AsyncReportUtilsParams) => {
    try {
      const { token } = res.locals.user || 'token'
      const { reportId, variantId } = req.params
      const { dataProductDefinitionsPath: definitionPath } = req.query
      const definition = await dataSources.getDefinition(token, reportId, variantId)
      const { name: reportName } = definition
      const { name: variantName, description } = definition.variant

      return {
        reportData: { reportName, variantName, description, reportId, variantId, definitionPath },
        ...initFiltersFromDefinition(definition.variant),
      }
    } catch (error) {
      next(error)
      return false
    }
  },

  /**
   * Sends the request for the async report
   *
   * @param {AsyncReportUtilsParams} {
   *     req,
   *     res,
   *     dataSources,
   *     asyncReportsStore,
   *   }
   */
  requestReport: async ({ req, res, dataSources, asyncReportsStore, next }: AsyncReportUtilsParams) => {
    try {
      const { token } = res.locals.user || 'token'
      const { reportId, variantId, query } = req.body
      const response = await dataSources.requestAsyncReport(token, reportId, variantId, query)
      const { executionId, tableId } = response

      let redirect = ''
      if (executionId && tableId) {
        const reportData = await asyncReportsStore.addReport(
          {
            ...req.body,
            executionId,
            tableId,
          },
          req.body.filterData,
          req.body.sortData,
          req.body.query,
          req.body.querySummary,
        )
        redirect = reportData.url.polling.pathname
      }

      return redirect
    } catch (error) {
      next(error)
      return false
    }
  },
}