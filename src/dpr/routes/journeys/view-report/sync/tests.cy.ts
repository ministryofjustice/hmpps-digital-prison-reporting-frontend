import { executeReportStubs, executeDashboardStubs } from '../../../../../../cypress-tests/cypressUtils'

context('Platform sync tests', () => {
  const path = '/embedded/platform/'

  describe('Sync tests from the platform', () => {
    before(() => {
      executeDashboardStubs()
      executeReportStubs()
      cy.task('stubDefinitionSyncReport')
      cy.task('stubDefinitionSyncDashboard')
      cy.task('stubRequestSuccessResult20')
      cy.task('stubSyncRequestDataSuccess')
      cy.task('stubSyncDashboardRequestDataSuccess')
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

    it('should load a sync dashboard', () => {
      cy.visit(path)

      cy.findByLabelText(/Reports catalogue.*/i).within(() => {
        cy.findByRole('row', {
          name: (_, element) => {
            return Boolean(element.textContent?.includes('Sync Dashboard used for testing'))
          },
        }).within(() => {
          cy.findByRole('link', { name: /Load dashboard/ }).click()
        })
      })

      cy.findByRole('heading', { name: /Sync Dashboard/, level: 1 }).should('be.visible')
    })
  })
})
