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
        {
          text: 'Filter 5',
          name: 'filter5',
          type: FilterType.dateRange,
          value: {
            start: '01/02/20',
            end: '01/02/22',
          },
          min: '01/02/20',
          max: '01/02/22',
        },
      ]
    })

    it('getSelectedFilters', () => {
      const result = SelectedFiltersUtils.getSelectedFilters(filters, 'filters.')
      const expectedResult = [
        {
          text: `Filter 2: value 2`,
          key: '["filters.filter2"]',
          value: ['value 2'],
          classes: 'interactive-remove-filter-button',
          disabled: false,
          attributes: {
            'aria-label': `Selected Filter: Filter 2: value 2. Click to clear this filter`,
          },
        },
        {
          text: `Filter 4: value 4`,
          key: '["filters.filter4"]',
          value: ['value 4'],
          classes: 'interactive-remove-filter-button',
          disabled: false,
          attributes: {
            'aria-label': `Selected Filter: Filter 4: value 4. Click to clear this filter`,
          },
        },
        {
          text: `Filter 5: 12/12/23 - 21/11/24`,
          key: '["filters.filter5.start","filters.filter5.end"]',
          value: ['"12/12/23"', '"21/11/24"'],
          classes: 'interactive-remove-filter-button',
          disabled: false,
          attributes: {
            'aria-label': `Selected Filter: Filter 5: 12/12/23 - 21/11/24. Click to clear this filter`,
          },
        },
        {
          text: 'Filter 5: 01/02/20 - 01/02/22 (maximum range)',
          key: '["filters.filter5.start","filters.filter5.end"]',
          value: ['"01/02/20"', '"01/02/22"'],
          classes: 'interactive-remove-filter-button interactive-remove-filter-button--disabled',
          disabled: true,
          attributes: {
            'aria-label':
              'Selected Filter: Filter 5: 01/02/20 - 01/02/22 (maximum range). This filter cant be removed. Update the filter input to change the value',
          },
        },
      ]
      expect(result).toEqual(expectedResult)
    })
  })
})
