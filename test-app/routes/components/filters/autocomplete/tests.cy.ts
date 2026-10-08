import {
  assertAutocompleteOptionCount,
  checkA11y,
  executeReportStubs,
  selectAutocompleteOption,
  selectAutocompleteOptionUsingKeyboard,
  stubDefinitionsTasks,
} from '../../../../../cypress-tests/cypressUtils'

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
      assertAutocompleteOptionCount({ name: 'Autocomplete', searchText: 'Pri', expectedCount: 2 })
    })

    it('should not show options when the input value is greater than 3', () => {
      assertAutocompleteOptionCount({ name: 'Autocomplete', searchText: 'In', expectedCount: 0 })
    })

    it('should set the value from the autocomplete options', () => {
      selectAutocompleteOption({ name: 'Autocomplete', searchText: 'Ini', optionText: 'Inigo Montoya' })
    })

    it('should set the value in the selected filters', () => {
      selectAutocompleteOption({ name: 'Autocomplete', searchText: 'Ini', optionText: 'Inigo Montoya' })
      cy.findByLabelText(/Selected filters.*/i).within(() => {
        cy.findAllByRole('button').eq(0).contains('Autocomplete')
        cy.findAllByRole('button').eq(0).contains('Inigo Montoya')
      })
    })

    it('should set the value in the url', () => {
      selectAutocompleteOption({ name: 'Autocomplete', searchText: 'Ini', optionText: 'Inigo Montoya' })
      cy.location().should(location => {
        expect(location.search).to.contain(`filters.autocomplete=Inigo+Montoya`)
      })
    })
  })

  describe('Setting a value via the keyboard', () => {
    it('should set the value from the autocomplete options', () => {
      selectAutocompleteOptionUsingKeyboard({ name: 'Autocomplete', searchText: 'Ini', optionText: 'Inigo Montoya' })
    })

    it('should set the value in the selected filters', () => {
      selectAutocompleteOptionUsingKeyboard({ name: 'Autocomplete', searchText: 'Ini', optionText: 'Inigo Montoya' })
      cy.findByLabelText(/Selected filters.*/i).within(() => {
        cy.findAllByRole('button').eq(0).contains('Autocomplete')
        cy.findAllByRole('button').eq(0).contains('Inigo Montoya')
      })
    })

    it('should set the value in the url', () => {
      selectAutocompleteOptionUsingKeyboard({ name: 'Autocomplete', searchText: 'Ini', optionText: 'Inigo Montoya' })
      cy.location().should(location => {
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
