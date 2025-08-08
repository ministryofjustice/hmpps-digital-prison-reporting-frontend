context('Inputs: Relative date range', () => {
  const path = '/components/filters/date-range/relative-min-max-date-range#relative-date-range-min-max-relative-range'
  const platformPath = '/embedded/platform/dpr/request-report/report/filter-inputs/variantId-15/filters'

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
      cy.get('.govuk-radios__item > input').each((input, index) => {
        switch (index) {
          case 0:
            cy.wrap(input).should('not.be.disabled')
            break
          case 1:
            cy.wrap(input).should('be.disabled')
            break
          case 2:
            cy.wrap(input).should('not.be.disabled')
            break
          case 3:
            cy.wrap(input).should('be.disabled')
            break
          case 4:
            cy.wrap(input).should('not.be.disabled')
            break
          case 5:
            cy.wrap(input).should('be.disabled')
            break
          case 7:
            cy.wrap(input).should('not.be.disabled')
            break
          default:
            break
        }
      })
    })
  })

  describe('Setting the relative date range in the URL', () => {
    beforeEach(() => {
      cy.visit(
        `/components/filters/date-range/relative-min-max-date-range?filters.relative-date-range-min-max.relative-duration=yesterday#relative-date-range-min-max-relative-range`,
      )
    })

    it('should disable relative inputs outside of the min and max bounds', () => {
      cy.get('input[id="filters.relative-date-range-min-max.relative-duration-2"]').should('not.be.checked')
    })
  })
})
