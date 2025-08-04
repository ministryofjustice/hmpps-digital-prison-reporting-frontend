context('Bookmarks list', () => {
  const path = '/embedded/platform/dpr/my-reports/bookmarks/list'

  it('is accessible', () => {
    cy.visit(path)
    cy.injectAxe()
    cy.checkA11y()
  })
})
