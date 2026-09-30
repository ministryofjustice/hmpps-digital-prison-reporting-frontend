import {
  executeDashboardStubs,
  requestReportByNameAndDescription,
} from '../../../../../../../cypress-tests/cypressUtils'

context('Dashboard visualisation: matrix validation tests', () => {
  const path = '/'

  describe('Invalid definition', () => {
    let invalidDashboardUrl = ''

    before(() => {
      cy.task('resetStubs')
      executeDashboardStubs()
      cy.task('stubMatrixInvalid')
      cy.task('stubDashboardResultPartialData')
      cy.visit(path)

      requestReportByNameAndDescription({
        name: 'Matrix Examples - Invalid Data',
        description: 'Invalid Matrix Examples',
      })

      cy.url().should('include', '/view-report')

      cy.url().then(url => {
        invalidDashboardUrl = url
      })
    })

    beforeEach(() => {
      cy.visit(invalidDashboardUrl)
    })

    it('should show the validation errors for matrix charts', () => {
      cy.findByRole('heading', { name: /Your report has failed to generate/ }).should('be.visible')

      cy.findAllByRole('paragraph')
        .eq(1)
        .contains('Error: Schema validation: Dashboard Visualisation validation failed:')

      cy.findAllByRole('paragraph')
        .eq(2)
        .contains(
          "Type: 'matrix-timeseries'. ID: 'matrixOnlyOneMeasure'. Issues: Key array cannot be empty. Measure must contain a single item",
        )

      cy.findAllByRole('paragraph')
        .eq(3)
        .contains("Type: 'matrix-timeseries'. ID: 'matrixOnlyOneMeasure'. Issues: Measure must contain a single item")
    })
  })
})
