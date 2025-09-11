import { requestExampleVariants } from './mockVariants/request-examples'
import templateExamples from './mockVariants/report-templates'
import featureTesting from './mockVariants/feature-testing'
import { variants } from './mockVariants/mock-report'
import inputExamples from './mockVariants/filter-input-examples'
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
      variants: templateExamples,
      dashboards: [],
    },
    {
      id: 'mock-report',
      name: 'Mock reports',
      description: 'Example variants',
      variants,
      dashboards: [],
    },
    {
      id: 'filter-inputs',
      name: 'Filter input testing',
      description: 'Example variants used for input testing',
      variants: inputExamples,
      dashboards: [],
    },
    {
      id: 'feature-testing',
      name: 'Feature testing',
      description: 'Example variants used for feature testing',
      variants: featureTesting,
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
