context('Parent child template', () => {
  it('is accessible', () => {
    const path = 'templates/parent-child'
    cy.visit(path)
    cy.injectAxe()
    cy.checkA11y()
  })
})
