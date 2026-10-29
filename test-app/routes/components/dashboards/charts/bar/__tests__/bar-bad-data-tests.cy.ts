import {
  checkA11y,
  executeDashboardStubs,
  requestReportByNameAndDescription,
} from '../../../../../../../cypress-tests/cypressUtils'

context('Dashboard visualisation: bar chart - Bad data testing', () => {
  const path = '/'

  describe('Bar chart - Bad data testing', () => {
    let dashboardUrl = ''

    before(() => {
      cy.task('resetStubs')
      executeDashboardStubs()

      cy.task('stubBarChartsDashboardDefinition')
      cy.task('stubDashboardResultBadData')

      cy.visit(path)

      requestReportByNameAndDescription({
        name: 'Bar charts dashboard',
        description: 'This dashboard represents example Bar visualisations using the default dataset. ...',
      })

      cy.findByRole('heading', { level: 1, name: /Bar charts dashboard/ }).should('be.visible')
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
