import {
  executeReportStubs,
  executeDashboardStubs,
  startReportLoad,
} from '../../../../../../cypress-tests/cypressUtils'

context('Platform sync tests', () => {
  const path = '/embedded/platform'

  describe('Sync tests from the platform', () => {
    before(() => {
      executeDashboardStubs()
      executeReportStubs()
      cy.task('stubDefinitionSyncReport')
      cy.task('stubDefinitionSyncDashboard')
      cy.task('stubRequestSuccessResult20')
      cy.task('stubSyncRequestDataSuccess')
      cy.task('stubDashboardResultCompleteDataSync')
      cy.task('stubSyncRequestDataSuccessCount')
    })

    it('should load a sync report', () => {
      cy.visit(path)

      startReportLoad({ name: 'Sync report', description: 'This is an sync report' })

      cy.findByRole('heading', { name: /Sync report/, level: 1 }).should('be.visible')
    })

    it('should load a sync dashboard', () => {
      cy.visit(path)

      startReportLoad({ name: 'Sync Dashboard', description: 'Sync Dashboard used for testing' })

      cy.findByRole('heading', { name: /Sync Dashboard/, level: 1 }).should('be.visible')
    })
  })
})
