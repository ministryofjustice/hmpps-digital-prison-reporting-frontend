context('Inputs: multiselect', () => {
  it('is accessible', () => {
    const path = '/components/filters/multi-select'
    cy.visit(path)
    cy.injectAxe()
    cy.checkA11y()
  })
})
