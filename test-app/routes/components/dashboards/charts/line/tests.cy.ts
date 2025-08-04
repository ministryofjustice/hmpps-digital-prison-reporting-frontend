context('Dashboard visualisation: Line chart', () => {
  it('is accessible', () => {
    const path = '/components/dashboards/charts/line'
    cy.visit(path)
    cy.injectAxe()
    cy.checkA11y()
  })
})
