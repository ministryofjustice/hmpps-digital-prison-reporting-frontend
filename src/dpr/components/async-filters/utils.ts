/* eslint-disable no-param-reassign */
import { Request, Response } from 'express'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import isBetween from 'dayjs/plugin/isBetween'
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

    return sortBy
  }
  return []
}

const dateIsInBounds = (startDate: dayjs.Dayjs, endDate: dayjs.Dayjs, min: string, max: string) => {
  dayjs.extend(isBetween)

  const minDate = dayjs(min)
  const maxDate = dayjs(max)

  const startDateIsBetweenMinAndMax = startDate.isBetween(minDate, maxDate, 'day', '[]')
  const endDateIsBetweenMinAndMax = endDate.isBetween(minDate, maxDate, 'day', '[]')

  return startDateIsBetweenMinAndMax && endDateIsBetweenMinAndMax
}

export const calcDates = (durationValue: string) => {
  let endDate
  let startDate

  switch (durationValue) {
    case 'yesterday':
      endDate = dayjs()
      startDate = endDate.subtract(1, 'day')
      break
    case 'tomorrow':
      startDate = dayjs()
      endDate = startDate.add(1, 'day')
      break
    case 'last-week':
      endDate = dayjs()
      startDate = endDate.subtract(1, 'week')
      break
    case 'next-week':
      startDate = dayjs()
      endDate = startDate.add(1, 'week')
      break
    case 'last-month':
      endDate = dayjs()
      startDate = endDate.subtract(1, 'month')
      break
    case 'next-month':
      startDate = dayjs()
      endDate = startDate.add(1, 'month')
      break
    default:
      break
  }

  return {
    endDate,
    startDate,
  }
}

export const getRelativeDateOptions = (min: string, max: string) => {
  if (!min) min = '1977-05-25'
  if (!max) max = '9999-01-01'
  let options: { value: string; text: string; disabled?: boolean }[] = [
    { value: 'yesterday', text: 'Yesterday' },
    { value: 'tomorrow', text: 'Tomorrow' },
    { value: 'last-week', text: 'Last week' },
    { value: 'next-week', text: 'Next week' },
    { value: 'last-month', text: 'Last month' },
    { value: 'next-month', text: 'Next-month' },
  ]

  options.forEach((option: { value: string; text: string; disabled?: boolean }) => {
    const { endDate, startDate } = calcDates(option.value)
    if (!dateIsInBounds(startDate, endDate, min, max)) {
      option.disabled = true
    }
  })

  if (options.every((opt: { value: string; text: string; disabled?: boolean }) => opt.disabled)) {
    options = []
  }
  return options
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
        const dateRegEx = /^\d{1,4}-\d{1,2}-\d{2,2} - \d{1,4}-\d{1,2}-\d{1,2}$/
        const { min, max } = filter
        let startValue
        let endValue

        if (min) startValue = min
        if (max) endValue = max

        let value
        if (defaultValue && defaultValue.match(dateRegEx)) {
          ;[startValue, endValue] = defaultValue.split(' - ')
          value = FilterUtils.setDateRangeValuesWithinMinMax(filter, startValue, endValue)
        } else if (defaultValue) {
          value = defaultValue
        } else {
          value = FilterUtils.setDateRangeValuesWithinMinMax(filter, startValue, endValue)
        }

        filterData = filterData as unknown as DateFilterValue
        filterData = {
          ...filterData,
          min: filter.min,
          max: filter.max,
          value,
        }

        filterData.relativeOptions = getRelativeDateOptions(filterData.min, filterData.max)
      }

      if (type === FilterType.date.toLowerCase()) {
        filterData = filterData as unknown as DateFilterValue
        filterData = {
          ...filterData,
          value: FilterUtils.setDateValueWithinMinMax(filter),
          min: filter.min,
          max: filter.max,
        }
      }

      return filterData
    })
}

/**
 * Updates the store with the request details
 *
 * @param {Request} req
 * @param {Response} res
 * @param {Services} services
 * @param {components['schemas']['FieldDefinition'][]} fields
 * @param {querySummaryResult} querySummaryData
 * @param {string} executionId
 * @param {string} tableId
 * @return {*}  {Promise<string>}
 */
