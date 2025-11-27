import { executeReportStubs, stubBaseTasks, stubDefinitionsTasks } from "cypress-tests/cypressUtils"
import { resetFeatureFlags } from "test-app/routes/integrationTests/appStateUtils"

context('Viewing a report', () => {
  const path = '/embedded/platform/'

  describe('Feature flags', () => {
    beforeEach(() => {
      executeReportStubs()
      cy.task('stubDefinitionRequestExamplesSuccess')
      cy.task('stubRequestSuccessResult20')
      resetFeatureFlags()
    })

    it('should show the ability to save filters as default with feature flag enabled', () => {
      cy.task('stubFeatureFlags')

      cy.visit(path)
      cy.findByLabelText(/Reports catalogue.*/i).within(() => {
        cy.findByRole('row', {
          name: (_, element) => {
            return Boolean(element?.textContent?.includes('Successful Report')) && Boolean(element?.textContent?.includes('this will succeed'))
          },
        }).within(() => {
          cy.findByRole('link', { name: 'Request report' }).click()
        })
      })

      cy.findByRole('button', { name: /Save current filter values as defaults/ }).should('be.visible')
    })

    it('should show the ability to save filters as default with feature flag not existing', () => {
      cy.task('stubFeatureFlagsEmpty')

      cy.visit(path)
      cy.findByLabelText(/Reports catalogue.*/i).within(() => {
        cy.findByRole('row', {
          name: (_, element) => {
            return Boolean(element?.textContent?.includes('Successful Report')) && Boolean(element?.textContent?.includes('this will succeed'))
          },
        }).within(() => {
          cy.findByRole('link', { name: 'Request report' }).click()
        })
      })

      cy.findByRole('button', { name: /Save current filter values as defaults/ }).should('be.visible')
    })

    it('should not show the ability to save filters as default with feature flag disabled', () => {
      cy.task('stubFeatureFlagsDisabled')

      cy.visit(path)
      cy.findByLabelText(/Reports catalogue.*/i).within(() => {
        cy.findByRole('row', {
          name: (_, element) => {
            return Boolean(element?.textContent?.includes('Successful Report')) && Boolean(element?.textContent?.includes('this will succeed'))
          },
        }).within(() => {
          cy.findByRole('link', { name: 'Request report' }).click()
        })
      })

      cy.findByRole('button', { name: /Save current filter values as defaults/ }).should('not.exist')
    })
  })
})