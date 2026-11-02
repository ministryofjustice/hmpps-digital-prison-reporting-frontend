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
          cy.findByRole('tab', { name: /Table/ }).click()
          cy.findByLabelText(/Table.*/i).within(() => {
            cy.findByRole('table').within(() => {
              cy.findAllByRole('row')
                .should('have.length', 2)
                .each((row, index) => {
                  switch (index) {
                    case 0:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('columnheader').should('have.length', 4)
                        cy.findAllByRole('columnheader').eq(0).contains('Date')
                        cy.findAllByRole('columnheader').eq(1).contains('Establishment ID')
                        cy.findAllByRole('columnheader').eq(2).contains('Has MetricOne')
                        cy.findAllByRole('columnheader').eq(3).contains('No MetricOne')
                      })
                      break
                    case 1:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('cell').should('have.length', 4)
                        cy.findAllByRole('cell').eq(1).contains('ABC')
                        cy.findAllByRole('cell').eq(2).contains('No data')
                        cy.findAllByRole('cell').eq(3).contains('614')
                      })
                      break
                    default:
                      break
                  }
                })
            })
          })
        })

        cy.findByLabelText(/MetricTwo values/).within(() => {
          cy.findByRole('tab', { name: /Table/ }).click()
          cy.findByLabelText(/Table.*/i).within(() => {
            cy.findByRole('table').within(() => {
              cy.findAllByRole('row')
                .should('have.length', 2)
                .each((row, index) => {
                  switch (index) {
                    case 0:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('columnheader').should('have.length', 4)
                        cy.findAllByRole('columnheader').eq(0).contains('Date')
                        cy.findAllByRole('columnheader').eq(1).contains('Establishment ID')
                        cy.findAllByRole('columnheader').eq(2).contains('Has MetricTwo')
                        cy.findAllByRole('columnheader').eq(3).contains('No MetricTwo')
                      })
                      break
                    case 1:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('cell').should('have.length', 4)
                        cy.findAllByRole('cell').eq(1).contains('ABC')
                        cy.findAllByRole('cell').eq(2).contains('No data')
                        cy.findAllByRole('cell').eq(3).contains('665')
                      })
                      break
                    default:
                      break
                  }
                })
            })
          })
        })

        cy.findByLabelText(/MetricTwo & MetricThree values/).within(() => {
          cy.findByRole('tab', { name: /Table/ }).click()
          cy.findByLabelText(/Table.*/i).within(() => {
            cy.findByRole('table').within(() => {
              cy.findAllByRole('row')
                .should('have.length', 2)
                .each((row, index) => {
                  switch (index) {
                    case 0:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('columnheader').should('have.length', 6)
                        cy.findAllByRole('columnheader').eq(0).contains('Date')
                        cy.findAllByRole('columnheader').eq(1).contains('Establishment ID')
                        cy.findAllByRole('columnheader').eq(2).contains('Has MetricTwo')
                        cy.findAllByRole('columnheader').eq(3).contains('No MetricTwo')
                        cy.findAllByRole('columnheader').eq(4).contains('Has MetricThree')
                        cy.findAllByRole('columnheader').eq(5).contains('No MetricThree')
                      })
                      break
                    case 1:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('cell').should('have.length', 6)
                        cy.findAllByRole('cell').eq(1).contains('ABC')
                        cy.findAllByRole('cell').eq(2).contains('No data')
                        cy.findAllByRole('cell').eq(3).contains('665')
                        cy.findAllByRole('cell').eq(4).contains('680')
                        cy.findAllByRole('cell').eq(5).contains('799')
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

      cy.findAllByLabelText(/Two ring Doughnut charts/).within(() => {
        cy.findAllByRole('heading', { level: 3 }).should('have.length', 4)

        cy.findByLabelText(/MetricOne values/).within(() => {
          cy.findByRole('tab', { name: /Table/ }).click()
          cy.findByLabelText(/Table.*/i).within(() => {
            cy.findByRole('table').within(() => {
              cy.findAllByRole('row')
                .should('have.length', 3)
                .each((row, index) => {
                  switch (index) {
                    case 0:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('columnheader').should('have.length', 4)
                        cy.findAllByRole('columnheader').eq(0).contains('Date')
                        cy.findAllByRole('columnheader').eq(1).contains('Establishment ID')
                        cy.findAllByRole('columnheader').eq(2).contains('Has MetricOne')
                        cy.findAllByRole('columnheader').eq(3).contains('No MetricOne')
                      })
                      break
                    case 1:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('cell').should('have.length', 4)
                        cy.findAllByRole('cell').eq(1).contains('ABC')
                        cy.findAllByRole('cell').eq(2).contains('No data')
                        cy.findAllByRole('cell').eq(3).contains('614')
                      })
                      break
                    case 2:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('cell').should('have.length', 4)
                        cy.findAllByRole('cell').eq(1).contains('GHI')
                        cy.findAllByRole('cell').eq(2).contains('No data')
                        cy.findAllByRole('cell').eq(3).contains('614')
                      })
                      break
                    default:
                      break
                  }
                })
            })
          })
        })

        cy.findByLabelText(/MetricTwo values/).within(() => {
          cy.findByRole('tab', { name: /Table/ }).click()
          cy.findByLabelText(/Table.*/i).within(() => {
            cy.findByRole('table').within(() => {
              cy.findAllByRole('row')
                .should('have.length', 3)
                .each((row, index) => {
                  switch (index) {
                    case 0:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('columnheader').should('have.length', 4)
                        cy.findAllByRole('columnheader').eq(0).contains('Date')
                        cy.findAllByRole('columnheader').eq(1).contains('Establishment ID')
                        cy.findAllByRole('columnheader').eq(2).contains('Has MetricTwo')
                        cy.findAllByRole('columnheader').eq(3).contains('No MetricTwo')
                      })
                      break
                    case 1:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('cell').should('have.length', 4)
                        cy.findAllByRole('cell').eq(1).contains('ABC')
                        cy.findAllByRole('cell').eq(2).contains('No data')
                        cy.findAllByRole('cell').eq(3).contains('665')
                      })
                      break
                    case 2:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('cell').should('have.length', 4)
                        cy.findAllByRole('cell').eq(1).contains('GHI')
                        cy.findAllByRole('cell').eq(2).contains('No data')
                        cy.findAllByRole('cell').eq(3).contains('665')
                      })
                      break
                    default:
                      break
                  }
                })
            })
          })
        })

        cy.findByLabelText(/MetricTwo & MetricThree values/).within(() => {
          cy.findByRole('tab', { name: /Table/ }).click()
          cy.findByLabelText(/Table.*/i).within(() => {
            cy.findByRole('table').within(() => {
              cy.findAllByRole('row')
                .should('have.length', 3)
                .each((row, index) => {
                  switch (index) {
                    case 0:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('columnheader').should('have.length', 6)
                        cy.findAllByRole('columnheader').eq(0).contains('Date')
                        cy.findAllByRole('columnheader').eq(1).contains('Establishment ID')
                        cy.findAllByRole('columnheader').eq(2).contains('Has MetricTwo')
                        cy.findAllByRole('columnheader').eq(3).contains('No MetricTwo')
                        cy.findAllByRole('columnheader').eq(4).contains('Has MetricThree')
                        cy.findAllByRole('columnheader').eq(5).contains('No MetricThree')
                      })
                      break
                    case 1:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('cell').should('have.length', 6)
                        cy.findAllByRole('cell').eq(1).contains('ABC')
                        cy.findAllByRole('cell').eq(2).contains('No data')
                        cy.findAllByRole('cell').eq(3).contains('665')
                        cy.findAllByRole('cell').eq(4).contains('680')
                        cy.findAllByRole('cell').eq(5).contains('799')
                      })
                      break
                    case 2:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('cell').should('have.length', 6)
                        cy.findAllByRole('cell').eq(1).contains('GHI')
                        cy.findAllByRole('cell').eq(2).contains('No data')
                        cy.findAllByRole('cell').eq(3).contains('665')
                        cy.findAllByRole('cell').eq(4).contains('680')
                        cy.findAllByRole('cell').eq(5).contains('799')
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
