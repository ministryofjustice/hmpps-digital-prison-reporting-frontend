import { FilterType } from '../filter-input/enum'
import { FilterValue, DateRange } from '../types'

const getSelectedFilters = (filters: FilterValue[], prefix: string) => {
  return filters
    .filter((f) => f.value)
    .map((f) => {
      let value = []
      let key: string[] = []
      let displayValue = f.value

      if (f.type.toLowerCase() === FilterType.dateRange.toLowerCase()) {
        key = [`${prefix}${f.name}.start`, `${prefix}${f.name}.end`]
        value = [(<DateRange>f.value).start, (<DateRange>f.value).end]
        displayValue = `${(<DateRange>f.value).start} - ${(<DateRange>f.value).end}`
      } else {
        key = [`${prefix}${f.name}`]
        value = [displayValue]
      }

      return {
        text: `${f.text}: ${displayValue}`,
        key: JSON.stringify(key),
        value: JSON.stringify(value),
        classes: 'interactive-remove-filter-button',
        attributes: {
          'aria-label': `Selected Filter: ${f.text}: ${displayValue}. Click to clear this filter`,
        },
      }
    })
}

export default {
  getSelectedFilters,
}
