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
      cy.findByRole('combobox').type('Pri')
      cy.findByRole('listbox', { name: 'Autocomplete options' }).within(() => {
        cy.findAllByRole('button').should('have.length', 2)
      })
    })

    it('should not show options when the input value is greater than 3', () => {
      cy.findByRole('combobox').type('In')
      cy.findByRole('listbox', { name: 'Autocomplete options' }).within(() => {
        cy.findAllByRole('button').should('have.length', 0)
      })
    })

    it('should set the value from the autocomplete options', () => {
      cy.findByRole('combobox').type('Ini')
      cy.findByRole('listbox', { name: 'Autocomplete options' }).within(() => {
        cy.findByRole('button', { name: /Inigo/ }).click()
      })
      cy.findByRole('combobox').should('have.value', 'Inigo Montoya')
    })

    it('should set the value in the selected filters', () => {
      cy.findByRole('combobox').type('Ini')
      cy.findByRole('button', { name: /Inigo/ }).click()
      cy.findByLabelText(/Selected filters.*/i).within(() => {
        cy.findAllByRole('link').eq(0).contains('Autocomplete')
        cy.findAllByRole('link').eq(0).contains('Inigo Montoya')
      })
    })

    it('should set the value in the url', () => {
      cy.findByRole('combobox').type('Ini')
      cy.findByRole('button', { name: /Inigo/ }).click()
      cy.location().should((location) => {
        expect(location.search).to.contain(`filters.autocomplete=Inigo+Montoya`)
      })
    })
  })

  describe('Validation', () => {
    it('should show the validation message when no value is provided', () => {
      cy.findByRole('alert').should('not.exist')
      cy.findAllByRole('paragraph').contains('Autocomplete is required').should('not.exist')
      cy.findByRole('combobox').clear()
      cy.findByRole('button', { name: /Request/ }).click()
      cy.findByRole('alert').should('exist')
      cy.findAllByRole('paragraph').contains('Autocomplete is required').should('exist')
    })
  })

  describe('Request', () => {
    it('should set the display value when setting the value from the URL', () => {
      cy.visit(
        '/embedded/platform/dpr/request-report/report/filter-inputs/establishmentAutocomplete/filters?filters.establishment=KMI',
      )
      cy.findByRole('combobox').should('have.value', 'KIRKHAM (HMP)')
      cy.findByLabelText(/Selected filters.*/i).within(() => {
        cy.findAllByRole('link').eq(0).contains('Autocomplete')
        cy.findAllByRole('link').eq(0).contains('KIRKHAM (HMP)')
      })

      cy.visit(
        '/embedded/platform/dpr/request-report/report/filter-inputs/establishmentAutocomplete/filters?filters.establishment=MDI',
      )
      cy.findByRole('combobox').should('have.value', 'Moorland (HMP & YOI)')
      cy.findByLabelText(/Selected filters.*/i).within(() => {
        cy.findAllByRole('link').eq(0).contains('Autocomplete')
        cy.findAllByRole('link').eq(0).contains('Moorland (HMP & YOI)')
      })
    })
  })
})
