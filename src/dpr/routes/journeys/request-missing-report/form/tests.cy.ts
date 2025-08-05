context('Request missing report', () => {
  const path = '/embedded/platform/dpr/request-missing-report/feature-testing/feature-testing-missing-1/form'

  it('is accessible', () => {
    cy.visit(path)
    cy.injectAxe()
    cy.checkA11y()
  })
})
