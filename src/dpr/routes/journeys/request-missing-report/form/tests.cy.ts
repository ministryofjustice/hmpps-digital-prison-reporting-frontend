context('Request missing report', () => {
  const path = '/embedded/platform/dpr/request-missing-report/feature-testing/feature-testing-missing-1/form'

  beforeEach(() => {
    cy.task('resetStubs')
    cy.task('resetRedis')
    cy.task('stubDefinitions')
    cy.task('stubGetFeatureTestingMissing')
  })

  it('should show the form, and on successful submission, redirect to the success submitted page', () => {
    cy.task('stubSubmitMissingRequest')
    cy.visit(path)
    cy.injectAxe()
    cy.checkA11y()
    cy.findByRole('heading', { name: /Request this report/ }).should('be.visible')
    cy.findByRole('textbox', { name: /Why do you need this report/ }).should('be.visible')
  })
})
