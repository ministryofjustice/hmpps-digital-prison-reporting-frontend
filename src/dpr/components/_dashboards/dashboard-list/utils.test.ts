import DashboardListUtils from './utils'
import { mockListDefinitionAgeRange1 } from '../../../../../test-app/mocks/mockClients/dashboards/definitions/age-breakdown/visualisations/list-definitions-1'
import { mockAgeBreakdownData } from '../../../../../test-app/mocks/mockClients/dashboards/data/age-breakdown/data'
import { DashboardVisualisation } from '../dashboard/types'

describe('DashboardListUtils', () => {
  describe('createList', () => {
    it('should create the list data', () => {
      const visDefinition = mockListDefinitionAgeRange1 as unknown as DashboardVisualisation
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
  })
})
