import { components } from '../../../types/api'
import { FilterValue, GranularDateRange } from '../../_filters/types'

import StartEndDateUtils from '../start-end-date/utils'

const getQuickFilterOptions = () => {
  const options: { value: string; text: string; disabled?: boolean }[] = [
    { value: 'none', text: 'None' },
    { value: 'today', text: 'Today' },
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
    { value: 'hourly', text: 'Hourly' },
    { value: 'daily', text: 'Daily' },
    { value: 'weekly', text: 'Weekly' },
    { value: 'monthly', text: 'Monthly' },
    { value: 'quarterly', text: 'Quarterly' },
    { value: 'annually', text: 'Annually' },
  ]

  return options
}

const getFilterFromDefinition = (
  filter: components['schemas']['FilterDefinition'] & { defaultGranularity: string },
  filterData: FilterValue,
) => {
  let value = <GranularDateRange>StartEndDateUtils.getStartAndEndValueFromDefinition(filter)
  value = {
    ...value,
    granularity: filter.defaultGranularity || 'days',
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
