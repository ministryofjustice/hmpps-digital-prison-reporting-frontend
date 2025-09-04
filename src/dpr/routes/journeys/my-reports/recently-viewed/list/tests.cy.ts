context('Recently viewed list', () => {
  const path = '/embedded/platform/dpr/my-reports/recently-viewed/list'

  before(() => {
    cy.task('resetStubs')
    cy.task('resetRedis')
    cy.task('stubDefinitions')
  })

  it('is accessible', () => {
    cy.visit(path)
    cy.injectAxe()
    cy.checkA11y()
  })
})
