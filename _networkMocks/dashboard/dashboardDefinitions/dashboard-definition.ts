import { establishmentIdFilter, granularDateRangeFilter } from '@networkMocks/dashboard/filter-definitions'
import chartDefs from './age-breakdown/visualisations/ethnicityReligionDefinitions'

import lists from './visualisations/lists'
import charts from './visualisations/charts'
import scorecards from './visualisations/scorecards'

export const dataQualityDashboard1 = {
  id: 'data-quality-dashboard-1',
  name: 'Data quality dashboard',
  description: 'Testing a dashboard with timeseries chart & snapshot chart',
  sections: [
    {
      id: 'charts-section-ethnicity-breakdown',
      display: 'Totals',
      description: 'Overall data quality values',
      visualisations: [lists.dataQualityColsToList],
    },
    {
      id: 'charts-section-ethnicity-breakdown',
      display: 'Totals overtime',
      visualisations: [lists.dataQualityEthnicityHistoric],
    },
    {
      id: 'charts-section-ethnicity',
      display: 'Ethnicity totals',
      description: 'Overall data quality values',
      visualisations: [chartDefs.mockEthnicityBarChart, chartDefs.mockEthnicityPieChart, lists.dataQualityEthnicity],
    },
    {
      id: 'charts-section-religion',
      display: 'Religion totals',
      visualisations: [chartDefs.mockReligionBarChart, chartDefs.mockReligionPieChart, lists.dataQualityReligion],
    },
    {
      id: 'charts-section-nationality',
      display: 'Nationality totals',
      visualisations: [
        chartDefs.mockNationalityBarChart,
        chartDefs.mockNationalityPieChart,
        lists.dataQualityNationality,
      ],
    },
    {
      id: 'historic',
      display: 'Data quality over time',
      visualisations: [
        charts.dataQualityEthnicityHistoricLine,
        charts.dataQualityNationalityHistoricLine,
        charts.dataQualityReligionHistoricLine,
      ],
    },
    {
      id: 'scorecards-section',
      display: 'Scorecards',
      visualisations: [scorecards.dataQualityAllCols],
    },
  ],
  filterFields: [establishmentIdFilter, granularDateRangeFilter],
}
