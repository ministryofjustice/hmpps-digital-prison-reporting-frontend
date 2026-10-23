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

    it('should have the correct amount of sections', () => {
      cy.findAllByRole('heading', { level: 2 })
        .should('have.length', 6)
        .each((section, index) => {
          switch (index) {
            case 0:
              cy.wrap(section).contains('Line timeseries daily charts')
              break
            case 1:
              cy.wrap(section).contains('Daily Dataset')
              break
            case 2:
              cy.wrap(section).contains('Line timeseries monthly charts')
              break
            case 3:
              cy.wrap(section).contains('Monthly Dataset')
              break
            case 4:
              cy.wrap(section).contains('Line timeseries yearly charts')
              break
            case 5:
              cy.wrap(section).contains('Yearly Dataset')
              break
            default:
              break
          }
        })
    })

    it('should show the correct data for charts', () => {
      cy.findAllByLabelText(/Line timeseries daily charts/).within(() => {
        cy.findAllByRole('heading', { level: 3 }).should('have.length', 3)

        cy.findByLabelText(/Missing MetricOne timeseries chart/).within(() => {
          cy.findByRole('tab', { name: /Table/ }).click()

          cy.findByLabelText(/Table.*/i).within(() => {
            cy.findByRole('table').within(() => {
              cy.findAllByRole('row')
                .should('have.length', 91)
                .each((row, index) => {
                  switch (index) {
                    case 0:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('columnheader').should('have.length', 3)
                        cy.findAllByRole('columnheader').eq(0).contains('Date')
                        cy.findAllByRole('columnheader').eq(1).contains('Establishment ID')
                        cy.findAllByRole('columnheader').eq(2).contains('Has no MetricOne')
                      })
                      break
                    case 1:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('cell').should('have.length', 3)
                        cy.findAllByRole('cell').eq(0).contains('01/01/2026')
                        cy.findAllByRole('cell').eq(1).contains('ABC')
                        cy.findAllByRole('cell').eq(2).contains('479')
                      })
                      break
                    default:
                      break
                  }
                })
            })
          })
        })
      })

      cy.findAllByLabelText(/Line timeseries monthly charts/).within(() => {
        cy.findAllByRole('heading', { level: 3 }).should('have.length', 3)

        cy.findByLabelText(/Missing MetricOne timeseries chart/).within(() => {
          cy.findByRole('tab', { name: /Table/ }).click()

          cy.findByLabelText(/Table.*/i).within(() => {
            cy.findByRole('table').within(() => {
              cy.findAllByRole('row')
                .should('have.length', 19)
                .each((row, index) => {
                  switch (index) {
                    case 0:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('columnheader').should('have.length', 3)
                        cy.findAllByRole('columnheader').eq(0).contains('Date')
                        cy.findAllByRole('columnheader').eq(1).contains('Establishment ID')
                        cy.findAllByRole('columnheader').eq(2).contains('Has no MetricOne')
                      })
                      break
                    case 1:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('cell').should('have.length', 3)
                        cy.findAllByRole('cell').eq(0).contains('Aug 25')
                        cy.findAllByRole('cell').eq(1).contains('ABC')
                        cy.findAllByRole('cell').eq(2).contains('781')
                      })
                      break
                    default:
                      break
                  }
                })
            })
          })
        })
      })

      cy.findAllByLabelText(/Line timeseries yearly charts/).within(() => {
        cy.findAllByRole('heading', { level: 3 }).should('have.length', 3)

        cy.findByLabelText(/Missing MetricOne timeseries chart/).within(() => {
          cy.findByRole('tab', { name: /Table/ }).click()

          cy.findByLabelText(/Table.*/i).within(() => {
            cy.findByRole('table').within(() => {
              cy.findAllByRole('row')
                .should('have.length', 7)
                .each((row, index) => {
                  switch (index) {
                    case 0:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('columnheader').should('have.length', 3)
                        cy.findAllByRole('columnheader').eq(0).contains('Date')
                        cy.findAllByRole('columnheader').eq(1).contains('Establishment ID')
                        cy.findAllByRole('columnheader').eq(2).contains('Has no MetricOne')
                      })
                      break
                    case 1:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('cell').should('have.length', 3)
                        cy.findAllByRole('cell').eq(0).contains('2024')
                        cy.findAllByRole('cell').eq(1).contains('ABC')
                        cy.findAllByRole('cell').eq(2).contains('781')
                      })
                      break
                    default:
                      break
                  }
                })
            })
          })
        })
      })
    })
  })
})
