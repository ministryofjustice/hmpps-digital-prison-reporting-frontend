import { checkA11y } from "cypress-tests/cypressUtils"

context('Parent child section template', () => {
  it('is accessible', () => {
    const path = 'templates/parent-child-section'
    cy.visit(path)
    checkA11y()
  })
})
