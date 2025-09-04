import { establishmentIdFilter, granularDateRangeFilter } from '../../../filter-definitions'
import lists from '../visualisations/lists'
import charts from '../visualisations/charts'

export const dataQualityHistoric = {
  id: 'chart-examples-data-quality-historic',
  name: 'Chart Examples - Data Quality - Historic',
  description: 'chart examples',
  sections: [
    {
      id: 'section-1',
      display: 'Time series line charts',
      description: '',
      visualisations: [
        charts.dataQualityEthnicityHistoricLine,
        charts.dataQualityNationalityHistoricLine,
        charts.dataQualityReligionHistoricLine,
      ],
    },
    {
      id: 'section-2',
      display: 'Time series bar charts',
      description: '',
      visualisations: [
        charts.dataQualityEthnicityHistoricBar,
        charts.dataQualityNationalityHistoricBar,
        charts.dataQualityReligionHistoricBar,
      ],
    },
    {
      id: 'totals-breakdown',
      display: 'Totals breakdown',
      visualisations: [lists.fullDatasetOverTime],
    },
  ],
  filterFields: [establishmentIdFilter, granularDateRangeFilter],
}
