import { mockTimeSeriesDataLastSixMonths } from '../../../../../test-app/mocks/mockClients/dashboards/data/data-quality-metrics/data'
import { mockDietDataLastSixMonths } from '../../../../../test-app/mocks/mockClients/dashboards/data/test-data/data'

import { DashboardDataResponse } from '../../../types/Metrics'

import ScorecardUtils from './utils'
import { Scorecard, ScorecardGroup } from './types'

import {
  dietTotals,
  dataQualityAllCols,
} from '../../../../../test-app/mocks/mockClients/dashboards/definitions/examples/visualisations/scorecards'

import {
  mockScorecardDefinitionNationality,
  mockTargetScorecardDefinitionReligion,
  mockScorecardGroupReligionByEstablishment,
} from '../../../../../test-app/mocks/mockClients/dashboards/definitions/data-quality/visualisations'

import { DashboardUIVisualisation, DashboardVisualisation, DashboardVisualisationType } from '../dashboard/types'
import { ChartCardData } from '../../../types/Charts'

describe('ScorecardUtils', () => {
  let mockDataQualityData: DashboardDataResponse[][]
  let mockDietData: DashboardDataResponse[]
  let scorecardData1: Scorecard
  let scorecardData2: Scorecard

  beforeEach(() => {
    mockDataQualityData = mockTimeSeriesDataLastSixMonths as unknown as DashboardDataResponse[][]
    mockDietData = mockDietDataLastSixMonths
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
    it('should create a scorecard group from a list - data-quality', () => {
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

    it('should create a scorecard group from a list', () => {
      const scorecardGroup: ScorecardGroup[] = ScorecardUtils.createScorecards(
        dietTotals as DashboardVisualisation,
        mockDietData,
      )

      const expectedResult = [
        {
          title: '',
          scorecards: [
            {
              title: ' Vegetarian',
              value: '1737',
              valueFor: 'Feb 25',
              trend: {
                direction: 1,
                value: 1603,
                from: 'Sep 24',
              },
            },
            {
              title: ' Pescatarian',
              value: '1729',
              valueFor: 'Feb 25',
              trend: {
                direction: -1,
                value: 580,
                from: 'Sep 24',
              },
            },
            {
              title: ' Vegan',
              value: '294',
              valueFor: 'Feb 25',
              trend: {
                direction: -1,
                value: 1435,
                from: 'Sep 24',
              },
            },
            {
              title: ' Omnivore',
              value: '1240',
              valueFor: 'Feb 25',
              trend: {
                direction: 1,
                value: 412,
                from: 'Sep 24',
              },
            },
          ],
        },
      ]

      expect(scorecardGroup).toEqual(expectedResult)
    })

    it('should create a scorecard group from data columns', () => {
      const scorecardGroup: ScorecardGroup[] = ScorecardUtils.createScorecards(
        dataQualityAllCols as unknown as DashboardVisualisation,
        mockDataQualityData.flat(),
      )

      const expectedResult = [
        {
          title: 'Establishment ID: MDI',
          scorecards: [
            {
              title: 'Has ethnicity',
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
              title: 'Ethnicity is missing',
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
              title: 'Has nationality',
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
              title: 'Nationality is missing',
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
              title: 'Has religion',
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
              title: 'Religion is missing',
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
        },
        {
          title: 'Establishment ID: SLI',
          scorecards: [
            {
              title: 'Has ethnicity',
              value: 484,
              valueFor: 'Jan 25',
              trend: {
                direction: -1,
                value: 277,
                from: 'Aug 24',
              },
            },
            {
              title: 'Ethnicity is missing',
              value: 713,
              rag: {
                score: 2,
                color: 'red',
              },
              valueFor: 'Jan 25',
              trend: {
                direction: 1,
                value: 103,
                from: 'Aug 24',
              },
            },
            {
              title: 'Has nationality',
              value: 700,
              rag: {
                score: 2,
                color: 'red',
              },
              valueFor: 'Jan 25',
              trend: {
                direction: -1,
                value: 34,
                from: 'Aug 24',
              },
            },
            {
              title: 'Nationality is missing',
              value: 506,
              rag: {
                score: 1,
                color: 'yellow',
              },
              valueFor: 'Jan 25',
              trend: {
                direction: -1,
                value: 279,
                from: 'Aug 24',
              },
            },
            {
              title: 'Has religion',
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
            {
              title: 'Religion is missing',
              value: 457,
              valueFor: 'Jan 25',
              trend: {
                direction: -1,
                value: 237,
                from: 'Aug 24',
              },
            },
          ],
        },
        {
          title: 'Establishment ID: DAI',
          scorecards: [
            {
              title: 'Has ethnicity',
              value: 406,
              valueFor: 'Jan 25',
              trend: {
                direction: 1,
                value: 5,
                from: 'Aug 24',
              },
            },
            {
              title: 'Ethnicity is missing',
              value: 682,
              rag: {
                score: 2,
                color: 'red',
              },
              valueFor: 'Jan 25',
              trend: {
                direction: 1,
                value: 183,
                from: 'Aug 24',
              },
            },
            {
              title: 'Has nationality',
              value: 703,
              rag: {
                score: 2,
                color: 'red',
              },
              valueFor: 'Jan 25',
              trend: {
                direction: 1,
                value: 92,
                from: 'Aug 24',
              },
            },
            {
              title: 'Nationality is missing',
              value: 409,
              valueFor: 'Jan 25',
              trend: {
                direction: -1,
                value: 115,
                from: 'Aug 24',
              },
            },
            {
              title: 'Has religion',
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
            {
              title: 'Religion is missing',
              value: 720,
              rag: {
                score: 2,
                color: 'red',
              },
              valueFor: 'Jan 25',
              trend: {
                direction: 1,
                value: 316,
                from: 'Aug 24',
              },
            },
          ],
        },
      ]

      expect(scorecardGroup).toEqual(expectedResult)
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
