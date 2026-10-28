import {
  executeDashboardStubs,
  requestReportByNameAndDescription,
} from '../../../../../../../cypress-tests/cypressUtils'

context('Dashboard visualisation: matrix validation tests', () => {
  const path = '/'

  describe('Invalid definition', () => {
    before(() => {
      cy.task('resetStubs')

      executeDashboardStubs()

      cy.task('stubMatrixChartsDashboardDefinitionMonthly')
      cy.task('stubDashboardResultNoTs')

      cy.visit(path)

      requestReportByNameAndDescription({
        name: 'Matrix - monthly',
        description: 'Matrix examples',
      })
    })

    it('should show the validation errors for matrix charts', () => {
      cy.findByRole('heading', { name: /Your report has failed to generate/ }).should('be.visible')

      cy.findAllByRole('paragraph')
        .eq(1)
        .contains('automatic-bucketing-monthly: No relevant timestamp field in dataset')
    })
  })
})
