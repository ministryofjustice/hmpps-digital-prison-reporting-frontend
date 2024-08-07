import { Request } from 'express'
import moment from 'moment'
import Dict = NodeJS.Dict
import { components } from '../../types/api'
import FilterUtils from '../filters/utils'
import { DateFilterValue, FilterValue } from '../filters/types'
import { FilterType } from '../filter-input/enum'
import SortHelper from './sortByTemplate'
import { AsyncReportUtilsParams } from '../../types/AsyncReportUtils'
import DefinitionUtils from '../../utils/definitionUtils'
import { getDuplicateRequestIds } from '../../utils/reportSummaryHelper'
import { Services } from '../../types/Services'
import { RenderFiltersReturnValue } from './types'

/**
 * Initialises the filters & Sort from the definition data
 *
 * @param {components['schemas']['VariantDefinition']} definition
 * @return {*}
 */
const initFiltersFromDefinition = (definition: components['schemas']['VariantDefinition']) => {
  return {
    filters: getFiltersFromDefinition(definition),
    sortBy: getSortByFromDefinition(definition),
  }
}

/**
 * Initialises the sortData from the definition
 *
 * @param {components['schemas']['VariantDefinition']} definition
 * @return {*}
 */
const getSortByFromDefinition = (definition: components['schemas']['VariantDefinition']) => {
  const sortBy = SortHelper.sortByTemplate()
  const options = definition.specification.fields
    .filter((f) => f.sortable)
    .map((f) => {
      if (f.defaultsort) sortBy[0].value = f.name
      return { value: f.name, text: f.display }
    })

  if (options.length) {
    sortBy[0].options = definition.specification.fields
      .filter((f) => f.sortable)
      .map((f) => {
        if (f.defaultsort) sortBy[0].value = f.name
        return { value: f.name, text: f.display }
      })
  } else {
    sortBy.splice(0, 1)
  }

  return sortBy
}

/**
 * Initialises the filters from the definition
 *
 * @param {components['schemas']['VariantDefinition']} definition
 * @return {*}
 */
const getFiltersFromDefinition = (definition: components['schemas']['VariantDefinition']) => {
  return definition.specification.fields
    .filter((f) => f.filter)
    .map((f) => {
      const { display: text, name, filter } = f
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
          value: FilterUtils.setDateRangeValuesWithinMinMax(filter, startValue, endValue),
          min,
          max,
        }
      }

      if (type === FilterType.date.toLowerCase()) {
        const { min, max } = filter
        filterData = filterData as unknown as DateFilterValue
        filterData = {
          ...filterData,
          value: FilterUtils.setDateValueWithinMinMax(filter),
          min,
          max,
        }
      }

      return filterData
    })
}

/**
 * Updates the store with the request details
 *
 * @param {Request} req
 * @param {Services} services
 * @param {components['schemas']['FieldDefinition'][]} fields
 * @param {querySummaryResult} querySummaryData
 * @param {string} executionId
 * @param {string} tableId
 * @return {*}  {Promise<string>}
 */
export const updateStore = async (
  req: Request,
  services: Services,
  fields: components['schemas']['FieldDefinition'][],
  querySummaryData: querySummaryResult,
  executionId: string,
  tableId: string,
): Promise<string> => {
  const { search, variantId } = req.body
  const { query, filterData, querySummary, sortData } = querySummaryData

  // 1. check for duplicate requests and remove them from the request list
  const requestedReports = await services.asyncReportsStore.getAllReportsByVariantId(variantId)
  const viewedReports = await services.recentlyViewedStoreService.getAllReportsByVariantId(variantId)

  const duplicateRequestIds = getDuplicateRequestIds(search, requestedReports)
  if (duplicateRequestIds.length) {
    await Promise.all(
      duplicateRequestIds.map(async (id: string) => {
        await await services.asyncReportsStore.removeReport(id)
      }),
    )
  }

  const duplicateViewedReportIds = getDuplicateRequestIds(search, viewedReports)
  if (duplicateViewedReportIds.length) {
    await Promise.all(
      duplicateViewedReportIds.map(async (id: string) => {
        await await services.recentlyViewedStoreService.removeReport(id)
      }),
    )
  }

  // 2. Add the new request data to the store
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

  return reportData.url.polling.pathname
}

interface querySummaryResult {
  query: Dict<string>
  filterData: Dict<string>
  querySummary: Array<Dict<string>>
  sortData: Dict<string>
}

/**
 * Sets the query, and summary for the store
 *
 * @param {Request} req
 * @param {components['schemas']['FieldDefinition'][]} fields
 * @return {*}  {querySummaryResult}
 */
const setQuerySummary = (req: Request, fields: components['schemas']['FieldDefinition'][]): querySummaryResult => {
  const query: Dict<string> = {}
  const filterData: Dict<string> = {}
  const querySummary: Array<Dict<string>> = []
  const sortData: Dict<string> = {}
  // eslint-disable-next-line no-useless-escape
  const dateRegEx = /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/

  Object.keys(req.body)
    .filter((name) => name !== '_csrf' && req.body[name] !== '')
    .forEach((name) => {
      const shortName = name.replace('filters.', '')
      const value = req.body[name]

      if (name.startsWith('filters.') && value !== '') {
        query[name as keyof Dict<string>] = value
        filterData[shortName as keyof Dict<string>] = value

        let dateDisplayValue
        if (value.match(dateRegEx)) {
          dateDisplayValue = moment(value).format('DD-MM-YYYY')
        }
        const fieldDisplayName = DefinitionUtils.getFieldDisplayName(fields, shortName)
        querySummary.push({
          name: fieldDisplayName || shortName,
          value: dateDisplayValue || value,
        })
      } else if (name.startsWith('sort')) {
        query[name as keyof Dict<string>] = value
        sortData[name as keyof Dict<string>] = value

        const fieldDef = DefinitionUtils.getField(fields, value)

        let displayName = 'Sort Direction'
        let displayValue = value === 'true' ? 'Ascending' : 'Descending'
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

  return {
    query,
    filterData,
    querySummary,
    sortData,
  }
}

export default {
  /**
   * Returns the data required for rendering the async filters component
   *
   * @param {AsyncReportUtilsParams} { req, res, dataSources }
   * @return {*}
   */
  renderFilters: async ({
    req,
    res,
    services,
    next,
  }: AsyncReportUtilsParams): Promise<RenderFiltersReturnValue | boolean> => {
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
   * @param {AsyncReportUtilsParams} { req, res, services }
   * @return {*}
   */
  requestReport: async ({ req, res, services }: AsyncReportUtilsParams) => {
    const token = res.locals.user?.token ? res.locals.user.token : 'token'
    const { reportId, variantId, dataProductDefinitionsPath: definitionPath } = req.body

    const definition = await services.reportingService.getDefinition(token, reportId, variantId, <string>definitionPath)
    const fields = definition ? definition.variant.specification.fields : []
    const querySummaryData = setQuerySummary(req, fields)

    const { executionId, tableId } = await services.reportingService.requestAsyncReport(token, reportId, variantId, {
      ...querySummaryData.query,
      dataProductDefinitionsPath: definitionPath,
    })

    let redirect = ''
    if (executionId && tableId) {
      redirect = await updateStore(req, services, fields, querySummaryData, executionId, tableId)
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
      error: error.data ? error.data : error,
      filters,
    }
  },
}
