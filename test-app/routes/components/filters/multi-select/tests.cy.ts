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
      cy.findByRole('checkbox', { name: 'Value 8.2' }).check()
      cy.findByRole('checkbox', { name: 'Value 8.4' }).check()

      cy.findByLabelText(/Selected filters.*/i).within(() => {
        cy.findAllByRole('link').eq(0).contains('Multiselect')
        cy.findAllByRole('link').eq(0).contains('Value 8.2, Value 8.4')
      })

      cy.location().should((location) => {
        expect(location.search).to.contain('filters.multiselect=value8.2')
        expect(location.search).to.contain('filters.multiselect=value8.4')
      })
    })

    it('should truncate the selected values when more than 3 checkboxes selected', () => {
      cy.findByRole('checkbox', { name: 'Value 8.1' }).check()
      cy.findByRole('checkbox', { name: 'Value 8.2' }).check()
      cy.findByRole('checkbox', { name: 'Value 8.3' }).check()
      cy.findByRole('checkbox', { name: 'Value 8.4' }).check()

      cy.findByLabelText(/Selected filters.*/i).within(() => {
        cy.findAllByRole('link').eq(0).contains('Multiselect')
        cy.findAllByRole('link').eq(0).contains('Value 8.1, Value 8.2, Value 8.3 + 1 more')
      })
    })

    it('should uncheck the values when the selected filter button is clicked', () => {
      cy.findByLabelText(/Selected filters.*/i).within(() => {
        cy.findAllByRole('link').eq(0).click()
      })
      cy.findByRole('checkbox', { name: 'Value 8.1' }).should('not.be.checked')
      cy.findByRole('checkbox', { name: 'Value 8.2' }).should('not.be.checked')
      cy.findByRole('checkbox', { name: 'Value 8.3' }).should('not.be.checked')
      cy.findByRole('checkbox', { name: 'Value 8.4' }).should('not.be.checked')
    })

    it('should set the values via the URL', () => {
      const search = `?filters.multiselect=value8.2&filters.multiselect=value8.3&filters.multiselect=value8.4&filters.multiselect-long=value2.2`
      cy.visit(`${path}${search}`)

      cy.findByRole('checkbox', { name: 'Value 8.1' }).should('not.be.checked')
      cy.findByRole('checkbox', { name: 'Value 8.2' }).should('be.checked')
      cy.findByRole('checkbox', { name: 'Value 8.3' }).should('be.checked')
      cy.findByRole('checkbox', { name: 'Value 8.4' }).should('be.checked')
      cy.findByRole('checkbox', { name: 'Value 2.2' }).should('be.checked')
    })
  })

  describe('Validation', () => {
    it('should show the validation message when no value is provided', () => {
      cy.findByRole('button', { name: /Request/ }).click()
      cy.findByRole('heading', { name: 'There is a problem' }).should('be.visible')
    })
  })
})
