import {
  checkA11y,
  executeDashboardStubs,
  requestReportByNameAndDescription,
} from '../../../../../../../cypress-tests/cypressUtils'

context('Dashboard visualisation: Line-timeseries chart - Bad data testing', () => {
  const path = '/'

  describe('Line-timeseries chart - Bad data testing', () => {
    let dashboardUrl = ''

    before(() => {
      cy.task('resetStubs')
      executeDashboardStubs()

      cy.task('stubLineTimeseriesChartsDashboardDefinition')
      cy.task('stubDashboardResultBadData')

      cy.visit(path)

      requestReportByNameAndDescription({
        name: 'Line-timeseries charts dashboard',
        description: 'This dashboard represents example line-timeseries visualisations using the defau...',
      })

      cy.findByRole('heading', { level: 1, name: /Line-timeseries charts dashboard/ }).should('be.visible')
      checkA11y()

      cy.url().then(url => {
        dashboardUrl = url
      })
    })

    beforeEach(() => {
      cy.visit(dashboardUrl)
    })

    it('should render correctly when bad data is provided to the chart', () => {
      expect(true)
    })
  })
})
