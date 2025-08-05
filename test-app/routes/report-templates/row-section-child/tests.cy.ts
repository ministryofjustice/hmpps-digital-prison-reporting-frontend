context('Row section child template', () => {
  it('is accessible', () => {
    const path = 'templates/row-section-child'
    cy.visit(path)
    cy.injectAxe()
    cy.checkA11y()
  })
})
