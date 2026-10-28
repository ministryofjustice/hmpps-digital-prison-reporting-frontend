import { fullDatasetHistoric } from '../vis-definitions/full-data'
import {
  dataQualityMetricOneHistoric,
  dataQualityMetricTwoHistoric,
  dataQualityMetricThreeHistoric,
} from '../vis-definitions/historic'

export const definition = {
  id: 'list-visualisations_historic',
  name: 'List  - Historic',
  description:
    'This dashboard represents example list visualidations using the default dataset of historic data. The dashboard aims to show all the options available to display a list using the default dataset',
  sections: [
    {
      id: 'section-1',
      display: 'Rows as list',
      description: 'These list examples display the dataset rows as a list',
      visualisations: [dataQualityMetricOneHistoric, dataQualityMetricTwoHistoric, dataQualityMetricThreeHistoric],
    },
    {
      id: 'totals-breakdown',
      display: 'Full Dataset',
      visualisations: [fullDatasetHistoric],
    },
  ],
  filterFields: [],
}
