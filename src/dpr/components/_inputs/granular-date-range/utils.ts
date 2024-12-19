import { components } from '../../../types/api'
import { FilterValue } from '../../_filters/types'

import StartEndDateUtils from '../start-end-date/utils'

const getGranularDateRangeFilterFromDefinition = (
  filter: components['schemas']['FilterDefinition'],
  filterData: FilterValue,
) => {
  const value = StartEndDateUtils.getStartAndEndValueFromDefinition(filter)

  return {
    ...filterData,
    min: filter.min,
    max: filter.max,
    value,
  }
}

export default {
  getGranularDateRangeFilterFromDefinition,
}
