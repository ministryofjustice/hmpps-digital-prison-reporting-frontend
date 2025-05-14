import { Request } from 'express'
import MultiSelectUtils from './utils'
import { FilterValue } from '../../_filters/types'
import { FilterType } from '../../_filters/filter-input/enum'

describe('MultiSelectUtils', () => {
  describe('setValueFromRequest', () => {
    let filter: FilterValue
    let req: Request
    const prefix = 'filters.'

    it('should init values to an empty array when filter value is empty', () => {
      filter = {
        text: 'string',
        name: 'string',
        type: FilterType.multiselect,
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
        text: 'string',
        name: 'string',
        type: FilterType.multiselect,
        value: 'value1,value2',
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
        text: 'string',
        name: 'field1',
        type: FilterType.multiselect,
        value: 'value1',
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
        text: 'string',
        name: 'field1',
        type: FilterType.multiselect,
        value: 'value1',
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
