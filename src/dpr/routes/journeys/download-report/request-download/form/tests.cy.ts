context('Request download form', () => {
  const path =
    '/embedded/platform/dpr/download-report/request-download/request-examples/request-example-success/tableId/tblId_1753863906851/form?reportUrl=/embedded/platform/dpr/view-report/async/report/request-examples/request-example-success/tblId_1753863906851/report'

  it('is accessible', () => {
    cy.visit(path)
    cy.injectAxe()
    cy.checkA11y()
  })
})
