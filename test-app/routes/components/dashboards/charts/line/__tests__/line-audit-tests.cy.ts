import { toggleDashboardAudit } from 'test-app/routes/integrationTests/appStateUtils'
import { checkA11y, executeDashboardStubs, startReportRequest } from '../../../../../../../cypress-tests/cypressUtils'

context('Dashboard audit - Line charts', () => {
  const path = '/'
  let viewDashboarUrl: string

  describe('Line chart audit', () => {
    before(() => {
      executeDashboardStubs()

      cy.task('stubTestDashboardDefinitionAuditLine')
      cy.task('stubDashboardResultDaily')

      toggleDashboardAudit()

      cy.visit(path)

      startReportRequest({
        name: 'line chart - Audit testing',
        description: 'Test Dashboard used for audit testing of Line charts',
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
          cy.findByRole('list').findAllByRole('listitem').should('have.length', 2)
        })

        cy.findByRole('region', { name: /Warnings/i }).within(() => {
          cy.findByRole('list').findAllByRole('listitem').should('have.length', 3)
        })
      })
    })

    it('should show the dashboard audit next to the relevant chart', () => {
      cy.visit(viewDashboarUrl)

      cy.findByRole('region', { name: /Audit for chart "Line chart with all missing cols"/i }).within(() => {
        cy.findByRole('region', { name: /Errors/i }).within(() => {
          cy.findByRole('list').findAllByRole('listitem').should('have.length', 1)

          cy.findByRole('list').within(() => {
            cy.findByRole('heading', { name: 'Missing columns in dataset' })
          })
        })

        cy.findByRole('region', { name: /Warnings/i }).within(() => {
          cy.findByRole('list')
            .findAllByRole('listitem')
            .should('have.length', 1)
            .within(() => {
              cy.findByRole('heading', { name: 'No data in visualisation dataset' })
            })
        })
      })

      cy.findByRole('region', { name: /Audit for chart "Line chart with some missing cols"/i }).within(() => {
        cy.findByRole('region', { name: /Errors/i }).within(() => {
          cy.findByRole('list').findAllByRole('listitem').should('have.length', 1)

          cy.findByRole('list').within(() => {
            cy.findByRole('heading', { name: 'Missing columns in dataset' })
          })
        })

        cy.findByRole('region', { name: /Warnings/i }).within(() => {
          cy.findByRole('list')
            .findAllByRole('listitem')
            .should('have.length', 1)
            .within(() => {
              cy.findByRole('heading', { name: 'Line chart exceeds recommended number of lines' })
            })
        })
      })

      cy.findByRole('region', { name: /Audit for chart "MetricOne & MetricTwo values"/i }).within(() => {
        cy.findByRole('region', { name: /Errors/i }).should('not.exist')

        cy.findByRole('region', { name: /Warnings/i }).within(() => {
          cy.findByRole('list')
            .findAllByRole('listitem')
            .should('have.length', 1)
            .within(() => {
              cy.findByRole('heading', { name: 'Line chart exceeds recommended number of lines' })
            })
        })
      })
    })

    after(() => {
      toggleDashboardAudit()
    })
  })
})
