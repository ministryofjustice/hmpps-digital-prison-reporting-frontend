/* eslint-disable no-param-reassign */
import type { components } from '../../../types/api'

import SortHelper from './sortByTemplate'
import FiltersUtils from '../../_filters/utils'
import { FilterOption, FilterValue, FilterValueWithOptions } from '../../_filters/types'
import { uiDateToApi } from '../../../utils/dateHelper'

/**
 * Initialises the sortData from the definition
 */
export const getSortByFromDefinition = (fields: components['schemas']['FieldDefinition'][]): FilterValue[] => {
  const sortBy = SortHelper.sortByTemplate()
  const options = fields
    .filter((f) => f.sortable)
    .map((f) => {
      if (f.defaultsort) sortBy[0].value = f.name
      const field: FilterOption = { value: f.name, text: f.display }
      sortBy[1].value = f.sortDirection ? `${f.sortDirection === 'asc'}` : 'true'
      return field
    })

  if (options.length) {
    const sortWithOptions: FilterValueWithOptions = <FilterValueWithOptions>sortBy[0]
    sortWithOptions.options = options
    sortBy[0] = sortWithOptions
    return sortBy
  }
  return []
}

/**
 * Returns the data required for rendering the async filters component
 *
 * @param {AsyncReportUtilsParams} { req, res, dataSources }
 * @return {*}
 */
export const renderFilters = async (fields: components['schemas']['FieldDefinition'][]) => {
  return {
    filters: FiltersUtils.getFiltersFromDefinition(fields, false),
    sortBy: getSortByFromDefinition(fields),
  }
}

/**
 * Builds filter data from req.body filters.
 *
 * - Processes only `filters.*` keys
 * - Strips `filters.` prefix
 * - Drops empty values
 * - Normalizes UI dates via uiDateToApi
 * - Collapses arrays to CSV (BE contract)
 *
 * @param {Record<string, unknown>} body
 * @return {*}  {Record<string, string>}
 */
export const buildFilterData = (body: Record<string, unknown>): Record<string, string> => {
  return Object.entries(body).reduce<Record<string, string>>((acc, [key, value]) => {
    if (!key.startsWith('filters.')) return acc
    if (value === undefined || value === null || value === '') return acc

    const shortName = key.replace(/^filters\./, '')

    if (Array.isArray(value)) {
      const csv = value
        .filter((v) => v != null && v !== '')
        .map(String)
        .join(',')

      if (csv) {
        acc[shortName] = csv
      }

      return acc
    }

    const stringValue = String(value)

    acc[shortName] = uiDateToApi(stringValue) ?? stringValue

    return acc
  }, {})
}

/**
 * Builds sort data from the request body.
 *
 * - Supports single (radio) or multiple (checkbox) sort columns
 * - Uses a global sort direction
 * - Collapses columns to CSV (API contract)
 *
 * @param {Record<string, unknown>} body
 * @return {*}  {Record<string, string>}
 */
export const buildSortData = (body: Record<string, unknown>): Record<string, string> | undefined => {
  const rawColumns = body['sortColumn']

  if (rawColumns == null || rawColumns === '') {
    return
  }

  const columns = Array.isArray(rawColumns)
    ? rawColumns.filter((v) => v != null && v !== '').map(String)
    : [String(rawColumns)]

  if (columns.length === 0) {
    return {}
  }

  const direction = body['sortedAsc'] === 'false' ? 'false' : 'true'

  return {
    sortColumn: columns.join(','),
    sortedAsc: direction,
  }
}

export default {
  renderFilters,
}
