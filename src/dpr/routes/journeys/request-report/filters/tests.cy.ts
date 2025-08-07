describe('Request a report', () => {
  const path = '/embedded/platform/dpr/request-report/report/request-examples/request-example-success/filters'
  let field1: Cypress.Chainable<JQuery<HTMLElement>>
  let field2: Cypress.Chainable<JQuery<HTMLElement>>
  let field3Start: Cypress.Chainable<JQuery<HTMLElement>>
  let field3End: Cypress.Chainable<JQuery<HTMLElement>>
  let field4: Cypress.Chainable<JQuery<HTMLElement>>
  let field5: Cypress.Chainable<JQuery<HTMLElement>>
  let field6: Cypress.Chainable<JQuery<HTMLElement>>
  let field7: Cypress.Chainable<JQuery<HTMLElement>>
  let field8: Cypress.Chainable<JQuery<HTMLElement>>

  const clearSelectedFilters = () => {
    for (let index = 0; index < 5; index += 1) {
      const selectedFilter = cy.get('#dpr-selected-filters > a:nth-child(1)')
      selectedFilter.click(1, 1)
    }
  }

  const updateFilterValues = () => {
    field2.select('value2.2')
    field3Start.type('1/2/2003')
    field3End.type('4/5/2007')
    field4.type('Inigo Montoya')
    field6.type('Value 6.1')
    field7.type('05/05/2005')
    // multiselect
    cy.get('input[id="filters.field8"]').check()
    cy.get('input[id="filters.field8-2"]').check()
    cy.get('input[id="filters.field8-3"]').check()
    cy.get('input[id="filters.field8-4"]').check()
  }

  beforeEach(() => {
    cy.visit(path)

    field1 = cy.get('select[name="filters.field2"]')
    field2 = cy.get('select[name="filters.field2"]')
    field3Start = cy.get('input[name="filters.field3.start"]')
    field3End = cy.get('input[name="filters.field3.end"]')
    field4 = cy.get('input[name="filters.field4"]')
    field5 = cy.get('input[name="filters.field5"]')
    field6 = cy.get('input[name="filters.field6"]')
    field7 = cy.get('input[name="filters.field7"]')
    field8 = cy.get('input[name="filters.field8"]')
  })

  it('is accessible', () => {
    cy.injectAxe()
    cy.checkA11y()
  })

  context('Selected filters', () => {
    it('should show the default selected filters', () => {
      const selectedFilters = cy.get('#dpr-selected-filters').children()
      selectedFilters.should('have.length', 6)
      selectedFilters.each((filter, index) => {
        switch (index) {
          case 0:
            cy.wrap(filter).contains('Field 1')
            cy.wrap(filter).contains('Value 1.2')
            break
          case 1:
            cy.wrap(filter).contains('Start date')
            cy.wrap(filter).contains('01/02/2003')
            break
          case 2:
            cy.wrap(filter).contains('End date')
            cy.wrap(filter).contains('04/05/2006')
            break
          case 3:
            cy.wrap(filter).contains('Field 7')
            cy.wrap(filter).contains('01/02/2005')
            break
          case 4:
            cy.wrap(filter).contains('Field 8')
            cy.wrap(filter).contains('Value 8.2, Value 8.3')
            break
          case 5:
            cy.wrap(filter).contains('Reset filters')
            break
          default:
            break
        }
      })
    })

    it('should remove the selected filter and reset the input', () => {
      const selectedFilters = cy.get('#dpr-selected-filters').children().should('have.length', 6)
      clearSelectedFilters()
      selectedFilters.should('have.length', 0)

      field1.each((input) => {
        cy.wrap(input).should('not.be.checked')
      })
      field2.find('option:selected').should('have.text', 'Select your option')
      field3Start.should('have.value', '')
      field3End.should('have.value', '')
      field4.should('have.value', '')
      field5.should('have.value', '')
      field6.should('have.value', '')
      field7.should('have.value', '')
      field8.each((input) => {
        cy.wrap(input).should('not.be.checked')
      })
    })

    it('should add selected filters when inputs values are updated', () => {
      clearSelectedFilters()
      cy.get('#dpr-selected-filters').children().should('have.length', 2)

      updateFilterValues()

      const selectedFilters = cy.get('#dpr-selected-filters').children()
      selectedFilters.should('have.length', 8)
      selectedFilters.each((filter, index) => {
        switch (index) {
          case 0:
            cy.wrap(filter).contains('Field 2')
            cy.wrap(filter).contains('Value 2.2')
            break
          case 1:
            cy.wrap(filter).contains('Start date')
            cy.wrap(filter).contains('01/02/2003')
            break
          case 2:
            cy.wrap(filter).contains('End date')
            cy.wrap(filter).contains('4/5/2007')
            break
          case 3:
            cy.wrap(filter).contains('Field 4')
            cy.wrap(filter).contains('Inigo Montoya')
            break
          case 4:
            cy.wrap(filter).contains('Field 6')
            cy.wrap(filter).contains('Value 6.1')
            break
          case 5:
            cy.wrap(filter).contains('Field 7')
            cy.wrap(filter).contains('05/05/2005')
            break
          case 6:
            cy.wrap(filter).contains('Field 8')
            cy.wrap(filter).contains('Value 8.1, Value 8.2, Value 8.3 + 1 more')
            break
          default:
            break
        }
      })

      cy.location().should((location) => {
        expect(location.search).to.contain(`filters.field2=value2.2`)
        expect(location.search).to.contain(`filters.field3.start=2003-02-01`)
        expect(location.search).to.contain(`filters.field3.end=2007-05-04`)
        expect(location.search).to.contain(`filters.field4=Inigo+Montoya`)
        expect(location.search).to.contain(`filters.field6=Value+6.1`)
        expect(location.search).to.contain(`filters.field7=2005-05-05`)
      })
    })

    it('should reset the filters back to their DPD defaults', () => {
      let selectedFilters = cy.get('#dpr-selected-filters').children().should('have.length', 6)
      clearSelectedFilters()
      selectedFilters.should('have.length', 0)
      cy.get('#async-request-reset-filters-button').click()
      selectedFilters = cy.get('#dpr-selected-filters').children().should('have.length', 6)
    })
  })

  context('Request query parameters', () => {
    it('should correctly set the request query parameters from DPD defaults', () => {
      cy.location().should((location) => {
        expect(location.search).to.contain(`filters.field1=value1.2`)
        expect(location.search).to.contain(`filters.field3.start=2003-02-01`)
        expect(location.search).to.contain(`filters.field3.end=2006-05-04`)
        expect(location.search).to.contain(`filters.field7=2005-02-01`)
        expect(location.search).to.contain(`filters.field8=value8.2&filters.field8=value8.3`)
      })

      clearSelectedFilters()
      updateFilterValues()

      cy.location().should((location) => {
        expect(location.search).to.contain(`filters.field2=value2.2`)
        expect(location.search).to.contain(`filters.field3.start=2003-02-01`)
        expect(location.search).to.contain(`filters.field3.end=2007-05-04`)
        expect(location.search).to.contain(`filters.field4=Inigo+Montoya`)
        expect(location.search).to.contain(`filters.field6=Value+6.1`)
        expect(location.search).to.contain(`filters.field7=2005-05-05`)
        expect(location.search).to.contain(
          `filters.field8=value8.1&filters.field8=value8.2&filters.field8=value8.3&filters.field8=value8.4`,
        )
      })
    })

    it('should correctly set the request query parameters when inputs are updated', () => {
      clearSelectedFilters()
      updateFilterValues()

      cy.location().should((location) => {
        expect(location.search).to.contain(`filters.field2=value2.2`)
        expect(location.search).to.contain(`filters.field3.start=2003-02-01`)
        expect(location.search).to.contain(`filters.field3.end=2007-05-04`)
        expect(location.search).to.contain(`filters.field4=Inigo+Montoya`)
        expect(location.search).to.contain(`filters.field6=Value+6.1`)
        expect(location.search).to.contain(`filters.field7=2005-05-05`)
        expect(location.search).to.contain(
          `filters.field8=value8.1&filters.field8=value8.2&filters.field8=value8.3&filters.field8=value8.4`,
        )
      })
    })
  })

  context('User defined defaults', () => {
    it('should save the user defined defaults', () => {
      clearSelectedFilters()
      updateFilterValues()

      cy.get(`#dpr-save-user-defaults`).click()

      cy.location().should((location) => {
        expect(location.search).to.contain('defaultsSaved=true')
      })

      cy.get(`#dpr-save-user-defaults`).contains('Update defaults')
      cy.get('#dpr-remove-user-defaults').should('exist')
    })

    it('should pre-fill the filter values with the saved defaults next visit', () => {
      cy.location().should((location) => {
        expect(location.search).to.contain(`filters.field2=value2.2`)
        expect(location.search).to.contain(`filters.field3.start=2003-02-01`)
        expect(location.search).to.contain(`filters.field3.end=2007-05-04`)
        expect(location.search).to.contain(`filters.field4=Inigo+Montoya`)
        expect(location.search).to.contain(`filters.field6=Value+6.1`)
        expect(location.search).to.contain(`filters.field7=2005-05-05`)
        expect(location.search).not.to.contain(`defaultsSaved=true`)
        expect(location.search).to.contain(
          `filters.field8=value8.1&filters.field8=value8.2&filters.field8=value8.3&filters.field8=value8.4`,
        )
      })

      cy.get(`#dpr-save-user-defaults`).contains('Update defaults')
      cy.get('#dpr-remove-user-defaults').should('exist')
    })

    it('should update the saved defaults', () => {
      cy.get('#dpr-selected-filters > a:nth-child(2)').click(1, 1)
      cy.get('#dpr-selected-filters > a:nth-child(2)').click(1, 1)
      cy.get('#dpr-selected-filters > a:nth-child(2)').click(1, 1)
      cy.get('input[id="filters.field8-2"]').uncheck()
      cy.get('input[id="filters.field8-3"]').uncheck()
      field2.select('value2.3')

      cy.get(`#dpr-save-user-defaults`).click()

      const selectedFilters = cy.get('#dpr-selected-filters').children()
      selectedFilters.should('have.length', 5)

      cy.get('#dpr-selected-filters > a:nth-child(4)').contains('Field 8')
      cy.get('#dpr-selected-filters > a:nth-child(4)').contains('Value 8.1, Value 8.4')

      cy.location().should((location) => {
        expect(location.search).to.contain(`filters.field2=value2.3`)
        expect(location.search).not.to.contain(`filters.field3.start=2003-02-01`)
        expect(location.search).not.to.contain(`filters.field3.end=2007-05-04`)
        expect(location.search).to.contain(`filters.field6=Value+6.1`)
        expect(location.search).to.contain(`filters.field7=2005-05-05`)
        expect(location.search).to.contain(`defaultsSaved=true`)
        expect(location.search).not.to.contain(`filters.field4=Inigo+Montoya`)
        expect(location.search).not.to.contain(
          `filters.field8=value8.1&filters.field8=value8.2&filters.field8=value8.3&filters.field8=value8.4`,
        )
        expect(location.search).to.contain(`&filters.field8=value8.1&filters.field8=value8.4`)
      })

      cy.reload()

      cy.location().should((location) => {
        expect(location.search).to.contain(`filters.field2=value2.3`)
        expect(location.search).to.contain(`filters.field3.start=2003-02-01`)
        expect(location.search).to.contain(`filters.field3.end=2007-05-04`)
        expect(location.search).to.contain(`filters.field6=Value+6.1`)
        expect(location.search).to.contain(`filters.field7=2005-05-05`)
        expect(location.search).to.contain(`defaultsSaved=true`)
        expect(location.search).not.to.contain(`filters.field4=Inigo+Montoya`)
        expect(location.search).not.to.contain(
          `filters.field8=value8.1&filters.field8=value8.2&filters.field8=value8.3&filters.field8=value8.4`,
        )
        expect(location.search).to.contain(`&filters.field8=value8.1&filters.field8=value8.4`)
      })
    })

    it('should reset the defaults back to the user saved defaults', () => {
      cy.get('#dpr-selected-filters > a:nth-child(2)').click(1, 1)
      cy.get('#dpr-selected-filters > a:nth-child(2)').click(1, 1)
      cy.get('#dpr-selected-filters > a:nth-child(2)').click(1, 1)

      let selectedFilters = cy.get('#dpr-selected-filters').children()
      selectedFilters.should('have.length', 2)

      cy.get('#async-request-reset-filters-button').click()

      selectedFilters = cy.get('#dpr-selected-filters').children()
      selectedFilters.should('have.length', 5)
    })

    it('should remove the save defaults', () => {
      cy.get(`#dpr-remove-user-defaults`).click()

      cy.location().should((location) => {
        expect(location.search).to.contain(`filters.field1=value1.2`)
        expect(location.search).to.contain(`filters.field3.start=2003-02-01`)
        expect(location.search).to.contain(`filters.field3.end=2006-05-04`)
        expect(location.search).to.contain(`filters.field7=2005-02-01`)
        expect(location.search).to.contain(`filters.field8=value8.2&filters.field8=value8.3`)
      })
    })
  })
})
