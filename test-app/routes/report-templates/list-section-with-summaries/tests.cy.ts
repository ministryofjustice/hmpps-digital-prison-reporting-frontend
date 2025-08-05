context('List section with summaries template', () => {
  it('is accessible', () => {
    const path = 'templates/list-section-summaries'
    cy.visit(path)
    cy.injectAxe()
    cy.checkA11y()
  })
})
