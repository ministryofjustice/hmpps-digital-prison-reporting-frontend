context('Search component', () => {
  it('is accessible', () => {
    const path = '/components/search'
    cy.visit(path)
    cy.injectAxe()
    cy.checkA11y()
  })
})
