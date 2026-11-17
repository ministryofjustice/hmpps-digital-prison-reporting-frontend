import { toggleDashboardAudit } from 'test-app/routes/integrationTests/appStateUtils'
import {
  checkA11y,
  executeDashboardStubs,
  startReportRequest,
} from '../../../../../../../../cypress-tests/cypressUtils'

context('Dashboard audit', () => {
  const path = '/'
  let viewDashboarUrl: string

  describe('Dashboard audit', () => {
    before(() => {
      executeDashboardStubs()

      cy.task('stubTestDashboardDefinitionAudit')
      cy.task('stubDashboardResult')

      toggleDashboardAudit()

      cy.visit(path)

      startReportRequest({
        name: 'Dashboard Audit testing',
        description: 'Test Dashboard used for audit testing',
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
        cy.findByRole('region', { name: /Errors/i }).within(() => {
          cy.findByRole('list').findAllByRole('listitem').should('have.length', 8)
        })

        cy.findByRole('region', { name: /Warnings/i }).within(() => {
          cy.findByRole('list').findAllByRole('listitem').should('have.length', 3)
        })

        cy.findByRole('region', { name: /Suggestions/i }).within(() => {
          cy.findByRole('list').findAllByRole('listitem').should('have.length', 5)
        })
      })
    })

    it('should show the dashboard audit next to the relevant section', () => {
      cy.visit(viewDashboarUrl)

      cy.findByRole('region', { name: /Audit for section "section-0"/i }).within(() => {
        cy.findByRole('region', { name: /Errors/i }).within(() => {
          cy.findByRole('list').findAllByRole('listitem').should('have.length', 2)
        })

        cy.findByRole('region', { name: /Suggestion/i }).within(() => {
          cy.findByRole('list').findAllByRole('listitem').should('have.length', 1)
        })
      })

      cy.findByRole('region', { name: /Audit for section "Bad section meta"/i }).within(() => {
        cy.findByRole('region', { name: /Errors/i }).within(() => {
          cy.findByRole('list').findAllByRole('listitem').should('have.length', 2)
        })

        cy.findByRole('region', { name: /Suggestion/i }).within(() => {
          cy.findByRole('list').findAllByRole('listitem').should('have.length', 1)
        })
      })
    })

    it('should show the dashboard audit next to the relevant chart', () => {
      cy.visit(viewDashboarUrl)

      cy.findByRole('region', { name: /Audit for chart "bad-chart-meta-audit-0/i }).within(() => {
        cy.findByRole('region', { name: /Errors/i }).within(() => {
          cy.findByRole('list').findAllByRole('listitem').should('have.length', 2)
        })

        cy.findByRole('region', { name: /Warnings/i }).within(() => {
          cy.findByRole('list').findAllByRole('listitem').should('have.length', 1)
        })
      })

      cy.findByRole('region', { name: /Audit for chart "Bad chart meta audit 1"/i }).within(() => {
        cy.findByRole('region', { name: /Errors/i }).within(() => {
          cy.findByRole('list').findAllByRole('listitem').should('have.length', 1)
        })

        cy.findByRole('region', { name: /Warnings/i }).within(() => {
          cy.findByRole('list').findAllByRole('listitem').should('have.length', 1)
        })
      })
    })

    after(() => {
      toggleDashboardAudit()
    })
  })
})
