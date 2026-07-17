import {
  checkA11y,
  startReportRequest,
  stubBaseTasks,
  stubDefinitionsTasks,
} from '../../../../../cypress-tests/cypressUtils'

context('Request missing report', () => {
  const path = '/embedded/platform'

  beforeEach(() => {
    stubBaseTasks()
    stubDefinitionsTasks()
    cy.task('stubGetFeatureTestingMissing')
    cy.visit(path)
    startReportRequest({ name: 'Missing Report 1', description: 'Description for missing report 1' })
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
