import { components } from '../../../types/api'
import { FilterValue } from '../../_filters/types'
import GranularDatePickerUtils from './utils'

describe('GranularDatePickerUtils', () => {
  beforeEach(() => {
    //
  })

  describe('GranularDatePickerUtils', () => {
    it('should...', () => {
      GranularDatePickerUtils.getGranularDateRangeFilterFromDefinition(
        {} as unknown as components['schemas']['FilterDefinition'],
        {} as unknown as FilterValue,
      )
      expect(true).toEqual(true)
    })
  })
})
