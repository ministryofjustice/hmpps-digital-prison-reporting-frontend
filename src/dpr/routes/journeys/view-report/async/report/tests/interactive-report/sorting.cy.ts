import { setupInteractiveReportStubs, requestInteractiveReport } from './interactive-test-helpers'

context('Interactive report – sorting', () => {
  const path = '/'

  beforeEach(() => {
    setupInteractiveReportStubs()
    cy.task('stubRequestSuccessResult20')
    requestInteractiveReport(path)
  })

  it('shows sort direction in the column header and URL params', () => {
    // initial state
    cy.findByRole('link', { name: 'Field 1' }).should('have.class', 'data-table-header-button-sort-ascending')
    cy.findByRole('link', { name: 'Field 2' }).should('have.class', 'data-table-header-button-sort-none')

    // sort desc by Field 1
    cy.findByRole('link', { name: 'Field 1' }).click()
    cy.findByRole('link', { name: 'Field 1' }).should('have.class', 'data-table-header-button-sort-descending')

    cy.location().should((location) => {
      expect(location.search).to.contain('sortColumn=field1').and.to.contain('sortedAsc=false')
    })

    // sort asc by Field 1
    cy.findByRole('link', { name: 'Field 1' }).click()
    cy.findByRole('link', { name: 'Field 1' }).should('have.class', 'data-table-header-button-sort-ascending')

    cy.location().should((location) => {
      expect(location.search).to.contain('sortColumn=field1').and.to.contain('sortedAsc=true')
    })

    // sort asc by Field 2
    cy.findByRole('link', { name: 'Field 2' }).click()
    cy.findByRole('link', { name: 'Field 2' }).should('have.class', 'data-table-header-button-sort-ascending')
    cy.findByRole('link', { name: 'Field 1' }).should('have.class', 'data-table-header-button-sort-none')

    cy.location().should((location) => {
      expect(location.search).to.contain('sortColumn=field2').and.to.contain('sortedAsc=true')
    })

    // sort desc by Field 2
    cy.findByRole('link', { name: 'Field 2' }).click()
    cy.findByRole('link', { name: 'Field 2' }).should('have.class', 'data-table-header-button-sort-descending')

    cy.location().should((location) => {
      expect(location.search).to.contain('sortColumn=field2').and.to.contain('sortedAsc=false')
    })
  })
})
