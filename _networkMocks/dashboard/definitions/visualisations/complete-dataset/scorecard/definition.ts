import { components } from '../../../../../../src/dpr/types/api'
import * as Scorecards from './vis-definitions/definitions'
import * as BarCharts from '../bar/vis-definitions/cols-as-labels'
import { fullDatasetHistoric } from '../list/vis-definitions/full-data'

export const definition: components['schemas']['DashboardDefinition'] = {
  id: 'scorecard-examples_complete-data',
  name: 'Scorecard - Complete data',
  description: 'Scorecard examples',
  sections: [
    {
      id: 'section-1',
      display: 'Single scorecard',
      description: 'Example showing a single scorecard',
      visualisations: [Scorecards.simpleScorecardMetricTwo],
    },
    {
      id: 'section-2',
      display: 'Two scorecards',
      description: 'Example showing a two adjacent scorecards',
      visualisations: [Scorecards.simpleScorecardMetricTwo, Scorecards.simpleScorecardMetricOne],
    },
    {
      id: 'section-3',
      display: 'Full row of scorecards',
      description: 'Example showing a full row of scorecards',
      visualisations: [
        Scorecards.simpleScorecardMetricTwo,
        Scorecards.simpleScorecardMetricOne,
        Scorecards.simpleScorecardMetricThree,
      ],
    },
    {
      id: 'section-4',
      display: 'Double row of scorecards',
      description: 'Example showing a two rows of scorecards',
      visualisations: [
        Scorecards.simpleScorecardMetricTwo,
        Scorecards.simpleScorecardMetricOne,
        Scorecards.simpleScorecardMetricThree,
        Scorecards.simpleScorecardMetricTwo,
        Scorecards.simpleScorecardMetricThree,
      ],
    },
    {
      id: 'section-5',
      display: 'Scorcards groups',
      description: 'Example of single scorecards grouping within a section',
      visualisations: [
        Scorecards.simpleScorecardMetricTwo,
        Scorecards.simpleScorecardMetricOne,
        Scorecards.simpleScorecardMetricThree,
        BarCharts.dataQualityMetricOneBar,
        Scorecards.simpleScorecardMetricTwo,
        Scorecards.simpleScorecardMetricThree,
        Scorecards.simpleScorecardMetricOne,
      ],
    },
    {
      id: 'section-6',
      display: 'Scorecards with units',
      description: 'Example of scorecards with units',
      visualisations: [
        Scorecards.simpleScorecardMetricTwoWithUnit,
        Scorecards.simpleScorecardMetricOneWithUnit,
        Scorecards.simpleScorecardMetricThreeWithUnit,
      ],
    },
    {
      id: 'section-7',
      display: 'Scorecards showing Trends',
      description: 'Example trends',
      visualisations: [
        Scorecards.simpleScorecardMetricTwo,
        Scorecards.simpleScorecardMetricOneTrendDown,
        Scorecards.simpleScorecardMetricThree,
      ],
    },
    {
      id: 'totals-breakdown',
      display: 'Full Dataset',
      visualisations: [fullDatasetHistoric],
    },
  ],
  filterFields: [],
}
