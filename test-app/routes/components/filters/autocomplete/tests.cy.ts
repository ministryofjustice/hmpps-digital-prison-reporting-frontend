import { checkA11y, executeReportStubs, stubDefinitionsTasks } from '../../../../../cypress-tests/cypressUtils'

context('Filters: Autocomplete', () => {
  const path = '/components/filters/autocomplete'

  before(() => {
    stubDefinitionsTasks()
  })

  beforeEach(() => {
    cy.visit(path)
  })

  it('is accessible', () => {
    checkA11y()
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
        cy.findAllByRole('button').eq(0).contains('Autocomplete')
        cy.findAllByRole('button').eq(0).contains('Inigo Montoya')
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

  describe('Request', () => {
    before(() => {
      executeReportStubs()
      cy.task('stubDefinitionAutocomplete')
    })

    it('should set the display value when setting the value from the URL', () => {
      cy.visit(
        '/embedded/platform/dpr/request-report/report/filter-inputs/establishmentAutocomplete/filters?filters.establishment=ABC',
      )
      cy.findByRole('combobox').should('have.value', 'Est one')
      cy.findByLabelText(/Selected filters.*/i).within(() => {
        cy.findAllByRole('button').eq(0).contains('Establishment')
        cy.findAllByRole('button').eq(0).contains('Est one')
      })

      cy.visit(
        '/embedded/platform/dpr/request-report/report/filter-inputs/establishmentAutocomplete/filters?filters.establishment=DEF',
      )
      cy.findByRole('combobox').should('have.value', 'Est two')
      cy.findByLabelText(/Selected filters.*/i).within(() => {
        cy.findAllByRole('button').eq(0).contains('Establishment')
        cy.findAllByRole('button').eq(0).contains('Est two')
      })
    })
  })
})
