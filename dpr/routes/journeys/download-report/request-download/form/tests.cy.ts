context('Request download form', () => {
  const path =
    '/embedded/platform/dpr/download-report/request-download/request-examples/request-example-success/tableId/tblId_1753863906851/form?reportUrl=/embedded/platform/dpr/view-report/async/report/request-examples/request-example-success/tblId_1753863906851/report'

  before(() => {
    cy.task('resetStubs')
    cy.task('resetRedis')
    cy.task('stubDefinitions')
    cy.task('stubSingleSummaries')
    cy.task('stubDefinitionRequestExamplesSuccess')
  })

  it('is accessible', () => {
    cy.visit(path)
    cy.injectAxe()
    cy.checkA11y()
    cy.findByRole('heading', { name: /Download request form/ }).should('be.visible')
    cy.findByRole('button', { name: /Submit request/ }).click()
    cy.findByRole('link', { name: /provide information on how you will use this data/ })
      .should('be.visible')
      .click()
    cy.findByRole('textbox', { name: /Can you provide more detail/ })
      .should('be.focused')
      .type('foo')
    cy.findByRole('link', { name: /Enter your Job title/ })
      .should('be.visible')
      .click()
    cy.findByRole('textbox', { name: /What is your Job title\?/ })
      .should('be.focused')
      .type('foo')
    cy.findByRole('button', { name: /Submit request/ }).click()
    cy.findByRole('heading', { name: /Download request form/ }).should('not.exist')
  })
})
