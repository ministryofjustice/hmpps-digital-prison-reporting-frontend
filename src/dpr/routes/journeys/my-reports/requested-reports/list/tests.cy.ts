context('Requested report list', () => {
  const path = '/embedded/platform/dpr/my-reports/requested-reports/list'

  it('is accessible', () => {
    cy.visit(path)
    cy.injectAxe()
    cy.checkA11y()
  })
})
