import { expect } from '@jest/globals'
import { components } from '../../types/api'
import { DashboardDataResponse } from '../../types/Metrics'
import VisualisationDatasetHelper from './VisualisationDatasetHelper'

describe('VisualisationDatasetHelper', () => {
  describe('getGroupKey', () => {
    let keys: components['schemas']['DashboardVisualisationColumnDefinition'][]
    beforeEach(() => {
      keys = [
        {
          id: 'key1',
        },
        {
          id: 'key2',
        },
        {
          id: 'key3',
        },
      ]
    })

    it('should set the correct key - value is empty string - key3', () => {
      const data: DashboardDataResponse[] = [
        {
          key1: { raw: 'value' },
          key2: { raw: 'value' },
          key3: { raw: 'value' },
          measure1: { raw: 'value' },
          measure2: { raw: 'value' },
        },
      ]

      const result = VisualisationDatasetHelper.getGroupKey(data, keys)
      expect(result).toEqual({ id: 'key3' })
    })

    it('should set the correct key - value is empty string - key2', () => {
      const data: DashboardDataResponse[] = [
        {
          key1: { raw: 'value' },
          key2: { raw: 'value' },
          key3: { raw: '' },
          measure1: { raw: 'value' },
          measure2: { raw: 'value' },
        },
      ]

      const result = VisualisationDatasetHelper.getGroupKey(data, keys)
      expect(result).toEqual({ id: 'key2' })
    })

    it('should set the correct key - value is empty string - key1', () => {
      const data: DashboardDataResponse[] = [
        {
          key1: { raw: 'value' },
          key2: { raw: '' },
          key3: { raw: '' },
          measure1: { raw: 'value' },
          measure2: { raw: 'value' },
        },
      ]

      const result = VisualisationDatasetHelper.getGroupKey(data, keys)
      expect(result).toEqual({ id: 'key1' })
    })

    it('should set the correct key - value is empty string - none', () => {
      const data: DashboardDataResponse[] = [
        { key1: { raw: '' } },
        { key2: { raw: '' } },
        { key3: { raw: '' } },
        { measure1: { raw: 'value' } },
        { measure2: { raw: 'value' } },
      ]

      const result = VisualisationDatasetHelper.getGroupKey(data, keys)
      expect(result).toEqual(undefined)
    })

    it('should set the correct key - value is undefined - key2', () => {
      const data: DashboardDataResponse[] = [
        {
          key1: { raw: 'value' },
          key2: { raw: 'value' },
          key3: { raw: undefined },
          measure1: { raw: 'value' },
          measure2: { raw: 'value' },
        },
      ]

      const result = VisualisationDatasetHelper.getGroupKey(data, keys)
      expect(result).toEqual({ id: 'key2' })
    })

    it('should set the correct key - value is undefined - key1', () => {
      const data: DashboardDataResponse[] = [
        {
          key1: { raw: 'value' },
          key2: { raw: undefined },
          key3: { raw: undefined },
          measure1: { raw: 'value' },
          measure2: { raw: 'value' },
        },
      ]

      const result = VisualisationDatasetHelper.getGroupKey(data, keys)
      expect(result).toEqual({ id: 'key1' })
    })

    it('should set the correct key - value is undefined - none', () => {
      const data: DashboardDataResponse[] = [
        { key1: { raw: undefined } },
        { key2: { raw: undefined } },
        { key3: { raw: undefined } },
        { measure1: { raw: 'value' } },
        { measure2: { raw: 'value' } },
      ]

      const result = VisualisationDatasetHelper.getGroupKey(data, keys)
      expect(result).toEqual(undefined)
    })

    it('should set the correct key - value is null - key2', () => {
      const data: DashboardDataResponse[] = [
        {
          key1: { raw: 'value' },
          key2: { raw: 'value' },
          key3: { raw: null },
          measure1: { raw: 'value' },
          measure2: { raw: 'value' },
        },
      ]

      const result = VisualisationDatasetHelper.getGroupKey(data, keys)
      expect(result).toEqual({ id: 'key2' })
    })

    it('should set the correct key - value is null - key1', () => {
      const data: DashboardDataResponse[] = [
        {
          key1: { raw: 'value' },
          key2: { raw: null },
          key3: { raw: null },
          measure1: { raw: 'value' },
          measure2: { raw: 'value' },
        },
      ]

      const result = VisualisationDatasetHelper.getGroupKey(data, keys)
      expect(result).toEqual({ id: 'key1' })
    })

    it('should set the correct key - value is null - none', () => {
      const data: DashboardDataResponse[] = [
        { key1: { raw: null } },
        { key2: { raw: null } },
        { key3: { raw: null } },
        { measure1: { raw: 'value' } },
        { measure2: { raw: 'value' } },
      ]

      const result = VisualisationDatasetHelper.getGroupKey(data, keys)
      expect(result).toEqual(undefined)
    })

    it('should set the correct key - key is undefined - key2', () => {
      const data: DashboardDataResponse[] = [
        {
          key1: { raw: 'value' },
          key2: { raw: 'value' },
          measure1: { raw: 'value' },
          measure2: { raw: 'value' },
        },
      ]

      const result = VisualisationDatasetHelper.getGroupKey(data, keys)
      expect(result).toEqual({ id: 'key2' })
    })

    it('should set the correct key - key is undefined - key1', () => {
      const data: DashboardDataResponse[] = [
        {
          key1: { raw: 'value' },
          measure1: { raw: 'value' },
          measure2: { raw: 'value' },
        },
      ]

      const result = VisualisationDatasetHelper.getGroupKey(data, keys)
      expect(result).toEqual({ id: 'key1' })
    })

    it('should set the correct key - key is undefined - none', () => {
      const data: DashboardDataResponse[] = [{ measure1: { raw: 'value' } }, { measure2: { raw: 'value' } }]

      const result = VisualisationDatasetHelper.getGroupKey(data, keys)
      expect(result).toEqual(undefined)
    })

    it('should return undefined when no keys are provided', () => {
      const data: DashboardDataResponse[] = [{ measure1: { raw: 'value' } }, { measure2: { raw: 'value' } }]

      const result = VisualisationDatasetHelper.getGroupKey(data, undefined)
      expect(result).toEqual(undefined)
    })

    it('should return undefined when no keys empty', () => {
      const data: DashboardDataResponse[] = [{ measure1: { raw: 'value' } }, { measure2: { raw: 'value' } }]

      const result = VisualisationDatasetHelper.getGroupKey(data, [])
      expect(result).toEqual(undefined)
    })
  })

  describe('groupRowsByTimestamp', () => {
    let data: DashboardDataResponse[]

    it('should group the rows by ts', () => {
      data = [
        {
          ts: { raw: 'ts1_earliest' },
          field1: { raw: 'field1' },
          field2: { raw: 'field2' },
          field3: { raw: 'field3' },
        },
        {
          ts: { raw: 'ts1_earliest' },
          field1: { raw: 'field1' },
          field2: { raw: 'field2' },
          field3: { raw: 'field3' },
        },
        {
          ts: { raw: 'ts2' },
          field1: { raw: 'field1' },
          field2: { raw: 'field2' },
          field3: { raw: 'field3' },
        },
        {
          ts: { raw: 'ts2' },
          field1: { raw: 'field1' },
          field2: { raw: 'field2' },
          field3: { raw: 'field3' },
        },
        {
          ts: { raw: 'ts3_latest' },
          field1: { raw: 'field1' },
          field2: { raw: 'field2' },
          field3: { raw: 'field3' },
        },
        {
          ts: { raw: 'ts3_latest' },
          field1: { raw: 'field1' },
          field2: { raw: 'field2' },
          field3: { raw: 'field3' },
        },
      ]

      const result = VisualisationDatasetHelper.groupRowsByTimestamp(data)

      expect(result).toEqual([
        [
          {
            ts: { raw: 'ts1_earliest' },
            field1: { raw: 'field1' },
            field2: { raw: 'field2' },
            field3: { raw: 'field3' },
          },
          {
            ts: { raw: 'ts1_earliest' },
            field1: { raw: 'field1' },
            field2: { raw: 'field2' },
            field3: { raw: 'field3' },
          },
        ],
        [
          {
            ts: { raw: 'ts2' },
            field1: { raw: 'field1' },
            field2: { raw: 'field2' },
            field3: { raw: 'field3' },
          },
          {
            ts: { raw: 'ts2' },
            field1: { raw: 'field1' },
            field2: { raw: 'field2' },
            field3: { raw: 'field3' },
          },
        ],
        [
          {
            ts: { raw: 'ts3_latest' },
            field1: { raw: 'field1' },
            field2: { raw: 'field2' },
            field3: { raw: 'field3' },
          },
          {
            ts: { raw: 'ts3_latest' },
            field1: { raw: 'field1' },
            field2: { raw: 'field2' },
            field3: { raw: 'field3' },
          },
        ],
      ])
    })

    it('should return full dataset if not ts', () => {
      data = [
        {
          field1: { raw: 'field1' },
          field2: { raw: 'field2' },
          field3: { raw: 'field3' },
        },
        {
          field1: { raw: 'field1' },
          field2: { raw: 'field2' },
          field3: { raw: 'field3' },
        },
        {
          field1: { raw: 'field1' },
          field2: { raw: 'field2' },
          field3: { raw: 'field3' },
        },
      ]

      const result = VisualisationDatasetHelper.getLastestDataset(data)
      expect(result).toEqual(data)
    })
  })

  describe('groupRowsByKey', () => {
    let data: DashboardDataResponse[]

    it('should group the row by key', () => {
      data = [
        {
          ts: { raw: 'ts' },
          field1: { raw: 'field1' },
          field2: { raw: 'one' },
          field3: { raw: 'field3' },
        },
        {
          ts: { raw: 'ts' },
          field1: { raw: 'field1' },
          field2: { raw: 'one' },
          field3: { raw: 'field3' },
        },
        {
          ts: { raw: 'ts' },
          field1: { raw: 'field1' },
          field2: { raw: 'two' },
          field3: { raw: 'field3' },
        },
        {
          ts: { raw: 'ts' },
          field1: { raw: 'field1' },
          field2: { raw: 'three' },
          field3: { raw: 'field3' },
        },
        {
          ts: { raw: 'ts' },
          field1: { raw: 'field1' },
          field2: { raw: 'two' },
          field3: { raw: 'field3' },
        },
        {
          ts: { raw: 'ts' },
          field1: { raw: 'field1' },
          field2: { raw: 'three' },
          field3: { raw: 'field3' },
        },
      ]

      const result = VisualisationDatasetHelper.groupRowsByKey(data, 'field2')

      expect(result).toEqual([
        [
          {
            ts: { raw: 'ts' },
            field1: { raw: 'field1' },
            field2: { raw: 'one' },
            field3: { raw: 'field3' },
          },
          {
            ts: { raw: 'ts' },
            field1: { raw: 'field1' },
            field2: { raw: 'one' },
            field3: { raw: 'field3' },
          },
        ],
        [
          {
            ts: { raw: 'ts' },
            field1: { raw: 'field1' },
            field2: { raw: 'two' },
            field3: { raw: 'field3' },
          },
          {
            ts: { raw: 'ts' },
            field1: { raw: 'field1' },
            field2: { raw: 'two' },
            field3: { raw: 'field3' },
          },
        ],
        [
          {
            ts: { raw: 'ts' },
            field1: { raw: 'field1' },
            field2: { raw: 'three' },
            field3: { raw: 'field3' },
          },
          {
            ts: { raw: 'ts' },
            field1: { raw: 'field1' },
            field2: { raw: 'three' },
            field3: { raw: 'field3' },
          },
        ],
      ])
    })
  })
})
