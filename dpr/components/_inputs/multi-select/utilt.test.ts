import { expect } from '@jest/globals'
import { Request } from 'express'
import MultiSelectUtils from './utils'
import { MultiselectFilterValue } from '../../_filters/types'
import { FilterType } from '../../_filters/filter-input/enum'

describe('MultiSelectUtils', () => {
  describe('setValueFromRequest', () => {
    let filter: MultiselectFilterValue
    let req: Request
    const prefix = 'filters.'

    const baseFilter = {
      text: 'Field 1',
      name: 'field1',
      type: FilterType.multiselect,
      options: [
        {
          value: 'value1',
          text: 'value 1',
        },
        {
          value: 'value2',
          text: 'value 2',
        },
      ],
    }

    it('should init values to an empty array when filter value is empty', () => {
      filter = {
        ...baseFilter,
        value: '',
        values: [],
        options: [],
      }
      req = { query: {} } as unknown as Request
      const result = MultiSelectUtils.setValueFromRequest(filter, req, prefix)

      expect(result).toEqual({
        requestfilterValue: null,
        requestfilterValues: [],
      })
    })

    it('should init values to an empty array when preventDefault is set', () => {
      filter = {
        ...baseFilter,
        value: 'value1,value2',
        values: ['value1', 'value2'],
      }
      req = {
        query: {
          preventDefault: true,
        },
      } as unknown as Request
      const result = MultiSelectUtils.setValueFromRequest(filter, req, prefix)

      expect(result).toEqual({
        requestfilterValue: null,
        requestfilterValues: [],
      })
    })

    it('should init the values from a single query param', () => {
      filter = {
        ...baseFilter,
        value: 'value1',
        values: ['value1'],
      }
      req = {
        query: {
          preventDefault: true,
          'filters.field1': 'value1',
        },
      } as unknown as Request
      const result = MultiSelectUtils.setValueFromRequest(filter, req, prefix)

      expect(result).toEqual({
        requestfilterValue: 'value1',
        requestfilterValues: ['value1'],
      })
    })

    it('should init the values from multiple query params', () => {
      filter = {
        ...baseFilter,
        value: 'value1',
        values: ['value1'],
      }
      req = {
        query: {
          preventDefault: true,
          'filters.field1': ['value1', 'value2'],
        },
      } as unknown as Request
      const result = MultiSelectUtils.setValueFromRequest(filter, req, prefix)

      expect(result).toEqual({
        requestfilterValue: 'value1,value2',
        requestfilterValues: ['value1', 'value2'],
      })
    })
  })

  describe('getQueryFromDefinition', () => {
    // TODO:
    expect(true)
  })
})
