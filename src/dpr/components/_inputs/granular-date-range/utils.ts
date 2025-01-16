import dayjs from 'dayjs'
import { Request } from 'express'
import { components } from '../../../types/api'
import { DateFilterValue, FilterValue, GranularDateRange } from '../../_filters/types'

import StartEndDateUtils from '../start-end-date/utils'
import { Granularity, QuickFilters } from './types'

const hasPartialStartEnd = (granularity: Granularity, startDate: string, endDate: string) => {
  let partialStart
  let partialEnd

  switch (granularity) {
    case Granularity.DAILY:
      partialStart = false
      partialEnd = false
      break
    case Granularity.MONTHLY:
      {
        const startOfMonth = dayjs(startDate).startOf('month')
        const endOfMonth = dayjs(endDate).endOf('month')
        partialStart = !startOfMonth.isSame(startDate, 'day')
        partialEnd = !endOfMonth.isSame(endDate, 'day')
      }
      break
    case Granularity.ANNUALLY:
      {
        const startOfYear = dayjs(startDate).startOf('year')
        const endOfYear = dayjs(endDate).endOf('year')
        partialStart = !startOfYear.isSame(startDate, 'day')
        partialEnd = !endOfYear.isSame(endDate, 'day')
      }
      break
    default:
      partialStart = false
      partialEnd = false
      break
  }

  return {
    start: partialStart,
    end: partialEnd,
  }
}

const getQuickFilterOptions = () => {
  const options: { value: QuickFilters; text: string; disabled?: boolean }[] = [
    { value: QuickFilters.NONE, text: 'None' },
    { value: QuickFilters.TODAY, text: 'Today' },
    { value: QuickFilters.PAST, text: 'Past:', disabled: true },
    { value: QuickFilters.YESTERDAY, text: 'Yesterday' },
    { value: QuickFilters.LAST_SEVEN_DAYS, text: 'Last 7 days' },
    { value: QuickFilters.LAST_THIRTY_DAYS, text: 'Last 30 days' },
    { value: QuickFilters.LAST_MONTH, text: 'Last month' },
    { value: QuickFilters.LAST_FULL_MONTH, text: 'Last full month' },
    { value: QuickFilters.LAST_NINETY_DAYS, text: 'Last 90 days' },
    { value: QuickFilters.LAST_THREE_MONTHS, text: 'Last 3 months' },
    { value: QuickFilters.LAST_FULL_THREE_MONTHS, text: 'Last full 3 months' },
    { value: QuickFilters.LAST_YEAR, text: 'Last year' },
    { value: QuickFilters.LAST_FULL_YEAR, text: 'Last full year' },
    { value: QuickFilters.FUTURE, text: 'Future:', disabled: true },
    { value: QuickFilters.TOMORROW, text: 'Tomorrow' },
    { value: QuickFilters.NEXT_SEVEN_DAYS, text: 'Next 7 days' },
    { value: QuickFilters.NEXT_THIRTY_DAYS, text: 'Next 30 days' },
    { value: QuickFilters.NEXT_MONTH, text: 'Next month' },
    { value: QuickFilters.NEXT_FULL_MONTH, text: 'Next full month' },
    { value: QuickFilters.NEXT_NINETY_DAYS, text: 'Next 90 days' },
    { value: QuickFilters.NEXT_THREE_MONTHS, text: 'Next 3 months' },
    { value: QuickFilters.NEXT_FULL_THREE_MONTHS, text: 'Next full 3 months' },
    { value: QuickFilters.NEXT_YEAR, text: 'Next year' },
    { value: QuickFilters.NEXT_FULL_YEAR, text: 'Next full year' },
  ]

  return options
}

const getGranularityOptions = () => {
  const options: { value: Granularity; text: string; disabled?: boolean }[] = [
    { value: Granularity.HOURLY, text: 'Hourly' },
    { value: Granularity.DAILY, text: 'Daily' },
    // { value: Granularity.WEEKLY, text: 'Weekly' },
    { value: Granularity.MONTHLY, text: 'Monthly' },
    // { value: Granularity.QUARTERLY, text: 'Quarterly' },
    { value: Granularity.ANNUALLY, text: 'Annually' },
  ]

  return options
}

