import { executeReportStubs, requestReport } from '../../../../../../../../cypress-tests/cypressUtils'

context('Interactive report - sorting', () => {
  const path = '/'
  let viewReportUrl: string

  before(() => {
    executeReportStubs()
    cy.task('stubDefinitionFeatureTestingInteractive')
    cy.task('stubAsyncRequestSuccessReportTablesCount')
    cy.task('stubRequestSuccessResult20')
    cy.task('stubRequestSuccessResult100')

    requestReport({ name: 'Interactive Report', description: 'this is an interactive report', path })
    cy.url().then(url => {
      viewReportUrl = url
    })
  })

  beforeEach(() => {
    cy.visit(viewReportUrl)
    cy.findByRole('button', { name: 'Field 1' }).as('field1Sort')
    cy.findByRole('button', { name: 'Field 2' }).as('field2Sort')
  })

  it('should show the sort direction in the column header and the url', () => {
    cy.findByRole('button', { name: 'Reset filters' }).click()

    // Initial state
    cy.get('@field1Sort').should('have.class', 'data-table-header-button-sort-ascending')
    cy.get('@field2Sort').should('have.class', 'data-table-header-button-sort-none')

    // Sort desc by field 1
    cy.get('@field1Sort').click()
    cy.get('@field1Sort').should('have.class', 'data-table-header-button-sort-descending')
    cy.get('@field2Sort').should('have.class', 'data-table-header-button-sort-none')
    cy.location().should(location => {
      expect(location.search).to.contain(`&sortColumn=field1&sortedAsc=false`)
      expect(location.search).to.contain(`filters.field8=value8.2&filters.field8=value8.3`)
    })

    // Sort asc by field 1
    cy.get('@field1Sort').click()
    cy.get('@field1Sort').should('have.class', 'data-table-header-button-sort-ascending')
    cy.get('@field2Sort').should('have.class', 'data-table-header-button-sort-none')
    cy.location().should(location => {
      expect(location.search).to.contain(`&sortColumn=field1&sortedAsc=true`)
      expect(location.search).to.contain(`filters.field8=value8.2&filters.field8=value8.3`)
    })

    // Sort asc by field 2
    cy.get('@field2Sort').click()
    cy.get('@field2Sort').should('have.class', 'data-table-header-button-sort-ascending')
    cy.get('@field1Sort').should('have.class', 'data-table-header-button-sort-none')
    cy.location().should(location => {
      expect(location.search).to.contain(`&sortColumn=field2&sortedAsc=true`)
      expect(location.search).to.contain(`filters.field8=value8.2&filters.field8=value8.3`)
    })

    // Sort desc by field 2
    cy.get('@field2Sort').click()
    cy.get('@field2Sort').should('have.class', 'data-table-header-button-sort-descending')
    cy.get('@field1Sort').should('have.class', 'data-table-header-button-sort-none')
    cy.location().should(location => {
      expect(location.search).to.contain(`&sortColumn=field2&sortedAsc=false`)
      expect(location.search).to.contain(`filters.field8=value8.2&filters.field8=value8.3`)
    })
  })
})
