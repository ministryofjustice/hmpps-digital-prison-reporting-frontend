import { requestExampleVariants } from './mockVariants/request-examples'
import { reportTemplates } from './mockVariants/report-templates'
import { featureTestingVariants } from './mockVariants/feature-testing'
import { mockReportVariants } from './mockVariants/mock-report'
import { filterInputExamplesVariants } from './mockVariants/filter-input-examples'
import dashboardDefinitions from '../dashboard/dashboardDefinitions/dashboard-definitions'

export default {
  report: {
    id: 'test-report-1',
    name: 'Test Report',
    description: 'Fallback description',
    variants: [],
    dashboards: [],
  },
  reports: [
    {
      id: 'request-examples',
      name: 'Request examples',
      description: 'Example variants used for request testing',
      variants: requestExampleVariants,
      dashboards: dashboardDefinitions.requestExamples,
    },
    {
      id: 'report-template-examples',
      name: 'Report templates',
      description: 'Example variants used for template testing',
      variants: reportTemplates,
      dashboards: [],
    },
    {
      id: 'mock-report',
      name: 'Mock reports',
      description: 'Example variants',
      variants: mockReportVariants,
      dashboards: [],
    },
    {
      id: 'filter-inputs',
      name: 'Filter input testing',
      description: 'Example variants used for input testing',
      variants: filterInputExamplesVariants,
      dashboards: [],
    },
    {
      id: 'feature-testing',
      name: 'Feature testing',
      description: 'Example variants used for feature testing',
      variants: featureTestingVariants,
      dashboards: [],
    },
    {
      id: 'dashboard-visualisations',
      name: 'Dashboard visualisations',
      description: 'Example variants used for dashboard visualisation testing',
      variants: [],
      dashboards: dashboardDefinitions.visualisationExamples,
    },
    {
      id: 'mock-dashboards',
      name: 'Mock dashboards',
      description: 'Example variants used for dashboard testing',
      variants: [],
      dashboards: dashboardDefinitions.mockDashboards,
    },
  ],

  // ORS Prisoner and Visitors Details Report
}
