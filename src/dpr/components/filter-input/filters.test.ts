import addRequiredAttributeToAll from './filters'
import { FilterOption } from './types'

describe('Filters', () => {
  describe('addRequiredAttributeToAll', () => {
    it('Should add required to all filter options', () => {
      const filterOptionsArray = [
        {
          name: 'Filter 1',
        },
        {
          name: 'Filter 2',
        },
        {
          name: 'Filter 3',
        },
        {
          name: 'Filter 4',
        },
      ] as unknown as Array<FilterOption>
      const res = addRequiredAttributeToAll(filterOptionsArray)

      expect(res[0].attributes.required).toBeDefined()
      expect(res[0].attributes.required).toBeTruthy()

      expect(res[1].attributes.required).toBeDefined()
      expect(res[1].attributes.required).toBeTruthy()

      expect(res[2].attributes.required).toBeDefined()
      expect(res[2].attributes.required).toBeTruthy()

      expect(res[3].attributes.required).toBeDefined()
      expect(res[3].attributes.required).toBeTruthy()
    })
  })
})
