import ScorecardUtils from './utils'
import { Scorecard } from './types'

import {
  DashboardVisualisation,
  DashboardVisualisationType,
  DashboardVisualisatonCardData,
} from '../dashboard-visualisation/types'

describe('ScorecardUtils', () => {
  let scorecardData1: Scorecard
  let scorecardData2: Scorecard

  beforeEach(() => {
    scorecardData1 = {
      id: '1',
      rag: {
        colour: 'red',
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
      id: '2',
      rag: {
        colour: 'red',
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

  describe('mergeScorecards', () => {
    it('should merge individual scorecards into a scorecard group', () => {
      const visualistationData: DashboardVisualisation[] = [
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
          data: {} as unknown as DashboardVisualisatonCardData,
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
                  id: '1',
                  rag: {
                    colour: 'red',
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
                  id: '2',
                  rag: {
                    colour: 'red',
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
                  id: '1',
                  rag: {
                    colour: 'red',
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
                  id: '2',
                  rag: {
                    colour: 'red',
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
