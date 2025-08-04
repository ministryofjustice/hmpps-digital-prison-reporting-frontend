context('Dashboard visualisation: Scorecards', () => {
  it('is accessible', () => {
    const path = '/components/dashboards/scorecards'
    cy.visit(path)
    cy.injectAxe()
    cy.checkA11y()
  })
})
