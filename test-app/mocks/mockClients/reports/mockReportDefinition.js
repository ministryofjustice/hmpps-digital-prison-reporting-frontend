// @ts-nocheck
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
      description: 'Example variants used for request testing',
      variants: requestExamples,
      dashboards: dashboardDefinitions.requestExamples,
      authorised: true,
    },
    {
      id: 'report-template-examples',
      name: 'Report templates',
      description: 'Example variants used for template testing',
      variants: templateExamples,
      dashboards: [],
      authorised: true,
    },
    {
      id: 'mock-report',
      name: 'Mock reports',
      description: 'Example variants',
      variants: mockReports,
      dashboards: [],
      authorised: true,
    },
    {
      id: 'filter-inputs',
      name: 'Filter input testing',
      description: 'Example variants used for input testing',
      variants: inputExamples,
      dashboards: [],
      authorised: true,
    },
    {
      id: 'feature-testing',
      name: 'Feature testing',
      description: 'Example variants used for feature testing',
      variants: featureTesting,
      dashboards: [],
      authorised: true,
    },
    {
      id: 'dashboard-visualisations',
      name: 'Dashboard visualisations',
      description: 'Example variants used for dashboard visualisation testing',
      variants: [],
      dashboards: dashboardDefinitions.visualisationExamples,
      authorised: true,
    },
    {
      id: 'data-quality',
      name: 'Data quality',
      description: 'Example dashboards using the data quality dataset',
      variants: [],
      dashboards: dashboardDefinitions.dataQuality,
      authorised: true,
    },
    {
      id: 'mock-dashboards',
      name: 'Mock dashboards',
      description: 'Example variants used for dashboard testing',
      variants: [],
      dashboards: dashboardDefinitions.mockDashboards,
      authorised: true,
    },
    {
      id: 'unauthorised',
      name: 'Unauthorised product',
      description: 'Example variants used for Unauthorised product',
      variants: [
        {
          id: 'Unauthorised-1',
          name: 'Unauthorised 1',
          description: 'Description for Unauthorised report 1',
          resourceName: 'reports/list',
          classification: 'OFFICIAL',
          printable: false,
          isMissing: true,
          specification: {
            template: 'list',
            fields: []
          }
        },
        {
          id: 'Unauthorised-2',
          name: 'Unauthorised 2',
          description: 'Description for Unauthorised report 2',
          resourceName: 'reports/list',
          classification: 'OFFICIAL',
          printable: false,
          isMissing: true,
          specification: {
            template: 'list',
            fields: []
          }
        }
      ],
      dashboards: [],
      authorised: false,
    },
  ],

  // ORS Prisoner and Visitors Details Report
}
