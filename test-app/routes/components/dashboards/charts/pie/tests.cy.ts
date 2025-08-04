context('Dashboard visualisation: Pie chart', () => {
  it('is accessible', () => {
    const path = '/components/dashboards/charts/pie'
    cy.visit(path)
    cy.injectAxe()
    cy.checkA11y()
  })
})
