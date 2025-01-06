import dayjs from 'dayjs'
import { Request } from 'express'
import { components } from '../../../types/api'
import { DateFilterValue, FilterValue, GranularDateRange } from '../../_filters/types'

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

const getOptionDisplayValue = (value: string, options: { text: string; value: string }[]) => {
  const item = options.find((opt) => {
    return opt.value === value
  })

  return item.text || value
}

const setValueFromRequest = (filter: FilterValue, req: Request, prefix: string) => {
  const { preventDefault } = req.query

  const start = <string>req.query[`${prefix}${filter.name}.start`]
  const end = <string>req.query[`${prefix}${filter.name}.end`]
  const granularity = <string>req.query[`${prefix}${filter.name}.granularity`]
  const quickFilter = <string>req.query[`${prefix}${filter.name}.quick-filter`]

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
  filter: components['schemas']['FilterDefinition'] & { defaultGranularity: string },
  filterData: FilterValue,
) => {
  // console.log({ filter })
  let value = <GranularDateRange>StartEndDateUtils.getStartAndEndValueFromDefinition(filter)
  let quickFilterValue
  const granularityOptions = getGranularityOptions()
  const quickFilterOptions = getQuickFilterOptions()

  if (!StartEndDateUtils.isDateRange(value)) {
    quickFilterValue = value
    // console.log({ quickFilterValue })
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

  const result = {
    ...filterData,
    min: filter.min,
    max: filter.max,
    value,
    quickFilterOptions: getQuickFilterOptions(),
    granularityOptions: getGranularityOptions(),
  }

  console.log(JSON.stringify(result, null, 2))

  return result
}

export default {
  getFilterFromDefinition,
  setValueFromRequest,
}
