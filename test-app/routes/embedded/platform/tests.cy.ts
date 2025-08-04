context('Embedded platform home', () => {
  const path = '/embedded/platform'

  it('is accessible', () => {
    cy.visit(path)
    cy.injectAxe()
    cy.checkA11y()
  })
})
