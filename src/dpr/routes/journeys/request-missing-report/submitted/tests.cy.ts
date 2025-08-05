context('Request missing report submitted', () => {
  const path =
    '/embedded/platform/dpr/request-missing-report/feature-testing/feature-testing-missing-1/submitted?reportName=C%20Test%20Report&name=Missing%20Report%20about%20beans&reportId=feature-testing&variantId=feature-testing-missing-1'

  it('is accessible', () => {
    cy.visit(path)
    cy.injectAxe()
    cy.checkA11y()
  })
})
