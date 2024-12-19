import { components } from '../../../types/api'
import { FilterValue, GranularDateRange } from '../../_filters/types'

import StartEndDateUtils from '../start-end-date/utils'

const getGranularityDefaultValue = (filter: components['schemas']['FilterDefinition']) => {
  return 'monthly'
}

const getQuickFilterOptions = () => {
  const options: { value: string; text: string; disabled?: boolean }[] = [
    { value: 'today', text: 'today' },
    { value: 'last-seven-days', text: 'Last 7 days' },
    { value: 'last-thirty-days', text: 'Last 30 days' },
    { value: 'last-90-days', text: 'Last 90 days' },
    { value: 'last-3-months', text: 'Last 3 month' },
    { value: 'last-week', text: 'Last week' },
    { value: 'last-month', text: 'Last month' },
    { value: 'last-quarter', text: 'Last quarter' },
    { value: 'last-year', text: 'Last year' },
  ]

  return options
}

const getGranularityOptions = () => {
  const options: { value: string; text: string; disabled?: boolean }[] = [
    { value: 'hourly', text: 'hourly' },
    { value: 'daily', text: 'daily' },
    { value: 'weekly', text: 'weekly' },
    { value: 'monthly', text: 'monthly' },
    { value: 'quarterly', text: 'quarterly' },
    { value: 'annually', text: 'annually' },
  ]

  return options
}

const getFilterFromDefinition = (filter: components['schemas']['FilterDefinition'], filterData: FilterValue) => {
  let value = <GranularDateRange>StartEndDateUtils.getStartAndEndValueFromDefinition(filter)
  value = {
    ...value,
    granularity: getGranularityDefaultValue(filter),
    ...(!StartEndDateUtils.isDateRange(value) && { quickFilter: value }),
  }

  return {
    ...filterData,
    min: filter.min,
    max: filter.max,
    value,
    quickFilterOptions: getQuickFilterOptions(),
    granularityOptions: getGranularityOptions(),
  }
}

export default {
  getFilterFromDefinition,
}
