const requestExamples = require('../cypress-tests/mockApis/reports/mockVariants/request-examples')
const templateExamples = require('../cypress-tests/mockApis/reports/mockVariants/report-templates')
const featureTesting = require('../cypress-tests/mockApis/reports/mockVariants/feature-testing')
const { variants } = require('../cypress-tests/mockApis/reports/mockVariants/mock-report')
const inputExamples = require('../cypress-tests/mockApis/reports/mockVariants/filter-input-examples')
import dashboardDefinitions from '../cypress-tests/mockApis/dashboards/dashboard-definitions'

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
      variants: requestExamples,
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
