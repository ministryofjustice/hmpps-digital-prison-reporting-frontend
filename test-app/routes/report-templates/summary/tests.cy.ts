context('Summary template', () => {
  it('is accessible', () => {
    const path = 'templates/summary'
    cy.visit(path)
    cy.injectAxe()
    cy.checkA11y()
  })
})
