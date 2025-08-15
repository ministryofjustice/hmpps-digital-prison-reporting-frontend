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
    cy.get('#total-shown').invoke('text').then(parseFloat).should('equal', 6)
    cy.get('#dpr-search-table > tbody > tr').not('.dpr-search-option-hide').should('have.length', 6)

    cy.get('#dpr-search-table_search_input').clear().type('one')
    cy.get('#total-shown').invoke('text').then(parseFloat).should('equal', 2)

    const tableRows = cy.get('#dpr-search-table > tbody > tr').not('.dpr-search-option-hide')
    tableRows.should('have.length', 2)
    tableRows.each((tr) => {
      cy.wrap(tr).contains('one')
    })
  })

  it('should filter the reports via the URL', () => {
    cy.visit(`${path}?dpr-search-table_search_input=one`)
    cy.get('#dpr-search-table_search_input').should('have.value', 'one')
    cy.get('#total-shown').invoke('text').then(parseFloat).should('equal', 2)

    const tableRows = cy.get('#dpr-search-table > tbody > tr').not('.dpr-search-option-hide')
    tableRows.should('have.length', 2)
    tableRows.each((tr) => {
      cy.wrap(tr).contains('one')
    })
  })

  it('should show all listings when input is blank', () => {
    cy.visit(`${path}?dpr-search-table_search_input=one`)
    cy.get('#dpr-search-table_search_input').should('have.value', 'one')
    cy.get('#total-shown').invoke('text').then(parseFloat).should('equal', 2)
    cy.get('#dpr-search-table_search_input').clear()
    cy.get('#total-shown').invoke('text').then(parseFloat).should('equal', 6)

    const tableRows = cy.get('#dpr-search-table > tbody > tr').not('.dpr-search-option-hide')
    tableRows.should('have.length', 6)
  })
})
