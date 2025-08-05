context('List section template', () => {
  it('is accessible', () => {
    const path = 'templates/list-section'
    cy.visit(path)
    cy.injectAxe()
    cy.checkA11y()
  })
})
