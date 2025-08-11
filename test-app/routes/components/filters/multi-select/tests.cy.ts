context('Inputs: multiselect', () => {
  const path = '/components/filters/multi-select'

  beforeEach(() => {
    cy.visit(path)
  })

  it('is accessible', () => {
    cy.injectAxe()
    cy.checkA11y()
  })

  describe('Setting values', () => {
    it('should set the input values via the checkboxes', () => {
      cy.get('#filters\\.multiselect-2').check()
      cy.get('#filters\\.multiselect-4').check()

      cy.get('#dpr-selected-filters').eq(0).contains('Multiselect')
      cy.get('#dpr-selected-filters').eq(0).contains('Value 8.2, Value 8.4')

      cy.location().should((location) => {
        expect(location.search).to.contain('filters.multiselect=value8.2')
        expect(location.search).to.contain('filters.multiselect=value8.4')
      })
    })

    it('should truncate the selected values when more than 3 checkboxes selected', () => {
      cy.get('#filters\\.multiselect').check()
      cy.get('#filters\\.multiselect-2').check()
      cy.get('#filters\\.multiselect-3').check()
      cy.get('#filters\\.multiselect-4').check()

      cy.get('#dpr-selected-filters').eq(0).contains('Multiselect')
      cy.get('#dpr-selected-filters').eq(0).contains('Value 8.1, Value 8.2, Value 8.3 + 1 more')
    })

    it('should uncheck the values when the selected filter button is clicked', () => {
      cy.get('#dpr-selected-filters').eq(0).click()
      cy.get('input[name="filters.multiselect"]').each((input) => {
        cy.wrap(input).should('not.be.checked')
      })
    })

    it('should set the values via the URL', () => {
      const search = `?filters.multiselect=value8.2&filters.multiselect=value8.3&filters.multiselect=value8.4&filters.multiselect-long=value2.2`
      cy.visit(`${path}${search}`)
      cy.get('#filters\\.multiselect-2').should('be.checked')
      cy.get('#filters\\.multiselect-3').should('be.checked')
      cy.get('#filters\\.multiselect-4').should('be.checked')
      cy.get('#filters\\.multiselect-long-2').should('be.checked')
    })
  })

  describe('Validation', () => {
    it('should show the validation message when no value is provided', () => {
      cy.get('#async-request-report-button').click()
      cy.get('#filters\\.multiselect-error').contains('Multiselect is required')
      cy.get('p.govuk-error-message').eq(0).contains('Multiselect is required')
      cy.get('#query-error-summary').should('be.visible')
    })
  })
})
