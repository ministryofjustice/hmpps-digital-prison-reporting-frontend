import { resetFeatureFlags } from '../../../../../integrationTests/appStateUtils'
import {
  executeDashboardStubs,
  requestReportByNameAndDescription,
} from '../../../../../../../cypress-tests/cypressUtils'

context('Dashboard visualisation: Scorecards', () => {
  const path = '/'

  describe('scorecard validation', () => {
    before(() => {
      cy.task('resetStubs')
      executeDashboardStubs()
      resetFeatureFlags()

      cy.task('stubDefinitionScorecardDashboardInvalidVisDefs')

      cy.task('stubDashboardResultCompleteData')
      cy.task('stubMockDashboardsStatusStarted')
      cy.task('stubMockDashboardsStatusFinished')

      cy.visit(path)

      requestReportByNameAndDescription({
        name: 'Scorecard - Invalid visualisation definitions',
        description: 'Scorecard examples that are invalid',
      })
    })

    it('should show the validation errors for scorcards', () => {
      cy.findByRole('heading', { name: /Your report has failed to generate/ }).should('be.visible')

      cy.findAllByRole('paragraph')
        .eq(1)
        .contains('Error: Schema validation: Dashboard Visualisation validation failed:')

      cy.findAllByRole('paragraph')
        .eq(2)
        .contains("Type: 'scorecard'. ID: 'simple-scorecard-MetricOne'. Issues: Measure must contain a single item")

      cy.findAllByRole('paragraph')
        .eq(3)
        .contains("Type: 'scorecard'. ID: 'simple-scorecard-MetricTwo'. Issues: Measure must contain a single item")

      cy.findAllByRole('paragraph')
        .eq(4)
        .contains(
          "Type: 'scorecard'. ID: 'simple-scorecard-MetricThree'. Issues: Too small: expected array to have >=1 items",
        )
    })
  })
})
