import { Request } from 'express'
import Dict = NodeJS.Dict
import { components } from '../../types/api'
import FilterUtils from '../filters/utils'
import { DateFilterValue, FilterValue } from '../filters/types'
import { FilterType } from '../filter-input/enum'
import SortHelper from './sortByTemplate'
import { AsyncReportUtilsParams } from '../../types/AsyncReportUtils'
import DefinitionUtils from '../../utils/definitionUtils'

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
      const { type, staticOptions, dynamicOptions, defaultValue, mandatory, pattern } = filter

      let filterData: FilterValue = {
        text,
        name,
        type: type as FilterType,
        options: staticOptions ? staticOptions.map((o) => ({ value: o.name, text: o.display })) : null,
        value: defaultValue || null,
        minimumLength: dynamicOptions ? dynamicOptions.minimumLength : null,
        dynamicResourceEndpoint: null,
        mandatory,
        pattern,
      }

      if (type === FilterType.dateRange.toLowerCase()) {
        const { min, max } = filter
        let startValue = min
        let endValue = max
        if (defaultValue) {
          ;[startValue, endValue] = defaultValue.split(' - ')
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
  renderFilters: async ({ req, res, services, next }: AsyncReportUtilsParams) => {
    try {
      const token = res.locals.user?.token ? res.locals.user.token : 'token'
      const csrfToken = (res.locals.csrfToken as unknown as string) || 'csrfToken'
      const { reportId, variantId } = req.params
      const { dataProductDefinitionsPath: definitionPath } = req.query
      const definition = await services.reportingService.getDefinition(
        token,
        reportId,
        variantId,
        <string>definitionPath,
      )
      const { name: reportName } = definition
      const { name: variantName, description } = definition.variant
      const { template } = definition.variant.specification

      return {
        reportData: { reportName, variantName, description, reportId, variantId, definitionPath, csrfToken, template },
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
  requestReport: async ({ req, res, services }: AsyncReportUtilsParams) => {
    let redirect = ''
    const token = res.locals.user?.token ? res.locals.user.token : 'token'
    const definitions = res.locals.definitions ? res.locals.definitions : []
    const { reportId, variantId, retryId, refreshId } = req.body
    console.log({ definitions })
    const currentVariant = DefinitionUtils.getCurrentVariantDefinition(definitions, reportId, variantId)
    const fields = currentVariant ? currentVariant.specification.fields : []

    console.log({ fields })

    const query: Dict<string> = {}
    const querySummary: Array<Dict<string>> = []
    const filterData: Dict<string> = {}
    const sortData: Dict<string> = {}

    Object.keys(req.body)
      .filter((name) => name !== '_csrf' && req.body[name] !== '')
      .forEach((name) => {
        const shortName = name.replace('filters.', '')
        const value = req.body[name]

        query[name as keyof Dict<string>] = value

        if (name.startsWith('filters.') && value !== '') {
          filterData[shortName as keyof Dict<string>] = value
          const fieldDisplayName = DefinitionUtils.getFieldDisplayName(fields, shortName)
          querySummary.push({
            name: fieldDisplayName || shortName,
            value,
          })
        } else if (name.startsWith('sort')) {
          sortData[name as keyof Dict<string>] = value
          const fieldDef = DefinitionUtils.getField(fields, value)

          let displayName = 'Sort Direction'
          let displayValue = value
          if (fieldDef) {
            displayName = 'Sort Column'
            displayValue = fieldDef.display
          }

          querySummary.push({
            name: displayName,
            value: displayValue,
          })
        }
      })

    const response = await services.reportingService.requestAsyncReport(token, reportId, variantId, query)
    const { executionId, tableId } = response

    if (retryId) {
      await services.asyncReportsStore.setReportTimestamp(retryId, 'retry')
      await services.recentlyViewedStoreService.setReportTimestamp(retryId, 'retry')
    }

    if (refreshId) {
      await services.asyncReportsStore.setReportTimestamp(refreshId, 'refresh')
      await services.recentlyViewedStoreService.setReportTimestamp(refreshId, 'refresh')
    }

    if (executionId && tableId) {
      const reportData = await services.asyncReportsStore.addReport(
        {
          ...req.body,
          executionId,
          tableId,
        },
        filterData,
        sortData,
        query,
        querySummary,
      )
      redirect = reportData.url.polling.pathname
    }

    return redirect
  },

  handleError: (error: Dict<string>, req: Request) => {
    const filters = Object.keys(req.body)
      .filter((attr) => attr.includes('filters.'))
      .filter((attr) => !!req.body[attr])
      .map((attr) => {
        return { name: attr, value: req.body[attr] }
      })
    return {
      title: 'Request Failed',
      errorDescription: 'Your report has failed to generate. The issue has been reported to admin staff',
      retry: true,
      error: error.data,
      filters,
    }
  },
}
