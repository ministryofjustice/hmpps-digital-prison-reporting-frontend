context('Summary section template', () => {
  it('is accessible', () => {
    const path = 'templates/summary-section'
    cy.visit(path)
    cy.injectAxe()
    cy.checkA11y()
  })
})
