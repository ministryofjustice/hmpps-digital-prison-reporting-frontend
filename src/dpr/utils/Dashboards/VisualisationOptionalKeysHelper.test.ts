import { expect } from '@jest/globals'
import { components } from '../../types/api'
import { DashboardDataResponse } from '../../types/Metrics'
import { filterRowsByKeys, getKeyVariations, getKeyIds } from './VisualisationOptionalKeysHelper'

describe('DatasetHelper', () => {
  describe('getKeyVariations', () => {
    let keys: components['schemas']['DashboardVisualisationColumnDefinition'][]

    it('should get the key variations', () => {
      keys = [{ id: 'field1' }, { id: 'field2' }, { id: 'field3' }]
      const result = getKeyVariations(keys)

      expect(result).toEqual([
        ['field1', 'field2', 'field3'],
        ['field1', 'field2', 'field3'],
        ['field1', 'field2', 'field3'],
      ])
    })

    it('should get the key variations with optional', () => {
      keys = [{ id: 'field1' }, { id: 'field2' }, { id: 'field3', optional: true }]
      const result = getKeyVariations(keys)

      expect(result).toEqual([
        ['field1', 'field2', 'field3'],
        ['field1', 'field2'],
        ['field1', 'field2'],
      ])
    })

    it('should get the key variations with optional', () => {
      keys = [{ id: 'field1' }, { id: 'field2', optional: true }, { id: 'field3', optional: true }]
      const result = getKeyVariations(keys)

      expect(result).toEqual([['field1', 'field2', 'field3'], ['field1', 'field2'], ['field1']])
    })

    it('should get the key variations with optional', () => {
      keys = [
        { id: 'field1', optional: true },
        { id: 'field2', optional: true },
        { id: 'field3', optional: true },
      ]
      const result = getKeyVariations(keys)

      expect(result).toEqual([['field1', 'field2', 'field3'], ['field1', 'field2'], ['field1'], []])
    })
  })

  describe('getKeyIds', () => {
    let data: DashboardDataResponse[]
    let colIdVariations: string[][]

    it('should get the key variations 1', () => {
      data = [
        {
          field1: { raw: 'field1' },
          field2: { raw: 'field2' },
          field3: { raw: 'field3' },
          field4: { raw: 'field4' },
          field5: { raw: 'field5' },
        },
      ]

      colIdVariations = [
        ['field1', 'field2', 'field3'],
        ['field1', 'field2', 'field3'],
        ['field1', 'field2', 'field3'],
      ]

      const result = getKeyIds(data, colIdVariations)
      expect(result).toEqual(['field1', 'field2', 'field3'])
    })

    it('should get the key variations 2 ', () => {
      data = [
        {
          field1: { raw: 'field1' },
          field2: { raw: 'field2' },
          field3: { raw: '' },
          field4: { raw: 'field4' },
          field5: { raw: 'field5' },
        },
      ]

      colIdVariations = [
        ['field1', 'field2', 'field3'],
        ['field1', 'field2'],
        ['field1', 'field2'],
      ]

      const result = getKeyIds(data, colIdVariations)
      expect(result).toEqual(['field1', 'field2'])
    })

    it('should get the key variations 3', () => {
      data = [
        {
          field1: { raw: 'field1' },
          field2: { raw: 'field2' },
          field3: { raw: '' },
          field4: { raw: 'field4' },
          field5: { raw: 'field5' },
        },
      ]

      colIdVariations = [['field1', 'field2', 'field3'], ['field1', 'field2'], ['field1']]

      const result = getKeyIds(data, colIdVariations)
      expect(result).toEqual(['field1', 'field2'])
    })

    it('should get the key variations 4', () => {
      data = [
        {
          field1: { raw: 'field1' },
          field2: { raw: '' },
          field3: { raw: '' },
          field4: { raw: 'field4' },
          field5: { raw: 'field5' },
        },
      ]

      colIdVariations = [['field1', 'field2', 'field3'], ['field1', 'field2'], ['field1']]

      const result = getKeyIds(data, colIdVariations)
      expect(result).toEqual(['field1'])
    })

    it('should get the key variations 5', () => {
      data = [
        {
          field1: { raw: '' },
          field2: { raw: '' },
          field3: { raw: '' },
          field4: { raw: 'field4' },
          field5: { raw: 'field5' },
        },
      ]

      colIdVariations = [['field1', 'field2', 'field3'], ['field1', 'field2'], ['field1']]

      const result = getKeyIds(data, colIdVariations)
      expect(result).toEqual(['field1'])
    })

    it('should get the key variations 6', () => {
      data = [
        {
          field1: { raw: '' },
          field2: { raw: '' },
          field3: { raw: '' },
          field4: { raw: 'field4' },
          field5: { raw: 'field5' },
        },
      ]

      colIdVariations = [
        ['field1', 'field2', 'field3'],
        ['field1', 'field2', 'field3'],
        ['field1', 'field2', 'field3'],
      ]

      const result = getKeyIds(data, colIdVariations)
      expect(result).toEqual(['field1', 'field2', 'field3'])
    })

    it('should get the key variations 7', () => {
      data = [
        {
          field1: { raw: '' },
          field2: { raw: '' },
          field3: { raw: '' },
          field4: { raw: 'field4' },
          field5: { raw: 'field5' },
        },
      ]

      colIdVariations = [['field1', 'field2', 'field3'], ['field1', 'field2'], ['field1'], []]

      const result = getKeyIds(data, colIdVariations)
      expect(result).toEqual([])
    })
  })

  describe('filterRowsByKeys', () => {
    let data: DashboardDataResponse[]
    let keys: components['schemas']['DashboardVisualisationColumnDefinition'][]

    it('should filter the data by the keys 1', () => {
      data = [
        {
          field1: { raw: 'field1' },
          field2: { raw: 'field2' },
          field3: { raw: 'field3' },
          field4: { raw: 'field4' },
          field5: { raw: 'field5' },
        },
      ]

      keys = [{ id: 'field1' }, { id: 'field2' }, { id: 'field3' }]

      const result = filterRowsByKeys(data, keys)
      expect(result).toEqual([
        {
          field1: { raw: 'field1' },
          field2: { raw: 'field2' },
          field3: { raw: 'field3' },
          field4: { raw: 'field4' },
          field5: { raw: 'field5' },
        },
      ])
    })

    it('should filter the data by the keys 2', () => {
      data = [
        {
          field1: { raw: 'field1' },
          field2: { raw: 'field2' },
          field3: { raw: '' },
          field4: { raw: 'field4' },
          field5: { raw: 'field5' },
        },
      ]

      keys = [{ id: 'field1' }, { id: 'field2' }, { id: 'field3' }]

      const result = filterRowsByKeys(data, keys)

      expect(result).toEqual([])
    })

    it('should filter the data by the keys 3', () => {
      data = [
        {
          field1: { raw: 'field1' },
          field2: { raw: 'field2' },
          field3: { raw: '' },
          field4: { raw: 'field4' },
          field5: { raw: 'field5' },
        },
      ]

      keys = [{ id: 'field1' }, { id: 'field2' }, { id: 'field3', optional: true }]

      const result = filterRowsByKeys(data, keys)

      expect(result).toEqual([
        {
          field1: { raw: 'field1' },
          field2: { raw: 'field2' },
          field3: { raw: '' },
          field4: { raw: 'field4' },
          field5: { raw: 'field5' },
        },
      ])
    })

    it('should filter the data by the keys 4', () => {
      data = [
        {
          field1: { raw: 'field1' },
          field2: { raw: '' },
          field3: { raw: '' },
          field4: { raw: 'field4' },
          field5: { raw: 'field5' },
        },
      ]

      keys = [{ id: 'field1' }, { id: 'field2' }, { id: 'field3', optional: true }]

      const result = filterRowsByKeys(data, keys)

      expect(result).toEqual([])
    })

    it('should filter the data by the keys 5', () => {
      data = [
        {
          field1: { raw: 'field1' },
          field2: { raw: '' },
          field3: { raw: '' },
          field4: { raw: 'field4' },
          field5: { raw: 'field5' },
        },
      ]

      keys = [{ id: 'field1' }, { id: 'field2', optional: true }, { id: 'field3', optional: true }]

      const result = filterRowsByKeys(data, keys)

      expect(result).toEqual([
        {
          field1: {
            raw: 'field1',
          },
          field2: {
            raw: '',
          },
          field3: {
            raw: '',
          },
          field4: {
            raw: 'field4',
          },
          field5: {
            raw: 'field5',
          },
        },
      ])
    })

    it('should filter the data by the keys 6', () => {
      data = [
        {
          field1: { raw: '' },
          field2: { raw: '' },
          field3: { raw: '' },
          field4: { raw: 'field4' },
          field5: { raw: 'field5' },
        },
      ]

      keys = [{ id: 'field1' }, { id: 'field2', optional: true }, { id: 'field3', optional: true }]

      const result = filterRowsByKeys(data, keys)

      expect(result).toEqual([])
    })

    it('should filter the data by the keys 7', () => {
      data = [
        {
          field1: { raw: '' },
          field2: { raw: '' },
          field3: { raw: '' },
          field4: { raw: 'field4' },
          field5: { raw: 'field5' },
        },
      ]

      keys = [
        { id: 'field1', optional: true },
        { id: 'field2', optional: true },
        { id: 'field3', optional: true },
      ]

      const result = filterRowsByKeys(data, keys)

      expect(result).toEqual([
        {
          field1: {
            raw: '',
          },
          field2: {
            raw: '',
          },
          field3: {
            raw: '',
          },
          field4: {
            raw: 'field4',
          },
          field5: {
            raw: 'field5',
          },
        },
      ])
    })
  })
})
