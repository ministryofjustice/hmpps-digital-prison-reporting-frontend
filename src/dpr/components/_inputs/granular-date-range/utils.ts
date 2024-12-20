import dayjs from 'dayjs'
import { components } from '../../../types/api'
import { FilterValue, GranularDateRange } from '../../_filters/types'

import StartEndDateUtils from '../start-end-date/utils'

const getQuickFilterOptions = () => {
  const options: { value: string; text: string; disabled?: boolean }[] = [
    { value: 'none', text: 'None' },
    { value: 'today', text: 'Today' },
    { value: 'last-seven-days', text: 'Last 7 days' },
    { value: 'last-thirty-days', text: 'Last 30 days' },
    { value: 'last-month', text: 'Last month' },
    { value: 'last-full-month', text: 'Last full month' },
    { value: 'last-90-days', text: 'Last 90 days' },
    { value: 'last-3-months', text: 'Last 3 months' },
    { value: 'last-full-3-months', text: 'Last full 3 months' },
    { value: 'last-year', text: 'Last year' },
    { value: 'last-full-year', text: 'Last full year' },
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

const setDateRangeFromQuickFilterValue = (value: string) => {
  let startDate
  let endDate
  let granularity

  switch (value) {
    case 'today':
      endDate = dayjs()
      startDate = endDate.subtract(1, 'day')
      granularity = 'daily'
      break
    case 'last-seven-days':
      endDate = dayjs()
      startDate = endDate.subtract(1, 'week')
      granularity = 'daily'
      break
    case 'last-thirty-days':
      endDate = dayjs()
      startDate = endDate.subtract(1, 'month')
      granularity = 'daily'
      break
    case 'last-month':
      endDate = dayjs()
      startDate = endDate.subtract(1, 'month')
      granularity = 'monthly'
      break
    case 'last-full-month':
      endDate = dayjs().subtract(1, 'month').endOf('month')
      startDate = endDate.subtract(1, 'month')
      granularity = 'monthly'
      break
    case 'last-90-days':
      endDate = dayjs()
      startDate = endDate.subtract(3, 'month')
      granularity = 'daily'
      break
    case 'last-3-months':
      endDate = dayjs()
      startDate = endDate.subtract(3, 'month')
      granularity = 'monthly'
      break
    case 'last-full-3-months':
      endDate = dayjs().subtract(1, 'month').endOf('month')
      startDate = endDate.subtract(3, 'month')
      granularity = 'monthly'
      break
    case 'last-year':
      endDate = dayjs()
      startDate = endDate.subtract(1, 'year')
      granularity = 'annually'
      break
    case 'last-full-year':
      endDate = dayjs().subtract(1, 'year').endOf('year')
      startDate = endDate.subtract(1, 'year')
      granularity = 'annually'
      break
    default:
      break
  }

  return {
    start: startDate.format('YYYY-MM-DD').toString(),
    end: endDate.format('YYYY-MM-DD').toString(),
    granularity,
  }
}

const getFilterFromDefinition = (
  filter: components['schemas']['FilterDefinition'] & { defaultGranularity: string },
  filterData: FilterValue,
) => {
  let value = <GranularDateRange>StartEndDateUtils.getStartAndEndValueFromDefinition(filter)
  let quickFilterValue
  if (!StartEndDateUtils.isDateRange(value)) {
    quickFilterValue = value
    value = setDateRangeFromQuickFilterValue(quickFilterValue)
  }

  value = {
    ...value,
    granularity: value.granularity || filter.defaultGranularity || 'days',
    ...(!!quickFilterValue && { quickFilter: quickFilterValue }),
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
