import { executeReportStubs } from '../../../../../../cypress-tests/cypressUtils'

context('Platform sync tests', () => {
  const path = '/embedded/platform/'

  describe('Sync tests from the platform', () => {
    before(() => {
      executeReportStubs()
      cy.task('stubDefinitionSyncReport')
      cy.task('stubRequestSuccessResult20')
      cy.task('stubSyncRequestDataSuccess')
      cy.task('stubSyncRequestDataSuccessCount')
    })
    it('should load a sync report', () => {
      cy.visit(path)

      cy.findByLabelText(/Reports catalogue.*/i).within(() => {
        cy.findByRole('row', {
          name: (_, element) => {
            return Boolean(element.textContent?.includes('This is an sync report'))
          },
        }).within(() => {
          cy.findByRole('link', { name: /Load report/ }).click()
        })
      })

      cy.findByRole('heading', { name: /Sync report/, level: 1 }).should('be.visible')
    })
  })
})
