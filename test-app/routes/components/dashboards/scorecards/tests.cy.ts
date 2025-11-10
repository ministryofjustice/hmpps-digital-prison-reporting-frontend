import { executeDashboardStubs } from '../../../../../cypress-tests/cypressUtils'

context('Dashboard visualisation: Scorecards', () => {
  const scorecardPath =
    '/embedded/platform/dpr/request-report/dashboard/dashboard-visualisations/test-scorecard-examples-data-quality/filters'
  const scorecardsPath =
    '/embedded/platform/dpr/request-report/dashboard/dashboard-visualisations/scorecard-examples-data-quality/filters'

  before(() => {
    executeDashboardStubs()

    cy.task('stubDefinitionScorecardDashboard')
    cy.task('stubDefinitionScorecardGroupDashboard')
    cy.task('stubScorecardResults')
    cy.task('stubScorecardGroupResults')
  })

  describe('scorecard', () => {
    beforeEach(() => {
      cy.visit(scorecardPath)
      cy.findByRole('button', { name: /Request/ }).click()
    })

    it('is accessible', () => {
      cy.injectAxe()
      cy.checkA11y()
    })
  })

  describe('scorecard-group', () => {
    beforeEach(() => {
      cy.visit(scorecardsPath)
      cy.findByRole('button', { name: /Request/ }).click()
    })

    it('is accessible', () => {
      cy.injectAxe()
      cy.checkA11y()
    })
  })
})
