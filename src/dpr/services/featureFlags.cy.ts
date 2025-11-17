import { stubBaseTasks, stubDefinitionsTasks } from "cypress-tests/cypressUtils"
import { resetFeatureFlags } from "test-app/routes/integrationTests/appStateUtils"

context('Viewing a report', () => {
  const path = '/embedded/platform/'

  describe('Feature flags', () => {
    beforeEach(() => {
      stubBaseTasks()
      stubDefinitionsTasks()
      resetFeatureFlags()
    })

    it('should show product collections with feature flag enabled', () => {
      cy.task('stubFeatureFlags')

      cy.visit(path)
      cy.findByRole('combobox', { name: /Your collections/ })
        .should('be.visible')
        .within(() => cy.findAllByRole('option').should('have.length', 3))
    })

    it('should not show product collections with feature flag disabled', () => {
      cy.task('stubFeatureFlagsEmpty')

      cy.visit(path)
      cy.findByRole('combobox', { name: /Your collections/ })
        .should('not.exist')
    })
  })
})