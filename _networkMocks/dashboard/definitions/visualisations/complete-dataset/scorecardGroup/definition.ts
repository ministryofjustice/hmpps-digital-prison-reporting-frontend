import * as Scorecards from './vis-definitions/definitions'
import { components } from '../../../../../../src/dpr/types/api'
import { fullDatasetHistoric } from '../list/vis-definitions/full-data'

export const definition: components['schemas']['DashboardDefinition'] = {
  id: 'scorecard-group-example_complete-data',
  name: 'Scorecard Group - Complete data',
  description: 'Scorecard examples',
  sections: [
    {
      id: 'section-1',
      display: 'Data quality scorecards',
      description: '',
      visualisations: [
        Scorecards.dataQualityAllEstablishmentsMetricOne,
        Scorecards.dataQualityAllEstablishmentsNoMetricOne,
        Scorecards.dataQualityAllEstablishmentsMetricTwo,
        Scorecards.dataQualityAllEstablishmentsNoMetricTwo,
        Scorecards.dataQualityAllEstablishmentsMetricThree,
        Scorecards.dataQualityAllEstablishmentsNoMetricThree,
      ],
    },
    {
      id: 'section-2',
      display: 'Scorecards with columns',
      visualisations: [Scorecards.dataQualityAllCols],
    },
    {
      id: 'totals-breakdown',
      display: 'Full Dataset',
      visualisations: [fullDatasetHistoric],
    },
  ],
  filterFields: [],
}
