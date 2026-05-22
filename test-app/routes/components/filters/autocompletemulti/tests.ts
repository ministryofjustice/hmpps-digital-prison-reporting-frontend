import { checkA11y, executeReportStubs, stubDefinitionsTasks } from '../../../../../cypress-tests/cypressUtils'

context('Filters: Autocomplete', () => {
  const path = '/components/filters/autocompletemulti'

  const getCheckbox = (label: string) => cy.findByRole('checkbox', { name: new RegExp(`^${label}$`, 'i') })

  before(() => {
    stubDefinitionsTasks()
  })

  beforeEach(() => {
    cy.visit(path)
  })

  it('is accessible', () => {
    checkA11y()
  })

  describe('Setting a values', () => {
    it('should show options when the input value is greater than 3', () => {
      //
    })

    it('should not show options when the input value is greater than 3', () => {
      //
    })

    it('should show correct options when matches are found', () => {
      //
    })

    it('should show no options when no matches are found', () => {
      //
    })

    it('should set the input values via the checkboxes', () => {
      cy.findByRole('checkbox', { name: 'Value 8.2' }).check()
      cy.findByRole('checkbox', { name: 'Value 8.4' }).check()

      cy.findByLabelText(/Selected filters.*/i).within(() => {
        cy.findAllByRole('button').eq(0).contains('Multiselect')
        cy.findAllByRole('button').eq(0).contains('Value 8.2, Value 8.4')
      })

      cy.location().should((location) => {
        expect(location.search).to.contain('filters.multiselect=value8.2')
        expect(location.search).to.contain('filters.multiselect=value8.4')
      })
    })

    it('should keep selected options visible', () => {
      //
    })

    it('should truncate the selected values when more than 3 checkboxes selected', () => {
      cy.findByRole('checkbox', { name: 'Value 8.1' }).check()
      cy.findByRole('checkbox', { name: 'Value 8.2' }).check()
      cy.findByRole('checkbox', { name: 'Value 8.3' }).check()
      cy.findByRole('checkbox', { name: 'Value 8.4' }).check()

      cy.findByLabelText(/Selected filters.*/i).within(() => {
        cy.findAllByRole('button').eq(0).contains('Multiselect')
        cy.findAllByRole('button').eq(0).contains('Value 8.1, Value 8.2, Value 8.3 + 1 more')
      })
    })

    it('should uncheck the values when the selected filter button is clicked', () => {
      cy.findByRole('checkbox', { name: 'Value 8.1' }).check()
      cy.findByRole('checkbox', { name: 'Value 8.2' }).check()
      cy.findByRole('checkbox', { name: 'Value 8.3' }).check()
      cy.findByRole('checkbox', { name: 'Value 8.4' }).check()

      cy.findByLabelText(/Selected filters.*/i).within(() => {
        cy.findAllByRole('button').eq(0).click()
      })
      cy.findByRole('checkbox', { name: 'Value 8.1' }).should('not.be.checked')
      cy.findByRole('checkbox', { name: 'Value 8.2' }).should('not.be.checked')
      cy.findByRole('checkbox', { name: 'Value 8.3' }).should('not.be.checked')
      cy.findByRole('checkbox', { name: 'Value 8.4' }).should('not.be.checked')
    })
  })

  describe('Request', () => {
    before(() => {
      executeReportStubs()
    })
  })
})
