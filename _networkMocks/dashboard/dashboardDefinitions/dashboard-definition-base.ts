import { establishmentIdFilter } from '@networkMocks/dashboard/filter-definitions'
import chartDefs from './age-breakdown/visualisations/ethnicityReligionDefinitions'
import lists from './visualisations/lists'

export const dataQualityDashboardBase = {
  id: 'data-quality-dashboard-base',
  name: 'Dashboard structure',
  description:
    'A dashboard is made up of multiple sections. Each section can have a title, description, and multiple visualisation types',
  sections: [
    {
      id: 'section-1',
      display: 'Section 1',
      description: 'Section 1 description',
      visualisations: [chartDefs.mockEthnicityBarChart, chartDefs.mockEthnicityPieChart],
    },
    {
      id: 'section-2',
      display: 'Section 2',
      description: 'Section 1 description',
      visualisations: [chartDefs.mockNationalityBarChart, chartDefs.mockNationalityPieChart],
    },
    {
      id: 'section-2',
      display: 'section 3',
      description: 'Section 1 description',
      visualisations: [chartDefs.mockReligionBarChart, chartDefs.mockReligionPieChart],
    },
    {
      id: 'section-3',
      display: 'Dataset',
      description: 'Underlying data set',
      visualisations: [lists.fullDataset],
    },
  ],
  filterFields: [establishmentIdFilter],
}
