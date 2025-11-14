import { summaries } from '@networkMocks/definitionSummaries'

context('Catalogue collections', () => {
  const path = '/embedded/platform/'

  describe('Check catalogue collections work properly', () => {
    it('should allow the user to choose from any collection', () => {
      cy.task('resetStubs')
      cy.task('resetRedis')
      cy.task('stubDefinitions')
      cy.task('stubGetProductCollections')
      cy.task('getProductCollection1')
      cy.task('stubDefinitionUnprintable')
      cy.task('stubDefinitionEmptyReport')
      cy.task('stubDefinitionMockReportVariant35')

      cy.visit(path)

      cy.findByRole('combobox', { name: /Your collections/ })
        .should('be.visible')
        .within(() => cy.findAllByRole('option').should('have.length', 3))
      cy.findByDisplayValue(/Full catalogue/).should('be.visible')

      const totalReports = summaries.reduce((acc, cur) => acc + (cur.dashboards?.length ?? 0) + cur.variants.length, 0)
      cy.findAllByText((_text, el) =>
        new RegExp(`Showing ${totalReports} of ${totalReports} reports`).test(el?.textContent || ''),
      ).should('be.visible')

      cy.findByLabelText(/Reports catalogue.*/i).within(() => {
        cy.findByRole('row', {
          name: (_, element) => {
            return Boolean(element.textContent?.includes('Interactive Report with async filters'))
          },
        }).within(() => {
          cy.findByRole('button', { name: /Add bookmark/ }).click()
        })
      })

      cy.findByRole('combobox', { name: /Your collections/ }).select('My Starter Pack')
      const totalReportsStarterPack = [summaries[0], summaries[1]].reduce(
        (acc, cur) => acc + (cur.dashboards?.length ?? 0) + cur.variants.length,
        0,
      )
      cy.findAllByText((_text, el) =>
        new RegExp(`Showing ${totalReportsStarterPack} of ${totalReportsStarterPack} reports`).test(
          el?.textContent || '',
        ),
      ).should('be.visible')

      cy.findByRole('combobox', { name: /Your collections/ }).select('Full catalogue')
      cy.findAllByText((_text, el) =>
        new RegExp(`Showing ${totalReports} of ${totalReports} reports`).test(el?.textContent || ''),
      ).should('be.visible')
    })
  })
})
