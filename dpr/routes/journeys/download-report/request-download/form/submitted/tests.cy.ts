context('Request download form submitted', () => {
  before(() => {
    cy.task('resetStubs')
    cy.task('resetRedis')
    cy.task('stubDefinitions')
    cy.task('stubSingleSummaries')
  })

  it('is accessible', () => {
    cy.visit(
      '/embedded/platform/dpr/download-report/request-download/request-examples/request-example-success/tableId/tblId_1753863906851/form/submitted?reportName=C%20Test%20Report&variantName=Successful%20Report&reportUrl=/embedded/platform/dpr/view-report/async/report/request-examples/request-example-success/tblId_1753863906851/report',
    )
    cy.injectAxe()
    cy.checkA11y()
    cy.findByText(/Download is now enabled for this report/).should('be.visible')
  })
})
