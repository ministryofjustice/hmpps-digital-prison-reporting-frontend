import { checkA11y } from "cypress-tests/cypressUtils"

context('Requested report list', () => {
  const path = '/embedded/platform/dpr/my-reports/requested-reports/list'

  before(() => {
    cy.task('resetStubs')
    cy.task('resetRedis')
    cy.task('stubDefinitions')
    cy.task('stubSingleSummaries')
  })

  it('is accessible', () => {
    cy.visit(path)
    checkA11y()
  })
})
