import { executeDashboardStubs, requestReportByNameAndDescription } from '../../../../../../cypress-tests/cypressUtils'

context('Dashboard visualisation: bar chart', () => {
  const path = '/embedded/platform/'

  describe('Complete data', () => {
    beforeEach(() => {
      cy.task('resetStubs')
      executeDashboardStubs()
      cy.task('stubListDashboardCompleteData')
      cy.task('stubDashboardResultCompleteData')
      cy.visit(path)

      requestReportByNameAndDescription({
        name: 'List - Complete dataset',
        description: 'This dashboard represents example list visualisations using a complete dataset',
      })

      cy.findByRole('heading', { level: 1, name: /Bar - Complete dataset/ }).should('be.visible')
      cy.injectAxe()
      cy.checkA11y()
    })
  })

  describe('Partial data', () => {
    beforeEach(() => {
      cy.task('resetStubs')
      executeDashboardStubs()
      cy.task('stubListDashboardPartialData')
      cy.task('stubDashboardResultPartialData')
      cy.visit(path)

      requestReportByNameAndDescription({
        name: 'Bar - Partial dataset',
        description: 'This dashboard represents example list visualisations using a partial dataset',
      })

      cy.findByRole('heading', { level: 1, name: /Bar - Complete dataset/ }).should('be.visible')
      cy.injectAxe()
      cy.checkA11y()
    })
  })
})
