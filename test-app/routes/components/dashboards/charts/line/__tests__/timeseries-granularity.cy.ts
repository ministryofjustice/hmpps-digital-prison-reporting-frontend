import {
  checkA11y,
  executeDashboardStubs,
  requestReportByNameAndDescription,
} from '../../../../../../../cypress-tests/cypressUtils'

context('Dashboard visualisation: line-timeseries chart granularity tests', () => {
  const path = '/'

  describe('Daily data', () => {
    let dailyDataDashboardUrl = ''

    before(() => {
      cy.task('resetStubs')

      executeDashboardStubs()

      cy.task('stubLineTimeseriesDashboardDailyDataDef')
      cy.task('stubDashboardResultCompleteDataDaily')
      cy.task('stubDashboardResultCompleteDataMonthly')
      cy.task('stubDashboardResultCompleteDataAnnually')

      cy.visit(path)

      requestReportByNameAndDescription({
        name: 'Line-timeseries - Daily Complete dataset',
        description: 'This dashboard represents example line-timeseries visualisations using a daily c...',
      })

      cy.findByRole('heading', { level: 1, name: /Line-timeseries - Daily Complete dataset/ }).should('be.visible')
      checkA11y()

      cy.url().then(url => {
        dailyDataDashboardUrl = url
      })
    })

    beforeEach(() => {
      cy.visit(dailyDataDashboardUrl)
    })

    it('should...', () => {
      expect(true)
    })
  })

  // describe('Monthly data', () => {
  //   let monthlyDataDashboardUrl = ''

  //   before(() => {
  //     cy.task('resetStubs')

  //     executeDashboardStubs()

  //     cy.task('stubLineTimeseriesDashboardMonthlyDataDef')
  //     cy.task('stubDashboardResultCompleteDataAnnually')

  //     cy.visit(path)

  //     requestReportByNameAndDescription({
  //       name: 'Line-timeseries - Monthly Complete dataset',
  //       description:
  //         'This dashboard represents example line-timeseries visualisations using a monthly complete dataset.',
  //     })

  //     cy.findByRole('heading', { level: 1, name: /Line-timeseries - Monthly Complete dataset/ }).should('be.visible')
  //     checkA11y()

  //     cy.url().then(url => {
  //       monthlyDataDashboardUrl = url
  //     })
  //   })

  //   beforeEach(() => {
  //     cy.visit(monthlyDataDashboardUrl)
  //   })

  //   it('should...', () => {
  //     expect(true)
  //   })
  // })

  // describe('Yearly data', () => {
  //   let yearlyDataDashboardUrl = ''

  //   before(() => {
  //     cy.task('resetStubs')

  //     executeDashboardStubs()

  //     cy.task('stubLineTimeseriesDashboardYearlyDataDef')
  //     cy.task('stubDashboardResultCompleteDataYearly')

  //     cy.visit(path)

  //     requestReportByNameAndDescription({
  //       name: 'Line-timeseries - Yearly Complete dataset',
  //       description:
  //         'This dashboard represents example line-timeseries visualisations using a yearly complete dataset.',
  //     })

  //     cy.findByRole('heading', { level: 1, name: /Line-timeseries - Yearly Complete dataset/ }).should('be.visible')
  //     checkA11y()

  //     cy.url().then(url => {
  //       yearlyDataDashboardUrl = url
  //     })
  //   })

  //   beforeEach(() => {
  //     cy.visit(yearlyDataDashboardUrl)
  //   })

  //   it('should...', () => {
  //     expect(true)
  //   })
  // })
})
