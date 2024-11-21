/* eslint-disable no-param-reassign */
import { Request } from 'express'
import Dict = NodeJS.Dict
import type { SetQueryFromFiltersResult } from './types'
import type { components } from '../../../types/api'

import SortHelper from './sortByTemplate'
import DefinitionUtils from '../../../utils/definitionUtils'
import DateMapper from '../../../utils/DateMapper/DateMapper'
import FiltersUtils from '../../_filters/utils'
import DateRangeInputUtils from '../../_inputs/date-range/utils'

/**
 * Initialises the filters & Sort from the definition data
 *
 * @param {components['schemas']['VariantDefinition']} definition
 * @return {*}
 */
const initFiltersFromDefinition = (fields: components['schemas']['FieldDefinition'][], interactive?: boolean) => {
  return {
    filters: FiltersUtils.getFiltersFromDefinition(fields, interactive),
    sortBy: getSortByFromDefinition(fields),
  }
}

/**
 * Initialises the sortData from the definition
 *
 * @param {components['schemas']['VariantDefinition']} definition
 * @return {*}
 */
export const getSortByFromDefinition = (fields: components['schemas']['FieldDefinition'][]) => {
  const sortBy = SortHelper.sortByTemplate()
  const options = fields
    .filter((f) => f.sortable)
    .map((f) => {
      if (f.defaultsort) sortBy[0].value = f.name
      return { value: f.name, text: f.display }
    })

  if (options.length) {
    sortBy[0].options = fields
      .filter((f) => f.sortable)
      .map((f) => {
        if (f.defaultsort) sortBy[0].value = f.name
        return { value: f.name, text: f.display }
      })

    return sortBy
  }
  return []
}

export const setDurationStartAndEnd = (
  name: string,
  value: string,
  query: Dict<string>,
  filterData: Dict<string>,
  querySummary: Array<Dict<string>>,
  fields: components['schemas']['FieldDefinition'][],
) => {
  const { startDate, endDate } = DateRangeInputUtils.calcDates(value)
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

export default {
  /**
   * Returns the data required for rendering the async filters component
   *
   * @param {AsyncReportUtilsParams} { req, res, dataSources }
   * @return {*}
   */
  renderFilters: async (fields: components['schemas']['FieldDefinition'][], interactive?: boolean) => {
    return {
      ...initFiltersFromDefinition(fields, interactive),
    }
  },

  setQueryFromFilters: (
    req: Request,
    fields: components['schemas']['FieldDefinition'][],
  ): SetQueryFromFiltersResult => {
    let query: Dict<string> = {}
    let filterData: Dict<string> = {}
    let querySummary: Array<Dict<string>> = []
    const sortData: Dict<string> = {}
    const dateMapper = new DateMapper()

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

          if (dateMapper.isDate(value)) {
            dateDisplayValue = dateMapper.toDateString(value, 'local-date')

            const isoFormatDate = dateMapper.toDateString(value, 'iso')
            query[name as keyof Dict<string>] = isoFormatDate
            filterData[shortName as keyof Dict<string>] = isoFormatDate
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
  },
}