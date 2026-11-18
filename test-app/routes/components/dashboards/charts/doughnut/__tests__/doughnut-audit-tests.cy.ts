import { toggleDashboardAudit } from 'test-app/routes/integrationTests/appStateUtils'
import { checkA11y, executeDashboardStubs, startReportRequest } from '../../../../../../../cypress-tests/cypressUtils'

context('Dashboard audit - Doughnut charts', () => {
  const path = '/'
  let viewDashboarUrl: string

  describe('Doughnut chart audit', () => {
    before(() => {
      executeDashboardStubs()

      cy.task('stubTestDashboardDefinitionAuditDoughnut')
      cy.task('stubDashboardResult')

      toggleDashboardAudit()

      cy.visit(path)

      startReportRequest({
        name: 'Doughnut chart - Audit testing',
        description: 'Test Dashboard used for audit testing of Doughnut charts',
      })

      checkA11y()

      cy.findByRole('button', { name: /Request/ }).click()

      cy.findAllByRole('group').contains('Dashboard details').should('be.visible').click()

      cy.url().then(url => {
        viewDashboarUrl = url
      })
    })

    it('should show the dashboard audit master list', () => {
      cy.findByLabelText(/Dashboard audit.*/i).within(() => {
        cy.findByRole('region', { name: /Warnings/i }).within(() => {
          cy.findByRole('list').findAllByRole('listitem').should('have.length', 2)
        })
      })
    })

    it('should show the dashboard audit next to the relevant chart', () => {
      cy.visit(viewDashboarUrl)

      cy.findByRole('region', { name: /Audit for chart "Doughnut - Max rings"/i }).within(() => {
        cy.findByRole('region', { name: /Warnings/i }).within(() => {
          cy.findByRole('list')
            .findAllByRole('listitem')
            .should('have.length', 1)
            .within(() => {
              cy.findByRole('heading', { name: 'Large number of rings in Doughnut chart' })
            })
        })
      })

      cy.findByRole('region', { name: /Audit for chart "Doughnut - Max segments"/i }).within(() => {
        cy.findByRole('region', { name: /Warnings/i }).within(() => {
          cy.findByRole('list')
            .findAllByRole('listitem')
            .should('have.length', 1)
            .within(() => {
              cy.findByRole('heading', { name: 'Large number of segments in Doughnut chart' })
            })
        })
      })
    })

    after(() => {
      toggleDashboardAudit()
    })
  })
})
