import { summaries } from '@networkMocks/definitionSummaries'
import { addBookmark, executeReportStubs } from 'cypress-tests/cypressUtils'

context('Catalogue collections', () => {
  const paths = ['/', '/embedded/platform', '/embedded/platform/dpr']

  const validateTotals = (totalReports: number) => {
    cy.get('.dpr-reports-catalogue__totals p')
      .invoke('text')
      .then(text => {
        expect(text.replace(/\s+/g, ' ').trim()).to.contain(`Showing ${totalReports} reports from`)
      })
  }

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

          const totalReports = summaries.reduce(
            (acc, cur) => acc + (cur.dashboards?.length ?? 0) + cur.variants.length,
            0,
          )
          validateTotals(totalReports)

          addBookmark('Interactive Report with async filters')

          cy.findByRole('combobox', { name: /Your collections/ }).select('My Starter Pack')

          const totalReportsStarterPack = [summaries[0], summaries[1]].reduce(
            (acc, cur) => acc + (cur.dashboards?.length ?? 0) + cur.variants.length,
            0,
          )

          cy.wait(100)

          validateTotals(totalReportsStarterPack)
        })
      })
    })
  }

  paths.forEach(route => tests(route))
})
