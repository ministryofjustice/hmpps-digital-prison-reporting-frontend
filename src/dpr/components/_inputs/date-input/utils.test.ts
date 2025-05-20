import { components } from '../../../types/api'
import DateInputUtils from './utils'

describe('Date filter Utils', () => {
  describe('setDateValueWithinMinMax', () => {
    it('should set the default value to the min value', () => {
      const dateFilterFormat: components['schemas']['FilterDefinition'] = {
        type: 'date' as components['schemas']['FilterDefinition']['type'],
        mandatory: false,
        defaultValue: '2002-02-01',
        min: '2003-02-01',
        max: '2007-05-04',
      }

      const res = DateInputUtils.setDateValueWithinMinMax(dateFilterFormat)
      expect(res).toEqual('2003-02-01')
    })

    it('should set the default value to the max value', () => {
      const dateFilterFormat: components['schemas']['FilterDefinition'] = {
        type: 'date' as components['schemas']['FilterDefinition']['type'],
        mandatory: false,
        defaultValue: '2009-02-01',
        min: '2003-02-01',
        max: '2007-05-04',
      }

      const res = DateInputUtils.setDateValueWithinMinMax(dateFilterFormat)
      expect(res).toEqual('2007-05-04')
    })

    it('should set the default value', () => {
      const dateFilterFormat: components['schemas']['FilterDefinition'] = {
        type: 'date' as components['schemas']['FilterDefinition']['type'],
        mandatory: false,
        defaultValue: '2005-02-01',
        min: '2003-02-01',
        max: '2007-05-04',
      }

      const res = DateInputUtils.setDateValueWithinMinMax(dateFilterFormat)
      expect(res).toEqual('2005-02-01')
    })
  })
})
