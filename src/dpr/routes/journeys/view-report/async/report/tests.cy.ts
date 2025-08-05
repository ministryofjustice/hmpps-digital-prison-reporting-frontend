context('Viewing a report', () => {
  const path =
    '/embedded/platform/dpr/view-report/async/report/request-examples/request-example-success/tblId_1753863906851/report'

  it('is accessible', () => {
    cy.visit(path)
    cy.injectAxe()
    cy.checkA11y()
  })
})
