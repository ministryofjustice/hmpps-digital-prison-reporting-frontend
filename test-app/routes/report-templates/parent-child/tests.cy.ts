import { checkA11y } from "cypress-tests/cypressUtils"

context('Parent child template', () => {
  it('is accessible', () => {
    const path = 'templates/parent-child'
    cy.visit(path)
    checkA11y()
  })
})
