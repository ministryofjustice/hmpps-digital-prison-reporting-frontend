/* eslint-disable no-param-reassign */
import { FilterType } from '../filter-input/enum'
import { FilterValue, DateRange, DateFilterValue, GranularDateRange } from '../types'

const getSelectedFilters = (filters: FilterValue[], prefix: string) => {
  return filters
    .filter((f) => {
      return (
        (f.value &&
          Object.prototype.hasOwnProperty.call(f.value, 'start') &&
          (<DateRange>f.value).start !== undefined) ||
        (f.value && Object.prototype.hasOwnProperty.call(f.value, 'end') && (<DateRange>f.value).end !== undefined) ||
        (f.value &&
          !Object.prototype.hasOwnProperty.call(f.value, 'start') &&
          !Object.prototype.hasOwnProperty.call(f.value, 'end'))
      )
    })
    .map((f) => {
      let value: (string | DateRange)[] = []
      let key: string[] = []
      let displayValue = `${f.value}`
      let cantRemoveClass = ''
      let disabled = false

      if (f.type.toLowerCase() === FilterType.dateRange.toLowerCase()) {
        ;({ key, value, disabled, cantRemoveClass, displayValue } = setSelectedDateRange(f, prefix))
      } else if (f.type.toLowerCase() === FilterType.granularDateRange.toLowerCase()) {
        ;({ key, value, disabled, cantRemoveClass, displayValue } = setSelectedGranularDateRange(f, prefix))
      } else if (f.type.toLowerCase() === FilterType.date.toLowerCase()) {
        ;({ key, value, disabled, cantRemoveClass, displayValue } = getSelectedDate(f, prefix))
      } else {
        key = [`${prefix}${f.name}`]
        value = [displayValue]
      }

      let ariaLabel
      if (disabled) {
        ariaLabel = `Selected Filter: ${f.text}: ${displayValue}. This filter cant be removed. Update the filter input to change the value`
      } else {
        ariaLabel = `Selected Filter: ${f.text}: ${displayValue}. Click to clear this filter`
      }

      return {
        text: `${f.text}: ${displayValue}`,
        key: JSON.stringify(key),
        value: JSON.stringify(value),
        disabled,
        classes: `interactive-remove-filter-button${cantRemoveClass}`,
        attributes: {
          'aria-label': ariaLabel,
        },
      }
    })
}

const setSelectedDateRange = (f: FilterValue, prefix: string) => {
  const key = [`${prefix}${f.name}.start`, `${prefix}${f.name}.end`]
  const value = [(<DateRange>f.value).start, (<DateRange>f.value).end]
  const displayValue = `${(<DateRange>f.value).start} - ${(<DateRange>f.value).end}`
  const { disabled, cantRemoveClass, displayValue: disabledDisplayValue } = disabledDateRange(f, value, displayValue)

  return {
    key,
    value,
    displayValue: disabledDisplayValue || displayValue,
    disabled,
    cantRemoveClass,
  }
}

const setSelectedGranularDateRange = (f: FilterValue, prefix: string) => {
  console.log(JSON.stringify({ f }, null, 2))

  const quickFilterValue = (<GranularDateRange>f.value).quickFilter
  const key = [`${prefix}${f.name}.start`, `${prefix}${f.name}.end`, `${prefix}${f.name}.granularity`]
  const value = [
    (<GranularDateRange>f.value).start,
    (<GranularDateRange>f.value).end,
    (<GranularDateRange>f.value).granularity.value,
  ]

  let displayValue
  const granularityDisplay = (<GranularDateRange>f.value).granularity.display
  if (quickFilterValue) {
    key.push(`${prefix}${f.name}.quick-filter`)
    value.push((<GranularDateRange>f.value).quickFilter.value)
    displayValue = `${(<GranularDateRange>f.value).quickFilter.display}: ${granularityDisplay}`
  } else {
    displayValue = `${(<GranularDateRange>f.value).start} - ${(<GranularDateRange>f.value).end}: ${granularityDisplay}`
  }

  const { disabled, cantRemoveClass, displayValue: disabledDisplayValue } = disabledDateRange(f, value, displayValue)

  return {
    key,
    value,
    displayValue: disabledDisplayValue || displayValue,
    disabled,
    cantRemoveClass,
  }
}

const getSelectedDate = (f: FilterValue, prefix: string) => {
  const key = [`${prefix}${f.name}`]
  const displayValue = `${f.value}`
  const value = [displayValue]
  const { disabled, cantRemoveClass, displayValue: disabledDisplayValue } = disabledDate(f, value, displayValue)
  return {
    key,
    value,
    displayValue: disabledDisplayValue || displayValue,
    disabled,
    cantRemoveClass,
  }
}

const disabledDateRange = (f: DateFilterValue, value: (string | DateRange)[], displayValue: string) => {
  const { min, max } = <DateFilterValue>f
  if (value[0] === min && value[1] === max) {
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
  if (value[0] === min || value[0] === max) {
    let valueType
    if (value[0] === min) valueType = 'min'
    if (value[0] === max) valueType = 'max'

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

export default {
  getSelectedFilters,
}
