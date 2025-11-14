import { checkA11y } from '../../../../../cypress-tests/cypressUtils'

context('Catalogue component', () => {
  const path = '/components/catalogue/configured'

  beforeEach(() => {
    cy.task('resetStubs')
    cy.task('resetRedis')
    cy.task('stubDefinitions')
    cy.task('stubSingleSummaries')
    cy.task('stubGetProductCollections')
    cy.visit(path)
  })

  describe('Configuration testing', () => {
    it('should not show the help text', () => {
      checkA11y()
      cy.findAllByRole('group').contains('How to use').should('not.exist')
    })

    it('should not show the checkbox filters', () => {
      cy.findAllByRole('group').contains('Show more filters').click()
      cy.findByRole('checkbox', { name: 'Show unauthorised reports' }).should('not.exist')
    })

    it('should not show the bookmark toggle', () => {
      cy.findByLabelText(/Reports catalogue.*/i).within(() => {
        cy.findAllByRole('rowgroup')
          .eq(1)
          .within(() => {
            cy.findAllByRole('row').each((row) => {
              cy.wrap(row).within(() => {
                cy.findAllByRole('cell').each((cell, index) => {
                  cy.wrap(cell).within(() => {
                    if (index === 3) {
                      cy.findByRole('checkbox', { name: 'Add bookmark' }).should('not.exist')
                    }
                  })
                })
              })
            })
          })
      })
    })
  })
})
