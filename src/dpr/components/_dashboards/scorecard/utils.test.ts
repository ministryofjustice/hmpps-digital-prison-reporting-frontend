import { mockDashboardDataAnalticsScoreCardGroup } from '../../../../../test-app/mocks/mockClients/dashboards/mockDashboardScoreCardDefinitions'
import { mockTimeSeriesDataLastSixMonths } from '../../../../../test-app/mocks/mockClients/dashboards/mockDashboardResponseData'
import { MetricsDataResponse } from '../../../types/Metrics'
import ScorecardUtils from './utils'

describe('Score cards Utils', () => {
  let rawData: MetricsDataResponse[][]

  beforeEach(() => {
    rawData = mockTimeSeriesDataLastSixMonths as unknown as MetricsDataResponse[][]
  })

  describe('createScorecards', () => {
    it('should create the scorecards', () => {
      const result = ScorecardUtils.createScorecards(
        [mockDashboardDataAnalticsScoreCardGroup, mockDashboardDataAnalticsScoreCardGroup],
        rawData,
      )

      const expectedScorcardGroup = {
        title: 'Data Analytics',
        description: 'Mocked data to display analytics data witin scorecards',
        scorecards: [
          {
            title: 'No. of Prisoners with ethnicity',
            value: 533,
            rag: {
              score: 1,
              color: 'yellow',
            },
            valueFor: 'Jan 25',
            trend: {
              direction: 1,
              value: 109,
              from: 'Aug 24',
            },
          },
          {
            title: 'No. of Prisoners with no ethnicity',
            value: 614,
            rag: {
              score: 2,
              color: 'red',
            },
            valueFor: 'Jan 25',
            trend: {
              direction: -1,
              value: 167,
              from: 'Aug 24',
            },
          },
          {
            title: 'No. of Prisoners with nationality',
            value: 684,
            rag: {
              score: 2,
              color: 'red',
            },
            valueFor: 'Jan 25',
            trend: {
              direction: 1,
              value: 225,
              from: 'Aug 24',
            },
          },
          {
            title: 'No. of Prisoners with no nationality',
            value: 665,
            rag: {
              score: 2,
              color: 'red',
            },
            valueFor: 'Jan 25',
            trend: {
              direction: 1,
              value: 137,
              from: 'Aug 24',
            },
          },
          {
            title: 'No. of Prisoners with religion',
            value: 680,
            rag: {
              score: 2,
              color: 'red',
            },
            valueFor: 'Jan 25',
            trend: {
              direction: 1,
              value: 104,
              from: 'Aug 24',
            },
          },
          {
            title: 'No. of Prisoners with no religion',
            value: 799,
            rag: {
              score: 2,
              color: 'red',
            },
            valueFor: 'Jan 25',
            trend: {
              direction: 1,
              value: 352,
              from: 'Aug 24',
            },
          },
        ],
      }

      expect(result).toEqual([expectedScorcardGroup, expectedScorcardGroup])
    })
  })
})
