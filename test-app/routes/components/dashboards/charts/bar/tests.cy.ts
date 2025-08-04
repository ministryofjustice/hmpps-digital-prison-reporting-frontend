context('Dashboard visualisation: bar chart', () => {
  it('is accessible', () => {
    const path = '/components/dashboards/charts/bar'
    cy.visit(path)
    cy.injectAxe()
    cy.checkA11y()
  })
})
