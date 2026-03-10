import { executeReportStubs } from 'cypress-tests/cypressUtils'
import {
  resetFeatureFlags,
  toggleBookmarking,
  toggleUnauthorisedFilterEnabled,
} from 'test-app/routes/integrationTests/appStateUtils'

context('Viewing a report', () => {
  const path = '/embedded/platform'

  after(() => {
    cy.task('stubFeatureFlags')
    resetFeatureFlags()
  })

  describe('Feature flags', () => {
    beforeEach(() => {
      executeReportStubs()
      cy.task('stubDefinitionRequestExamplesSuccess')
      cy.task('stubRequestSuccessResult20')
    })

    it('should not show the ability to bookmark with bookmarking disabled', () => {
      toggleBookmarking()
      cy.visit(path)
      cy.findAllByRole('link', { name: /Add bookmark/ }).should('have.length', 0)

      toggleBookmarking()
      cy.visit(path)
      cy.findAllByRole('link', { name: /Add bookmark/ }).should('have.length.above', 0)
    })

    it('should not show the ability to show unauthorised reports with this feature disabled', () => {
      toggleUnauthorisedFilterEnabled()
      cy.visit(path)
      // It's initially there because we dont initially set a value for unauthorisedFilterEnabled, so toggling it sets it to exist
      cy.findByRole('checkbox', { name: /Show unauthorised reports/, hidden: true }).should('exist')

      // Then we toggle it to false
      toggleUnauthorisedFilterEnabled()
      cy.visit(path)
      cy.findByRole('checkbox', { name: /Show unauthorised reports/, hidden: true }).should('not.exist')
    })

    it('should show the ability to save filters as default with feature flag enabled', () => {
      cy.task('stubFeatureFlags')
      resetFeatureFlags()
      cy.visit(path)
      cy.findByLabelText(/Reports catalogue.*/i).within(() => {
        cy.findByRole('row', {
          name: (_, element) => {
            return (
              Boolean(element?.textContent?.includes('Successful Report')) &&
              Boolean(element?.textContent?.includes('this will succeed'))
            )
          },
        }).within(() => {
          cy.findByRole('link', { name: 'Request report' }).click()
        })
      })

      cy.findByRole('button', { name: /Save current filter values as defaults/ }).should('be.visible')
      const helpSummary = cy.contains('summary', /Help/)
      helpSummary.click()
      helpSummary.parent('details').invoke('attr', 'open').should('exist')
      cy.findByRole('heading', { name: /Save current filter values as defaults/ }).should('be.visible')
    })

    it('should show the ability to save filters as default with feature flag not existing', () => {
      cy.task('stubFeatureFlagsEmpty')
      resetFeatureFlags()
      cy.visit(path)
      cy.findByLabelText(/Reports catalogue.*/i).within(() => {
        cy.findByRole('row', {
          name: (_, element) => {
            return (
              Boolean(element?.textContent?.includes('Successful Report')) &&
              Boolean(element?.textContent?.includes('this will succeed'))
            )
          },
        }).within(() => {
          cy.findByRole('link', { name: 'Request report' }).click()
        })
      })

      cy.findByRole('button', { name: /Save current filter values as defaults/ }).should('be.visible')
      const helpSummary = cy.contains('summary', /Help/)
      helpSummary.click()
      helpSummary.parent('details').invoke('attr', 'open').should('exist')
      cy.findByRole('heading', { name: /Save current filter values as defaults/ }).should('be.visible')
    })

    it('should not show the ability to save filters as default with feature flag disabled', () => {
      cy.task('stubFeatureFlagsDisabled')
      resetFeatureFlags()
      cy.visit(path)
      cy.findByLabelText(/Reports catalogue.*/i).within(() => {
        cy.findByRole('row', {
          name: (_, element) => {
            return (
              Boolean(element?.textContent?.includes('Successful Report')) &&
              Boolean(element?.textContent?.includes('this will succeed'))
            )
          },
        }).within(() => {
          cy.findByRole('link', { name: 'Request report' }).click()
        })
      })

      cy.findByRole('button', { name: /Save current filter values as defaults/ }).should('not.exist')
      const helpSummary = cy.contains('summary', /Help/)
      helpSummary.click()
      helpSummary.parent('details').invoke('attr', 'open').should('exist')
      cy.findByRole('heading', { name: /Save current filter values as defaults/ }).should('not.exist')
    })
  })
})
