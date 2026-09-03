import { resetFeatureFlags } from '../../../../../../routes/integrationTests/appStateUtils'
import {
  executeDashboardStubs,
  requestReportByNameAndDescription,
} from '../../../../../../../cypress-tests/cypressUtils'

context('Dashboard visualisation: Scorecards', () => {
  const path = '/'

  describe('scorecard group', () => {
    before(() => {
      cy.task('resetStubs')
      executeDashboardStubs()
      resetFeatureFlags()

      cy.task('stubDefinitionScorecardGroupDashboardInvalid')
      cy.task('stubDashboardResultCompleteData')
      cy.task('stubMockDashboardsStatusStarted')
      cy.task('stubMockDashboardsStatusFinished')

      cy.visit(path)

      requestReportByNameAndDescription({
        name: 'Scorecard Group - Complete data - invalid',
        description: 'Scorecard examples',
      })
    })

    it('should show the validation errors for scorcards', () => {
      cy.findByRole('heading', { name: /Your report has failed to generate/ }).should('be.visible')

      cy.findAllByRole('paragraph')
        .eq(1)
        .contains('Error: Schema validation: Dashboard Visualisation validation failed:')

      cy.findAllByRole('paragraph')
        .eq(2)
        .contains(
          "Type: 'scorecard-group'. ID: 'data-quality-MetricOne-invalid-1'. Issues: Measure must contain two or more items. Measure must have length 2 when displayValue is defined",
        )

      cy.findAllByRole('paragraph')
        .eq(3)
        .contains(
          "Type: 'scorecard-group'. ID: 'data-quality-MetricOne-invalid-2'. Issues: Measure must contain two or more items",
        )
    })
  })
})
