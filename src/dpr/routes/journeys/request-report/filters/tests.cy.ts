context('Request a report', () => {
  const path = '/embedded/platform/dpr/request-report/report/request-examples/request-example-success/filters'

  it('is accessible', () => {
    cy.visit(path)
    cy.injectAxe()
    cy.checkA11y()
  })
})
