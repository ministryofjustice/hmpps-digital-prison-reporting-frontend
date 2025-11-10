import DashboardListUtils from './utils'
import { mockListDefinitionAgeRange1 } from '../../../../../test-app/mocks/mockClients/dashboards/definitions/age-breakdown/visualisations/list-definitions-1'
import { dataQualityColsToList } from '../../../../../test-app/mocks/mockClients/dashboards/definitions/examples/visualisations/lists'
import { mockAgeBreakdownData } from '../../../../../test-app/mocks/mockClients/dashboards/data/age-breakdown/data'
import { mockTimeSeriesDataLastSixMonths } from '../../../../../test-app/mocks/mockClients/dashboards/data/data-quality-metrics/data'
import { components } from '../../../types/api'

describe('DashboardListUtils', () => {
  describe('createList', () => {
    it('should create the list data', () => {
      const visDefinition = mockListDefinitionAgeRange1 as components['schemas']['DashboardVisualisationDefinition']
      const result = DashboardListUtils.createList(visDefinition, mockAgeBreakdownData.flat())
      const expectedResult = {
        table: {
          head: [{ text: 'Age range 1' }, { text: 'Total prisoners' }],
          rows: [
            [{ text: '18-25' }, { text: '6' }],
            [{ text: '26-34' }, { text: '12' }],
            [{ text: '35-44' }, { text: '6' }],
            [{ text: '45-54' }, { text: '2' }],
            [{ text: '56-54' }, { text: '2' }],
            [{ html: '<strong>Total<strong>' }, { html: '<strong>28<strong>' }],
          ],
        },
        ts: '2025/01/07',
      }

      expect(result).toEqual(expectedResult)
    })

    it('should create the list data from data columns', () => {
      const visDefinition = dataQualityColsToList as components['schemas']['DashboardVisualisationDefinition']
      const result = DashboardListUtils.createList(visDefinition, mockTimeSeriesDataLastSixMonths.flat())

      const expectedResult = {
        table: {
          head: [{ text: '' }, { text: 'MDI' }, { text: 'SLI' }, { text: 'DAI' }],
          rows: [
            [{ text: 'Has ethnicity' }, { text: '533' }, { text: '484' }, { text: '406' }],
            [{ text: 'No ethnicity' }, { text: '614' }, { text: '713' }, { text: '682' }],
            [{ text: 'Has religion' }, { text: '680' }, { text: '771' }, { text: '648' }],
            [{ text: 'No religion' }, { text: '799' }, { text: '457' }, { text: '720' }],
            [{ text: 'Has nationality' }, { text: '684' }, { text: '700' }, { text: '703' }],
            [{ text: 'No nationality' }, { text: '665' }, { text: '506' }, { text: '409' }],
          ],
        },
        ts: 'Jan 25',
      }

      expect(result).toEqual(expectedResult)
    })
  })
})
