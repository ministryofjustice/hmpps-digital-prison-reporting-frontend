import { establishmentIdFilter, granularDateRangeFilter } from '@networkMocks/dashboard/filter-definitions'
import lists from './visualisations/lists'
import bar from './visualisations/bar'
import doughnut from './visualisations/doughnut'
import line from './visualisations/line'
import scorecard from './visualisations/scorecards'
import matrix from './visualisations/matrix'

export const syncDashboard = {
  id: 'sync-dashboard',
  name: 'Sync Dashboard',
  description: 'Sync Dashboard used for testing',
  sections: [
    {
      id: 'section-1',
      display: 'Bar charts',
      description: 'Example bar charts',
      visualisations: [bar.mockEthnicityBarChart, bar.mockEthnicityBarChartList],
    },
    {
      id: 'section-2',
      display: 'Doughnut charts',
      description: 'Example doughnut charts',
      visualisations: [doughnut.mockEthnicityPieChart],
    },
    {
      id: 'section-3',
      display: 'Line charts',
      description: 'Example line charts',
      visualisations: [line.dataQualityReligionHistoricLine, line.dataQualityNationalityHistoricLine],
    },
    {
      id: 'section-4',
      display: 'Scorecards',
      description: 'Example score cards',
      visualisations: [
        scorecard.dataQualityAllEstablishmentsEthnicity,
        scorecard.dataQualityAllEstablishmentsNationality,
        scorecard.dataQualityAllCols,
      ],
    },
    {
      id: 'section-5',
      display: 'matrix charts',
      description: 'Example matrix charts',
      visualisations: [matrix.dataQulityHasNationalityOvertime],
    },
    {
      id: 'section-6',
      display: 'List charts',
      description: 'Example list visualisations',
      visualisations: [lists.dataQualityColsToList, lists.dataQualityEthnicity, lists.dataQualityReligionHistoric],
    },
    {
      id: 'section-x',
      display: 'Dataset',
      description: 'Underlying data set',
      visualisations: [lists.fullDataset],
    },
  ],
  loadType: 'sync',
  filterFields: [establishmentIdFilter, granularDateRangeFilter],
}
