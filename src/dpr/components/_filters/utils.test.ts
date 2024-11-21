import { Request } from 'express'
import FiltersUtils from './utils'
import * as FiltersUtilsHelper from './utils'
import mockVariant from '../../../../test-app/mocks/mockClients/reports/mockVariants/variant1'
import { components } from '../../types/api'
import { DateFilterValue } from './types'
import { FilterType } from './filter-input/enum'

describe('Filters Utils tests', () => {
  let req: Request = {
    query: {},
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
            options: null,
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
              { value: 'Prince Humperdink', text: 'Prince Humperdink' },
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
            options: null,
            value: null,
            minimumLength: 3,
            dynamicResourceEndpoint: null,
            mandatory: false,
          },
          {
            text: 'Field 6',
            name: 'field6',
            type: 'text',
            options: null,
            value: null,
            minimumLength: null,
            dynamicResourceEndpoint: null,
          },
          {
            text: 'Field 7',
            name: 'field7',
            type: 'date',
            options: null,
            value: '2003-02-01',
            minimumLength: null,
            dynamicResourceEndpoint: null,
            min: '2003-02-01',
            max: '2007-05-04',
          },
        ],
        selectedFilters: [
          {
            text: 'Field 1: value1.2',
            key: '["filters.field1"]',
            value: '["value1.2"]',
            classes: 'interactive-remove-filter-button',
            disabled: false,
            attributes: { 'aria-label': 'Selected Filter: Field 1: value1.2. Click to clear this filter' },
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
        ],
      })
    })
  })

  describe('handleDaterangeValue', () => {
    let dateFilter: DateFilterValue

    beforeEach(() => {
      dateFilter = {
        text: 'Field 3',
        name: 'field3',
        type: FilterType.dateRange,
        options: null,
        value: { start: '2005-01-01', end: '2005-07-08' },
        minimumLength: null,
        dynamicResourceEndpoint: null,
        mandatory: true,
        min: '2003-02-01',
        max: '2007-05-04',
        relativeOptions: [],
      }
    })

    it('should set the start and end date to the query param values', () => {
      req = {
        query: {
          'filters.field3.start': '2004-02-01',
          'filters.field3.end': '2006-01-01',
        },
      } as unknown as Request

      const result = FiltersUtilsHelper.handleDaterangeValue(dateFilter, req, 'filters.')

      expect(result).toEqual({
        start: '2004-02-01',
        end: '2006-01-01',
      })
    })

    it('should set the start and end date to initial default values', () => {
      req = {
        query: {},
      } as unknown as Request

      const result = FiltersUtilsHelper.handleDaterangeValue(dateFilter, req, 'filters.')

      expect(result).toEqual({
        start: '2005-01-01',
        end: '2005-07-08',
      })
    })

    it('should set the start and end date to min and max values', () => {
      req = {
        query: {},
      } as unknown as Request

      dateFilter.value = null

      const result = FiltersUtilsHelper.handleDaterangeValue(dateFilter, req, 'filters.')

      expect(result).toEqual({
        start: '2003-02-01',
        end: '2007-05-04',
      })
    })

    it('should set the start and end date to blank values', () => {
      req = {
        query: {},
      } as unknown as Request

      dateFilter.value = null
      delete dateFilter.min
      delete dateFilter.max

      const result = FiltersUtilsHelper.handleDaterangeValue(dateFilter, req, 'filters.')

      expect(result).toEqual({
        start: undefined,
        end: undefined,
      })
    })
  })
})
