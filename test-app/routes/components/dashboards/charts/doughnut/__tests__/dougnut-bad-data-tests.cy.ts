import {
  checkA11y,
  executeDashboardStubs,
  requestReportByNameAndDescription,
} from '../../../../../../../cypress-tests/cypressUtils'

context('Dashboard visualisation: Doughnut chart - Bad data testing', () => {
  const path = '/'

  describe('Doughnut chart - Bad data testing', () => {
    let dashboardUrl = ''

    before(() => {
      cy.task('resetStubs')
      executeDashboardStubs()

      cy.task('stubDoughnutChartsDashboardDefinition')
      cy.task('stubDashboardResultBadData')

      cy.visit(path)

      requestReportByNameAndDescription({
        name: 'Doughnut charts dashboard',
        description: 'This dashboard represents example Doughnut visualisations',
      })

      cy.findByRole('heading', { level: 1, name: /Doughnut charts dashboard/ }).should('be.visible')
      checkA11y()

      cy.url().then(url => {
        dashboardUrl = url
      })
    })

    beforeEach(() => {
      cy.visit(dashboardUrl)
    })

    it('should render correctly when bad data is provided to the chart', () => {
      cy.findAllByLabelText(/Simple Doughnut charts/).within(() => {
        cy.findAllByRole('heading', { level: 3 }).should('have.length', 4)

        cy.findByLabelText(/MetricOne values/).within(() => {
          cy.findAllByRole('paragraph').eq(1).contains('No data')
        })

        cy.findByLabelText(/MetricTwo values/).within(() => {
          cy.findAllByRole('paragraph').eq(1).contains('No data')
        })
      })
    })
  })
})
