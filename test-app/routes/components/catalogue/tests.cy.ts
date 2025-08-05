context('Catalogue component', () => {
  it('is accessible', () => {
    const path = '/components/catalogue'
    cy.visit(path)
    cy.injectAxe()
    cy.checkA11y()
  })
})
