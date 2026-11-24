import { toggleDashboardAudit } from 'test-app/routes/integrationTests/appStateUtils'
import { checkA11y, executeDashboardStubs, startReportRequest } from '../../../../../../../cypress-tests/cypressUtils'

context('Dashboard audit - Bar charts', () => {
  const path = '/'
  let viewDashboarUrl: string

  describe('Bar chart audit', () => {
    before(() => {
      executeDashboardStubs()

      cy.task('stubTestDashboardDefinitionAuditBar')
      cy.task('stubDashboardResult')

      toggleDashboardAudit()

      cy.visit(path)

      startReportRequest({
        name: 'Bar chart - Audit testing',
        description: 'Test Dashboard used for audit testing of bar charts',
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
          cy.findByRole('list').findAllByRole('listitem').should('have.length', 3)
        })
      })
    })

    it('should show the dashboard audit next to the relevant chart', () => {
      cy.visit(viewDashboarUrl)

      cy.findByRole('region', { name: /Audit for chart "Bar chart with large dataset"/i }).within(() => {
        cy.findByRole('region', { name: /Warnings/i }).within(() => {
          cy.findByRole('list')
            .findAllByRole('listitem')
            .should('have.length', 1)
            .within(() => {
              cy.findByRole('heading', { name: 'Bar chart exceeds recommended number of bars' })
            })
        })
      })

      cy.findByRole('region', { name: /Audit for chart "Horizontal bar chart"/i }).within(() => {
        cy.findByRole('paragraph').contains('No issues found')
      })

      cy.findByRole('region', { name: /Audit for chart "Bar chart rows as Bars"/i }).within(() => {
        cy.findByRole('region', { name: /Warnings/i }).within(() => {
          cy.findByRole('list')
            .findAllByRole('listitem')
            .should('have.length', 1)
            .within(() => {
              cy.findByRole('heading', { name: 'Bar chart exceeds recommended number of bars' })
            })
        })
      })

      cy.findByRole('region', { name: /Audit for chart "Stacked bar chart"/i }).within(() => {
        cy.findByRole('region', { name: /Warnings/i }).within(() => {
          cy.findByRole('list')
            .findAllByRole('listitem')
            .should('have.length', 1)
            .within(() => {
              cy.findByRole('heading', { name: 'Bar chart exceeds recommended number of stacked segments' })
            })
        })
      })
    })

    after(() => {
      toggleDashboardAudit()
    })
  })
})
