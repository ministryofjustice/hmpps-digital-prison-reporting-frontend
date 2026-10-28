import {
  executeDashboardStubs,
  requestReportByNameAndDescription,
} from '../../../../../../../cypress-tests/cypressUtils'

context('Dashboard visualisation: line-timeseries - No TS in result dataset', () => {
  const path = '/'

  describe('check chart responds to no TS', () => {
    before(() => {
      cy.task('resetStubs')

      executeDashboardStubs()

      cy.task('stubLineTimeseriesChartsDashboardDefinition')
      cy.task('stubDashboardResultNoTs')

      cy.visit(path)

      requestReportByNameAndDescription({
        name: 'Line-timeseries charts',
        description: 'This dashboard represents example line-timeseries visualisations using the defau...',
      })
    })

    it('responds appropriately to not having a TS in the dataset', () => {
      cy.findByRole('heading', { name: /Your report has failed to generate/ }).should('be.visible')

      cy.findAllByRole('paragraph')
        .eq(1)
        .contains('mockMetricOneLineChartTimeseries: No relevant timestamp field in dataset')
    })
  })
})
