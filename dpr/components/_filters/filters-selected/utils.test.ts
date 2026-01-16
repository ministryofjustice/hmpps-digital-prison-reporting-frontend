import { expect } from '@jest/globals'
import SelectedFiltersUtils from './utils'
import type { FilterValue } from '../types'
import { FilterType } from '../filter-input/enum'

describe('SelectedFiltersUtils', () => {
  let filters: FilterValue[] = []

  beforeEach(() => {
    filters = [
      {
        text: 'Filter 1',
        name: 'filter1',
        type: FilterType.text,
        value: '',
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
        value: '',
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
        text: 'Filter 6',
        name: 'filter6',
        type: FilterType.dateRange,
        value: {
          start: '01/02/20',
          end: '01/02/22',
        },
        min: '01/02/20',
        max: '01/02/22',
      },
      {
        text: 'Field 7',
        name: 'filter7',
        type: FilterType.multiselect,
        value: 'value7.2,value7.3',
        minimumLength: undefined,
        dynamicResourceEndpoint: undefined,
        mandatory: false,
        options: [
          {
            value: 'value7.1',
            text: 'Value 7.1',
          },
          {
            value: 'value7.2',
            text: 'Value 7.2',
          },
          {
            value: 'value7.3',
            text: 'Value 7.3',
          },
          {
            value: 'value7.4',
            text: 'Value 7.4',
          },
        ],
        values: ['value8.2', 'value8.3'],
      },
      {
        text: 'Field 8',
        name: 'filter8',
        type: FilterType.select,
        value: 'value8.1',
        minimumLength: undefined,
        dynamicResourceEndpoint: undefined,
        mandatory: false,
        options: [
          {
            value: '',
            text: 'Select your option',
            disabled: true,
            selected: true,
          },
          {
            value: 'no-filter',
            text: 'None',
            disabled: false,
          },
          {
            value: 'value8.1',
            text: 'Value 8.1',
          },
          {
            value: 'value8.2',
            text: 'Value 8.2',
          },
          {
            value: 'value8.3',
            text: 'Value 8.3',
          },
        ],
      },
    ]
  })

  describe('getSelectedFilters', () => {
    it('should get the selected filters', () => {
      const result = SelectedFiltersUtils.getSelectedFilters(filters, 'filters.')
      const expectedResult = [
        {
          text: `Filter 2`,
          displayValue: 'value 2',
          key: '["filters.filter2"]',
          value: ['"value 2"'],
          classes: 'interactive-remove-filter-button',
          disabled: false,
          attributes: {
            'aria-label': `Selected Filter: Filter 2: value 2. Click to clear this filter`,
          },
        },
        {
          text: `Filter 4`,
          displayValue: 'value 4',
          key: '["filters.filter4"]',
          value: ['"value 4"'],
          classes: 'interactive-remove-filter-button',
          disabled: false,
          attributes: {
            'aria-label': `Selected Filter: Filter 4: value 4. Click to clear this filter`,
          },
        },
        {
          text: `Filter 5`,
          displayValue: '12/12/2023 - 21/11/2024',
          key: '["filters.filter5.start","filters.filter5.end"]',
          value: ['"12/12/23"', '"21/11/24"'],
          classes: 'interactive-remove-filter-button',
          disabled: false,
          attributes: {
            'aria-label': `Selected Filter: Filter 5: 12/12/2023 - 21/11/2024. Click to clear this filter`,
          },
        },
        {
          text: 'Filter 6',
          displayValue: '01/02/2020 - 01/02/2022 (maximum range)',
          key: '["filters.filter6.start","filters.filter6.end"]',
          value: ['"01/02/20"', '"01/02/22"'],
          classes: 'interactive-remove-filter-button interactive-remove-filter-button--disabled',
          disabled: true,
          constraints: [
            {
              key: 'filters.filter6.start',
              value: '01/02/20',
            },
            {
              key: 'filters.filter6.end',
              value: '01/02/22',
            },
          ],
          attributes: {
            'aria-label':
              'Selected Filter: Filter 6: 01/02/2020 - 01/02/2022 (maximum range). This filter cant be removed. Update the filter input to change the value',
          },
        },
        {
          attributes: {
            'aria-label': 'Selected Filter: Field 7: Value 7.2, Value 7.3. Click to clear this filter',
          },
          classes: 'interactive-remove-filter-button',
          constraints: undefined,
          disabled: false,
          key: '["filters.filter7"]',
          text: 'Field 7',
          displayValue: 'Value 7.2, Value 7.3',
          value: ['"value7.2"', '"value7.3"'],
        },
        {
          attributes: {
            'aria-label': 'Selected Filter: Field 8: Value 8.1. Click to clear this filter',
          },
          classes: 'interactive-remove-filter-button',
          constraints: undefined,
          disabled: false,
          key: '["filters.filter8"]',
          text: 'Field 8',
          displayValue: 'Value 8.1',
          value: ['"value8.1"'],
        },
      ]
      expect(result).toEqual(expectedResult)
    })
  })

  describe('getQuerySummary', () => {
    it('should set the query summary', () => {
      const result = SelectedFiltersUtils.getQuerySummary(
        {
          'filters.filter2': 'anything',
          'filters.filter4': 'anything',
          'filters.filter5.start': 'anything',
          'filters.filter5.end': 'anything',
          'filters.filter6.start': 'anything',
          'filters.filter6.end': 'anything',
          'filters.filter7': 'anything',
          'filters.filter8': 'anything',
        },
        filters,
      )

      expect(result).toEqual([
        {
          id: 'filter2',
          name: 'Filter 2',
          value: 'value 2',
        },
        {
          id: 'filter4',
          name: 'Filter 4',
          value: 'value 4',
        },
        {
          id: 'filter5',
          name: 'Filter 5',
          value: '12/12/2023 - 21/11/2024',
        },
        {
          id: 'filter6',
          name: 'Filter 6',
          value: '01/02/2020 - 01/02/2022 (maximum range)',
        },
        {
          id: 'filter7',
          name: 'Field 7',
          value: 'Value 7.2, Value 7.3',
        },
        {
          id: 'filter8',
          name: 'Field 8',
          value: 'Value 8.1',
        },
      ])
    })
  })
})
