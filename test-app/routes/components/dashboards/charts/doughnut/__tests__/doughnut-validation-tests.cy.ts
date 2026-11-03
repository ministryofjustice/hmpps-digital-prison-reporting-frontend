import {
  executeDashboardStubs,
  requestReportByNameAndDescription,
} from '../../../../../../../cypress-tests/cypressUtils'

context('Dashboard visualisation: Doughnut chart', () => {
  const path = '/'

  describe('Invalid definition', () => {
    let invalidDashboardUrl = ''

    before(() => {
      cy.task('resetStubs')
      executeDashboardStubs()

      cy.task('stubDoughnutChartsDashboardDefinitionInvalid')
      cy.task('stubDashboardResult')

      cy.visit(path)

      requestReportByNameAndDescription({
        name: 'Doughnut - Invalid visualisation definitions',
        description: 'This dashboard represents example invalid doughnut visualisations.',
      })

      cy.url().should('include', '/view-report')

      cy.url().then(url => {
        invalidDashboardUrl = url
      })
    })

    beforeEach(() => {
      cy.visit(invalidDashboardUrl)
    })

    it('should show the correct validation messages', () => {
      cy.findByRole('heading', { name: /Your report has failed to generate/ }).should('be.visible')
      cy.findAllByRole('paragraph').eq(1).contains('Schema validation error: Measure must contain 2 items')
    })
  })
})
