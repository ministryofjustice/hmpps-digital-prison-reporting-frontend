import { establishmentIdFilter } from '../../../filter-definitions'
import lists from '../visualisations/lists'
import charts from '../visualisations/charts'

export const dataQuality = {
  id: 'chart-examples-data-quality',
  name: 'Chart Examples - Data Quality',
  description: 'chart examples',
  sections: [
    {
      id: 'section-1',
      display: 'Bar charts',
      description: '',
      visualisations: [charts.dataQualityEthnicityBar, charts.dataQualityNationalityBar, charts.dataQualityReligionBar],
    },
    {
      id: 'section-2',
      display: 'Doughnut charts',
      description: '',
      visualisations: [
        charts.dataQualityEthnicityDoughnut,
        charts.dataQualityNationalityDoughnut,
        charts.dataQualityReligionDoughnut,
      ],
    },
    {
      id: 'section-3',
      display: 'Line charts',
      description: '',
      visualisations: [
        charts.dataQualityEthnicityLine, 
        charts.dataQualityNationalityLine, 
        charts.dataQualityReligionLine
      ],
    },
    {
      id: 'totals-breakdown',
      display: 'Totals breakdown',
      visualisations: [lists.fullDataset],
    },
  ],
  filterFields: [establishmentIdFilter],
}
