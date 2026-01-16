/* eslint-disable no-param-reassign */
import { Request } from 'express'
import { Dayjs } from 'dayjs'
import type { SetQueryFromFiltersResult } from './types'
import type { components } from '../../../types/api'

import SortHelper from './sortByTemplate'
import DefinitionUtils from '../../../utils/definitionUtils'
import DateMapper from '../../../utils/DateMapper/DateMapper'
import FiltersUtils from '../../_filters/utils'
import DateRangeInputUtils from '../../_inputs/date-range/utils'
import AutocompleteUtils from '../../_inputs/autocomplete-text-input/utils'
import { FilterOption, FilterValue, FilterValueWithOptions } from '../../_filters/types'
import { FilterType } from '../../_filters/filter-input/enum'

/**
 * Initialises the sortData from the definition
 */
export const getSortByFromDefinition = (
  fields: components['schemas']['FieldDefinition'][],
  interactive?: boolean,
): FilterValue[] => {
  if (!interactive) {
    const sortBy = SortHelper.sortByTemplate()
    const options = fields
      .filter((f) => f.sortable)
      .map((f) => {
        if (f.defaultsort) sortBy[0].value = f.name
        const field: FilterOption = { value: f.name, text: f.display }
        if (f.sortDirection) {
          // the 'value' here is whether sortedAsc is true or not
          sortBy[1].value = f.sortDirection === 'asc' ? 'true' : 'false'
        }
        return field
      })

    if (options.length) {
      const sortWithOptions: FilterValueWithOptions = <FilterValueWithOptions>sortBy[0]
      sortWithOptions.options = options
      sortBy[0] = sortWithOptions
      return sortBy
    }
  }
  return []
}

export const setDurationStartAndEnd = (
  name: string,
  value: string,
  query: Record<string, string>,
  filterData: Record<string, string>,
  querySummary: Array<Record<string, string>>,
  fields: components['schemas']['FieldDefinition'][],
) => {
  const { startDate, endDate } = DateRangeInputUtils.calcDates(value)
  const startDateDisplayString = startDate ? (<Dayjs>startDate).format('YYYY-MM-DD').toString() : ''
  const endDateDisplayString = endDate ? (<Dayjs>endDate).format('YYYY-MM-DD').toString() : ''

  const fieldId = name.split('.')[1]
  const field = fields.find((f) => {
    return f.name === fieldId
  })

  query[`filters.${fieldId}.start`] = startDateDisplayString
  query[`filters.${fieldId}.end`] = endDateDisplayString

  filterData[name] = value

  let queryValue = `${value.charAt(0).toUpperCase() + value.slice(1).replaceAll('-', ' ')}`
  queryValue = `${queryValue} (${startDateDisplayString} - ${endDateDisplayString})`
  querySummary.push({
    name: field ? `${field.display}` : name,
    value: queryValue,
  })

  return {
    querySummary,
    filterData,
    query,
  }
}

/**
 * Returns the data required for rendering the async filters component
 *
 * @param {AsyncReportUtilsParams} { req, res, dataSources }
 * @return {*}
 */
export const renderFilters = async (fields: components['schemas']['FieldDefinition'][], interactive?: boolean) => {
  return {
    filters: FiltersUtils.getFiltersFromDefinition(fields, false),
    sortBy: getSortByFromDefinition(fields, interactive),
  }
}

export const setQueryFromFilters = (
  req: Request,
  fields: components['schemas']['FieldDefinition'][],
): SetQueryFromFiltersResult => {
  let query: Record<string, string> = {}
  let filterData: Record<string, string> = {}
  let querySummary: Array<Record<string, string>> = []
  const sortData: Record<string, string> = {}
  const dateMapper = new DateMapper()
  const urlParams = new URLSearchParams(req.body.search)

  Object.keys(req.body)
    .filter((name) => name !== '_csrf' && req.body[name] !== '')
    .forEach((name) => {
      const shortName = name.replace('filters.', '')
      const queryValue = req.body[name]
      let summaryValue = queryValue

      if (name.startsWith('filters.') && queryValue !== '' && !query[name] && queryValue !== 'no-filter') {
        if (name.includes('relative-duration')) {
          ;({ query, filterData, querySummary } = setDurationStartAndEnd(
            name,
            queryValue,
            query,
            filterData,
            querySummary,
            fields,
          ))
        } else {
          const fieldId = name.split('.')[1]
          const filter: components['schemas']['FilterDefinition'] | undefined = fields.find(
            (f) => f.name === fieldId,
          )?.filter

          let urlParamValue: string | string[] = urlParams.getAll(name)
          urlParamValue = !urlParamValue || urlParamValue.length === 0 ? queryValue : urlParamValue
          urlParamValue = urlParamValue.length === 1 ? `${urlParamValue[0]}` : `${urlParamValue}`

          let dateDisplayValue
          if (dateMapper.isDate(queryValue)) {
            dateDisplayValue = dateMapper.toDateString(queryValue, 'local-date')
            const isoFormatDate = dateMapper.toDateString(queryValue, 'iso')
            if (isoFormatDate) {
              query[name] = isoFormatDate
              filterData[shortName] = isoFormatDate
            }
          } else {
            query[name] = urlParamValue
            filterData[shortName] = urlParamValue
          }

          if (filter?.type === FilterType.autocomplete.toLowerCase()) {
            summaryValue = AutocompleteUtils.getDisplayValue(filter, queryValue)
          } else {
            summaryValue = dateDisplayValue || summaryValue
          }

          const fieldDisplayName = DefinitionUtils.getFieldDisplayName(fields, shortName)
          querySummary.push({
            name: fieldDisplayName || shortName,
            value: summaryValue,
          })
        }
      } else if (name.startsWith('sort')) {
        query[name] = queryValue
        sortData[name] = queryValue

        const fieldDef = DefinitionUtils.getField(fields, queryValue)

        let displayName = 'Sort Direction'
        let displayValue = queryValue === 'true' ? 'Ascending' : 'Descending'
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
  renderFilters,
  setQueryFromFilters,
}
