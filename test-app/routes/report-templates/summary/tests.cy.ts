import { checkA11y } from "cypress-tests/cypressUtils"

context('Summary template', () => {
  it('is accessible', () => {
    const path = 'templates/summary'
    cy.visit(path)
    checkA11y()
  })
})
