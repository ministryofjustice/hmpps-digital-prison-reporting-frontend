/* eslint-disable no-param-reassign */
import { Request } from 'express'
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

const getSelectedFilters = (filters: FilterValue[], prefix: string) => {
  const emptyValues: (string | undefined | null)[] = [undefined, null, '']

  return filters
    .filter((f) => {
      return (
        (f.value &&
          Object.prototype.hasOwnProperty.call(f.value, 'start') &&
          !emptyValues.includes((<DateRange>f.value).start)) ||
        (f.value &&
          Object.prototype.hasOwnProperty.call(f.value, 'end') &&
          !emptyValues.includes((<DateRange>f.value).end)) ||
        (f.value &&
          !Object.prototype.hasOwnProperty.call(f.value, 'start') &&
          !Object.prototype.hasOwnProperty.call(f.value, 'end'))
      )
    })
    .filter((f) => {
      return f.value && f.value !== 'no-filter'
    })
    .map((f) => {
      let displayValue = `${f.value}`
      let value: (string | DateRange)[] = [`"${displayValue}"`]
      let key: string[] = [`${prefix}${f.name}`]
      let cantRemoveClass = ''
      let disabled = false
      let constraints: { key: string; value: string }[] | undefined

      if (f.type.toLowerCase() === FilterType.dateRange.toLowerCase()) {
        ;({ key, value, disabled, cantRemoveClass, displayValue, constraints } = setSelectedDateRange(
          <DateRangeFilterValue>f,
          prefix,
        ))
      }

      if (f.type.toLowerCase() === FilterType.granularDateRange.toLowerCase()) {
        ;({ key, value, disabled, cantRemoveClass, displayValue, constraints } = setSelectedGranularDateRange(
          <GranularDateRangeFilterValue>f,
          prefix,
        ))
      }

      if (f.type.toLowerCase() === FilterType.date.toLowerCase()) {
        ;({ key, value, disabled, cantRemoveClass, displayValue, constraints } = getSelectedDate(
          <DateFilterValue>f,
          prefix,
        ))
      }

      if (
        f.type.toLowerCase() === FilterType.autocomplete.toLowerCase() ||
        f.type.toLowerCase() === FilterType.radio.toLowerCase() ||
        f.type.toLowerCase() === FilterType.select.toLowerCase()
      ) {
        ;({ key, value, displayValue } = getOptionsValue(<FilterValueWithOptions>f, prefix))
      }

      if (f.type.toLowerCase() === FilterType.multiselect.toLowerCase()) {
        ;({ key, value, displayValue } = getMultiselectValues(<FilterValueWithOptions>f, prefix))
      }

      let ariaLabel
      if (disabled) {
        ariaLabel = `Selected Filter: ${f.text}: ${displayValue}. This filter cant be removed. Update the filter input to change the value`
      } else {
        ariaLabel = `Selected Filter: ${f.text}: ${displayValue}. Click to clear this filter`
      }

      return {
        text: f.text,
        displayValue,
        key: JSON.stringify(key),
        value,
        disabled,
        constraints,
        classes: `interactive-remove-filter-button${cantRemoveClass}`,
        attributes: {
          'aria-label': ariaLabel,
        },
      }
    })
}

const setSelectedDateRange = (f: DateRangeFilterValue, prefix: string) => {
  const startValue = f.value.start || 'Open start'
  const endValue = f.value.end || 'Open end'
  const name = `${prefix}${f.name}`

  const key = [`${name}.start`, `${name}.end`]
  const value = [`"${startValue}"`, `"${endValue}"`]

  let displayValue = `${startValue} - ${endValue}`
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
    .filter((v, i) => {
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
    displayValue = `${startValue} - ${endValue}: ${granularityDisplay}`
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

const getSelectedDate = (f: DateFilterValue, prefix: string) => {
  const key = [`${prefix}${f.name}`]
  const displayValue = `${f.value}`
  const value = [`"${displayValue}"`]
  const constraints = setMinMaxContraints(f, key, true)

  const { disabled, cantRemoveClass, displayValue: disabledDisplayValue } = disabledDate(f, value, displayValue)
  return {
    key,
    value,
    displayValue: disabledDisplayValue || displayValue,
    disabled,
    constraints,
    cantRemoveClass,
  }
}

const disabledDateRange = (
  f: DateRangeFilterValue | DateFilterValue,
  value: (string | DateRange)[],
  displayValue: string,
) => {
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

const disabledDate = (f: DateFilterValue, value: (string | DateRange)[], displayValue: string) => {
  const { min, max } = <DateFilterValue>f

  if ((min && (<string>value[0]).includes(min)) || (max && (<string>value[0]).includes(max))) {
    let valueType
    if (min && (<string>value[0]).includes(min)) valueType = 'min'
    if (max && (<string>value[0]).includes(max)) valueType = 'max'

    return {
      disabled: true,
      cantRemoveClass: ' interactive-remove-filter-button--disabled',
      displayValue: `${displayValue} (${valueType} date)`,
    }
  }
  return {
    disabled: false,
    cantRemoveClass: '',
    displayValue,
  }
}

const getQuerySummary = (req: Request, filters: FilterValue[]) => {
  const { query } = req
  const prefix = 'filters.'

  return filters
    .filter((f) => query[`filters.${f.name}`] || query[`filters.${f.name}.start`] || query[`filters.${f.name}.end`])
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
  getSelectedFilters,
  getQuerySummary,
}
