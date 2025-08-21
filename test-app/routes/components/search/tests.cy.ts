context('Search component', () => {
  const path = '/components/search'

  beforeEach(() => {
    cy.visit(path)
  })

  it('is accessible', () => {
    cy.visit(path)
    cy.injectAxe()
    cy.checkA11y()
  })

  it('should filter the reports by the key word search', () => {
    cy.findAllByRole('paragraph')
      .contains(/Showing \d{1,4} of \d{1,4} reports/)
      .within(() => {
        cy.findAllByRole('strong').eq(0).invoke('text').then(parseFloat).should('equal', 6)
        cy.findAllByRole('strong').eq(1).invoke('text').then(parseFloat).should('equal', 6)
      })

    cy.findAllByRole('rowgroup')
      .eq(1)
      .within(() => {
        cy.findAllByRole('row').should('have.length', 6)
      })

    cy.findByRole('textbox', { name: 'Filter by key word' }).clear().type('one')
    cy.findAllByRole('paragraph')
      .contains(/Showing \d{1,4} of \d{1,4} reports/)
      .within(() => {
        cy.findAllByRole('strong').eq(0).invoke('text').then(parseFloat).should('equal', 2)
        cy.findAllByRole('strong').eq(1).invoke('text').then(parseFloat).should('equal', 6)
      })

    cy.findAllByRole('rowgroup')
      .eq(1)
      .within(() => {
        cy.findAllByRole('row').should('have.length', 2)
      })

    cy.findAllByRole('rowgroup')
      .eq(1)
      .within(() => {
        cy.findAllByRole('row').each((tr) => {
          cy.wrap(tr).contains(/one/g)
        })
      })
  })

  it('should filter the reports via the URL', () => {
    cy.visit(`${path}?dpr-search-table_search_input=one`)
    cy.findByRole('textbox', { name: 'Filter by key word' }).should('have.value', 'one')
    cy.findAllByRole('paragraph')
      .contains(/Showing \d{1,4} of \d{1,4} reports/)
      .within(() => {
        cy.findAllByRole('strong').eq(0).invoke('text').then(parseFloat).should('equal', 2)
        cy.findAllByRole('strong').eq(1).invoke('text').then(parseFloat).should('equal', 6)
      })

    cy.findAllByRole('rowgroup')
      .eq(1)
      .within(() => {
        cy.findAllByRole('row').should('have.length', 2)
      })

    cy.findAllByRole('rowgroup')
      .eq(1)
      .within(() => {
        cy.findAllByRole('row').each((tr) => {
          cy.wrap(tr).contains(/one/g)
        })
      })
  })

  it('should show all listings when input is blank', () => {
    cy.visit(`${path}?dpr-search-table_search_input=one`)
    cy.findByRole('textbox', { name: 'Filter by key word' }).should('have.value', 'one')
    cy.findAllByRole('paragraph')
      .contains(/Showing \d{1,4} of \d{1,4} reports/)
      .within(() => {
        cy.findAllByRole('strong').eq(0).invoke('text').then(parseFloat).should('equal', 2)
        cy.findAllByRole('strong').eq(1).invoke('text').then(parseFloat).should('equal', 6)
      })
    cy.findAllByRole('rowgroup')
      .eq(1)
      .within(() => {
        cy.findAllByRole('row').should('have.length', 2)
      })

    cy.findByRole('textbox', { name: 'Filter by key word' }).clear()
    cy.findAllByRole('paragraph')
      .contains(/Showing \d{1,4} of \d{1,4} reports/)
      .within(() => {
        cy.findAllByRole('strong').eq(0).invoke('text').then(parseFloat).should('equal', 6)
        cy.findAllByRole('strong').eq(1).invoke('text').then(parseFloat).should('equal', 6)
      })

    cy.findAllByRole('rowgroup')
      .eq(1)
      .within(() => {
        cy.findAllByRole('row').should('have.length', 6)
      })
  })
})
