import { checkA11y } from "cypress-tests/cypressUtils"

context('Inputs: date', () => {
  it('is accessible', () => {
    const path = '/components/filters/date'
    cy.visit(path)
    checkA11y()
  })
})
