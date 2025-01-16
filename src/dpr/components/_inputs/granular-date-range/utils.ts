import dayjs from 'dayjs'
import { Request } from 'express'
import { components } from '../../../types/api'
import { DateFilterValue, FilterValue, GranularDateRange } from '../../_filters/types'

import StartEndDateUtils from '../start-end-date/utils'

const getQuickFilterOptions = () => {
  const options: { value: string; text: string; disabled?: boolean }[] = [
    { value: 'none', text: 'None' },
    { value: 'today', text: 'Today' },
    { value: 'past', text: 'Past:', disabled: true },
    { value: 'yesterday', text: 'Yesterday' },
    { value: 'last-seven-days', text: 'Last 7 days' },
    { value: 'last-thirty-days', text: 'Last 30 days' },
    { value: 'last-month', text: 'Last month' },
    { value: 'last-full-month', text: 'Last full month' },
    { value: 'last-90-days', text: 'Last 90 days' },
    { value: 'last-3-months', text: 'Last 3 months' },
    { value: 'last-full-3-months', text: 'Last full 3 months' },
    { value: 'last-year', text: 'Last year' },
    { value: 'last-full-year', text: 'Last full year' },
    { value: 'future', text: 'Future:', disabled: true },
    { value: 'tomorrow', text: 'Tomorrow' },
    { value: 'next-seven-days', text: 'Next 7 days' },
    { value: 'next-thirty-days', text: 'Next 30 days' },
    { value: 'next-month', text: 'Next month' },
    { value: 'next-full-month', text: 'Next full month' },
    { value: 'next-90-days', text: 'Next 90 days' },
    { value: 'next-3-months', text: 'Next 3 months' },
    { value: 'next-full-3-months', text: 'Next full 3 months' },
    { value: 'next-year', text: 'Next year' },
    { value: 'next-full-year', text: 'Next full year' },
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
      startDate = dayjs()
      granularity = 'daily'
      break
    case 'yesterday':
      endDate = dayjs().subtract(1, 'day')
      startDate = dayjs().subtract(1, 'day')
      granularity = 'daily'
      break
    case 'last-seven-days':
      endDate = dayjs()
      startDate = endDate.subtract(1, 'week').add(1, 'day')
      granularity = 'daily'
      break
    case 'last-thirty-days':
      endDate = dayjs()
      startDate = endDate.subtract(1, 'month').add(1, 'day')
      granularity = 'daily'
      break
    case 'last-month':
      endDate = dayjs()
      startDate = endDate.subtract(1, 'month').add(1, 'day')
      granularity = 'monthly'
      break
    case 'last-full-month':
      endDate = dayjs().subtract(1, 'month').endOf('month')
      startDate = endDate.startOf('month')
      granularity = 'monthly'
      break
    case 'last-90-days':
      endDate = dayjs()
      startDate = endDate.subtract(3, 'month').add(1, 'day')
      granularity = 'daily'
      break
    case 'last-3-months':
      endDate = dayjs()
      startDate = endDate.subtract(3, 'month').add(1, 'day')
      granularity = 'monthly'
      break
    case 'last-full-3-months':
      endDate = dayjs().subtract(1, 'month').endOf('month')
      startDate = endDate.subtract(2, 'month').startOf('month')
      granularity = 'monthly'
      break
    case 'last-year':
      endDate = dayjs()
      startDate = endDate.subtract(1, 'year').add(1, 'day')
      granularity = 'annually'
      break
    case 'last-full-year':
      endDate = dayjs().subtract(1, 'year').endOf('year')
      startDate = endDate.startOf('year')
      granularity = 'annually'
      break
    case 'tomorrow':
      endDate = dayjs().add(1, 'day')
      startDate = dayjs().add(1, 'day')
      granularity = 'daily'
      break
    case 'next-seven-days':
      startDate = dayjs()
      endDate = dayjs().add(7, 'day').subtract(1, 'day')
      granularity = 'daily'
      break
    case 'next-thirty-days':
      startDate = dayjs()
      endDate = dayjs().add(1, 'month').subtract(1, 'day')
      granularity = 'daily'
      break
    case 'next-month':
      startDate = dayjs()
      endDate = dayjs().add(1, 'month').subtract(1, 'day')
      granularity = 'monthly'
      break
    case 'next-full-month':
      startDate = dayjs().add(1, 'month').startOf('month')
      endDate = startDate.endOf('month')
      granularity = 'monthly'
      break
    case 'next-90-days':
      startDate = dayjs()
      endDate = dayjs().add(3, 'month').subtract(1, 'day')
      granularity = 'daily'
      break
    case 'next-3-months':
      startDate = dayjs()
      endDate = dayjs().add(3, 'month').subtract(1, 'day')
      granularity = 'monthly'
      break
    case 'next-full-3-months':
      startDate = dayjs().add(1, 'month').startOf('month')
      endDate = startDate.add(2, 'month').endOf('month')
      granularity = 'monthly'
      break
    case 'next-year':
      startDate = dayjs()
      endDate = dayjs().add(1, 'year').subtract(1, 'day')
      granularity = 'annually'
      break
    case 'next-full-year':
      startDate = dayjs().add(1, 'year').startOf('year')
      endDate = startDate.endOf('year')
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

const getOptionDisplayValue = (value: string, options: { text: string; value: string }[]) => {
  const item = options.find((opt) => {
    return opt.value === value
  })

  return item.text || value
}

const setValueFromRequest = (filter: FilterValue, req: Request, prefix: string) => {
  const { preventDefault } = req.query

  const quickFilter = <string>req.query[`${prefix}${filter.name}.quick-filter`]
  let granularity
  let start
  let end
  if (quickFilter && quickFilter !== 'none') {
    ;({ granularity, start, end } = setDateRangeFromQuickFilterValue(quickFilter))
  } else {
    granularity = <string>req.query[`${prefix}${filter.name}.granularity`]
    start = <string>req.query[`${prefix}${filter.name}.start`]
    end = <string>req.query[`${prefix}${filter.name}.end`]
  }

  const defaultStart = preventDefault ? null : (<GranularDateRange>filter.value)?.start
  const defaultEnd = preventDefault ? null : (<GranularDateRange>filter.value)?.end
  const defaultGranularity = preventDefault ? 'daily' : (<GranularDateRange>filter.value)?.granularity.value
  const defaultQuickFilter = preventDefault ? 'none' : (<GranularDateRange>filter.value)?.quickFilter.value

  const granularityOptions = getGranularityOptions()
  const quickFilterOptions = getQuickFilterOptions()

  const value = {
    start: start || defaultStart || (<DateFilterValue>filter).min,
    end: end || defaultEnd || (<DateFilterValue>filter).max,
    granularity: {
      value: granularity || defaultGranularity,
      display: getOptionDisplayValue(granularity || defaultGranularity, granularityOptions),
    },
    quickFilter: {
      value: quickFilter || defaultQuickFilter,
      display: getOptionDisplayValue(quickFilter || defaultQuickFilter, quickFilterOptions),
    },
  } as GranularDateRange

  return value
}

const getFilterFromDefinition = (
  filter: components['schemas']['FilterDefinition'] & { defaultGranularity: string; defaultQuickFilterValue: string },
  filterData: FilterValue,
) => {
  let value = <GranularDateRange>StartEndDateUtils.getStartAndEndValueFromDefinition(filter)
  let quickFilterValue
  const granularityOptions = getGranularityOptions()
  const quickFilterOptions = getQuickFilterOptions()

  if (!StartEndDateUtils.isDateRange(value)) {
    quickFilterValue = value
    const { start, end, granularity } = setDateRangeFromQuickFilterValue(value)
    value = {
      start,
      end,
      granularity: {
        value: granularity,
        display: getOptionDisplayValue(granularity, granularityOptions),
      },
      quickFilter: {
        value: quickFilterValue,
        display: getOptionDisplayValue(quickFilterValue, quickFilterOptions),
      },
    }
  } else {
    const granularityValue = value.granularity ? value.granularity.value : filter.defaultGranularity || 'days'

    value = {
      ...value,
      granularity: {
        value: granularityValue,
        display: getOptionDisplayValue(granularityValue, granularityOptions),
      },
      quickFilter: {
        value: 'none',
        display: 'None',
      },
    }
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
  setValueFromRequest,
}
