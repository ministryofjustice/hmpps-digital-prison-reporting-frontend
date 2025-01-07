import StartEndDateUtils from './utils'
import { components } from '../../../types/api'

describe('StartEndDateUtils', () => {
  describe('setDateRangeValuesWithinMinMax', () => {
    it('should set the default value to the min value', () => {
      const dateRangeFilterFormat: components['schemas']['FilterDefinition'] = {
        type: 'daterange' as components['schemas']['FilterDefinition']['type'],
        mandatory: false,
        defaultValue: '2002-02-01 - 2005-02-01',
        min: '2003-02-01',
        max: '2007-05-04',
      }

      const res = StartEndDateUtils.setDateRangeValuesWithinMinMax(dateRangeFilterFormat, '2002-02-01', '2005-02-01')
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

      const res = StartEndDateUtils.setDateRangeValuesWithinMinMax(dateRangeFilterFormat, '2005-02-01', '2009-05-04')
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

      const res = StartEndDateUtils.setDateRangeValuesWithinMinMax(dateRangeFilterFormat, '2005-02-01', '2006-05-04')
      expect(res).toEqual({
        start: '2005-02-01',
        end: '2006-05-04',
      })
    })
  })
})
