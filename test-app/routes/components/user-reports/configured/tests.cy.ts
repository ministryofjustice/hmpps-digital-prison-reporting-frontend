context('User reports component', () => {
  const path = '/components/user-reports/configured'

  beforeEach(() => {
    cy.visit(path)
  })

  it('is accessible', () => {
    cy.visit(path)
    cy.injectAxe()
    cy.checkA11y()
  })

  it('should not show the bookmarks tab', () => {
    cy.get('#tab_my-bookmarks-tab').should('not.exist')
  })
})
