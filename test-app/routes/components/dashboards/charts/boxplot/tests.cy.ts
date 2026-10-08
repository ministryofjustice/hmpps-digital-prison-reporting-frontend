import {
  checkA11y,
  executeDashboardStubs,
  requestReportByNameAndDescription,
} from '../../../../../../cypress-tests/cypressUtils'

context('Dashboard visualisation: bar chart', () => {
  const path = '/'

  describe('Complete data', () => {
    let boxPlotDashboardUrl = ''

    before(() => {
      cy.task('resetStubs')
      executeDashboardStubs()
      cy.task('stubDefinitionBoxPlotDashboard')
      cy.task('stubDashboardResultBoxPlotData')
      cy.visit(path)

      requestReportByNameAndDescription({
        name: 'Box plot chart Examples',
        description: 'A set of box plot chart examples',
      })

      cy.findByRole('heading', { level: 1, name: /Box plot chart Examples/ }).should('be.visible')
      checkA11y()

      cy.url().then(url => {
        boxPlotDashboardUrl = url
      })
    })

    beforeEach(() => {
      cy.visit(boxPlotDashboardUrl)
    })

    it('should load the page', () => {
      cy.findByRole('heading', { level: 1, name: /Box plot chart Examples/ }).should('be.visible')
    })
  })
})
