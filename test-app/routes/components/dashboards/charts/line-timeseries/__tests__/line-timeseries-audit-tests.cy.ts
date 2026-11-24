import { toggleDashboardAudit } from 'test-app/routes/integrationTests/appStateUtils'
import { checkA11y, executeDashboardStubs, startReportRequest } from '../../../../../../../cypress-tests/cypressUtils'

context('Dashboard audit - Line Timeseries charts', () => {
  const path = '/'
  let viewDashboarUrl: string

  describe('Line Timeseries chart audit', () => {
    before(() => {
      executeDashboardStubs()

      cy.task('stubTestDashboardDefinitionAuditLineTimeseries')
      cy.task('stubTestDashboardDefinitionAuditLineTimeseriesChild1')
      cy.task('stubTestDashboardDefinitionAuditLineTimeseriesChild2')

      cy.task('stubDashboardResultIncorrectDailyFormat')
      cy.task('stubDashboardResultIncorrectMonthlyFormat')
      cy.task('stubDashboardResultIncorrectYearlyFormat')

      toggleDashboardAudit()

      cy.visit(path)

      startReportRequest({
        name: 'Line Timeseries chart - Audit testing - Incorrect date format data',
        description: 'Test Dashboard used for audit testing of Line Timeseries charts',
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
          cy.findByRole('list').findAllByRole('listitem').should('have.length', 3)
        })
      })
    })

    it('should show the dashboard audit next to the relevant chart', () => {
      cy.visit(viewDashboarUrl)

      cy.findByRole('region', { name: /Audit for chart "Line-timeseries chart with daily data"/i }).within(() => {
        cy.findByRole('region', { name: /Errors/i }).within(() => {
          cy.findAllByRole('list')
            .findAllByRole('listitem')
            .should('have.length', 1)
            .within(() => {
              cy.findByRole('heading', { name: 'Incorrect date format in dataset' })
            })
        })
      })

      cy.findByRole('region', { name: /Audit for chart "Line-timeseries chart with monthly data"/i }).within(() => {
        cy.findByRole('region', { name: /Errors/i }).within(() => {
          cy.findAllByRole('list')
            .findAllByRole('listitem')
            .should('have.length', 1)
            .within(() => {
              cy.findByRole('heading', { name: 'Incorrect date format in dataset' })
            })
        })
      })

      cy.findByRole('region', { name: /Audit for chart "Line-timeseries chart with yearly data"/i }).within(() => {
        cy.findByRole('region', { name: /Errors/i }).within(() => {
          cy.findAllByRole('list')
            .findAllByRole('listitem')
            .should('have.length', 1)
            .within(() => {
              cy.findByRole('heading', { name: 'Incorrect date format in dataset' })
            })
        })
      })
    })

    after(() => {
      toggleDashboardAudit()
    })
  })
})
