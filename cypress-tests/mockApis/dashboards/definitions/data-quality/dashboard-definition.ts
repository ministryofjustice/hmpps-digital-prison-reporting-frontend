import chartDefs from '../data-quality/visualisations/chart-definitions'

import lists from '../examples/visualisations/lists'
import charts from '../examples/visualisations/charts'
import scorecards from '../examples/visualisations/scorecards'

import { establishmentIdFilter, granularDateRangeFilter } from '../../filter-definitions'

const dataQualityDashboard1 = {
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
      visualisations: [chartDefs.mockNationalityBarChart, chartDefs.mockNationalityPieChart, lists.dataQualityNationality],
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

module.exports = {
  dataQualityDashboard1,
}
