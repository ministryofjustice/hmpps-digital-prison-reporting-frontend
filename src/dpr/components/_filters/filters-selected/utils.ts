import { FilterType } from '../filter-input/enum'
import { FilterValue, DateRange } from '../../filters/types'

const getSelectedFilters = (filters: FilterValue[], prefix: string) => {
  return filters
    .filter((f) => f.value)
    .map((f) => {
      let value = []
      let key: string[] = []
      let displayValue = f.value

      if (f.type === FilterType.dateRange.toLowerCase()) {
        displayValue = `${(<DateRange>f.value).start} - ${(<DateRange>f.value).start}`
        value = [(<DateRange>f.value).start, (<DateRange>f.value).end]
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
          'aria-label': `Selected Filter: ${f.text}: ${value}. Click to clear this filter`,
        },
      }
    })
}

export default {
  getSelectedFilters,
}
