const requestExamples = require('./mockVariants/request-examples')
const templateExamples = require('./mockVariants/report-templates')
const featureTesting = require('./mockVariants/feature-testing')
const mockReports = require('./mockVariants/mock-report')
const inputExamples = require('./mockVariants/filter-input-examples')
const dashboardDefinitions = require('../dashboards/dashboard-definitions')

module.exports = {
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
      variants: requestExamples,
      dashboards: dashboardDefinitions.requestExamples,
    },
    {
      id: 'report-template-examples',
      name: 'Report templates',
      variants: templateExamples,
      dashboards: [],
    },
    {
      id: 'mock-report',
      name: 'Mock reports',
      variants: mockReports,
      dashboards: [],
    },
    {
      id: 'filter-inputs',
      name: 'Filter input testing',
      variants: inputExamples,
      dashboards: [],
    },
    {
      id: 'feature-testing',
      name: 'Feature testing',
      variants: featureTesting,
      dashboards: [],
    },
    {
      id: 'dashboard-visualisations',
      name: 'Dashboard visualisations',
      variants: [],
      dashboards: dashboardDefinitions.visualisationExamples,
    },
    {
      id: 'mock-dashboards',
      name: 'Mock dashboards',
      variants: [],
      dashboards: dashboardDefinitions.mockDashboards,
    },
  ],

  // ORS Prisoner and Visitors Details Report
}
