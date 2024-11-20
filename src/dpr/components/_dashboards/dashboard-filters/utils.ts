import { Request } from 'express'
import { components } from '../../../types/api'
import FiltersUtils from '../../_filters/utils'
import SelectedFiltersUtils from '../../_filters/filters-selected/utils'
import { FilterValue } from '../../filters/types'
import establishmentFilter from './mockDashboardFilters'

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
    const defaultFilterData = establishmentFilter as FilterValue[]
    const filters = FiltersUtils.setFilterValuesFromRequest(defaultFilterData, req)
    const selectedFilters = SelectedFiltersUtils.getSelectedFilters(filters, prefix)
    return {
      filters,
      selectedFilters,
    }
  },
}
