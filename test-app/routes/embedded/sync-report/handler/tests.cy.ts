context('Embedded sync report by handler', () => {
  const path = '/embedded/sync/handler'

  it('is accessible', () => {
    cy.visit(path)
    cy.injectAxe()
    cy.checkA11y()
  })
})
