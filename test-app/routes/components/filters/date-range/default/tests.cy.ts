import { checkA11y, stubDefinitionsTasks } from 'cypress-tests/cypressUtils'

context('Inputs: date range with default values', () => {
  const path = '/components/filters/date-range/default-date-range'

  before(() => {
    stubDefinitionsTasks()
  })

  beforeEach(() => {
    cy.visit(path)
  })

  it('is accessible', () => {
    checkA11y()
  })

  it('should set the input values to the default value', () => {
    cy.findByRole('textbox', { name: 'From' }).should('have.value', '01/02/2003')
    cy.findByRole('textbox', { name: 'To' }).should('have.value', '04/05/2007')
  })

  it('should set the selected filter buttons correctly', () => {
    cy.findByLabelText(/Selected filters.*/i).within(() => {
      cy.findAllByRole('button')
        .should('have.length', 1)
        .each((filter, index) => {
          switch (index) {
            case 0:
              cy.wrap(filter).contains('Default Date-range')
              cy.wrap(filter).contains('01/02/2003 - 04/05/2007')
              break
            default:
              break
          }
        })
    })
  })
})
