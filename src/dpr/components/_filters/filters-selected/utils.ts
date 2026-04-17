/* eslint-disable no-param-reassign */
import { FilterType } from '../filter-input/enum'
import {
  FilterValue,
  DateRange,
  DateFilterValue,
  DateRangeFilterValue,
  FilterValueWithOptions,
  GranularDateRangeFilterValue,
  MultiselectFilterValue,
} from '../types'
import DateRangeFilterUtils from '../../_inputs/date-range/utils'
import DateMapper from '../../../utils/DateMapper/DateMapper'

const setDateDisplayFormat = (dateValue: string) => {
  const dateMapper = new DateMapper()
  const type = dateMapper.getDateType(dateValue)
  if (type !== 'none') {
    dateValue = dateMapper.toDateString(dateValue, 'local-date') || dateValue
  }
  return dateValue
}

const setSelectedDateRange = (f: DateRangeFilterValue, prefix: string) => {
  const startValue = (<DateRange>f.value).start || 'Open start'
  const endValue = (<DateRange>f.value).end || 'Open end'
  const value = [`"${startValue}"`, `"${endValue}"`]
  const name = `${prefix}${f.name}`
  const key = [`${name}.start`, `${name}.end`]

  const displayStartValue = setDateDisplayFormat(startValue)
  const displayEndValue = setDateDisplayFormat(endValue)
  let displayValue = `${displayStartValue} - ${displayEndValue}`
  const { relative } = <DateRange>f.value
  if (relative) {
    key.push(`${name}.relative-duration`)
    value.push(`"${relative}"`)
    displayValue = DateRangeFilterUtils.mapRelativeValue(relative)
  }

  const constraints = setMinMaxContraints(f, key)
  const { disabled, cantRemoveClass, displayValue: disabledDisplayValue } = disabledDateRange(f, value, displayValue)

  return {
    key,
    value,
    displayValue: disabledDisplayValue || displayValue,
    disabled,
    cantRemoveClass,
    constraints,
  }
}

const setMinMaxContraints = (f: DateFilterValue | DateRangeFilterValue, key: string[], singleDate = false) => {
  const constraints: { key: string; value: string }[] = []
  const { min, max } = f
  if (min) {
    constraints.push({
      key: key[0],
      value: min,
    })
  }
  if (max && !singleDate) {
    constraints.push({
      key: key[1],
      value: max,
    })
  }
  return constraints.length ? constraints : undefined
}

const getOptionsValue = (f: FilterValueWithOptions, prefix: string) => {
  const displayOption = f.options.find((opt) => opt.value === f.value)
  const displayValue = displayOption ? displayOption.text : ''
  const key = [`${prefix}${f.name}`]
  const value = [`"${f.value}"`]

  return {
    key,
    value,
    displayValue,
  }
}

const getMultiselectValues = (f: FilterValueWithOptions, prefix: string) => {
  const MAX_VALUES = 3
  const splitValues = (<string>f.value).split(',')
  let displayValue = splitValues
    .map((v) => {
      const displayOption = f.options.find((opt) => opt.value === v)
      return displayOption ? displayOption.text : ''
    })
    .filter((_v, i) => {
      return i < MAX_VALUES
    })
    .join(', ')

  displayValue =
    splitValues.length > MAX_VALUES ? `${displayValue} + ${splitValues.length - MAX_VALUES} more` : displayValue

  const value = splitValues.map((v) => `"${v}"`)
  const key = [`${prefix}${f.name}`]

  return {
    key,
    value,
    displayValue,
  }
}

const setSelectedGranularDateRange = (f: GranularDateRangeFilterValue, prefix: string) => {
  const startValue = f.value.start || 'Open start'
  const endValue = f.value.end || 'Open end'
  const quickFilterValue = f.value.quickFilter?.value
  const quickFilterDisplay = f.value.quickFilter?.display
  const granularityValue = f.value.granularity.value
  const name = `${prefix}${f.name}`

  const key = [`${name}.start`, `${name}.end`, `${name}.granularity`]
  const value = [`"${startValue}"`, `"${endValue}"`, `"${granularityValue}"`]
  const constraints = setMinMaxContraints(f, key)

  let displayValue
  const granularityDisplay = f.value.granularity.display
  if (quickFilterValue && quickFilterValue !== 'none' && quickFilterDisplay) {
    key.push(`${name}.quick-filter`)
    value.push(`"${quickFilterValue}"`)
    displayValue = `${quickFilterDisplay}: ${granularityDisplay}`
  } else {
    const displayStartValue = setDateDisplayFormat(startValue)
    const displayEndValue = setDateDisplayFormat(endValue)
    displayValue = `${displayStartValue} - ${displayEndValue}: ${granularityDisplay}`
  }

  const { disabled, cantRemoveClass, displayValue: disabledDisplayValue } = disabledDateRange(f, value, displayValue)

  return {
    key,
    value,
    displayValue: disabledDisplayValue || displayValue,
    disabled,
    constraints,
    cantRemoveClass,
  }
}

const disabledDateRange = (f: DateRangeFilterValue | DateFilterValue, value: string[], displayValue: string) => {
  const { min, max } = f
  if (min && (<string>value[0]).includes(min) && max && (<string>value[1]).includes(max)) {
    return {
      disabled: true,
      cantRemoveClass: ' interactive-remove-filter-button--disabled',
      displayValue: `${displayValue} (maximum range)`,
    }
  }
  return {
    disabled: false,
    cantRemoveClass: '',
    displayValue,
  }
}

export const getQuerySummary = (reqQuery: Record<string, unknown>, filters: FilterValue[]) => {
  const prefix = 'filters.'

  return filters
    .filter(
      (f) => reqQuery[`filters.${f.name}`] || reqQuery[`filters.${f.name}.start`] || reqQuery[`filters.${f.name}.end`],
    )
    .map((f) => {
      let { value } = f

      if (f.type.toLowerCase() === FilterType.multiselect.toLowerCase()) {
        value = <string>getMultiselectValues(<MultiselectFilterValue>f, 'filters').displayValue
      }

      if (
        f.type.toLowerCase() === FilterType.autocomplete.toLowerCase() ||
        f.type.toLowerCase() === FilterType.radio.toLowerCase() ||
        f.type.toLowerCase() === FilterType.select.toLowerCase()
      ) {
        value = <string>getOptionsValue(<FilterValueWithOptions>f, prefix).displayValue
      }

      if (f.type.toLowerCase() === FilterType.date.toLowerCase()) {
        value = setDateDisplayFormat(<string>f.value)
      }

      if (f.type.toLowerCase() === FilterType.dateRange.toLowerCase()) {
        value = setSelectedDateRange(<DateRangeFilterValue>f, prefix).displayValue
      }

      if (f.type.toLowerCase() === FilterType.granularDateRange.toLowerCase()) {
        value = setSelectedGranularDateRange(<GranularDateRangeFilterValue>f, prefix).displayValue
      }

      return {
        id: f.name,
        name: f.text,
        value: <string>value,
      }
    })
}

export default {
  getQuerySummary,
}
