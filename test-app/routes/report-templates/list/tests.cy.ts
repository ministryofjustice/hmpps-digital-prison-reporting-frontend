context('List template', () => {
  it('is accessible', () => {
    const path = 'templates/list'
    cy.visit(path)
    cy.injectAxe()
    cy.checkA11y()
  })
})
