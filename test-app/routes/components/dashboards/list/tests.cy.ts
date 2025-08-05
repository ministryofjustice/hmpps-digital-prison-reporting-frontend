context('Dashboard visualisation: List', () => {
  it('is accessible', () => {
    const path = '/components/dashboards/list'
    cy.visit(path)
    cy.injectAxe()
    cy.checkA11y()
  })
})
