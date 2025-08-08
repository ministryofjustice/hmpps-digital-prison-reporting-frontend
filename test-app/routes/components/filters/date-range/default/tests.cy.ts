context('Inputs: date range with default values', () => {
  const path = '/components/filters/date-range/default-date-range'

  beforeEach(() => {
    cy.visit(path)
  })

  it('is accessible', () => {
    cy.injectAxe()
    cy.checkA11y()
  })

  it('should set the input values to the default value', () => {
    cy.get('input[name="filters.default-date-range.start"]').should('have.value', '01/02/2003')
    cy.get('input[name="filters.default-date-range.end"]').should('have.value', '04/05/2007')
  })

  it('should set the selected filter buttons correctly', () => {
    const selectedFilters = cy.get('#dpr-selected-filters').children()
    selectedFilters.should('have.length', 3)
    selectedFilters.each((filter, index) => {
      switch (index) {
        case 0:
          cy.wrap(filter).contains('Date-range start')
          cy.wrap(filter).contains('01/02/2003')
          break
        case 1:
          cy.wrap(filter).contains('Date-range end')
          cy.wrap(filter).contains('04/05/2007')
          break
        default:
          break
      }
    })
  })

  describe('Reseting to default values', () => {
    it('should reset the input to the default DPD values', () => {
      cy.get('input[name="filters.default-date-range.start"]').clear().type('02/05/2025')
      cy.get('input[name="filters.default-date-range.end"]').clear().type('05/07/2025').blur()

      cy.location().should((location) => {
        expect(location.search).to.contain(`filters.default-date-range.start=2025-05-02`)
        expect(location.search).to.contain(`filters.default-date-range.end=2025-07-05`)
      })

      cy.get('#dpr-selected-filters').children().should('have.length', 3)
      cy.get('#async-request-reset-filters-button').click()
      cy.location().should((location) => {
        expect(location.search).to.contain(`filters.default-date-range.start=2003-02-01`)
        expect(location.search).to.contain(`filters.default-date-range.end=2007-05-04`)
      })
      cy.get('#dpr-selected-filters').children().should('have.length', 3)
      cy.get('#dpr-selected-filters')
        .children()
        .each((filter, index) => {
          switch (index) {
            case 0:
              cy.wrap(filter).contains('Default Date-range start')
              cy.wrap(filter).contains('01/02/2003')
              break
            case 1:
              cy.wrap(filter).contains('Default Date-range end')
              cy.wrap(filter).contains('04/05/2007')
              break
            default:
              break
          }
        })
    })
  })
})
