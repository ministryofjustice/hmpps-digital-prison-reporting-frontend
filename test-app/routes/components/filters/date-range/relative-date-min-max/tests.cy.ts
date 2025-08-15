context('Inputs: Relative date range', () => {
  const path = '/components/filters/date-range/relative-min-max-date-range#relative-date-range-min-max-relative-range'

  it('is accessible', () => {
    cy.visit(path)
    cy.injectAxe()
    cy.checkA11y()
  })

  describe('Setting the relative date range', () => {
    beforeEach(() => {
      cy.visit(path)
    })

    it('should disable relative inputs outside of the min and max bounds', () => {
      cy.findByRole('radio', { name: 'None' }).should('not.be.disabled')
      cy.findByRole('radio', { name: 'Yesterday' }).should('be.disabled')
      cy.findByRole('radio', { name: 'Tomorrow' }).should('not.be.disabled')
      cy.findByRole('radio', { name: 'Last week' }).should('be.disabled')
      cy.findByRole('radio', { name: 'Next week' }).should('not.be.disabled')
      cy.findByRole('radio', { name: 'Last month' }).should('be.disabled')
      cy.findByRole('radio', { name: 'Next month' }).should('not.be.disabled')
    })
  })

  describe('Setting the relative date range in the URL', () => {
    beforeEach(() => {
      cy.visit(
        `/components/filters/date-range/relative-min-max-date-range?filters.relative-date-range-min-max.relative-duration=yesterday#relative-date-range-min-max-relative-range`,
      )
    })

    it('should disable relative inputs outside of the min and max bounds', () => {
      cy.findByRole('radio', { name: 'Yesterday' }).should('not.be.checked')
    })
  })
})
