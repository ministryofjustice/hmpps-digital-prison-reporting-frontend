context('User reports component', () => {
  it('is accessible', () => {
    const path = '/components/user-reports'
    cy.visit(path)
    cy.injectAxe()
    cy.checkA11y()
  })
})
