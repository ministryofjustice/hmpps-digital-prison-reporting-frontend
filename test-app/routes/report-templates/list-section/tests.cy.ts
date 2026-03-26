import { checkA11y } from "cypress-tests/cypressUtils"

context('List section template', () => {
  it('is accessible', () => {
    const path = 'templates/list-section'
    cy.visit(path)
    checkA11y()
  })
})
