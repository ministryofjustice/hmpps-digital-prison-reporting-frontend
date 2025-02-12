import { mockTimeSeriesDataLastSixMonths } from '../../../../../test-app/mocks/mockClients/dashboards/definitions/data-quality/data'
import { DashboardDataResponse } from '../../../types/Metrics'
import ScorecardUtils from './utils'
import { Scorecard } from './types'

import {
  mockScorecardDefinitionNationality,
  mockTargetScorecardDefinitionReligion,
  mockScorecardGroupReligionByEstablishment,
} from '../../../../../test-app/mocks/mockClients/dashboards/definitions/data-quality/vis-definitions'
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
        mockDataQualityData,
      )

      expect(scorecard).toEqual(scorecardData1)
    })

    it('should create single scorecard targeting a value', () => {
      const scorecard: Scorecard = ScorecardUtils.createScorecard(
        mockTargetScorecardDefinitionReligion as DashboardVisualisation,
        mockDataQualityData,
      )

      expect(scorecard).toEqual(scorecardData2)
    })
  })

  describe('createScorecards', () => {
    it('should create a scorecard group', () => {
      const scorecard: Scorecard[] = ScorecardUtils.createScorecards(
        mockScorecardGroupReligionByEstablishment as DashboardVisualisation,
        mockDataQualityData,
      )

      expect(scorecard).toEqual([
        {
          rag: { color: 'red', score: 2 },
          title: 'With religion in Establishment:  MDI',
          trend: { direction: 1, from: 'Aug 24', value: 104 },
          value: 680,
          valueFor: 'Jan 25',
        },
        {
          rag: { color: 'red', score: 2 },
          title: 'With religion in Establishment:  SLI',
          trend: { direction: 1, from: 'Aug 24', value: 13 },
          value: 771,
          valueFor: 'Jan 25',
        },
        {
          rag: { color: 'red', score: 2 },
          title: 'With religion in Establishment:  DAI',
          trend: { direction: -1, from: 'Aug 24', value: 86 },
          value: 648,
          valueFor: 'Jan 25',
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

      const dashboardVis = ScorecardUtils.mergeScorecards(visualistationData)
      expect(dashboardVis).toEqual([
        {
          data: [
            {
              rag: { color: 'red', score: 2 },
              title: 'No of prisoners with nationality',
              trend: { direction: 1, from: 'Aug 24', value: 225 },
              value: 684,
              valueFor: 'Jan 25',
            },
            {
              rag: { color: 'red', score: 2 },
              title: 'No of prisoners with religion in SLI',
              trend: { direction: 1, from: 'Aug 24', value: 13 },
              value: 771,
              valueFor: 'Jan 25',
            },
          ],
          id: '0',
          type: 'scorecard-group',
        },
        { data: {}, id: '3', type: 'bar' },
        {
          data: [
            {
              rag: { color: 'red', score: 2 },
              title: 'No of prisoners with nationality',
              trend: { direction: 1, from: 'Aug 24', value: 225 },
              value: 684,
              valueFor: 'Jan 25',
            },
            {
              rag: { color: 'red', score: 2 },
              title: 'No of prisoners with religion in SLI',
              trend: { direction: 1, from: 'Aug 24', value: 13 },
              value: 771,
              valueFor: 'Jan 25',
            },
          ],
          id: '3',
          type: 'scorecard-group',
        },
      ])
    })
  })
})
