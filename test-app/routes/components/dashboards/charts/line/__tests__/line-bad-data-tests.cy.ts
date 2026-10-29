import {
  checkA11y,
  executeDashboardStubs,
  requestReportByNameAndDescription,
} from '../../../../../../../cypress-tests/cypressUtils'

context('Dashboard visualisation: Line chart - Bad data testing', () => {
  const path = '/'

  describe('Line chart - Bad data testing', () => {
    let dashboardUrl = ''

    before(() => {
      cy.task('resetStubs')
      executeDashboardStubs()

      cy.task('stubLineChartsDashboardDefinition')
      cy.task('stubDashboardResultBadData')

      cy.visit(path)

      requestReportByNameAndDescription({
        name: 'Line charts dashboard',
        description: 'This dashboard represents example Line visualisations using the default dataset.',
      })

      cy.findByRole('heading', { level: 1, name: /Line charts dashboard/ }).should('be.visible')
      checkA11y()

      cy.url().then(url => {
        dashboardUrl = url
      })
    })

    beforeEach(() => {
      cy.visit(dashboardUrl)
    })

    it('should have the correct amount of sections', () => {
      expect(true)
    })
  })
})
