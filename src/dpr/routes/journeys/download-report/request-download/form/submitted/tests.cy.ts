context('Request download form submitted', () => {
  const path =
    '/embedded/platform/dpr/download-report/request-download/request-examples/request-example-success/tableId/tblId_1753863906851/form/submitted?reportName=C%20Test%20Report&variantName=Successful%20Report&reportUrl=/embedded/platform/dpr/view-report/async/report/request-examples/request-example-success/tblId_1753863906851/report'

  it('is accessible', () => {
    cy.visit(path)
    cy.injectAxe()
    cy.checkA11y()
  })
})
