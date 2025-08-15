context('Request missing report', () => {
  const path = '/embedded/platform/dpr/request-missing-report/feature-testing/feature-testing-missing-1/form'

  beforeEach(() => {
    cy.task('reset')
  })

  it('is accessible', () => {
    cy.visit(path)
    cy.injectAxe()
    cy.checkA11y()
  })

  it('should show the form, and on successful submission, redirect to the success submitted page', () => {
    cy.task('stubSubmitMissingRequest')
    cy.task('stubGetDefinition')
    cy.visit(path)
    cy.findByRole('heading', { name: /Request this report/ }).should('be.visible')
    cy.findByRole('textbox').type('a reason')
    cy.findByRole('button', { name: /Submit/ }).click()
    cy.findByRole('heading', { name: /Request submitted/ }).should('be.visible')
  })

  it('should show the form, and on failed submission, redirect to the error page', () => {
    cy.task('stubGetDefinition')
    cy.visit(path)
    cy.findByRole('heading', { name: /Request this report/ }).should('be.visible')
    cy.findByRole('textbox').type('a reason')
    cy.findByRole('button', { name: /Submit/ }).click()
    cy.findByRole('heading', { name: /Sorry, there is a problem with the service/ }).should('be.visible')
  })
})
