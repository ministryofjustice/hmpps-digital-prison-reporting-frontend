import { Request } from 'express'
import { DateRange, FilterValue } from '../../filters/types'
import { FilterType } from '../../_filters/filter-input/enum'
import FiltersUtils from '../../_filters/utils'

import AsyncFiltersUtils from '../../_async/async-filters-form/utils'
import { RenderFiltersReturnValue } from '../../_async/async-filters-form/types'

import { components } from '../../../types/api'

const getSelectedFilters = (filters: FilterValue[], prefix: string) => {
  return filters
    .filter((f) => f.value)
    .map((f) => {
      let value = []
      let key: string[] = []
      let displayValue = f.value

      if (f.type === FilterType.dateRange.toLowerCase()) {
        displayValue = `${(<DateRange>f.value).start} - ${(<DateRange>f.value).start}`
        value = [(<DateRange>f.value).start, (<DateRange>f.value).end]
      } else {
        key = [`${prefix}${f.name}`]
        value = [displayValue]
      }

      return {
        text: `${f.text}: ${displayValue}`,
        key: JSON.stringify(key),
        value: JSON.stringify(value),
        classes: 'govuk-button--inverse accordion-summary-remove-button govuk-!-margin-0',
        attributes: {
          'aria-label': `Selected Filter: ${f.text}: ${value}. Click to clear this filter`,
        },
      }
    })
}

export default {
  getSelectedFilters,
  getFilters: async ({
    fields,
    req,
    interactive = false,
    prefix = 'filters.',
  }: {
    fields: components['schemas']['FieldDefinition'][]
    req: Request
    interactive?: boolean
    prefix?: string
  }) => {
    const defaultFilterData = <RenderFiltersReturnValue>await AsyncFiltersUtils.renderFilters(fields, interactive)
    const filters = FiltersUtils.setFilterValuesFromRequest(defaultFilterData.filters, req)
    const selectedFilters = getSelectedFilters(filters, prefix)
    return {
      filters,
      selectedFilters,
    }
  },
}
