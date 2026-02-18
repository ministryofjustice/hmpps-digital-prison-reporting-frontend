import { fullDatasetHistoric } from './vis-definitions/full-data'
import {
  dataQualityMetricOneHistoric,
  dataQualityMetricTwoHistoric,
  dataQualityReligionHistoric,
} from './vis-definitions/historic'

export const definition = {
  id: 'list-visualisations_complete-dataset_historic',
  name: 'List - Complete dataset - Historic',
  description:
    'This dashboard represents example list visualidations using a complete dataset of historic data. The dashboard aims to show all the options available to display a list using a complete dataset',
  sections: [
    {
      id: 'section-1',
      display: 'Rows as list',
      description: 'These list examples display the dataset rows as a list',
      visualisations: [dataQualityMetricOneHistoric, dataQualityMetricTwoHistoric, dataQualityReligionHistoric],
    },
    {
      id: 'totals-breakdown',
      display: 'Full Dataset',
      visualisations: [fullDatasetHistoric],
    },
  ],
  filterFields: [],
}
