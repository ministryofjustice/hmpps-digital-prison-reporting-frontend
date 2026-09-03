import { resetFeatureFlags } from '../../../../../integrationTests/appStateUtils'
import {
  checkA11y,
  executeDashboardStubs,
  requestReportByNameAndDescription,
} from '../../../../../../../cypress-tests/cypressUtils'

context('Dashboard visualisation: Scorecards: Complete data', () => {
  const path = '/'

  describe('scorecard tests', () => {
    let completeDashboardUrl = ''

    before(() => {
      cy.task('resetStubs')
      executeDashboardStubs()
      resetFeatureFlags()

      cy.task('stubDefinitionScorecardDashboard')
      cy.task('stubDashboardResultCompleteData')
      cy.task('stubMockDashboardsStatusStarted')
      cy.task('stubMockDashboardsStatusFinished')

      cy.visit(path)

      requestReportByNameAndDescription({
        name: 'Scorecard - Complete data',
        description: 'Scorecard examples',
      })

      cy.findByRole('heading', { level: 1, name: /Scorecard/ }).should('be.visible')

      cy.url().then(url => {
        completeDashboardUrl = url
      })
    })

    beforeEach(() => {
      cy.visit(completeDashboardUrl)
    })

    it('is accessible', () => {
      checkA11y()
    })

    it('should show the correct information on a scorecard', () => {
      cy.findAllByLabelText(/No of prisoners with MetricTwo/)
        .first()
        .should('be.visible')
        .within(() => {
          // Metric
          cy.findAllByRole('paragraph').eq(1).contains(684).should('exist')

          // Colour
          cy.findAllByRole('paragraph').eq(1).should('have.css', 'background-color').should('exist')

          // trend
          cy.findAllByRole('paragraph').eq(2).contains('from').should('exist')

          // date
          cy.findAllByRole('paragraph').eq(3).contains('Value for').should('exist')
        })
    })
  })
})
