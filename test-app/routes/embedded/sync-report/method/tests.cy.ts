context('Embedded sync report by method', () => {
  const path = '/embedded/sync/method'

  it('is accessible', () => {
    cy.visit(path)
    cy.injectAxe()
    cy.checkA11y()
  })
})
