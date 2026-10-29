import { resetFeatureFlags } from '../../../../../../routes/integrationTests/appStateUtils'
import {
  executeDashboardStubs,
  requestReportByNameAndDescription,
} from '../../../../../../../cypress-tests/cypressUtils'

context('Dashboard visualisation: Scorecard Group: Validation', () => {
  const path = '/'

  describe('scorecard group validation tests', () => {
    before(() => {
      cy.task('resetStubs')
      executeDashboardStubs()
      resetFeatureFlags()

      cy.task('stubScorecardGroupDashboardDefinitionInvalid')
      cy.task('stubDashboardResult')
      cy.task('stubMockDashboardStatusStarted')
      cy.task('stubMockDashboardStatusFinished')

      cy.visit(path)

      requestReportByNameAndDescription({
        name: 'Scorecard Group - invalid',
        description: 'Scorecard group invalid examples',
      })
    })

    it('should show the validation errors for scorcards', () => {
      cy.findByRole('heading', { name: /Your report has failed to generate/ }).should('be.visible')

      cy.findAllByRole('paragraph')
        .eq(1)
        .contains('Schema validation error: Dashboard Visualisation validation failed:')

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
