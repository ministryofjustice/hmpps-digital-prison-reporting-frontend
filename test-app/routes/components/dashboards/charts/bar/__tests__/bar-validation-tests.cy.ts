import {
  executeDashboardStubs,
  requestReportByNameAndDescription,
} from '../../../../../../../cypress-tests/cypressUtils'

context('Dashboard visualisation: bar chart', () => {
  const path = '/'

  describe('Invalid definition', () => {
    let invalidDashboardUrl = ''

    before(() => {
      cy.task('resetStubs')
      executeDashboardStubs()
      cy.task('stubBarChartsDashboardDefinitionInvalid')
      cy.task('stubDashboardResultMergedData')
      cy.visit(path)

      requestReportByNameAndDescription({
        name: 'Bar - Invalid visualisation',
        description: 'This dashboard represents example of invlaid bar visualisation definition using',
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
      cy.findAllByRole('paragraph')
        .eq(1)
        .contains('Schema validation error: Dashboard Visualisation validation failed:')
      cy.findAllByRole('paragraph')
        .eq(2)
        .contains("Type: 'bar'. ID: 'invalid-y-axis-definition-bar'. Issues: X and Y axis must be defined in measure")
      cy.findAllByRole('paragraph')
        .eq(3)
        .contains("Type: 'bar'. ID: 'invalid-x-axis-definition-bar'. Issues: X and Y axis must be defined in measure")
    })
  })
})
