context('Catalogue component', () => {
  const path = '/components/catalogue/default'

  beforeEach(() => {
    cy.visit(path)
  })

  it('is accessible', () => {
    cy.injectAxe()
    cy.checkA11y()
  })

  describe('Catalogue filters', () => {
    it('should show the unauthorised reports', () => {
      cy.get('#total-shown').invoke('text').then(parseFloat).should('be.gt', 10)
      cy.findAllByRole('group').eq(1).contains('Show more filters').click()
      cy.findByRole('checkbox', { name: 'Show unauthorised reports' }).check()
      cy.get('#total-shown').invoke('text').then(parseFloat).should('be.gt', 10)
    })

    it('should show reports', () => {
      cy.findAllByRole('group').eq(1).contains('Show more filters').click()
      cy.findByRole('radio', { name: 'Report' }).check()

      cy.findByLabelText(/Reports catalogue.*/i).within(() => {
        cy.findAllByRole('row', {
          name: /Dashboard/,
        }).should('have.length', 0)
      })
    })

    it('should show dashboards only', () => {
      cy.findAllByRole('group').eq(1).contains('Show more filters').click()
      cy.findByRole('radio', { name: 'Dashboard' }).check()

      cy.findByLabelText(/Reports catalogue.*/i).within(() => {
        cy.findAllByRole('row', {
          name: /Report/,
        }).should('have.length', 0)
      })
    })

    it('should show show dashboards and reports', () => {
      cy.findAllByRole('group').eq(1).contains('Show more filters').click()
      cy.findByRole('radio', { name: 'All' }).check()

      cy.findByLabelText(/Reports catalogue.*/i).within(() => {
        cy.findAllByRole('row', {
          name: /Dashboard|Report/g,
        }).should('have.length.greaterThan', 0)
      })
    })

    it('should filter the reports by the key word search', () => {
      cy.findByRole('textbox', { name: 'Filter by key word' }).clear().type('Succ')
      cy.get('#total-shown').invoke('text').then(parseFloat).should('equal', 3)

      cy.findByLabelText(/Reports catalogue.*/i).within(() => {
        cy.findAllByRole('rowgroup')
          .eq(1)
          .within(() => {
            cy.findAllByRole('row').each((tr) => {
              cy.wrap(tr).contains(/Succ|succ/g)
            })
          })
      })
    })

    it('should filter the reports via the URL', () => {
      cy.visit(`${path}?dpr-reports-catalogue_search_input=Succ`)
      cy.findByRole('textbox', { name: 'Filter by key word' }).should('have.value', 'Succ')
      cy.get('#total-shown').invoke('text').then(parseFloat).should('equal', 3)

      cy.findByLabelText(/Reports catalogue.*/i).within(() => {
        cy.findAllByRole('rowgroup')
          .eq(1)
          .within(() => {
            cy.findAllByRole('row').each((tr) => {
              cy.wrap(tr).contains(/Succ|succ/g)
            })
          })
      })
    })
  })

  describe('Catalogue listing', () => {
    it('should display to relevant information for each listing', () => {
      // const rows = cy
      //   .get('#dpr-reports-catalogue > tbody > tr')
      //   .not('.dpr-report-type-hide')
      //   .not('.dpr-missing-report-hide')

      cy.findByLabelText(/Reports catalogue.*/i).within(() => {
        cy.findAllByRole('rowgroup')
          .eq(1)
          .within(() => {
            cy.findAllByRole('row').each((row) => {
              cy.wrap(row).within(() => {
                cy.findAllByRole('cell').each((cell, index) => {
                  cy.wrap(cell).within(() => {
                    switch (index) {
                      case 0:
                        cy.findByRole('paragraph').should('not.be.empty')
                        break
                      case 1:
                        cy.findAllByRole('strong').eq(0).should('not.be.empty')
                        cy.findAllByRole('strong')
                          .eq(1)
                          .contains(/Dashboard|Report|Unavailable|Unauthorised/g)
                        break
                      case 2:
                        cy.findByRole('paragraph').should('not.be.empty')
                        break
                      default:
                        break
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
