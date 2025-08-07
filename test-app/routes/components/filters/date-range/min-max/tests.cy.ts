context('Inputs: date range', () => {
  it('is accessible', () => {
    const path = '/components/filters/date-range/min-max-date-range'
    cy.visit(path)
    cy.injectAxe()
    cy.checkA11y()
  })
})