export const updateStore = async (
  req: Request,
  res: Response,
  services: Services,
  fields: components['schemas']['FieldDefinition'][],
  querySummaryData: querySummaryResult,
  executionId: string,
  tableId: string,
): Promise<string> => {
  const { search, variantId } = req.body
  const { query, filterData, querySummary, sortData } = querySummaryData
  const userId = res.locals.user?.uuid ? res.locals.user.uuid : 'userId'

  // 1. check for duplicate requests and remove them from the request list
  const requestedReports = await services.asyncReportsStore.getAllReportsByVariantId(variantId, userId)
  const viewedReports = await services.recentlyViewedStoreService.getAllReportsByVariantId(variantId, userId)

  const duplicateRequestIds = getDuplicateRequestIds(search, requestedReports)
  if (duplicateRequestIds.length) {
    await Promise.all(
      duplicateRequestIds.map(async (id: string) => {
        await await services.asyncReportsStore.removeReport(id, userId)
      }),
    )
  }

  const duplicateViewedReportIds = getDuplicateRequestIds(search, viewedReports)
  if (duplicateViewedReportIds.length) {
    await Promise.all(
      duplicateViewedReportIds.map(async (id: string) => {
        await await services.recentlyViewedStoreService.removeReport(id, userId)
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
    userId,
  )

  return reportData.url.polling.pathname
}

interface querySummaryResult {
  query: Dict<string>
  filterData: Dict<string>
  querySummary: Array<Dict<string>>
  sortData: Dict<string>
}

export const setDurationStartAndEnd = (
  name: string,
  value: string,
  query: Dict<string>,
  filterData: Dict<string>,
  querySummary: Array<Dict<string>>,
  fields: components['schemas']['FieldDefinition'][],
) => {
  const { startDate, endDate } = calcDates(value)
  const startDateDisplayString = startDate.format('YYYY-MM-DD').toString()
  const endDateDisplayString = endDate.format('YYYY-MM-DD').toString()

  const fieldId = name.split('.')[0]
  const field = fields.find((f) => {
    return f.name === fieldId
  })

  query[`filters.${fieldId}.start` as keyof Dict<string>] = startDateDisplayString
  query[`filters.${fieldId}.end` as keyof Dict<string>] = endDateDisplayString

  filterData[name as keyof Dict<string>] = value

  let queryValue = `${value.charAt(0).toUpperCase() + value.slice(1).replace('-', ' ')}`
  queryValue = `${queryValue} (${startDateDisplayString} - ${endDateDisplayString})`
  querySummary.push({
    name: `${field.display}`,
    value: queryValue,
  })

  return {
    querySummary,
    filterData,
    query,
  }
}
/**
 * Sets the query, and summary for the store
 *
 * @param {Request} req
 * @param {components['schemas']['FieldDefinition'][]} fields
 * @return {*}  {querySummaryResult}
 */
const setQuerySummary = (req: Request, fields: components['schemas']['FieldDefinition'][]): querySummaryResult => {
  let query: Dict<string> = {}
  let filterData: Dict<string> = {}
  let querySummary: Array<Dict<string>> = []
  const sortData: Dict<string> = {}
  // eslint-disable-next-line no-useless-escape
  const isoDateRegEx = /^(\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01]))$/
  // eslint-disable-next-line no-useless-escape
  const localDateRegEx = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/
  dayjs.extend(customParseFormat)

  Object.keys(req.body)
    .filter((name) => name !== '_csrf' && req.body[name] !== '')
    .forEach((name) => {
      const shortName = name.replace('filters.', '')
      const value = req.body[name]

      if (name.includes('relative-duration')) {
        ;({ query, filterData, querySummary } = setDurationStartAndEnd(
          name,
          value,
          query,
          filterData,
          querySummary,
          fields,
        ))
      }

      if (name.startsWith('filters.') && value !== '' && !query[name]) {
        query[name as keyof Dict<string>] = value
        filterData[shortName as keyof Dict<string>] = value

        let dateDisplayValue
        if (value.match(localDateRegEx)) {
          const formatDate = dayjs(value, 'DD/MM/YYYY')
          const isoFormatDate = formatDate.format('YYYY-MM-DD')
          query[name as keyof Dict<string>] = isoFormatDate
          filterData[shortName as keyof Dict<string>] = isoFormatDate
        } else if (value.match(isoDateRegEx)) {
          dateDisplayValue = dayjs(value).format('DD/MM/YYYY')
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
      const { name: variantName } = definition.variant
      const description = definition.variant.description || definition.description

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
      redirect = await updateStore(req, res, services, fields, querySummaryData, executionId, tableId)
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
      errorDescription: 'Your report has failed to generate.',
      retry: true,
      error: error.data ? error.data : error,
      filters,
    }
  },
}
