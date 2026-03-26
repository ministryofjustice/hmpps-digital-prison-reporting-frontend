import { checkA11y } from "cypress-tests/cypressUtils"

context('Summary section template', () => {
  it('is accessible', () => {
    const path = 'templates/summary-section'
    cy.visit(path)
    checkA11y()
  })
})
