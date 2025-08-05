context('Parent child section template', () => {
  it('is accessible', () => {
    const path = 'templates/parent-child-section'
    cy.visit(path)
    cy.injectAxe()
    cy.checkA11y()
  })
})
