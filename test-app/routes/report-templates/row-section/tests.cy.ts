context('Row section template', () => {
  it('is accessible', () => {
    const path = 'templates/row-section'
    cy.visit(path)
    cy.injectAxe()
    cy.checkA11y()
  })
})
