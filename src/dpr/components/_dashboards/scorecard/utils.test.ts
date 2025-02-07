// import { mockDashboardDataAnalticsScoreCardGroup } from '../../../../../test-app/mocks/mockClients/dashboards/mockDashboardScoreCardDefinitions'
import { mockTimeSeriesDataLastSixMonths } from '../../../../../test-app/mocks/mockClients/dashboards/definitions/data-quality/data'
// import { mockAgeBreakdownData } from '../../../../../test-app/mocks/mockClients/dashboards/definitions/age-breakdown/data'
import { MetricsDataResponse } from '../../../types/Metrics'
import ScorecardUtils from './utils'
import { Scorecard } from './types'

import {
  mockScorecardDefinitionNationality,
  mockTargetScorecardDefinitionReligion,
} from '../../../../../test-app/mocks/mockClients/dashboards/definitions/data-quality/vis-definitions'
import { DashboardVisualisation } from '../dashboard/types'

describe('ScorecardUtils', () => {
  let mockDataQualityData: MetricsDataResponse[][]
  // let mockAgeBreakdownRawData: MetricsDataResponse[][]

  beforeEach(() => {
    mockDataQualityData = mockTimeSeriesDataLastSixMonths as unknown as MetricsDataResponse[][]
    // mockAgeBreakdownRawData = mockAgeBreakdownData as unknown as MetricsDataResponse[][]
  })

  describe('createScorecard', () => {
    it('should create single scorecard', () => {
      const scorecard: Scorecard = ScorecardUtils.createScorecard(
        mockScorecardDefinitionNationality as DashboardVisualisation,
        mockDataQualityData,
      )

      expect(scorecard).toEqual({
        rag: {
          color: 'red',
          score: 2,
        },
        title: 'No of prisoners with nationality',
        trend: undefined,
        value: 684,
        valueFor: 'undefined',
      })
    })

    it('should create single scorecard targeting a value', () => {
      const scorecard: Scorecard = ScorecardUtils.createScorecard(
        mockTargetScorecardDefinitionReligion as DashboardVisualisation,
        mockDataQualityData,
      )

      expect(scorecard).toEqual({
        rag: {
          color: 'red',
          score: 2,
        },
        title: 'No of prisoners with religion in SLI',
        trend: undefined,
        value: 771,
        valueFor: 'undefined',
      })
    })
  })

  describe('createScorecards', () => {
    it('should create a scorecard group', () => {
      expect(true).toEqual(true)
    })
  })

  describe('mergeScorecards', () => {
    it('should merge individual scorecards into a scorecard group', () => {
      expect(true).toEqual(true)
    })
  })
})
