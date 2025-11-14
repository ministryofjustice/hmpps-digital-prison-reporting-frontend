import { checkA11y } from '../../../../../cypress-tests/cypressUtils'

context('Request missing report', () => {
  const path = '/embedded/platform/'

  beforeEach(() => {
    cy.task('resetStubs')
    cy.task('resetRedis')
    cy.task('stubDefinitions')
    cy.task('stubGetProductCollections')
    cy.task('stubGetFeatureTestingMissing')
    cy.visit(path)
    cy.findByLabelText(/Reports catalogue.*/i).within(() => {
      cy.findByRole('row', {
        name: (_, element) => {
          return Boolean(element.textContent?.includes('Missing Report 1'))
        },
      }).within(() => {
        cy.findByRole('link', { name: 'Request report' }).click()
      })
    })
    checkA11y()
  })

  describe('Request form page', () => {
    it('should show the form, and on successful submission, redirect to the success submitted page', () => {
      cy.task('stubMissingRequestSubmitSuccess')
      cy.findByRole('textbox', { name: /Request this report/ })
        .should('be.visible')
        .type('abcd')
      cy.findByRole('button', { name: /Submit/ }).click()
      cy.findByRole('heading', { name: /We've received your request for report Missing Report 1/ }).should('be.visible')
      checkA11y()
    })

    it('should show the form, and on failed submission, redirect to the error page', () => {
      cy.task('stubMissingRequestSubmitFail')
      cy.findByRole('textbox', { name: /Request this report/ }).type('a reason')
      cy.findByRole('button', { name: /Submit/ }).click()
      cy.findByRole('heading', { name: /Sorry, there is a problem with the service/ }).should('be.visible')
      checkA11y()
    })
  })
})
