import { summaries } from '@networkMocks/definitionSummaries'
import { addBookmark, executeReportStubs, validateCatalogueTotals } from 'cypress-tests/cypressUtils'

context('Catalogue collections', () => {
  const paths = ['/', '/embedded/platform', '/embedded/platform/dpr']

  const tests = (path: string) => {
    describe(`Catalogue collections from ${path}`, () => {
      describe('Check catalogue collections work properly', () => {
        it('should allow the user to choose from any collection', () => {
          executeReportStubs()
          cy.task('stubDefinitions')
          cy.task('stubGetProductCollections')
          cy.task('getProductCollection1')
          cy.task('getProductCollection2')
          cy.task('stubDefinitionUnprintable')
          cy.task('stubDefinitionEmptyReport')
          cy.task('stubDefinitionMockReportVariant35')

          cy.visit(path)

          cy.findByRole('combobox', { name: /Your collections/ })
            .should('be.visible')
            .within(() => cy.findAllByRole('option').should('have.length', 3))
          cy.findByDisplayValue(/Full catalogue/).should('be.visible')

          const totalReports = summaries
            .filter(rep => rep.authorised)
            .reduce((acc, cur) => acc + (cur.dashboards?.length ?? 0) + cur.variants.length, 0)

          validateCatalogueTotals(totalReports)

          const totalWithUnauthorisedReports = summaries.reduce(
            (acc, cur) => acc + (cur.dashboards?.length ?? 0) + cur.variants.length,
            0,
          )

          cy.findAllByRole('group').contains('Show more filters').should('be.visible').click()
          cy.findByRole('checkbox', { name: 'Show unauthorised reports' }).check()

          validateCatalogueTotals(totalWithUnauthorisedReports)

          addBookmark('Interactive Report with async filters')

          cy.findByRole('combobox', { name: /Your collections/ }).select('My Starter Pack')

          const totalReportsStarterPack = [summaries[0], summaries[1]].reduce(
            (acc, cur) => acc + (cur.dashboards?.length ?? 0) + cur.variants.length,
            0,
          )

          cy.wait(100)

          validateCatalogueTotals(totalReportsStarterPack)
        })
      })
    })
  }

  paths.forEach(route => tests(route))
})
