import { Request } from 'express'
import FiltersUtils from '../../_filters/utils'
import SelectedFiltersUtils from '../../_filters/filters-selected/utils'

import AsyncFiltersUtils from '../../_async/async-filters-form/utils'
import { RenderFiltersReturnValue } from '../../_async/async-filters-form/types'

import { components } from '../../../types/api'

export default {
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
    const selectedFilters = SelectedFiltersUtils.getSelectedFilters(filters, prefix)
    return {
      filters,
      selectedFilters,
    }
  },
}
