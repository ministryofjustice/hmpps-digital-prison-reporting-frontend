import { DashboardVisualisation } from '../components/_dashboards/dashboard/types'
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
        } as unknown as DashboardVisualisation

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
        } as unknown as DashboardVisualisation

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
        } as unknown as DashboardVisualisation

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
        } as unknown as DashboardVisualisation

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
          establishment_id: { raw: 'MDI' },
          total_prisoners: { raw: '6' },
          wing: { raw: 'I' },
        },
      ]
      const result = DatasetHelper.filterRowsByDisplayColumns(definition, data, true)
      expect(result).toEqual(expectedResult)
    })
  })
})
