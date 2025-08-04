context('Viewing a report', () => {
  const path =
    '/embedded/platform/dpr/view-report/async/dashboard/mock-dashboards/test-dashboard-8/tblId_1730302242487/dashboard?filters.establishment_id=MDI&filters.date.quick-filter=last-six-months&filters.date.granularity=monthly&filters.date.start=2025-01-31&filters.date.end=2025-07-30'

  it('is accessible', () => {
    cy.visit(path)
    cy.injectAxe()
    cy.checkA11y()
  })
})
