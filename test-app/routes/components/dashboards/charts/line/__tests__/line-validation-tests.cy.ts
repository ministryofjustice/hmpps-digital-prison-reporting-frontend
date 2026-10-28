import {
  executeDashboardStubs,
  requestReportByNameAndDescription,
} from '../../../../../../../cypress-tests/cypressUtils'

context('Dashboard visualisation: line-timeseries chart invalid definitions', () => {
  const path = '/'

  describe('Invalid definitions', () => {
    before(() => {
      cy.task('resetStubs')

      executeDashboardStubs()

      cy.task('stubLineChartsDashboardDefinitionInvalid')
      cy.task('stubDashboardResult')
      cy.task('stubMockDashboardStatusStarted')
      cy.task('stubMockDashboardStatusFinished')

      cy.visit(path)

      requestReportByNameAndDescription({
        name: 'Line - Invalid visualisation definitions',
        description: 'This dashboard represents example invalid line visualisations.',
      })
    })

    it('should show the validation errors', () => {
      cy.findByRole('heading', { name: /Your report has failed to generate/ }).should('be.visible')

      cy.findAllByRole('paragraph')
        .eq(1)
        .contains('Schema validation error: Dashboard Visualisation validation failed:')

      cy.findAllByRole('paragraph')
        .eq(2)
        .contains("'line'. ID: 'mockMetricOneLineChart'. Issues: Measure must contain at least two items")
    })
  })
})
