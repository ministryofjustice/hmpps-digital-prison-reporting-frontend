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
      cy.findByRole('group').contains('Show more filters').click()
      cy.get('#hide-live').check()

      cy.findByRole('checkbox', { name: 'Show unauthorised reports' }).check()
      cy.get('#show-unauthorised').check()
      cy.get('#total-shown').invoke('text').then(parseFloat).should('equal', 0)
    })

    it('should show reports', () => {
      cy.findByRole('group').contains('Show more filters').click()
      cy.findByRole('radio', { name: 'Report' }).check()
      const rows = cy.get('#dpr-reports-catalogue > tbody > tr').not('.dpr-report-type-hide')
      rows.each((row) => {
        cy.wrap(row)
          .find('td:nth-child(2) > div > strong')
          .each((tag) => {
            cy.wrap(tag).contains('Report')
            cy.wrap(tag).contains('Dashboard').should('not.exist')
          })
      })
    })

    it('should show dashboards only', () => {
      cy.findByRole('group').contains('Show more filters').click()
      cy.findByRole('radio', { name: 'Dashboard' }).check()

      const rows = cy.get('#dpr-reports-catalogue > tbody > tr').not('.dpr-report-type-hide')
      rows.each((row) => {
        cy.wrap(row)
          .find('td:nth-child(2) > div > strong')
          .each((tag) => {
            cy.wrap(tag).contains('Report').should('not.exist')
            cy.wrap(tag).contains('Dashboard')
          })
      })
    })

    it('should show show dashboards and reports', () => {
      cy.findByRole('group').contains('Show more filters').click()
      cy.findByRole('radio', { name: 'All' }).check()

      const rows = cy
        .get('#dpr-reports-catalogue > tbody > tr')
        .not('.dpr-report-type-hide')
        .not('.dpr-missing-report-hide')
      rows.each((row) => {
        cy.wrap(row)
          .find('td:nth-child(2) > div > strong')
          .each((tag) => {
            cy.wrap(tag).contains(/Dashboard|Report/g)
          })
      })
    })

    it('should filter the reports by the key word search', () => {
      cy.findByRole('textbox', { name: 'Filter by key word' }).clear().type('Succ')
      cy.get('#total-shown').invoke('text').then(parseFloat).should('equal', 3)
      cy.get('#dpr-reports-catalogue > tbody > tr')
        .not('.dpr-search-option-hide')
        .each((tr) => {
          cy.wrap(tr).contains(/Succ|succ/g)
        })
    })

    it('should filter the reports via the URL', () => {
      cy.visit(`${path}?dpr-reports-catalogue_search_input=Succ`)
      cy.findByRole('textbox', { name: 'Filter by key word' }).should('have.value', 'Succ')
      cy.get('#total-shown').invoke('text').then(parseFloat).should('equal', 3)
      cy.get('#dpr-reports-catalogue > tbody > tr')
        .not('.dpr-search-option-hide')
        .each((tr) => {
          cy.wrap(tr).contains(/Succ|succ/g)
        })
    })
  })

  describe('Catalogue listing', () => {
    it('should display to relevant information for each listing', () => {
      const rows = cy
        .get('#dpr-reports-catalogue > tbody > tr')
        .not('.dpr-report-type-hide')
        .not('.dpr-missing-report-hide')

      rows.each((row) => {
        // Product name
        cy.wrap(row)
          .find('td:nth-child(1) > p')
          .each((productName) => {
            cy.wrap(productName).should('not.be.empty')
          })
        // variantName
        cy.wrap(row)
          .find('td:nth-child(2) > div > p > strong')
          .each((variantName) => {
            cy.wrap(variantName).should('not.be.empty')
          })
        // Type
        cy.wrap(row)
          .find('td:nth-child(2) > div > strong.govuk-tag')
          .each((tag) => {
            cy.wrap(tag).contains(/Dashboard|Report|Unavailable|Unauthorised/g)
          })
        // description
        cy.wrap(row)
          .find('td:nth-child(3)> .dpr-show-more > .dpr-show-more-content')
          .each((description) => {
            cy.wrap(description).should('not.be.empty')
          })
      })
    })
  })
})
