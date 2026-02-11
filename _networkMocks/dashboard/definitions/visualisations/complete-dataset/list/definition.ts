import { fullDataset } from './vis-definitions/full-data'
import { columnValuesAsList } from './vis-definitions/column-values-as-list'
import { dataQualityEthnicity, dataQualityNationality, dataQualityReligion } from './vis-definitions/rows-as-list'

export const definition = {
  id: 'list-visualisations_complete-dataset',
  name: 'List - Complete dataset',
  description:
    'This dashboard represents example list visualisations using a complete dataset. The dashboard aims to show all the options available to display a list using a complete dataset.',
  sections: [
    {
      id: 'section-1',
      display: 'Rows as list',
      description: 'These list examples display the dataset rows as a list',
      visualisations: [dataQualityEthnicity, dataQualityNationality, dataQualityReligion],
    },
    {
      id: 'section-2',
      display: 'Column values as list',
      description: 'These list examples display the dataset column values as a list',
      visualisations: [columnValuesAsList],
    },
    {
      id: 'totals-breakdown',
      display: 'Full Dataset',
      visualisations: [fullDataset],
    },
  ],
  filterFields: [],
}
