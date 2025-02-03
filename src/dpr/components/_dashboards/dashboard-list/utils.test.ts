import DashboardListUtils from './utils'
import { mockListDefinitionAgeRange1 } from '../../../../../test-app/mocks/mockClients/dashboards/mockDashboardListDefinition'
import { mockDashboardListData } from '../../../../../test-app/mocks/mockClients/dashboards/mockDashboardListData'
import { DashboardList } from './types'

describe('DashboardListUtils', () => {
  describe('createList', () => {
    it('should create the list data', () => {
      const data: DashboardList = mockListDefinitionAgeRange1 as unknown as DashboardList
      const result = DashboardListUtils.createList(data, mockDashboardListData)

      expect(result).toEqual({
        head: [
          {
            text: 'Age range 1',
          },
          {
            text: 'Total prisoners',
          },
        ],
        rows: [
          [
            {
              text: '18-25',
            },
            {
              text: '6',
            },
          ],
          [
            {
              text: '26-34',
            },
            {
              text: '12',
            },
          ],
          [
            {
              text: '35-44',
            },
            {
              text: '6',
            },
          ],
          [
            {
              text: '45-54',
            },
            {
              text: '2',
            },
          ],
          [
            {
              text: '56-54',
            },
            {
              text: '2',
            },
          ],
          [
            {
              html: '<strong>Total<strong>',
            },
            {
              html: '<strong>28<strong>',
            },
          ],
        ],
      })
    })
  })
})