const setDateRangeFromQuickFilterValue = (value: string) => {
  let startDate
  let endDate
  let granularity

  switch (value) {
    case QuickFilters.TODAY:
      endDate = dayjs()
      startDate = dayjs()
      granularity = Granularity.DAILY
      break
    case QuickFilters.YESTERDAY:
      endDate = dayjs().subtract(1, 'day')
      startDate = dayjs().subtract(1, 'day')
      granularity = Granularity.DAILY
      break
    case QuickFilters.LAST_SEVEN_DAYS:
      endDate = dayjs()
      startDate = endDate.subtract(1, 'week').add(1, 'day')
      granularity = Granularity.DAILY
      break
    case QuickFilters.LAST_THIRTY_DAYS:
      endDate = dayjs()
      startDate = endDate.subtract(1, 'month').add(1, 'day')
      granularity = Granularity.DAILY
      break
    case QuickFilters.LAST_MONTH:
      endDate = dayjs()
      startDate = endDate.subtract(1, 'month').add(1, 'day')
      granularity = Granularity.MONTHLY
      break
    case QuickFilters.LAST_FULL_MONTH:
      endDate = dayjs().subtract(1, 'month').endOf('month')
      startDate = endDate.startOf('month')
      granularity = Granularity.MONTHLY
      break
    case QuickFilters.LAST_NINETY_DAYS:
      endDate = dayjs()
      startDate = endDate.subtract(3, 'month').add(1, 'day')
      granularity = Granularity.DAILY
      break
    case QuickFilters.LAST_THREE_MONTHS:
      endDate = dayjs()
      startDate = endDate.subtract(3, 'month').add(1, 'day')
      granularity = Granularity.MONTHLY
      break
    case QuickFilters.LAST_FULL_THREE_MONTHS:
      endDate = dayjs().subtract(1, 'month').endOf('month')
      startDate = endDate.subtract(2, 'month').startOf('month')
      granularity = Granularity.MONTHLY
      break
    case QuickFilters.LAST_YEAR:
      endDate = dayjs()
      startDate = endDate.subtract(1, 'year').add(1, 'day')
      granularity = Granularity.ANNUALLY
      break
    case QuickFilters.LAST_FULL_YEAR:
      endDate = dayjs().subtract(1, 'year').endOf('year')
      startDate = endDate.startOf('year')
      granularity = Granularity.ANNUALLY
      break
    case QuickFilters.TOMORROW:
      endDate = dayjs().add(1, 'day')
      startDate = dayjs().add(1, 'day')
      granularity = Granularity.DAILY
      break
    case QuickFilters.NEXT_SEVEN_DAYS:
      startDate = dayjs()
      endDate = dayjs().add(7, 'day').subtract(1, 'day')
      granularity = Granularity.DAILY
      break
    case QuickFilters.NEXT_THIRTY_DAYS:
      startDate = dayjs()
      endDate = dayjs().add(1, 'month').subtract(1, 'day')
      granularity = Granularity.DAILY
      break
    case QuickFilters.NEXT_MONTH:
      startDate = dayjs()
      endDate = dayjs().add(1, 'month').subtract(1, 'day')
      granularity = Granularity.MONTHLY
      break
    case QuickFilters.NEXT_FULL_MONTH:
      startDate = dayjs().add(1, 'month').startOf('month')
      endDate = startDate.endOf('month')
      granularity = Granularity.MONTHLY
      break
    case QuickFilters.NEXT_NINETY_DAYS:
      startDate = dayjs()
      endDate = dayjs().add(3, 'month').subtract(1, 'day')
      granularity = Granularity.DAILY
      break
    case QuickFilters.NEXT_THREE_MONTHS:
      startDate = dayjs()
      endDate = dayjs().add(3, 'month').subtract(1, 'day')
      granularity = Granularity.MONTHLY
      break
    case QuickFilters.NEXT_FULL_THREE_MONTHS:
      startDate = dayjs().add(1, 'month').startOf('month')
      endDate = startDate.add(2, 'month').endOf('month')
      granularity = Granularity.MONTHLY
      break
    case QuickFilters.NEXT_YEAR:
      startDate = dayjs()
      endDate = dayjs().add(1, 'year').subtract(1, 'day')
      granularity = Granularity.ANNUALLY
      break
    case QuickFilters.NEXT_FULL_YEAR:
      startDate = dayjs().add(1, 'year').startOf('year')
      endDate = startDate.endOf('year')
      granularity = Granularity.ANNUALLY
      break
    default:
      endDate = dayjs()
      startDate = dayjs()
      granularity = Granularity.DAILY
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
  let granularity: Granularity
  let start
  let end
  if (quickFilter && quickFilter !== QuickFilters.NONE) {
    ;({ granularity, start, end } = setDateRangeFromQuickFilterValue(quickFilter))
  } else {
    granularity = (<string>req.query[`${prefix}${filter.name}.granularity`]) as Granularity
    start = <string>req.query[`${prefix}${filter.name}.start`]
    end = <string>req.query[`${prefix}${filter.name}.end`]
  }

  const defaultStart = preventDefault ? null : (<GranularDateRange>filter.value)?.start
  const defaultEnd = preventDefault ? null : (<GranularDateRange>filter.value)?.end
  const defaultGranularity = preventDefault ? Granularity.DAILY : (<GranularDateRange>filter.value)?.granularity.value
  const defaultQuickFilter = preventDefault ? 'none' : (<GranularDateRange>filter.value)?.quickFilter.value

  const granularityOptions = getGranularityOptions()
  const quickFilterOptions = getQuickFilterOptions()

  const startDate = start || defaultStart || (<DateFilterValue>filter).min
  const endDate = end || defaultEnd || (<DateFilterValue>filter).max
  const granularityValue = granularity || defaultGranularity
  const quickFilterValue = quickFilter || defaultQuickFilter

  const value = {
    start: startDate,
    end: endDate,
    granularity: {
      value: granularityValue,
      display: getOptionDisplayValue(granularityValue, granularityOptions),
    },
    quickFilter: {
      value: quickFilterValue,
      display: getOptionDisplayValue(quickFilterValue, quickFilterOptions),
    },
    partialDate: {
      ...hasPartialStartEnd(granularityValue, startDate, endDate),
    },
  }

  return value as GranularDateRange
}

const getFilterFromDefinition = (
  filter: components['schemas']['FilterDefinition'] & {
    defaultGranularity: Granularity
    defaultQuickFilterValue: QuickFilters
  },
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
      partialDate: {
        ...hasPartialStartEnd(granularity, start, end),
      },
    }
  } else {
    const granularityValue: Granularity = value.granularity
      ? value.granularity.value
      : filter.defaultGranularity || Granularity.DAILY

    value = {
      ...value,
      granularity: {
        value: granularityValue,
        display: getOptionDisplayValue(granularityValue, granularityOptions),
      },
      quickFilter: {
        value: QuickFilters.NONE,
        display: 'None',
      },
      partialDate: {
        ...hasPartialStartEnd(granularityValue, value.start, value.end),
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
