context('Inputs: granular date range', () => {
  it('is accessible', () => {
    const path = '/components/filters/granular-date-range'
    cy.visit(path)
    cy.injectAxe()
    cy.checkA11y()
  })
})
