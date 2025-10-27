import { featureTestingUnprintable } from '@networkMocks/report/mockVariants/feature-testing/unprintable'
import { featureTestingEmptyQuery } from '@networkMocks/report/mockVariants/feature-testing/emptyQuery'

context('Catalogue collections', () => {
  const path = '/embedded/platform/'

  describe('Check catalogue collections work properly', () => {
    it('should allow the user to choose from any collection', () => {
      cy.task('resetStubs')
      cy.task('resetRedis')
      cy.task('getCatalogueCollection1')
      cy.task('stubGetCatalogueCollections')

      cy.findByRole('combobox', { name: /Your collections/ }).should('be.visible').within(() => cy.findAllByRole('option').should('have.length', 3))
      


      // cy.findByLabelText(/Reports catalogue.*/i).within(() => {
      //   cy.findByRole('row', {
      //     name: (_, element) => {
      //       return element.textContent.includes('Interactive Report with async filters')
      //     },
      //   }).within(() => {
      //     cy.findByRole('button', { name: /Add bookmark/ }).click()
      //   })
      // })
    })
  })
})
