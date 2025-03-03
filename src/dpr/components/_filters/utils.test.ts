import { Request } from 'express'
import MockDate from 'mockdate'
import FiltersUtils from './utils'
import mockVariant from '../../../../test-app/mocks/mockClients/reports/mockVariants/variant1'
import { components } from '../../types/api'
import DateRangeUtils from '../_inputs/date-range/utils'
import GranularDaterangeUtils from '../_inputs/granular-date-range/utils'

describe('Filters Utils tests', () => {
  const req: Request = {
    baseUrl: 'baseUrl',
    path: 'path',
    query: {
      dataProductDefinitionsPath: '',
    },
  } as unknown as Request

  describe('getFilters', () => {
    it('should get the filters', async () => {
      const fields = mockVariant.specification.fields as unknown as components['schemas']['FieldDefinition'][]
      const result = await FiltersUtils.getFilters({
        fields,
        req,
      })

      expect(result).toEqual({
        filters: [
          {
            text: 'Field 1',
            name: 'field1',
            type: 'Radio',
            options: [
              { value: 'value1.1', text: 'Value 1.1' },
              { value: 'value1.2', text: 'Value 1.2' },
              { value: 'value1.3', text: 'Value 1.3' },
            ],
            value: 'value1.2',
            minimumLength: null,
            dynamicResourceEndpoint: null,
            mandatory: false,
          },
          {
            text: 'Field 2',
            name: 'field2',
            type: 'Select',
            options: [
              { value: 'no-filter', text: 'Select your option', disabled: true, selected: true },
              { value: 'value2.1', text: 'Value 2.1' },
              { value: 'value2.2', text: 'Value 2.2' },
              { value: 'value2.3', text: 'Value 2.3' },
            ],
            value: null,
            minimumLength: null,
            dynamicResourceEndpoint: null,
            mandatory: true,
          },
          {
            text: 'Field 3',
            name: 'field3',
            type: 'daterange',
            value: { start: '2003-02-01', end: '2006-05-04' },
            minimumLength: null,
            dynamicResourceEndpoint: null,
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
            dynamicResourceEndpoint: null,
            mandatory: false,
          },
          {
            text: 'Field 5',
            name: 'field5',
            type: 'autocomplete',
            options: [],
            value: null,
            minimumLength: 3,
            dynamicResourceEndpoint: null,
            mandatory: false,
          },
          {
            text: 'Field 6',
            name: 'field6',
            type: 'text',
            value: null,
            minimumLength: null,
            dynamicResourceEndpoint: null,
          },
          {
            text: 'Field 7',
            name: 'field7',
            type: 'date',
            value: '2003-02-01',
            minimumLength: null,
            dynamicResourceEndpoint: null,
            min: '2003-02-01',
            max: '2007-05-04',
          },
          {
            dynamicResourceEndpoint: null,
            mandatory: undefined,
            minimumLength: null,
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
            values: ['value8.2,value8.3'],
          },
        ],
        selectedFilters: [
          {
            text: 'Field 1: value1.2',
            key: '["filters.field1"]',
            value: '["value1.2"]',
            classes: 'interactive-remove-filter-button',
            disabled: false,
            attributes: { 'aria-label': 'Selected Filter: Field 1: Value 1.2. Click to clear this filter' },
          },
          {
            text: 'Field 3: 2003-02-01 - 2006-05-04',
            key: '["filters.field3.start","filters.field3.end"]',
            value: '["2003-02-01","2006-05-04"]',
            disabled: false,
            classes: 'interactive-remove-filter-button',
            attributes: {
              'aria-label': 'Selected Filter: Field 3: 2003-02-01 - 2006-05-04. Click to clear this filter',
            },
          },
          {
            text: 'Field 7: 2003-02-01 (min date)',
            key: '["filters.field7"]',
            value: '["2003-02-01"]',
            disabled: true,
            classes: 'interactive-remove-filter-button interactive-remove-filter-button--disabled',
            attributes: {
              'aria-label':
                'Selected Filter: Field 7: 2003-02-01 (min date). This filter cant be removed. Update the filter input to change the value',
            },
          },
          {
            attributes: {
              'aria-label': 'Selected Filter: Field 8: Value 8.2, Value 8.3. Click to clear this filter',
            },
            classes: 'interactive-remove-filter-button',
            disabled: false,
            key: '["filters.field8"]',
            text: 'Field 8: value8.2,value8.3',
            value: '["value8.2","value8.3"]',
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
})
