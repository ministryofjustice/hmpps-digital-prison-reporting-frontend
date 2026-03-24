import { checkA11y } from "cypress-tests/cypressUtils"

context('List section with summaries template', () => {
  it('is accessible', () => {
    const path = 'templates/list-section-summaries'
    cy.visit(path)
    checkA11y()
  })
})
