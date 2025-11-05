import { components } from '../types/api'
import { DashboardDataResponse } from '../types/Metrics'
import DatasetHelper from './datasetHelper'

describe('DatasetHelper', () => {
  describe('getDatasetRows', () => {
    describe('get the data set rows', () => {
      it('target rows with some null values', () => {
        //  Get row that shows total prisoners between ages of `18-25` for `MDI` in wing `I`
        const dataset = [
          {
            establishment_id: { raw: 'MDI' },
            wing: { raw: 'I' },
            age_range_1: { raw: '18-25' },
            age_range_2: { raw: '' },
            total_prisoners: { raw: '6' },
          },
          {
            establishment_id: { raw: 'MDI' },
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
            establishment_id: { raw: 'MDI' },
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

        const result = DatasetHelper.getDatasetRows(definition, dataset)
        expect(result).toEqual(expectedResult)
      })

      it('target rows with extra values & some null values', () => {
        // Get row that shows total prisoners by `ethnic_description` for establishment and wing
        const dataset = [
          {
            establishment_id: { raw: 'MDI' },
            wing: { raw: 'I' },
            ethnic_code: { raw: 'W2' },
            ethnic_description: { raw: 'W1-White: Eng./Wel' },
            nationality_code: { raw: '' },
            age_range_18_25: { raw: '4' },
            total_prisoners: { raw: '14' },
          },
          {
            establishment_id: { raw: 'MDI' },
            wing: { raw: 'I' },
            ethnic_code: { raw: '' },
            ethnic_description: { raw: '' },
            nationality_code: { raw: 'BRIT' },
            age_range_18_25: { raw: '' },
            total_prisoners: { raw: '30' },
          },
        ]

        const expectedResult = [
          {
            establishment_id: { raw: 'MDI' },
            wing: { raw: 'I' },
            ethnic_code: { raw: 'W2' },
            ethnic_description: { raw: 'W1-White: Eng./Wel' },
            nationality_code: { raw: '' },
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

        const result = DatasetHelper.getDatasetRows(definition, dataset)
        expect(result).toEqual(expectedResult)
      })

      it('target rows with mostly null values', () => {
        // Get row that shows total prisoners for establishment

        const dataset = [
          {
            establishment_id: { raw: 'MDI' },
            wing: { raw: 'I' },
            total_prisoners: { raw: '14' },
          },
          {
            establishment_id: { raw: 'MDI' },
            wing: { raw: '' },
            total_prisoners: { raw: '30' },
          },
        ]

        const expectedResult = [
          {
            establishment_id: { raw: 'MDI' },
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

        const result = DatasetHelper.getDatasetRows(definition, dataset)
        expect(result).toEqual(expectedResult)
      })

      it('target rows by specific value', () => {
        // Get rows that show BRIT prisoners totals by establishment, by wing
        const dataset = [
          {
            establishment_id: { raw: 'MDI' },
            wing: { raw: '' },
            nationality_code: { raw: 'BRIT' },
            total_prisoners: { raw: '45' },
          },
          {
            establishment_id: { raw: 'MDI' },
            wing: { raw: 'I' },
            nationality_code: { raw: 'BRIT' },
            total_prisoners: { raw: '14' },
          },
          {
            establishment_id: { raw: 'MDI' },
            wing: { raw: 'J' },
            nationality_code: { raw: 'BRIT' },
            total_prisoners: { raw: '15' },
          },
          {
            establishment_id: { raw: 'MDI' },
            wing: { raw: 'K' },
            nationality_code: { raw: 'BRIT' },
            total_prisoners: { raw: '16' },
          },
          {
            establishment_id: { raw: 'MDI' },
            wing: { raw: '' },
            nationality_code: { raw: 'ASIAN' },
            total_prisoners: { raw: '15' },
          },
          {
            establishment_id: { raw: 'MDI' },
            wing: { raw: 'I' },
            nationality_code: { raw: 'ASIAN' },
            total_prisoners: { raw: '5' },
          },
          {
            establishment_id: { raw: 'MDI' },
            wing: { raw: 'J' },
            nationality_code: { raw: 'ASIAN' },
            total_prisoners: { raw: '4' },
          },
          {
            establishment_id: { raw: 'MDI' },
            wing: { raw: 'K' },
            nationality_code: { raw: 'ASIAN' },
            total_prisoners: { raw: '6' },
          },
        ]

        const expectedResult = [
          {
            establishment_id: { raw: 'MDI' },
            nationality_code: { raw: 'BRIT' },
            total_prisoners: { raw: '14' },
            wing: { raw: 'I' },
          },
          {
            establishment_id: { raw: 'MDI' },
            nationality_code: { raw: 'BRIT' },
            total_prisoners: { raw: '15' },
            wing: { raw: 'J' },
          },
          {
            establishment_id: { raw: 'MDI' },
            nationality_code: { raw: 'BRIT' },
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
                id: 'nationality_code',
                equals: 'BRIT',
              },
            ],
          },
        } as unknown as components['schemas']['DashboardVisualisationDefinition']

        const result = DatasetHelper.getDatasetRows(definition, dataset)
        expect(result).toEqual(expectedResult)
      })

      it('target rows with optional keys', () => {
        // Get rows that show BRIT prisoners totals by establishment, by wing
        const dataset = [
          {
            establishment_id: { raw: 'MDI' },
            wing: { raw: '' },
            nationality_code: { raw: 'BRIT' },
            total_prisoners: { raw: '45' },
          },
          {
            establishment_id: { raw: 'MDI' },
            wing: { raw: 'I' },
            nationality_code: { raw: 'BRIT' },
            total_prisoners: { raw: '14' },
          },
          {
            establishment_id: { raw: 'MDI' },
            wing: { raw: 'J' },
            nationality_code: { raw: 'BRIT' },
            total_prisoners: { raw: '15' },
          },
          {
            establishment_id: { raw: 'MDI' },
            wing: { raw: 'K' },
            nationality_code: { raw: 'BRIT' },
            total_prisoners: { raw: '16' },
          },
          {
            establishment_id: { raw: 'MDI' },
            wing: { raw: '' },
            nationality_code: { raw: 'ASIAN' },
            total_prisoners: { raw: '15' },
          },
          {
            establishment_id: { raw: 'MDI' },
            wing: { raw: 'I' },
            nationality_code: { raw: 'ASIAN' },
            total_prisoners: { raw: '5' },
          },
          {
            establishment_id: { raw: 'MDI' },
            wing: { raw: 'J' },
            nationality_code: { raw: 'ASIAN' },
            total_prisoners: { raw: '4' },
          },
          {
            establishment_id: { raw: 'MDI' },
            wing: { raw: 'K' },
            nationality_code: { raw: 'ASIAN' },
            total_prisoners: { raw: '6' },
          },
        ]

        const expectedResult = [
          {
            establishment_id: { raw: 'MDI' },
            wing: { raw: 'I' },
            nationality_code: { raw: 'BRIT' },
            total_prisoners: { raw: '14' },
          },
          {
            establishment_id: { raw: 'MDI' },
            wing: { raw: 'J' },
            nationality_code: { raw: 'BRIT' },
            total_prisoners: { raw: '15' },
          },
          {
            establishment_id: { raw: 'MDI' },
            wing: { raw: 'K' },
            nationality_code: { raw: 'BRIT' },
            total_prisoners: { raw: '16' },
          },
          {
            establishment_id: { raw: 'MDI' },
            wing: { raw: 'I' },
            nationality_code: { raw: 'ASIAN' },
            total_prisoners: { raw: '5' },
          },
          {
            establishment_id: { raw: 'MDI' },
            wing: { raw: 'J' },
            nationality_code: { raw: 'ASIAN' },
            total_prisoners: { raw: '4' },
          },
          {
            establishment_id: { raw: 'MDI' },
            wing: { raw: 'K' },
            nationality_code: { raw: 'ASIAN' },
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

        const result = DatasetHelper.getDatasetRows(definition, dataset)
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
      } as unknown as DashboardVisualisation

      const data = [
        {
          age_range_1: { raw: '18-25' },
          age_range_2: { raw: '' },
          establishment_id: { raw: 'MDI' },
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
      const result = DatasetHelper.filterRowsByDisplayColumns(definition, data)
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
          establishment_id: { raw: 'MDI' },
          total_prisoners: { raw: '6' },
          wing: { raw: 'I' },
        },
      ]

      const expectedResult = [
        {
          age_range_1: { raw: '18-25' },
          establishment_id: { raw: 'MDI' },
          total_prisoners: { raw: '6' },
          wing: { raw: 'I' },
        },
      ]
      const result = DatasetHelper.filterRowsByDisplayColumns(definition, data, true)
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

      const result = DatasetHelper.getGroupKey(keys, data)
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

      const result = DatasetHelper.getGroupKey(keys, data)
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

      const result = DatasetHelper.getGroupKey(keys, data)
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

      const result = DatasetHelper.getGroupKey(keys, data)
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

      const result = DatasetHelper.getGroupKey(keys, data)
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

      const result = DatasetHelper.getGroupKey(keys, data)
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

      const result = DatasetHelper.getGroupKey(keys, data)
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

      const result = DatasetHelper.getGroupKey(keys, data)
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

      const result = DatasetHelper.getGroupKey(keys, data)
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

      const result = DatasetHelper.getGroupKey(keys, data)
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

      const result = DatasetHelper.getGroupKey(keys, data)
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

      const result = DatasetHelper.getGroupKey(keys, data)
      expect(result).toEqual({ id: 'key1' })
    })

    it('should set the correct key - key is undefined - none', () => {
      const data: DashboardDataResponse[] = [{ measure1: { raw: 'value' } }, { measure2: { raw: 'value' } }]

      const result = DatasetHelper.getGroupKey(keys, data)
      expect(result).toEqual(undefined)
    })

    it('should return undefined when no keys are provided', () => {
      const data: DashboardDataResponse[] = [{ measure1: { raw: 'value' } }, { measure2: { raw: 'value' } }]

      const result = DatasetHelper.getGroupKey(undefined, data)
      expect(result).toEqual(undefined)
    })

    it('should return undefined when no keys empty', () => {
      const data: DashboardDataResponse[] = [{ measure1: { raw: 'value' } }, { measure2: { raw: 'value' } }]

      const result = DatasetHelper.getGroupKey([], data)
      expect(result).toEqual(undefined)
    })
  })

  describe('getKeyVariations', () => {
    let data: DashboardDataResponse[]
    let keys: components['schemas']['DashboardVisualisationColumnDefinition'][]

    beforeEach(() => {
      data = [
        {
          field1: { raw: 'field1' },
          field2: { raw: 'field2' },
          field3: { raw: 'field3' },
          field4: { raw: 'field4' },
          field5: { raw: 'field5' },
        },
      ]
    })

    it('should get the key variations', () => {
      keys = [{ id: 'field1' }, { id: 'field2' }, { id: 'field3' }]
      const result = DatasetHelper.getKeyVariations(data, keys)

      expect(result).toEqual([
        ['field1', 'field2', 'field3'],
        ['field1', 'field2', 'field3'],
        ['field1', 'field2', 'field3'],
      ])
    })

    it('should get the key variations with optional', () => {
      keys = [{ id: 'field1' }, { id: 'field2' }, { id: 'field3', optional: true }]
      const result = DatasetHelper.getKeyVariations(data, keys)

      expect(result).toEqual([
        ['field1', 'field2', 'field3'],
        ['field1', 'field2'],
        ['field1', 'field2'],
      ])
    })

    it('should get the key variations with optional', () => {
      keys = [{ id: 'field1' }, { id: 'field2', optional: true }, { id: 'field3', optional: true }]
      const result = DatasetHelper.getKeyVariations(data, keys)

      expect(result).toEqual([['field1', 'field2', 'field3'], ['field1', 'field2'], ['field1']])
    })

    it('should get the key variations with optional', () => {
      keys = [
        { id: 'field1', optional: true },
        { id: 'field2', optional: true },
        { id: 'field3', optional: true },
      ]
      const result = DatasetHelper.getKeyVariations(data, keys)

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

      const result = DatasetHelper.getKeyIds(data, colIdVariations)
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

      const result = DatasetHelper.getKeyIds(data, colIdVariations)
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

      const result = DatasetHelper.getKeyIds(data, colIdVariations)
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

      const result = DatasetHelper.getKeyIds(data, colIdVariations)
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

      const result = DatasetHelper.getKeyIds(data, colIdVariations)
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

      const result = DatasetHelper.getKeyIds(data, colIdVariations)
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

      const result = DatasetHelper.getKeyIds(data, colIdVariations)
      expect(result).toEqual([])
    })
  })

  describe('filterKeys', () => {
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

      const result = DatasetHelper.filterKeys(data, keys)
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

      const result = DatasetHelper.filterKeys(data, keys)

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

      const result = DatasetHelper.filterKeys(data, keys)

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

      const result = DatasetHelper.filterKeys(data, keys)

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

      const result = DatasetHelper.filterKeys(data, keys)

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

      const result = DatasetHelper.filterKeys(data, keys)

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

      const result = DatasetHelper.filterKeys(data, keys)

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

      const result = DatasetHelper.getLastestDataset(data)

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

      const result = DatasetHelper.getLastestDataset(data)
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

      const result = DatasetHelper.getEarliestDataset(data)

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

      const result = DatasetHelper.getEarliestDataset(data)
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

      const result = DatasetHelper.groupRowsByTimestamp(data)

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

      const result = DatasetHelper.getLastestDataset(data)
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

      const result = DatasetHelper.groupRowsByKey(data, 'field2')

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
