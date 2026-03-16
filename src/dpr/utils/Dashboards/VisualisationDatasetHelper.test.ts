import { expect } from '@jest/globals'
import { components } from '../../types/api'
import { DashboardDataResponse } from '../../types/Metrics'
import VisualisationDatasetHelper from './VisualisationDatasetHelper'

describe('VisualisationDatasetHelper', () => {
  describe('getDatasetRows', () => {
    describe('get the data set rows', () => {
      it('target rows with some null values', () => {
        //  Get row that shows total prisoners between ages of `18-25` for `ABC` in wing `I`
        const dataset = [
          {
            establishment_id: { raw: 'ABC' },
            wing: { raw: 'I' },
            age_range_1: { raw: '18-25' },
            age_range_2: { raw: '' },
            total_prisoners: { raw: '6' },
          },
          {
            establishment_id: { raw: 'ABC' },
            wing: { raw: 'I' },
            age_range_1: { raw: '' },
            age_range_2: { raw: '18-21' },
            total_prisoners: { raw: '10' },
          },
        ]

        const expectedResult = [
          {
            age_range_1: { raw: '18-25' },
            age_range_2: { raw: '' },
            establishment_id: { raw: 'ABC' },
            total_prisoners: { raw: '6' },
            wing: { raw: 'I' },
          },
        ]

        const definition = {
          columns: {
            keys: [
              {
                id: 'establishment_id',
                display: 'Establishment ID',
              },
              {
                id: 'wing',
                display: 'Wing',
              },
            ],
            measures: [
              {
                id: 'age_range_1',
                display: 'Age Range 1',
              },
              {
                id: 'total_prisoners',
                display: 'Total Prisoners',
              },
            ],
          },
        } as unknown as components['schemas']['DashboardVisualisationDefinition']

        const result = VisualisationDatasetHelper.getDatasetRows(definition, dataset)
        expect(result).toEqual(expectedResult)
      })

      it('target rows with extra values & some null values', () => {
        // Get row that shows total prisoners by `ethnic_description` for establishment and wing
        const dataset = [
          {
            establishment_id: { raw: 'ABC' },
            wing: { raw: 'I' },
            ethnic_code: { raw: 'W2' },
            ethnic_description: { raw: 'W1-White: Eng./Wel' },
            MetricTwo_code: { raw: '' },
            age_range_18_25: { raw: '4' },
            total_prisoners: { raw: '14' },
          },
          {
            establishment_id: { raw: 'ABC' },
            wing: { raw: 'I' },
            ethnic_code: { raw: '' },
            ethnic_description: { raw: '' },
            MetricTwo_code: { raw: 'BRIT' },
            age_range_18_25: { raw: '' },
            total_prisoners: { raw: '30' },
          },
        ]

        const expectedResult = [
          {
            establishment_id: { raw: 'ABC' },
            wing: { raw: 'I' },
            ethnic_code: { raw: 'W2' },
            ethnic_description: { raw: 'W1-White: Eng./Wel' },
            MetricTwo_code: { raw: '' },
            age_range_18_25: { raw: '4' },
            total_prisoners: { raw: '14' },
          },
        ]

        const definition = {
          columns: {
            keys: [
              {
                id: 'establishment_id',
                display: 'Establishment ID',
              },
              {
                id: 'wing',
                display: 'Wing',
              },
            ],
            measures: [
              {
                id: 'ethnic_description',
                display: 'Ethnic description',
              },
              {
                id: 'total_prisoners',
                display: 'Total Prisoners',
              },
            ],
          },
        } as unknown as components['schemas']['DashboardVisualisationDefinition']

        const result = VisualisationDatasetHelper.getDatasetRows(definition, dataset)
        expect(result).toEqual(expectedResult)
      })

      it('target rows with mostly null values', () => {
        // Get row that shows total prisoners for establishment

        const dataset = [
          {
            establishment_id: { raw: 'ABC' },
            wing: { raw: 'I' },
            total_prisoners: { raw: '14' },
          },
          {
            establishment_id: { raw: 'ABC' },
            wing: { raw: '' },
            total_prisoners: { raw: '30' },
          },
        ]

        const expectedResult = [
          {
            establishment_id: { raw: 'ABC' },
            wing: { raw: '' },
            total_prisoners: { raw: '30' },
          },
        ]

        const definition = {
          columns: {
            measures: [
              {
                id: 'establishment_id',
                display: 'Establishment ID',
              },
              {
                id: 'total_prisoners',
                display: 'Total Prisoners',
              },
            ],
            expectNulls: true,
          },
        } as unknown as components['schemas']['DashboardVisualisationDefinition']

        const result = VisualisationDatasetHelper.getDatasetRows(definition, dataset)
        expect(result).toEqual(expectedResult)
      })

      it('target rows by specific value', () => {
        // Get rows that show BRIT prisoners totals by establishment, by wing
        const dataset = [
          {
            establishment_id: { raw: 'ABC' },
            wing: { raw: '' },
            MetricTwo_code: { raw: 'BRIT' },
            total_prisoners: { raw: '45' },
          },
          {
            establishment_id: { raw: 'ABC' },
            wing: { raw: 'I' },
            MetricTwo_code: { raw: 'BRIT' },
            total_prisoners: { raw: '14' },
          },
          {
            establishment_id: { raw: 'ABC' },
            wing: { raw: 'J' },
            MetricTwo_code: { raw: 'BRIT' },
            total_prisoners: { raw: '15' },
          },
          {
            establishment_id: { raw: 'ABC' },
            wing: { raw: 'K' },
            MetricTwo_code: { raw: 'BRIT' },
            total_prisoners: { raw: '16' },
          },
          {
            establishment_id: { raw: 'ABC' },
            wing: { raw: '' },
            MetricTwo_code: { raw: 'ASIAN' },
            total_prisoners: { raw: '15' },
          },
          {
            establishment_id: { raw: 'ABC' },
            wing: { raw: 'I' },
            MetricTwo_code: { raw: 'ASIAN' },
            total_prisoners: { raw: '5' },
          },
          {
            establishment_id: { raw: 'ABC' },
            wing: { raw: 'J' },
            MetricTwo_code: { raw: 'ASIAN' },
            total_prisoners: { raw: '4' },
          },
          {
            establishment_id: { raw: 'ABC' },
            wing: { raw: 'K' },
            MetricTwo_code: { raw: 'ASIAN' },
            total_prisoners: { raw: '6' },
          },
        ]

        const expectedResult = [
          {
            establishment_id: { raw: 'ABC' },
            MetricTwo_code: { raw: 'BRIT' },
            total_prisoners: { raw: '14' },
            wing: { raw: 'I' },
          },
          {
            establishment_id: { raw: 'ABC' },
            MetricTwo_code: { raw: 'BRIT' },
            total_prisoners: { raw: '15' },
            wing: { raw: 'J' },
          },
          {
            establishment_id: { raw: 'ABC' },
            MetricTwo_code: { raw: 'BRIT' },
            total_prisoners: { raw: '16' },
            wing: { raw: 'K' },
          },
        ]

        const definition = {
          columns: {
            keys: [
              {
                id: 'establishment_id',
                display: 'Establishment ID',
              },
              {
                id: 'wing',
                display: 'Wing',
              },
            ],
            measures: [
              {
                id: 'establishment_id',
                display: 'Establishment ID',
              },
              {
                id: 'total_prisoners',
                display: 'Total Prisoners',
              },
            ],
            filters: [
              {
                id: 'MetricTwo_code',
                equals: 'BRIT',
              },
            ],
          },
        } as unknown as components['schemas']['DashboardVisualisationDefinition']

        const result = VisualisationDatasetHelper.getDatasetRows(definition, dataset)
        expect(result).toEqual(expectedResult)
      })

      it('target rows with optional keys', () => {
        // Get rows that show BRIT prisoners totals by establishment, by wing
        const dataset = [
          {
            establishment_id: { raw: 'ABC' },
            wing: { raw: '' },
            MetricTwo_code: { raw: 'BRIT' },
            total_prisoners: { raw: '45' },
          },
          {
            establishment_id: { raw: 'ABC' },
            wing: { raw: 'I' },
            MetricTwo_code: { raw: 'BRIT' },
            total_prisoners: { raw: '14' },
          },
          {
            establishment_id: { raw: 'ABC' },
            wing: { raw: 'J' },
            MetricTwo_code: { raw: 'BRIT' },
            total_prisoners: { raw: '15' },
          },
          {
            establishment_id: { raw: 'ABC' },
            wing: { raw: 'K' },
            MetricTwo_code: { raw: 'BRIT' },
            total_prisoners: { raw: '16' },
          },
          {
            establishment_id: { raw: 'ABC' },
            wing: { raw: '' },
            MetricTwo_code: { raw: 'ASIAN' },
            total_prisoners: { raw: '15' },
          },
          {
            establishment_id: { raw: 'ABC' },
            wing: { raw: 'I' },
            MetricTwo_code: { raw: 'ASIAN' },
            total_prisoners: { raw: '5' },
          },
          {
            establishment_id: { raw: 'ABC' },
            wing: { raw: 'J' },
            MetricTwo_code: { raw: 'ASIAN' },
            total_prisoners: { raw: '4' },
          },
          {
            establishment_id: { raw: 'ABC' },
            wing: { raw: 'K' },
            MetricTwo_code: { raw: 'ASIAN' },
            total_prisoners: { raw: '6' },
          },
        ]

        const expectedResult = [
          {
            establishment_id: { raw: 'ABC' },
            wing: { raw: 'I' },
            MetricTwo_code: { raw: 'BRIT' },
            total_prisoners: { raw: '14' },
          },
          {
            establishment_id: { raw: 'ABC' },
            wing: { raw: 'J' },
            MetricTwo_code: { raw: 'BRIT' },
            total_prisoners: { raw: '15' },
          },
          {
            establishment_id: { raw: 'ABC' },
            wing: { raw: 'K' },
            MetricTwo_code: { raw: 'BRIT' },
            total_prisoners: { raw: '16' },
          },
          {
            establishment_id: { raw: 'ABC' },
            wing: { raw: 'I' },
            MetricTwo_code: { raw: 'ASIAN' },
            total_prisoners: { raw: '5' },
          },
          {
            establishment_id: { raw: 'ABC' },
            wing: { raw: 'J' },
            MetricTwo_code: { raw: 'ASIAN' },
            total_prisoners: { raw: '4' },
          },
          {
            establishment_id: { raw: 'ABC' },
            wing: { raw: 'K' },
            MetricTwo_code: { raw: 'ASIAN' },
            total_prisoners: { raw: '6' },
          },
        ]

        const definition = {
          columns: {
            keys: [
              {
                id: 'establishment_id',
                display: 'Establishment ID',
              },
              {
                id: 'wing',
                display: 'Wing',
                optional: true,
              },
            ],
            measures: [
              {
                id: 'establishment_id',
                display: 'Establishment ID',
              },
              {
                id: 'total_prisoners',
                display: 'Total Prisoners',
              },
            ],
          },
        } as unknown as components['schemas']['DashboardVisualisationDefinition']

        const result = VisualisationDatasetHelper.getDatasetRows(definition, dataset)
        expect(result).toEqual(expectedResult)
      })
    })
  })

  describe('filterRowsByDisplayColumns', () => {
    it('should filter the columns to only those required', () => {
      const definition = {
        columns: {
          keys: [
            {
              id: 'establishment_id',
              display: 'Establishment ID',
            },
            {
              id: 'wing',
              display: 'Wing',
            },
          ],
          measures: [
            {
              id: 'age_range_1',
              display: 'Age Range 1',
            },
            {
              id: 'total_prisoners',
              display: 'Total Prisoners',
            },
          ],
        },
      } as unknown as components['schemas']['DashboardVisualisationDefinition']

      const data = [
        {
          age_range_1: { raw: '18-25' },
          age_range_2: { raw: '' },
          establishment_id: { raw: 'ABC' },
          total_prisoners: { raw: '6' },
          wing: { raw: 'I' },
        },
      ]

      const expectedResult = [
        {
          age_range_1: { raw: '18-25' },
          total_prisoners: { raw: '6' },
        },
      ]
      const result = VisualisationDatasetHelper.filterRowsByDisplayColumns(definition, data)
      expect(result).toEqual(expectedResult)
    })

    it('should filter the columns to only those required, including keys', () => {
      const definition = {
        columns: {
          keys: [
            {
              id: 'establishment_id',
              display: 'Establishment ID',
            },
            {
              id: 'wing',
              display: 'Wing',
            },
          ],
          measures: [
            {
              id: 'age_range_1',
              display: 'Age Range 1',
            },
            {
              id: 'total_prisoners',
              display: 'Total Prisoners',
            },
          ],
        },
      } as unknown as components['schemas']['DashboardVisualisationDefinition']

      const data = [
        {
          age_range_1: { raw: '18-25' },
          age_range_2: { raw: '' },
          establishment_id: { raw: 'ABC' },
          total_prisoners: { raw: '6' },
          wing: { raw: 'I' },
        },
      ]

      const expectedResult = [
        {
          age_range_1: { raw: '18-25' },
          establishment_id: { raw: 'ABC' },
          total_prisoners: { raw: '6' },
          wing: { raw: 'I' },
        },
      ]
      const result = VisualisationDatasetHelper.filterRowsByDisplayColumns(definition, data, true)
      expect(result).toEqual(expectedResult)
    })
  })

  describe('getChartGroupKey', () => {
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

  describe('getLastestDataset', () => {
    let data: DashboardDataResponse[]

    it('should get the latest data from a dataset', () => {
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

      const result = VisualisationDatasetHelper.getLastestDataset(data)

      expect(result).toEqual([
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

  describe('getEarliestDataset', () => {
    let data: DashboardDataResponse[]

    it('should get the earliest data from a dataset', () => {
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

      const result = VisualisationDatasetHelper.getEarliestDataset(data)

      expect(result).toEqual([
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

      const result = VisualisationDatasetHelper.getEarliestDataset(data)
      expect(result).toEqual(data)
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
