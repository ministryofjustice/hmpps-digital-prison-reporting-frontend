import { mockTimeSeriesDataLastSixMonths } from '../../../../../test-app/mocks/mockClients/dashboards/data/data-quality-metrics/data'
import { DashboardDataResponse } from '../../../types/Metrics'
import ScorecardUtils from './utils'
import { Scorecard, ScorecardGroup, ScorecardSubGroup } from './types'

import {
  mockScorecardDefinitionNationality,
  mockTargetScorecardDefinitionReligion,
  mockScorecardGroupReligionByEstablishment,
} from '../../../../../test-app/mocks/mockClients/dashboards/definitions/data-quality/visualisations'
import { DashboardUIVisualisation, DashboardVisualisation, DashboardVisualisationType } from '../dashboard/types'
import { ChartCardData } from '../../../types/Charts'

describe('ScorecardUtils', () => {
  let mockDataQualityData: DashboardDataResponse[][]

  let scorecardData1: Scorecard
  let scorecardData2: Scorecard

  beforeEach(() => {
    mockDataQualityData = mockTimeSeriesDataLastSixMonths as unknown as DashboardDataResponse[][]
    scorecardData1 = {
      rag: {
        color: 'red',
        score: 2,
      },
      title: 'No of prisoners with nationality',
      trend: {
        direction: 1,
        from: 'Aug 24',
        value: 225,
      },
      value: 684,
      valueFor: 'Jan 25',
    }

    scorecardData2 = {
      rag: {
        color: 'red',
        score: 2,
      },
      title: 'No of prisoners with religion in SLI',
      trend: {
        direction: 1,
        from: 'Aug 24',
        value: 13,
      },
      value: 771,
      valueFor: 'Jan 25',
    }
  })

  describe('createScorecard', () => {
    it('should create single scorecard', () => {
      const scorecard: Scorecard = ScorecardUtils.createScorecard(
        mockScorecardDefinitionNationality as DashboardVisualisation,
        mockDataQualityData.flat(),
      )

      expect(scorecard).toEqual(scorecardData1)
    })

    it('should create single scorecard targeting a value', () => {
      const scorecard: Scorecard = ScorecardUtils.createScorecard(
        mockTargetScorecardDefinitionReligion as DashboardVisualisation,
        mockDataQualityData.flat(),
      )

      expect(scorecard).toEqual(scorecardData2)
    })
  })

  describe('createScorecards', () => {
    it('should create a scorecard group', () => {
      const scorecardGroup: ScorecardGroup[] = ScorecardUtils.createScorecards(
        mockScorecardGroupReligionByEstablishment as DashboardVisualisation,
        mockDataQualityData.flat(),
      )

      expect(scorecardGroup).toEqual([
        {
          title: 'Establishmnent ID: MDI',
          scorecards: [
            {
              title: 'With religion in Establishment:  MDI',
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
          ],
        },
        {
          title: 'Establishmnent ID: SLI',
          scorecards: [
            {
              title: 'With religion in Establishment:  SLI',
              value: 771,
              rag: {
                score: 2,
                color: 'red',
              },
              valueFor: 'Jan 25',
              trend: {
                direction: 1,
                value: 13,
                from: 'Aug 24',
              },
            },
          ],
        },
        {
          title: 'Establishmnent ID: DAI',
          scorecards: [
            {
              title: 'With religion in Establishment:  DAI',
              value: 648,
              rag: {
                score: 2,
                color: 'red',
              },
              valueFor: 'Jan 25',
              trend: {
                direction: -1,
                value: 86,
                from: 'Aug 24',
              },
            },
          ],
        },
      ])
    })
  })

  describe('mergeScorecards', () => {
    it('should merge individual scorecards into a scorecard group', () => {
      const visualistationData: DashboardUIVisualisation[] = [
        {
          id: '1',
          type: DashboardVisualisationType.SCORECARD,
          data: scorecardData1,
        },
        {
          id: '2',
          type: DashboardVisualisationType.SCORECARD,
          data: scorecardData2,
        },
        {
          id: '3',
          type: DashboardVisualisationType.BAR,
          data: {} as unknown as ChartCardData,
        },
        {
          id: '4',
          type: DashboardVisualisationType.SCORECARD,
          data: scorecardData1,
        },
        {
          id: '5',
          type: DashboardVisualisationType.SCORECARD,
          data: scorecardData2,
        },
      ]

      const dashboardVis = ScorecardUtils.mergeScorecardsIntoGroup(visualistationData)
      expect(dashboardVis).toEqual([
        {
          id: '0',
          type: 'scorecard-group',
          data: [
            {
              scorecards: [
                {
                  rag: {
                    color: 'red',
                    score: 2,
                  },
                  title: 'No of prisoners with nationality',
                  trend: {
                    direction: 1,
                    from: 'Aug 24',
                    value: 225,
                  },
                  value: 684,
                  valueFor: 'Jan 25',
                },
                {
                  rag: {
                    color: 'red',
                    score: 2,
                  },
                  title: 'No of prisoners with religion in SLI',
                  trend: {
                    direction: 1,
                    from: 'Aug 24',
                    value: 13,
                  },
                  value: 771,
                  valueFor: 'Jan 25',
                },
              ],
            },
          ],
        },
        {
          id: '3',
          type: 'bar',
          data: {},
        },
        {
          id: '3',
          type: 'scorecard-group',
          data: [
            {
              scorecards: [
                {
                  rag: {
                    color: 'red',
                    score: 2,
                  },
                  title: 'No of prisoners with nationality',
                  trend: {
                    direction: 1,
                    from: 'Aug 24',
                    value: 225,
                  },
                  value: 684,
                  valueFor: 'Jan 25',
                },
                {
                  rag: {
                    color: 'red',
                    score: 2,
                  },
                  title: 'No of prisoners with religion in SLI',
                  trend: {
                    direction: 1,
                    from: 'Aug 24',
                    value: 13,
                  },
                  value: 771,
                  valueFor: 'Jan 25',
                },
              ],
            },
          ],
        },
      ])
    })
  })
})
