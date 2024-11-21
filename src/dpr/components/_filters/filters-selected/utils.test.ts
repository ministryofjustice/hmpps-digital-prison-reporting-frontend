import SelectedFiltersUtils from './utils'
import type { FilterValue } from '../types'
import { FilterType } from '../filter-input/enum'

describe('Selected filters utils', () => {
  describe('getSelectedFilters', () => {
    let filters: FilterValue[] = []

    beforeEach(() => {
      filters = [
        {
          text: 'Filter 1',
          name: 'filter1',
          type: FilterType.text,
        },
        {
          text: 'Filter 2',
          name: 'filter2',
          type: FilterType.text,
          value: 'value 2',
        },
        {
          text: 'Filter 3',
          name: 'filter3',
          type: FilterType.text,
        },
        {
          text: 'Filter 4',
          name: 'filter4',
          type: FilterType.text,
          value: 'value 4',
        },
        {
          text: 'Filter 5',
          name: 'filter5',
          type: FilterType.dateRange,
          value: {
            start: '12/12/23',
            end: '21/11/24',
          },
        },
      ]
    })

    it('getSelectedFilters', () => {
      const result = SelectedFiltersUtils.getSelectedFilters(filters, 'filters.')
      const expectedResult = [
        {
          text: `Filter 2: value 2`,
          key: '["filters.filter2"]',
          value: '["value 2"]',
          classes: 'interactive-remove-filter-button',
          attributes: {
            'aria-label': `Selected Filter: Filter 2: value 2. Click to clear this filter`,
          },
        },
        {
          text: `Filter 4: value 4`,
          key: '["filters.filter4"]',
          value: '["value 4"]',
          classes: 'interactive-remove-filter-button',
          attributes: {
            'aria-label': `Selected Filter: Filter 4: value 4. Click to clear this filter`,
          },
        },
        {
          text: `Filter 5: 12/12/23 - 21/11/24`,
          key: '["filters.filter5.start","filters.filter5.end"]',
          value: '["12/12/23","21/11/24"]',
          classes: 'interactive-remove-filter-button',
          attributes: {
            'aria-label': `Selected Filter: Filter 5: 12/12/23 - 21/11/24. Click to clear this filter`,
          },
        },
      ]
      expect(result).toEqual(expectedResult)
    })
  })
})
