context('Catalogue component', () => {
  const path = '/components/catalogue/configured'

  beforeEach(() => {
    cy.visit(path)
  })

  it('is accessible', () => {
    cy.injectAxe()
    cy.checkA11y()
  })

  describe('Configuration testing', () => {
    it('should not show the help text', () => {
      cy.findAllByRole('group').contains('How to use').should('not.exist')
    })

    it('should not show the checkbox filters', () => {
      cy.findAllByRole('group').contains('Show more filters').click()
      cy.findByRole('checkbox', { name: 'Show unauthorised reports' }).should('not.exist')
    })

    it('should not show the bookmark toggle', () => {
      const rows = cy
        .get('#dpr-reports-catalogue > tbody > tr')
        .not('.dpr-report-type-hide')
        .not('.dpr-missing-report-hide')

      rows.each((row) => {
        cy.wrap(row).find('td:nth-child(4) > div.dpr-bookmark-label').should('not.exist')
      })

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
