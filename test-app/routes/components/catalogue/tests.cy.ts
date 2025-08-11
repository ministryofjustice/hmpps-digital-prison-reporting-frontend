context('Catalogue component', () => {
  const path = '/components/catalogue'

  beforeEach(() => {
    cy.visit(path)
  })

  it('is accessible', () => {
    cy.injectAxe()
    cy.checkA11y()
  })

  describe('Catalogue filters', () => {
    it('should hide the live reports', () => {
      cy.get('#total-shown').invoke('text').then(parseFloat).should('be.gt', 10)
      cy.get(
        '#reports-catalogue > div.dpr-catalogue-filters > div.dpr-catalogue-filters--content > div > details > summary',
      ).click()

      cy.get('#hide-live').check()
      cy.get('#total-shown').invoke('text').then(parseFloat).should('equal', 0)
    })

    it('should show the unauthorised reports', () => {
      cy.get('#total-shown').invoke('text').then(parseFloat).should('be.gt', 10)
      cy.get(
        '#reports-catalogue > div.dpr-catalogue-filters > div.dpr-catalogue-filters--content > div > details > summary',
      ).click()

      cy.get('#hide-live').check()
      cy.get('#show-unauthorised').check()
      cy.get('#total-shown').invoke('text').then(parseFloat).should('equal', 0)
    })

    it('should show the missing reports', () => {
      cy.get('#total-shown').invoke('text').then(parseFloat).should('be.gt', 10)
      cy.get(
        '#reports-catalogue > div.dpr-catalogue-filters > div.dpr-catalogue-filters--content > div > details > summary',
      ).click()

      cy.get('#show-missing').check()
      cy.get('#hide-live').check()
      cy.get('#total-shown').invoke('text').then(parseFloat).should('equal', 3)
      cy.get('#dpr-reports-catalogue > tbody > tr')
        .not('.dpr-live-report-hide')
        .each((tr) => {
          cy.wrap(tr).contains('Unavailable')
        })
    })

    it('should show reports', () => {
      cy.get(
        '#reports-catalogue > div.dpr-catalogue-filters > div.dpr-catalogue-filters--content > div > details > summary',
      ).click()
      cy.get('#report-type-2').check()
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
      cy.get(
        '#reports-catalogue > div.dpr-catalogue-filters > div.dpr-catalogue-filters--content > div > details > summary',
      ).click()
      cy.get('#report-type-3').check()

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
      cy.get(
        '#reports-catalogue > div.dpr-catalogue-filters > div.dpr-catalogue-filters--content > div > details > summary',
      ).click()
      cy.get('#report-type').check()

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
      cy.get('#dpr-reports-catalogue_search_input').clear().type('Succ')
      cy.get('#total-shown').invoke('text').then(parseFloat).should('equal', 3)
      cy.get('#dpr-reports-catalogue > tbody > tr')
        .not('.dpr-search-option-hide')
        .each((tr) => {
          cy.wrap(tr).contains(/Succ|succ/g)
        })
    })

    it('should filter the reports via the URL', () => {
      cy.visit(`${path}?dpr-reports-catalogue_search_input=Succ`)
      cy.get('#dpr-reports-catalogue_search_input').should('have.value', 'Succ')
      cy.get('#total-shown').invoke('text').then(parseFloat).should('equal', 3)
      cy.get('#dpr-reports-catalogue > tbody > tr')
        .not('.dpr-search-option-hide')
        .each((tr) => {
          cy.wrap(tr).contains(/Succ|succ/g)
        })
    })
  })
})
