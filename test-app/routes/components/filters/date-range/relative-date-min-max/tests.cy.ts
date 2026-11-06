import { checkA11y, stubDefinitionsTasks } from 'cypress-tests/cypressUtils'

context('Inputs: Relative date range', () => {
  const path = '/components/filters/date-range/relative-min-max-date-range#relative-date-range-min-max-relative-range'

  before(() => {
    stubDefinitionsTasks()
  })

  it('is accessible', () => {
    cy.visit(path)
    checkA11y()
  })

  describe('Setting the relative date range', () => {
    beforeEach(() => {
      cy.visit(path)
    })

    it('should disable relative inputs outside of the min and max bounds', () => {
      cy.findByRole('radio', { name: 'None' }).should('not.be.disabled')
      cy.findByRole('radio', { name: 'Yesterday' }).should('not.exist')
      cy.findByRole('radio', { name: 'Tomorrow' }).should('not.be.disabled')
      cy.findByRole('radio', { name: 'Last week' }).should('not.exist')
      cy.findByRole('radio', { name: 'Next week' }).should('not.be.disabled')
      cy.findByRole('radio', { name: 'Last month' }).should('not.exist')
      cy.findByRole('radio', { name: 'Next month' }).should('not.be.disabled')
    })
  })
})
