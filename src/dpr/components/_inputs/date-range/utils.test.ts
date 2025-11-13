import { expect } from '@jest/globals'
import dayjs from 'dayjs'
import { Request } from 'express'
import DateRangeInputUtils from './utils'
import { DateFilterValue, DateRangeFilterValue } from '../../_filters/types'
import { FilterType } from '../../_filters/filter-input/enum'

describe('DateRangeInputUtils', () => {
  let req: Request = {
    query: {},
  } as unknown as Request

  describe('getRelativeDateOptions', () => {
    it('should set the correct options for relative dates - all enabled', () => {
      const min = dayjs().subtract(1, 'month').format('YYYY-MM-DD').toString()
      const max = dayjs().add(1, 'month').format('YYYY-MM-DD').toString()
      const options = DateRangeInputUtils.getRelativeDateOptions(min, max)

      const disabled = options.filter((opt) => {
        return opt.disabled
      })

      expect(disabled.length).toEqual(0)
    })

    it('should set the correct options for relative dates - next month disabled', () => {
      const min = dayjs().subtract(1, 'month').format('YYYY-MM-DD').toString()
      const max = dayjs().add(1, 'week').format('YYYY-MM-DD').toString()

      const options = DateRangeInputUtils.getRelativeDateOptions(min, max)

      const disabled = options.filter((opt) => {
        return opt.disabled
      })
      expect(disabled.length).toEqual(1)
      expect(options[6].disabled).toBeTruthy()
    })

    it('should set the correct options for relative dates - last month disabled', () => {
      const min = dayjs().subtract(1, 'week').format('YYYY-MM-DD').toString()
      const max = dayjs().add(1, 'month').format('YYYY-MM-DD').toString()
      const options = DateRangeInputUtils.getRelativeDateOptions(min, max)

      const disabled = options.filter((opt) => {
        return opt.disabled
      })
      expect(disabled.length).toEqual(1)
      expect(options[5].disabled).toBeTruthy()
    })

    it('should set the correct options for relative dates - next week disabled', () => {
      const min = dayjs().subtract(1, 'month').format('YYYY-MM-DD').toString()
      const max = dayjs().add(6, 'day').format('YYYY-MM-DD').toString()
      const options = DateRangeInputUtils.getRelativeDateOptions(min, max)

      const disabled = options.filter((opt) => {
        return opt.disabled
      })
      expect(disabled.length).toEqual(2)
      expect(options[4].disabled).toBeTruthy()
      expect(options[6].disabled).toBeTruthy()
    })

    it('should set the correct options for relative dates - last week disabled', () => {
      const min = dayjs().subtract(6, 'day').format('YYYY-MM-DD').toString()
      const max = dayjs().add(1, 'month').format('YYYY-MM-DD').toString()
      const options = DateRangeInputUtils.getRelativeDateOptions(min, max)

      const disabled = options.filter((opt) => {
        return opt.disabled
      })
      expect(disabled.length).toEqual(2)
      expect(options[3].disabled).toBeTruthy()
      expect(options[5].disabled).toBeTruthy()
    })

    it('should set the correct options for relative dates - tomorrow disabled', () => {
      const min = dayjs().subtract(1, 'month').format('YYYY-MM-DD').toString()
      const max = dayjs().format('YYYY-MM-DD').toString()
      const options = DateRangeInputUtils.getRelativeDateOptions(min, max)

      const disabled = options.filter((opt) => {
        return opt.disabled
      })
      expect(disabled.length).toEqual(3)
      expect(options[2].disabled).toBeTruthy()
      expect(options[4].disabled).toBeTruthy()
      expect(options[6].disabled).toBeTruthy()
    })

    it('should set the correct options for relative dates - yesterday disabled', () => {
      const min = dayjs().format('YYYY-MM-DD').toString()
      const max = dayjs().add(1, 'month').format('YYYY-MM-DD').toString()
      const options = DateRangeInputUtils.getRelativeDateOptions(min, max)

      const disabled = options.filter((opt) => {
        return opt.disabled
      })
      expect(disabled.length).toEqual(3)
      expect(options[1].disabled).toBeTruthy()
      expect(options[3].disabled).toBeTruthy()
      expect(options[5].disabled).toBeTruthy()
    })
  })

  describe('setDateRangeValueFromRequest', () => {
    let dateFilter: DateRangeFilterValue

    beforeEach(() => {
      dateFilter = {
        text: 'Field 3',
        name: 'field3',
        type: FilterType.dateRange,
        value: { start: '2005-01-01', end: '2005-07-08' },
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

      const result = DateRangeInputUtils.setValueFromRequest(dateFilter, req, 'filters.')

      expect(result).toEqual({
        start: '2004-02-01',
        end: '2006-01-01',
      })
    })

    it('should set the start and end date to min and max values', () => {
      req = {
        query: {},
      } as unknown as Request

      dateFilter.value = { start: '', end: '' }

      const result = DateRangeInputUtils.setValueFromRequest(dateFilter, req, 'filters.')

      expect(result).toEqual({
        start: '2003-02-01',
        end: '2007-05-04',
      })
    })

    it('should set the start and end date to blank values', () => {
      req = {
        query: {},
      } as unknown as Request

      dateFilter.value = { start: '', end: '' }
      delete dateFilter.min
      delete dateFilter.max

      const result = DateRangeInputUtils.setValueFromRequest(dateFilter, req, 'filters.')

      expect(result).toEqual({
        start: undefined,
        end: undefined,
      })
    })
  })
})
