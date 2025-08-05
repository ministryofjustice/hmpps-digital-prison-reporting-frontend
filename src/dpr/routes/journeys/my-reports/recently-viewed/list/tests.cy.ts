context('Recently viewed list', () => {
  const path = '/embedded/platform/dpr/my-reports/recently-viewed/list'

  it('is accessible', () => {
    cy.visit(path)
    cy.injectAxe()
    cy.checkA11y()
  })
})
