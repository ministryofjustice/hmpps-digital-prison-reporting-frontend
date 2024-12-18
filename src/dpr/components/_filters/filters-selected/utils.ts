/* eslint-disable no-param-reassign */
import { FilterType } from '../filter-input/enum'
import { FilterValue, DateRange, DateFilterValue } from '../types'

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
        key = [`${prefix}${f.name}.start`, `${prefix}${f.name}.end`]
        value = [(<DateRange>f.value).start, (<DateRange>f.value).end]
        displayValue = `${(<DateRange>f.value).start} - ${(<DateRange>f.value).end}`
        ;({ disabled, cantRemoveClass, displayValue } = disabledDateRange(
          f,
          value,
          disabled,
          cantRemoveClass,
          displayValue,
        ))
      } else if (f.type.toLowerCase() === FilterType.date.toLowerCase()) {
        key = [`${prefix}${f.name}`]
        value = [displayValue]
        ;({ disabled, cantRemoveClass, displayValue } = disabledDate(f, value, disabled, cantRemoveClass, displayValue))
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

const disabledDateRange = (
  f: DateFilterValue,
  value: (string | DateRange)[],
  disabled: boolean,
  cantRemoveClass: string,
  displayValue: string,
) => {
  const { min, max } = <DateFilterValue>f
  if (value[0] === min && value[1] === max) {
    return {
      disabled: true,
      cantRemoveClass: ' interactive-remove-filter-button--disabled',
      displayValue: `${displayValue} (maximum range)`,
    }
  }
  return {
    disabled,
    cantRemoveClass,
    displayValue,
  }
}

const disabledDate = (
  f: DateFilterValue,
  value: (string | DateRange)[],
  disabled: boolean,
  cantRemoveClass: string,
  displayValue: string,
) => {
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
    disabled,
    cantRemoveClass,
    displayValue,
  }
}

export default {
  getSelectedFilters,
}
