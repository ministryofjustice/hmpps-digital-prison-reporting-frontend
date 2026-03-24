import { checkA11y } from "cypress-tests/cypressUtils"

context('List template', () => {
  it('is accessible', () => {
    const path = 'templates/list'
    cy.visit(path)
    checkA11y()
  })
})
