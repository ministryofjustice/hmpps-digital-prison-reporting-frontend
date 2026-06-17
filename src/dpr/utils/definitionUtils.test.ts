import { describe, expect } from '@jest/globals'
import { components } from '../types/api'
import { getFieldsWithFilters } from './definitionUtils'

describe('definitionUtils', () => {
  describe('getFieldsWithFilters', () => {
    it('returns only fields with filters', () => {
      const fields = [
        { name: 'field1', filter: { type: 'text' } },
        { name: 'field2' },
        { name: 'field3', filter: { type: 'Radio' } },
        { name: 'field4', filter: null },
        { name: 'field5', filter: { type: 'date' } },
      ] as components['schemas']['FieldDefinition'][]

      const result = getFieldsWithFilters(fields)

      expect(result).toEqual([
        { name: 'field1', filter: { type: 'text' } },
        { name: 'field3', filter: { type: 'Radio' } },
        { name: 'field5', filter: { type: 'date' } },
      ])
    })
  })
})
