context('Filters: Autocomplete', () => {
  const path = '/components/filters/autocomplete'

  beforeEach(() => {
    cy.visit(path)
  })

  it('is accessible', () => {
    cy.injectAxe()
    cy.checkA11y()
  })

  describe('Setting a value', () => {
    it('should show options when the input value is greater than 3', () => {
      cy.get('input[id="filters.autocomplete"]').type('Pri')
      cy.get('#filtersautocomplete-list').find('li:visible').should('have.length', 2)
    })

    it('should not show options when the input value is greater than 3', () => {
      cy.get('input[id="filters.autocomplete"]').type('In')
      cy.get('#filtersautocomplete-list').find('li:visible').should('have.length', 0)
    })

    it('should set the value from the autocomplete options', () => {
      cy.get('input[id="filters.autocomplete"]').type('Ini')
      cy.get('#filtersautocomplete-list > ul > li:nth-child(2) > button').click()
      cy.get('input[id="filters.autocomplete"]').should('have.value', 'Inigo Montoya')
    })

    it('should set the value in the selected filters', () => {
      cy.get('input[id="filters.autocomplete"]').type('Ini')
      cy.get('#filtersautocomplete-list > ul > li:nth-child(2) > button').click()
      cy.get('#dpr-selected-filters').eq(0).contains('Autocomplete')
      cy.get('#dpr-selected-filters').eq(0).contains('Inigo Montoya')
    })

    it('should set the value in the url', () => {
      cy.get('input[id="filters.autocomplete"]').type('Ini')
      cy.get('#filtersautocomplete-list > ul > li:nth-child(2) > button').click()
      cy.location().should((location) => {
        expect(location.search).to.contain(`filters.autocomplete=Inigo+Montoya`)
      })
    })
  })

  describe('Validation', () => {
    it('should show the validation message when no value is provided', () => {
      cy.get('input[id="filters.autocomplete"]').clear()
      cy.get('#async-request-report-button').click()
      cy.get('#filters\\.autocomplete-error').contains('Autocomplete is required')
      cy.get('p.govuk-error-message').eq(0).contains('Autocomplete is required')
      cy.get('#query-error-summary').should('be.visible')
    })
  })
})
