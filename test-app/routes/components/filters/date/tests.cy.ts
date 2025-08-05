context('Inputs: date', () => {
  it('is accessible', () => {
    const path = '/components/filters/date'
    cy.visit(path)
    cy.injectAxe()
    cy.checkA11y()
  })
})
