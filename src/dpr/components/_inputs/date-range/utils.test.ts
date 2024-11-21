import dayjs from 'dayjs'
import DateRangeInputUtils from './utils'
import { components } from '../../../types/api'

describe('DateRangeInputUtils', () => {
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
      expect(options[5].disabled).toBeTruthy()
    })

    it('should set the correct options for relative dates - last month disabled', () => {
      const min = dayjs().subtract(1, 'week').format('YYYY-MM-DD').toString()
      const max = dayjs().add(1, 'month').format('YYYY-MM-DD').toString()
      const options = DateRangeInputUtils.getRelativeDateOptions(min, max)

      const disabled = options.filter((opt) => {
        return opt.disabled
      })
      expect(disabled.length).toEqual(1)
      expect(options[4].disabled).toBeTruthy()
    })

    it('should set the correct options for relative dates - next week disabled', () => {
      const min = dayjs().subtract(1, 'month').format('YYYY-MM-DD').toString()
      const max = dayjs().add(6, 'day').format('YYYY-MM-DD').toString()
      const options = DateRangeInputUtils.getRelativeDateOptions(min, max)

      const disabled = options.filter((opt) => {
        return opt.disabled
      })
      expect(disabled.length).toEqual(2)
      expect(options[3].disabled).toBeTruthy()
      expect(options[5].disabled).toBeTruthy()
    })

    it('should set the correct options for relative dates - last week disabled', () => {
      const min = dayjs().subtract(6, 'day').format('YYYY-MM-DD').toString()
      const max = dayjs().add(1, 'month').format('YYYY-MM-DD').toString()
      const options = DateRangeInputUtils.getRelativeDateOptions(min, max)

      const disabled = options.filter((opt) => {
        return opt.disabled
      })
      expect(disabled.length).toEqual(2)
      expect(options[2].disabled).toBeTruthy()
      expect(options[4].disabled).toBeTruthy()
    })

    it('should set the correct options for relative dates - tomorrow disabled', () => {
      const min = dayjs().subtract(1, 'month').format('YYYY-MM-DD').toString()
      const max = dayjs().format('YYYY-MM-DD').toString()
      const options = DateRangeInputUtils.getRelativeDateOptions(min, max)

      const disabled = options.filter((opt) => {
        return opt.disabled
      })
      expect(disabled.length).toEqual(3)
      expect(options[1].disabled).toBeTruthy()
      expect(options[3].disabled).toBeTruthy()
      expect(options[5].disabled).toBeTruthy()
    })

    it('should set the correct options for relative dates - yesterday disabled', () => {
      const min = dayjs().format('YYYY-MM-DD').toString()
      const max = dayjs().add(1, 'month').format('YYYY-MM-DD').toString()
      const options = DateRangeInputUtils.getRelativeDateOptions(min, max)

      const disabled = options.filter((opt) => {
        return opt.disabled
      })
      expect(disabled.length).toEqual(3)
      expect(options[0].disabled).toBeTruthy()
      expect(options[2].disabled).toBeTruthy()
      expect(options[4].disabled).toBeTruthy()
    })
  })

  describe('calcDates', () => {
    it('should return undefined values when no duration value is set', async () => {
      const res = await DateRangeInputUtils.calcDates('')

      expect(res).toEqual({})
    })
  })

  describe('setDateRangeValuesWithinMinMax', () => {
    it('should set the default value to the min value', () => {
      const dateRangeFilterFormat: components['schemas']['FilterDefinition'] = {
        type: 'daterange' as components['schemas']['FilterDefinition']['type'],
        mandatory: false,
        defaultValue: '2002-02-01 - 2005-02-01',
        min: '2003-02-01',
        max: '2007-05-04',
      }

      const res = DateRangeInputUtils.setDateRangeValuesWithinMinMax(dateRangeFilterFormat, '2002-02-01', '2005-02-01')
      expect(res).toEqual({
        start: '2003-02-01',
        end: '2005-02-01',
      })
    })

    it('should set the default value to the max value', () => {
      const dateRangeFilterFormat: components['schemas']['FilterDefinition'] = {
        type: 'daterange' as components['schemas']['FilterDefinition']['type'],
        mandatory: false,
        defaultValue: '2005-02-01 - 2009-05-04',
        min: '2003-02-01',
        max: '2007-05-04',
      }

      const res = DateRangeInputUtils.setDateRangeValuesWithinMinMax(dateRangeFilterFormat, '2005-02-01', '2009-05-04')
      expect(res).toEqual({
        start: '2005-02-01',
        end: '2007-05-04',
      })
    })

    it('should set the default values', () => {
      const dateRangeFilterFormat: components['schemas']['FilterDefinition'] = {
        type: 'daterange' as components['schemas']['FilterDefinition']['type'],
        mandatory: false,
        defaultValue: '2005-02-01 - 2006-05-04',
        min: '2003-02-01',
        max: '2007-05-04',
      }

      const res = DateRangeInputUtils.setDateRangeValuesWithinMinMax(dateRangeFilterFormat, '2005-02-01', '2006-05-04')
      expect(res).toEqual({
        start: '2005-02-01',
        end: '2006-05-04',
      })
    })
  })
})
