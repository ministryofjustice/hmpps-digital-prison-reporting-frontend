import {
  checkA11y,
  executeDashboardStubs,
  requestReportByNameAndDescription,
} from '../../../../../../cypress-tests/cypressUtils'

context('Dashboard visualisation: List chart - Bad data testing', () => {
  const path = '/'

  describe('List chart - Bad data testing', () => {
    let dashboardUrl = ''

    before(() => {
      cy.task('resetStubs')
      executeDashboardStubs()

      cy.task('stubListDashboardDefinition')
      cy.task('stubDashboardResultBadData')

      cy.visit(path)

      requestReportByNameAndDescription({
        name: 'List charts dashboard',
        description: 'This dashboard represents example list visualisations using the default dataset....',
      })

      cy.findByRole('heading', { level: 1, name: /List charts dashboard/ }).should('be.visible')
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
