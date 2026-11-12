import { toggleDashboardAudit } from 'test-app/routes/integrationTests/appStateUtils'
import {
  checkA11y,
  executeDashboardStubs,
  startReportRequest,
} from '../../../../../../../../cypress-tests/cypressUtils'

context('Dashboard audit', () => {
  const path = '/'

  describe('Dashboard audit', () => {
    before(() => {
      executeDashboardStubs()

      cy.task('stubTestDashboardDefinitionAudit')
      cy.task('stubDashboardResult')

      toggleDashboardAudit()
    })

    it('should show the dashboard details', () => {
      cy.visit(path)

      startReportRequest({ name: 'Test Dashboard', description: 'Test Dashboard used for testing' })

      checkA11y()

      cy.findByRole('button', { name: /Request/ }).click()

      cy.findAllByRole('group').contains('Dashboard details').should('be.visible').click()
    })

    after(() => {
      toggleDashboardAudit()
    })
  })
})
