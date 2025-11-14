import { expect, jest } from '@jest/globals'
import { Request, Response } from 'express'
import MockDate from 'mockdate'
import FiltersUtils from './utils'
import PersonalistionUtils from '../../utils/Personalisation/personalisationUtils'
import mockVariant from '../../../../test-app/mocks/mockClients/reports/mockVariants/request-examples/success'
import { components } from '../../types/api'
import DateRangeUtils from '../_inputs/date-range/utils'
import GranularDaterangeUtils from '../_inputs/granular-date-range/utils'
import { DEFAULT_FILTERS_PREFIX } from '../../types/ReportQuery'
import { FilterValue } from './types'
import { FilterType } from './filter-input/enum'
import { Granularity, QuickFilters } from '../_inputs/granular-date-range/types'
import { defaultFilterValue } from '../../utils/Personalisation/types'
import { FiltersType } from './filtersTypeEnum'

describe('Filters Utils tests', () => {
  let req: Request = {
    baseUrl: 'baseUrl',
    path: 'path',
    query: {
      dataProductDefinitionsPath: '',
    },
  } as unknown as Request

  describe('getFilters', () => {
    it('should get the filters from the definition', async () => {
      const fields = mockVariant.specification.fields as unknown as components['schemas']['FieldDefinition'][]
      const result = await FiltersUtils.getFilters({
        fields,
        req,
        filtersType: FiltersType.REQUEST,
      })

      expect(result).toEqual({
        canSaveDefaults: false,
        filters: [
          {
            text: 'Field 1',
            name: 'field1',
            type: 'Radio',
            options: [
              { value: 'no-filter', text: 'None', disabled: false },
              { value: 'value1.1', text: 'Value 1.1' },
              { value: 'value1.2', text: 'Value 1.2' },
              { value: 'value1.3', text: 'Value 1.3' },
            ],
            value: 'value1.2',
            mandatory: false,
          },
          {
            text: 'Field 2',
            name: 'field2',
            type: 'Select',
            options: [
              {
                value: '',
                text: 'Select your option',
                disabled: true,
                selected: true,
              },
              { value: 'no-filter', text: 'None', disabled: false },
              { value: 'value2.1', text: 'Value 2.1' },
              { value: 'value2.2', text: 'Value 2.2' },
              { value: 'value2.3', text: 'Value 2.3' },
            ],
            value: null,
            mandatory: false,
          },
          {
            text: 'Field 3',
            name: 'field3',
            type: 'daterange',
            value: { start: '2003-02-01', end: '2006-05-04' },
            mandatory: true,
            min: '2003-02-01',
            max: '2007-05-04',
            relativeOptions: [],
          },
          {
            text: 'Field 4',
            name: 'field4',
            type: 'autocomplete',
            options: [
              { value: 'Fezzick', text: 'Fezzick' },
              { value: 'Inigo Montoya', text: 'Inigo Montoya' },
              { value: 'PrHu', text: 'Prince Humperdink' },
              { value: 'Princess Buttercup', text: 'Princess Buttercup' },
              { value: 'Westley', text: 'Westley' },
            ],
            value: null,
            minimumLength: 3,
            mandatory: false,
          },
          {
            text: 'Field 5',
            name: 'field5',
            type: 'autocomplete',
            options: [],
            value: null,
            minimumLength: 3,
            mandatory: false,
          },
          {
            text: 'Field 6',
            name: 'field6',
            type: 'text',
            value: null,
            mandatory: false,
          },
          {
            text: 'Field 7',
            name: 'field7',
            type: 'date',
            value: '2005-02-01',
            min: '2003-02-01',
            max: '2007-05-04',
            mandatory: false,
          },
          {
            mandatory: false,
            name: 'field8',
            options: [
              {
                text: 'Value 8.1',
                value: 'value8.1',
              },
              {
                text: 'Value 8.2',
                value: 'value8.2',
              },
              {
                text: 'Value 8.3',
                value: 'value8.3',
              },
              {
                text: 'Value 8.4',
                value: 'value8.4',
              },
            ],
            pattern: undefined,
            text: 'Field 8',
            type: 'multiselect',
            value: 'value8.2,value8.3',
            values: ['value8.2', 'value8.3'],
          },
        ],
        selectedFilters: [
          {
            text: 'Field 1',
            displayValue: 'Value 1.2',
            key: '["filters.field1"]',
            value: ['"value1.2"'],
            classes: 'interactive-remove-filter-button',
            disabled: false,
            attributes: {
              'aria-label': 'Selected Filter: Field 1: Value 1.2. Click to clear this filter',
            },
          },
          {
            text: 'Field 3',
            displayValue: '01/02/2003 - 04/05/2006',
            key: '["filters.field3.start","filters.field3.end"]',
            value: ['"2003-02-01"', '"2006-05-04"'],
            constraints: [
              {
                key: 'filters.field3.start',
                value: '2003-02-01',
              },
              {
                key: 'filters.field3.end',
                value: '2007-05-04',
              },
            ],
            disabled: false,
            classes: 'interactive-remove-filter-button',
            attributes: {
              'aria-label': 'Selected Filter: Field 3: 01/02/2003 - 04/05/2006. Click to clear this filter',
            },
          },
          {
            text: 'Field 7',
            displayValue: '01/02/2005',
            key: '["filters.field7"]',
            value: ['"2005-02-01"'],
            disabled: false,
            classes: 'interactive-remove-filter-button',
            constraints: [
              {
                key: 'filters.field7',
                value: '2003-02-01',
              },
            ],
            attributes: {
              'aria-label': 'Selected Filter: Field 7: 01/02/2005. Click to clear this filter',
            },
          },
          {
            attributes: {
              'aria-label': 'Selected Filter: Field 8: Value 8.2, Value 8.3. Click to clear this filter',
            },
            classes: 'interactive-remove-filter-button',
            disabled: false,
            key: '["filters.field8"]',
            text: 'Field 8',
            displayValue: 'Value 8.2, Value 8.3',
            value: ['"value8.2"', '"value8.3"'],
          },
        ],
      })
    })

    it('should get the filters from the query params', async () => {
      const fields = mockVariant.specification.fields as unknown as components['schemas']['FieldDefinition'][]
      req = {
        ...req,
        query: {
          'filters.field1': 'value1.1',
          'filters.field2': 'value2.2',
          'filters.field3.start': '2003-02-01',
          'filters.field3.end': '2006-05-04',
          'filters.field8': ['value8.2', 'value8.4'],
        },
      } as unknown as Request
      const result = await FiltersUtils.getFilters({
        fields,
        req,
        filtersType: FiltersType.REQUEST,
      })

      expect(result).toEqual({
        canSaveDefaults: false,
        filters: [
          {
            text: 'Field 1',
            name: 'field1',
            type: 'Radio',
            value: 'value1.1',
            mandatory: false,
            options: [
              {
                value: 'no-filter',
                text: 'None',
                disabled: false,
              },
              {
                value: 'value1.1',
                text: 'Value 1.1',
              },
              {
                value: 'value1.2',
                text: 'Value 1.2',
              },
              {
                value: 'value1.3',
                text: 'Value 1.3',
              },
            ],
          },
          {
            text: 'Field 2',
            name: 'field2',
            type: 'Select',
            value: 'value2.2',
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
                value: 'value2.1',
                text: 'Value 2.1',
              },
              {
                value: 'value2.2',
                text: 'Value 2.2',
              },
              {
                value: 'value2.3',
                text: 'Value 2.3',
              },
            ],
          },
          {
            text: 'Field 3',
            name: 'field3',
            type: 'daterange',
            value: {
              start: '2003-02-01',
              end: '2006-05-04',
            },
            mandatory: true,
            min: '2003-02-01',
            max: '2007-05-04',
            relativeOptions: [],
          },
          {
            text: 'Field 4',
            name: 'field4',
            type: 'autocomplete',
            value: null,
            minimumLength: 3,
            mandatory: false,
            options: [
              {
                value: 'Fezzick',
                text: 'Fezzick',
              },
              {
                value: 'Inigo Montoya',
                text: 'Inigo Montoya',
              },
              {
                value: 'PrHu',
                text: 'Prince Humperdink',
              },
              {
                value: 'Princess Buttercup',
                text: 'Princess Buttercup',
              },
              {
                value: 'Westley',
                text: 'Westley',
              },
            ],
          },
          {
            text: 'Field 5',
            name: 'field5',
            type: 'autocomplete',
            value: null,
            minimumLength: 3,
            mandatory: false,
            options: [],
          },
          {
            text: 'Field 6',
            name: 'field6',
            type: 'text',
            value: null,
            mandatory: false,
          },
          {
            text: 'Field 7',
            name: 'field7',
            type: 'date',
            value: null,
            mandatory: false,
            min: '2003-02-01',
            max: '2007-05-04',
          },
          {
            text: 'Field 8',
            name: 'field8',
            type: 'multiselect',
            value: 'value8.2,value8.4',
            mandatory: false,
            options: [
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
              {
                value: 'value8.4',
                text: 'Value 8.4',
              },
            ],
            values: ['value8.2', 'value8.4'],
          },
        ],
        selectedFilters: [
          {
            text: 'Field 1',
            displayValue: 'Value 1.1',
            key: '["filters.field1"]',
            value: ['"value1.1"'],
            disabled: false,
            classes: 'interactive-remove-filter-button',
            attributes: {
              'aria-label': 'Selected Filter: Field 1: Value 1.1. Click to clear this filter',
            },
          },
          {
            text: 'Field 2',
            displayValue: 'Value 2.2',
            key: '["filters.field2"]',
            value: ['"value2.2"'],
            disabled: false,
            classes: 'interactive-remove-filter-button',
            attributes: {
              'aria-label': 'Selected Filter: Field 2: Value 2.2. Click to clear this filter',
            },
          },
          {
            text: 'Field 3',
            displayValue: '01/02/2003 - 04/05/2006',
            key: '["filters.field3.start","filters.field3.end"]',
            value: ['"2003-02-01"', '"2006-05-04"'],
            disabled: false,
            constraints: [
              {
                key: 'filters.field3.start',
                value: '2003-02-01',
              },
              {
                key: 'filters.field3.end',
                value: '2007-05-04',
              },
            ],
            classes: 'interactive-remove-filter-button',
            attributes: {
              'aria-label': 'Selected Filter: Field 3: 01/02/2003 - 04/05/2006. Click to clear this filter',
            },
          },
          {
            text: 'Field 8',
            displayValue: 'Value 8.2, Value 8.4',
            key: '["filters.field8"]',
            value: ['"value8.2"', '"value8.4"'],
            disabled: false,
            classes: 'interactive-remove-filter-button',
            attributes: {
              'aria-label': 'Selected Filter: Field 8: Value 8.2, Value 8.4. Click to clear this filter',
            },
          },
        ],
      })
    })
  })

  describe('setFilterQueryFromFilterDefinition', () => {
    let granularDateRangeSpy
    let dateRangeSpy

    beforeEach(() => {
      MockDate.set('2024-06-06')
    })

    afterEach(() => {
      MockDate.reset()
    })

    it('should set the filter query from the filter definition', () => {
      granularDateRangeSpy = jest.spyOn(GranularDaterangeUtils, 'getQueryFromDefinition')
      dateRangeSpy = jest.spyOn(DateRangeUtils, 'getQueryFromDefinition')

      const granularDateRangeFilter = {
        type: 'granulardaterange',
        defaultQuickFilterValue: 'last-six-months',
        defaultValue: '2003-02-01 - 2006-05-04',
        mandatory: true,
        defaultGranularity: 'months',
        interactive: true,
      } as unknown as components['schemas']['FilterDefinition']

      const dateRangeFilter: components['schemas']['FilterDefinition'] = {
        type: 'daterange',
        defaultValue: '2003-02-01 - 2006-05-04',
        min: '2003-02-01',
        max: '2007-05-04',
        mandatory: true,
      }

      const dateFilter: components['schemas']['FilterDefinition'] = {
        type: 'date',
        defaultValue: '2005-02-01',
        min: '2003-02-01',
        max: '2007-05-04',
        mandatory: true,
      }

      const multiselectFilter: components['schemas']['FilterDefinition'] = {
        type: 'multiselect',
        staticOptions: [
          { name: 'value8.1', display: 'Value 8.1' },
          { name: 'value8.2', display: 'Value 8.2' },
          { name: 'value8.3', display: 'Value 8.3' },
          { name: 'value8.4', display: 'Value 8.4' },
        ],
        defaultValue: 'value8.2,value8.3',
        mandatory: true,
      }

      const fieldParams = {
        header: false,
        mandatory: false,
        defaultsort: false,
        calculated: false,
        sortable: false,
        visible: true,
      }

      const fields: components['schemas']['FieldDefinition'][] = [
        {
          name: 'field1',
          display: 'Field 1',
          type: 'date',
          ...fieldParams,
          filter: dateRangeFilter,
        },
        {
          name: 'field2',
          display: 'Field 2',
          type: 'date',
          ...fieldParams,
          filter: dateFilter,
        },
        {
          name: 'field3',
          display: 'Field 3',
          type: 'string',
          ...fieldParams,
          filter: {
            type: 'text',
            mandatory: true,
          },
        },
        {
          name: 'field4',
          display: 'Field 4',
          type: 'date',
          ...fieldParams,
          filter: granularDateRangeFilter,
        },
        {
          name: 'field5',
          display: 'Field 5',
          type: 'string',
          ...fieldParams,
          filter: multiselectFilter,
        },
      ]

      const result = FiltersUtils.setFilterQueryFromFilterDefinition(fields)
      const expectedResult =
        'filters.field1.start=2003-02-01&filters.field1.end=2006-05-04&filters.field2=2005-02-01&filters.field4.quick-filter=last-six-months&filters.field4.granularity=monthly&filters.field4.start=2023-12-07&filters.field4.end=2024-06-06&filters.field5=value8.2&filters.field5=value8.3'

      expect(granularDateRangeSpy).toHaveBeenCalledWith(
        granularDateRangeFilter,
        'field4',
        DEFAULT_FILTERS_PREFIX,
        'filters.field4.start=2003-02-01&filters.field4.end=2006-05-04',
      )
      expect(dateRangeSpy).toHaveBeenCalledWith(dateRangeFilter, 'field1', DEFAULT_FILTERS_PREFIX)
      expect(result).toEqual(expectedResult)
    })
  })

  describe('setFilterValuesFromSavedDefaults', () => {
    it('should set the filter values from the defaults', () => {
      const defaultValues: defaultFilterValue[] = [
        {
          name: 'field1',
          value: 'value1.2',
        },
        {
          name: 'field2',
          value: 'value2.3',
        },
        {
          name: 'field3',
          value: {
            start: '01/02/2004',
            end: '04/05/2008',
          },
        },
        {
          name: 'field4',
          value: 'Inigo Montoya',
        },
        {
          name: 'field5',
          value: '',
        },
        {
          name: 'field6',
          value: 'some text',
        },
        {
          name: 'field7',
          value: '01/02/2004',
        },
        {
          name: 'field8',
          value: 'value8.2,value8.4,value8.3',
        },
        {
          name: 'field9',
          value: {
            start: '01/01/2004',
            end: '07/01/2004',
            granularity: Granularity.DAILY,
            quickFilter: QuickFilters.LAST_SEVEN_DAYS,
          },
        },
        {
          name: 'sortColumn',
          value: 'field2',
        },
        {
          name: 'sortedAsc',
          value: 'true',
        },
      ]

      const filters: FilterValue[] = [
        {
          text: 'Field 1',
          name: 'field1',
          type: FilterType.radio,
          value: 'value1.1',
          minimumLength: undefined,
          dynamicResourceEndpoint: undefined,
          mandatory: false,
          options: [
            {
              value: 'no-filter',
              text: 'None',
              disabled: false,
            },
            {
              value: 'value1.1',
              text: 'Value 1.1',
            },
            {
              value: 'value1.2',
              text: 'Value 1.2',
            },
            {
              value: 'value1.3',
              text: 'Value 1.3',
            },
          ],
        },
        {
          text: 'Field 2',
          name: 'field2',
          type: FilterType.select,
          value: 'value2.2',
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
              value: 'value2.1',
              text: 'Value 2.1',
            },
            {
              value: 'value2.2',
              text: 'Value 2.2',
            },
            {
              value: 'value2.3',
              text: 'Value 2.3',
            },
          ],
        },
        {
          text: 'Field 3',
          name: 'field3',
          type: FilterType.dateRange,
          value: {
            start: '2003-02-01',
            end: '2006-05-04',
          },
          minimumLength: undefined,
          dynamicResourceEndpoint: undefined,
          mandatory: true,
          min: '2003-02-01',
          max: '2007-05-04',
          relativeOptions: [],
        },
        {
          text: 'Field 4',
          name: 'field4',
          type: FilterType.autocomplete,
          value: null,
          minimumLength: 3,
          dynamicResourceEndpoint: undefined,
          mandatory: false,
          options: [
            {
              value: 'Fezzick',
              text: 'Fezzick',
            },
            {
              value: 'Inigo Montoya',
              text: 'Inigo Montoya',
            },
            {
              value: 'PrHu',
              text: 'Prince Humperdink',
            },
            {
              value: 'Princess Buttercup',
              text: 'Princess Buttercup',
            },
            {
              value: 'Westley',
              text: 'Westley',
            },
          ],
        },
        {
          text: 'Field 5',
          name: 'field5',
          type: FilterType.autocomplete,
          value: null,
          minimumLength: 3,
          dynamicResourceEndpoint: undefined,
          mandatory: false,
          options: [],
        },
        {
          text: 'Field 6',
          name: 'field6',
          type: FilterType.text,
          value: null,
          minimumLength: undefined,
          dynamicResourceEndpoint: undefined,
          mandatory: false,
        },
        {
          text: 'Field 7',
          name: 'field7',
          type: FilterType.date,
          value: null,
          minimumLength: undefined,
          dynamicResourceEndpoint: undefined,
          mandatory: false,
          min: '2003-02-01',
          max: '2007-05-04',
        },
        {
          text: 'Field 8',
          name: 'field8',
          type: FilterType.multiselect,
          value: 'value8.2,value8.4',
          minimumLength: undefined,
          dynamicResourceEndpoint: undefined,
          mandatory: false,
          options: [
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
            {
              value: 'value8.4',
              text: 'Value 8.4',
            },
          ],
          values: ['value8.2', 'value8.4'],
        },
        {
          text: 'Field 9',
          name: 'field9',
          type: FilterType.granularDateRange,
          value: {
            start: '2025-01-04',
            end: '2025-07-03',
            granularity: {
              value: Granularity.MONTHLY,
              display: 'Monthly',
            },
            quickFilter: {
              value: QuickFilters.LAST_SIX_MONTHS,
              display: 'Last 6 months',
            },
            partialDate: {
              start: true,
              end: true,
            },
          },
          minimumLength: undefined,
          dynamicResourceEndpoint: undefined,
          mandatory: true,
          quickFilterOptions: [
            {
              value: 'none',
              text: 'None',
            },
            {
              value: 'today',
              text: 'Today',
            },
            {
              value: 'past',
              text: 'Past:',
              disabled: true,
            },
            {
              value: 'yesterday',
              text: 'Yesterday',
            },
            {
              value: 'last-seven-days',
              text: 'Last 7 days',
            },
            {
              value: 'last-thirty-days',
              text: 'Last 30 days',
            },
            {
              value: 'last-month',
              text: 'Last month',
            },
            {
              value: 'last-full-month',
              text: 'Last full month',
            },
            {
              value: 'last-ninety-days',
              text: 'Last 90 days',
            },
            {
              value: 'last-three-months',
              text: 'Last 3 months',
            },
            {
              value: 'last-full-three-months',
              text: 'Last full 3 months',
            },
            {
              value: 'last-six-months',
              text: 'Last 6 months',
            },
            {
              value: 'last-full-six-months',
              text: 'Last full 6 months',
            },
            {
              value: 'last-year',
              text: 'Last year',
            },
            {
              value: 'last-full-year',
              text: 'Last full year',
            },
            {
              value: 'future',
              text: 'Future:',
              disabled: true,
            },
            {
              value: 'tomorrow',
              text: 'Tomorrow',
            },
            {
              value: 'next-seven-days',
              text: 'Next 7 days',
            },
            {
              value: 'next-thirty-days',
              text: 'Next 30 days',
            },
            {
              value: 'next-month',
              text: 'Next month',
            },
            {
              value: 'next-full-month',
              text: 'Next full month',
            },
            {
              value: 'next-ninety-days',
              text: 'Next 90 days',
            },
            {
              value: 'next-three-months',
              text: 'Next 3 months',
            },
            {
              value: 'next-full-three-months',
              text: 'Next full 3 months',
            },
            {
              value: 'next-six-months',
              text: 'Next 6 months',
            },
            {
              value: 'next-full-six-months',
              text: 'Next full 6 months',
            },
            {
              value: 'next-year',
              text: 'Next year',
            },
            {
              value: 'next-full-year',
              text: 'Next full year',
            },
          ],
          granularityOptions: [
            {
              value: 'hourly',
              text: 'Hourly',
            },
            {
              value: 'daily',
              text: 'Daily',
            },
            {
              value: 'monthly',
              text: 'Monthly',
            },
            {
              value: 'annually',
              text: 'Annually',
            },
          ],
        },
      ]

      const sortBy: FilterValue[] = [
        {
          text: 'Column',
          name: 'sortColumn',
          type: FilterType.radio,
          options: [
            {
              value: 'field1',
              text: 'Field 1',
            },
            {
              value: 'field2',
              text: 'Field 2',
            },
          ],
          value: 'field1',
          minimumLength: undefined,
          mandatory: true,
        },
        {
          text: 'Direction',
          name: 'sortedAsc',
          type: FilterType.radio,
          options: [
            {
              value: 'true',
              text: 'Ascending',
            },
            {
              value: 'false',
              text: 'Descending',
            },
          ],
          value: 'false',
          minimumLength: undefined,
          mandatory: true,
        },
      ]

      const res = PersonalistionUtils.setFilterValuesFromSavedDefaults(filters, sortBy, defaultValues)

      const expectedRes = {
        filters: [
          {
            text: 'Field 1',
            name: 'field1',
            type: 'Radio',
            value: 'value1.2',
            minimumLength: undefined,
            dynamicResourceEndpoint: undefined,
            mandatory: false,
            options: [
              {
                value: 'no-filter',
                text: 'None',
                disabled: false,
              },
              {
                value: 'value1.1',
                text: 'Value 1.1',
              },
              {
                value: 'value1.2',
                text: 'Value 1.2',
              },
              {
                value: 'value1.3',
                text: 'Value 1.3',
              },
            ],
          },
          {
            text: 'Field 2',
            name: 'field2',
            type: 'Select',
            value: 'value2.3',
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
                value: 'value2.1',
                text: 'Value 2.1',
              },
              {
                value: 'value2.2',
                text: 'Value 2.2',
              },
              {
                value: 'value2.3',
                text: 'Value 2.3',
              },
            ],
          },
          {
            text: 'Field 3',
            name: 'field3',
            type: 'DateRange',
            value: {
              start: '2004-02-01',
              end: '2008-05-04',
              relative: '',
            },
            minimumLength: undefined,
            dynamicResourceEndpoint: undefined,
            mandatory: true,
            min: '2003-02-01',
            max: '2007-05-04',
            relativeOptions: [],
          },
          {
            text: 'Field 4',
            name: 'field4',
            type: 'Autocomplete',
            value: 'Inigo Montoya',
            minimumLength: 3,
            dynamicResourceEndpoint: undefined,
            mandatory: false,
            options: [
              {
                value: 'Fezzick',
                text: 'Fezzick',
              },
              {
                value: 'Inigo Montoya',
                text: 'Inigo Montoya',
              },
              {
                value: 'PrHu',
                text: 'Prince Humperdink',
              },
              {
                value: 'Princess Buttercup',
                text: 'Princess Buttercup',
              },
              {
                value: 'Westley',
                text: 'Westley',
              },
            ],
          },
          {
            text: 'Field 5',
            name: 'field5',
            type: 'Autocomplete',
            value: '',
            minimumLength: 3,
            dynamicResourceEndpoint: undefined,
            mandatory: false,
            options: [],
          },
          {
            text: 'Field 6',
            name: 'field6',
            type: 'Text',
            value: 'some text',
            minimumLength: undefined,
            dynamicResourceEndpoint: undefined,
            mandatory: false,
          },
          {
            text: 'Field 7',
            name: 'field7',
            type: 'Date',
            value: '2004-02-01',
            minimumLength: undefined,
            dynamicResourceEndpoint: undefined,
            mandatory: false,
            min: '2003-02-01',
            max: '2007-05-04',
          },
          {
            text: 'Field 8',
            name: 'field8',
            type: 'Multiselect',
            value: 'value8.2,value8.4,value8.3',
            minimumLength: undefined,
            dynamicResourceEndpoint: undefined,
            mandatory: false,
            options: [
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
              {
                value: 'value8.4',
                text: 'Value 8.4',
              },
            ],
            values: ['value8.2', 'value8.4', 'value8.3'],
          },
          {
            text: 'Field 9',
            name: 'field9',
            type: FilterType.granularDateRange,
            value: {
              start: '2004-01-01',
              end: '2004-01-07',
              granularity: {
                value: Granularity.DAILY,
                display: 'Daily',
              },
              quickFilter: {
                value: QuickFilters.LAST_SEVEN_DAYS,
                display: 'Last 7 days',
              },
            },
            minimumLength: undefined,
            dynamicResourceEndpoint: undefined,
            mandatory: true,
            quickFilterOptions: [
              {
                value: 'none',
                text: 'None',
              },
              {
                value: 'today',
                text: 'Today',
              },
              {
                value: 'past',
                text: 'Past:',
                disabled: true,
              },
              {
                value: 'yesterday',
                text: 'Yesterday',
              },
              {
                value: 'last-seven-days',
                text: 'Last 7 days',
              },
              {
                value: 'last-thirty-days',
                text: 'Last 30 days',
              },
              {
                value: 'last-month',
                text: 'Last month',
              },
              {
                value: 'last-full-month',
                text: 'Last full month',
              },
              {
                value: 'last-ninety-days',
                text: 'Last 90 days',
              },
              {
                value: 'last-three-months',
                text: 'Last 3 months',
              },
              {
                value: 'last-full-three-months',
                text: 'Last full 3 months',
              },
              {
                value: 'last-six-months',
                text: 'Last 6 months',
              },
              {
                value: 'last-full-six-months',
                text: 'Last full 6 months',
              },
              {
                value: 'last-year',
                text: 'Last year',
              },
              {
                value: 'last-full-year',
                text: 'Last full year',
              },
              {
                value: 'future',
                text: 'Future:',
                disabled: true,
              },
              {
                value: 'tomorrow',
                text: 'Tomorrow',
              },
              {
                value: 'next-seven-days',
                text: 'Next 7 days',
              },
              {
                value: 'next-thirty-days',
                text: 'Next 30 days',
              },
              {
                value: 'next-month',
                text: 'Next month',
              },
              {
                value: 'next-full-month',
                text: 'Next full month',
              },
              {
                value: 'next-ninety-days',
                text: 'Next 90 days',
              },
              {
                value: 'next-three-months',
                text: 'Next 3 months',
              },
              {
                value: 'next-full-three-months',
                text: 'Next full 3 months',
              },
              {
                value: 'next-six-months',
                text: 'Next 6 months',
              },
              {
                value: 'next-full-six-months',
                text: 'Next full 6 months',
              },
              {
                value: 'next-year',
                text: 'Next year',
              },
              {
                value: 'next-full-year',
                text: 'Next full year',
              },
            ],
            granularityOptions: [
              {
                value: 'hourly',
                text: 'Hourly',
              },
              {
                value: 'daily',
                text: 'Daily',
              },
              {
                value: 'monthly',
                text: 'Monthly',
              },
              {
                value: 'annually',
                text: 'Annually',
              },
            ],
          },
        ],
        sortBy: [
          {
            text: 'Column',
            name: 'sortColumn',
            type: 'Radio',
            options: [
              {
                value: 'field1',
                text: 'Field 1',
              },
              {
                value: 'field2',
                text: 'Field 2',
              },
            ],
            value: 'field2',
            minimumLength: undefined,
            mandatory: true,
          },
          {
            text: 'Direction',
            name: 'sortedAsc',
            type: 'Radio',
            options: [
              {
                value: 'true',
                text: 'Ascending',
              },
              {
                value: 'false',
                text: 'Descending',
              },
            ],
            value: 'true',
            minimumLength: undefined,
            mandatory: true,
          },
        ],
      }

      expect(res).toEqual(expectedRes)
    })
  })

  describe('setUserContextDefaults', () => {
    it('should set the filter values from the user context', () => {
      const res = {
        locals: {
          dprUser: {
            activeCaseLoadId: 'Inigo Montoya',
          },
        },
      } as unknown as Response

      const filterValues: FilterValue[] = [
        {
          text: 'Field 1',
          name: 'field1',
          type: FilterType.radio,
          value: 'value1.1',
          minimumLength: undefined,
          dynamicResourceEndpoint: undefined,
          mandatory: false,
          options: [
            {
              value: 'value1.1',
              text: 'Value 1.1',
            },
            {
              value: 'value1.2',
              text: 'Value 1.2',
            },
          ],
        },
        {
          text: 'Field 2 Establishment',
          name: 'field2',
          type: FilterType.autocomplete,
          value: null,
          minimumLength: 3,
          dynamicResourceEndpoint: undefined,
          mandatory: false,
          options: [
            {
              value: 'Fezzick',
              text: 'Fezzick',
            },
            {
              value: 'Inigo Montoya',
              text: 'Inigo Montoya',
            },
            {
              value: 'PrHu',
              text: 'Prince Humperdink',
            },
            {
              value: 'Princess Buttercup',
              text: 'Princess Buttercup',
            },
            {
              value: 'Westley',
              text: 'Westley',
            },
          ],
        },
        {
          text: 'Field 3',
          name: 'field3',
          type: FilterType.text,
          value: null,
          minimumLength: undefined,
          dynamicResourceEndpoint: undefined,
          mandatory: false,
        },
      ]

      const result = PersonalistionUtils.setUserContextDefaults(res, filterValues)

      expect(result).toEqual([
        filterValues[0],
        {
          ...filterValues[1],
          value: 'Inigo Montoya',
        },
        filterValues[2],
      ])
    })

    it('should not set the filter values from the user context', () => {
      const res = {
        locals: {
          dprUser: {
            activeCaseLoadId: 'Inigo Montoya',
          },
        },
      } as unknown as Response

      const filterValues: FilterValue[] = [
        {
          text: 'Field 1',
          name: 'field1',
          type: FilterType.radio,
          value: 'value1.1',
          minimumLength: undefined,
          dynamicResourceEndpoint: undefined,
          mandatory: false,
          options: [
            {
              value: 'value1.1',
              text: 'Value 1.1',
            },
            {
              value: 'value1.2',
              text: 'Value 1.2',
            },
          ],
        },
        {
          text: 'Field 2',
          name: 'field2',
          type: FilterType.autocomplete,
          value: null,
          minimumLength: 3,
          dynamicResourceEndpoint: undefined,
          mandatory: false,
          options: [
            {
              value: 'Fezzick',
              text: 'Fezzick',
            },
            {
              value: 'Inigo Montoya',
              text: 'Inigo Montoya',
            },
            {
              value: 'PrHu',
              text: 'Prince Humperdink',
            },
            {
              value: 'Princess Buttercup',
              text: 'Princess Buttercup',
            },
            {
              value: 'Westley',
              text: 'Westley',
            },
          ],
        },
        {
          text: 'Field 3',
          name: 'field3',
          type: FilterType.text,
          value: null,
          minimumLength: undefined,
          dynamicResourceEndpoint: undefined,
          mandatory: false,
        },
      ]

      const result = PersonalistionUtils.setUserContextDefaults(res, filterValues)

      expect(result).toEqual([filterValues[0], filterValues[1], filterValues[2]])
    })
  })
})
