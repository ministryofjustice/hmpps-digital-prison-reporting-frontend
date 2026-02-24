import { executeDashboardStubs, requestReportByNameAndDescription } from '../../../../../../cypress-tests/cypressUtils'

context('Dashboard visualisation: line timeseries chart', () => {
  const path = '/embedded/platform/'

  describe('Complete data', () => {
    let completeUrl = ''

    before(() => {
      cy.task('resetStubs')
      executeDashboardStubs()
      cy.task('stubLineTimeseriesDashboardCompleteData')
      cy.task('stubDashboardResultCompleteData')
      cy.visit(path)

      requestReportByNameAndDescription({
        name: 'Line-timeseries - Complete dataset',
        description: 'This dashboard represents example line-timeseries visualisations using a complete dataset.',
      })

      cy.findByRole('heading', { level: 1, name: /Line-timeseries - Complete dataset/ }).should('be.visible')
      cy.injectAxe()
      cy.checkA11y()

      cy.url().then((url) => {
        completeUrl = url
      })
    })

    beforeEach(() => {
      cy.visit(completeUrl)
    })

    it('should should have the correct amount of sections', () => {
      cy.findAllByRole('heading', { level: 2 })
        .should('have.length', 3)
        .each((section, index) => {
          switch (index) {
            case 0:
              cy.wrap(section).contains('Line timeseries charts - single line')
              break
            case 1:
              cy.wrap(section).contains('Line timeseries charts - multiple line')
              break
            case 2:
              cy.wrap(section).contains('Full Dataset')
              break
            default:
              break
          }
        })
    })

    it('should should show the correct data for charts', () => {
      cy.findAllByLabelText(/Line timeseries charts - single line/).within(() => {
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
                        cy.findAllByRole('cell').eq(0).contains('Aug 24')
                        cy.findAllByRole('cell').eq(1).contains('ABC')
                        cy.findAllByRole('cell').eq(2).contains('781')
                      })
                      break
                    case 2:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('cell').should('have.length', 3)
                        cy.findAllByRole('cell').eq(0).contains('Sep 24')
                        cy.findAllByRole('cell').eq(1).contains('ABC')
                        cy.findAllByRole('cell').eq(2).contains('514')
                      })
                      break
                    case 3:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('cell').should('have.length', 3)
                        cy.findAllByRole('cell').eq(0).contains('Oct 24')
                        cy.findAllByRole('cell').eq(1).contains('ABC')
                        cy.findAllByRole('cell').eq(2).contains('598')
                      })
                      break
                    case 4:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('cell').should('have.length', 3)
                        cy.findAllByRole('cell').eq(0).contains('Nov 24')
                        cy.findAllByRole('cell').eq(1).contains('ABC')
                        cy.findAllByRole('cell').eq(2).contains('522')
                      })
                      break
                    case 5:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('cell').should('have.length', 3)
                        cy.findAllByRole('cell').eq(0).contains('Dec 24')
                        cy.findAllByRole('cell').eq(1).contains('ABC')
                        cy.findAllByRole('cell').eq(2).contains('431')
                      })
                      break
                    case 6:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('cell').should('have.length', 3)
                        cy.findAllByRole('cell').eq(0).contains('Jan 25')
                        cy.findAllByRole('cell').eq(1).contains('ABC')
                        cy.findAllByRole('cell').eq(2).contains('614')
                      })
                      break
                    default:
                      break
                  }
                })
            })
          })
        })

        cy.findByLabelText(/Missing MetricTwo timeseries chart/).within(() => {
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
                        cy.findAllByRole('columnheader').eq(2).contains('Has no MetricTwo')
                      })
                      break
                    case 1:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('cell').should('have.length', 3)
                        cy.findAllByRole('cell').eq(0).contains('Aug 24')
                        cy.findAllByRole('cell').eq(1).contains('ABC')
                        cy.findAllByRole('cell').eq(2).contains('528')
                      })
                      break
                    case 2:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('cell').should('have.length', 3)
                        cy.findAllByRole('cell').eq(0).contains('Sep 24')
                        cy.findAllByRole('cell').eq(1).contains('ABC')
                        cy.findAllByRole('cell').eq(2).contains('554')
                      })
                      break
                    case 3:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('cell').should('have.length', 3)
                        cy.findAllByRole('cell').eq(0).contains('Oct 24')
                        cy.findAllByRole('cell').eq(1).contains('ABC')
                        cy.findAllByRole('cell').eq(2).contains('417')
                      })
                      break
                    case 4:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('cell').should('have.length', 3)
                        cy.findAllByRole('cell').eq(0).contains('Nov 24')
                        cy.findAllByRole('cell').eq(1).contains('ABC')
                        cy.findAllByRole('cell').eq(2).contains('546')
                      })
                      break
                    case 5:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('cell').should('have.length', 3)
                        cy.findAllByRole('cell').eq(0).contains('Dec 24')
                        cy.findAllByRole('cell').eq(1).contains('ABC')
                        cy.findAllByRole('cell').eq(2).contains('605')
                      })
                      break
                    case 6:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('cell').should('have.length', 3)
                        cy.findAllByRole('cell').eq(0).contains('Jan 25')
                        cy.findAllByRole('cell').eq(1).contains('ABC')
                        cy.findAllByRole('cell').eq(2).contains('665')
                      })
                      break
                    default:
                      break
                  }
                })
            })
          })
        })

        cy.findByLabelText(/Missing MetricThree timeseries chart/).within(() => {
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
                        cy.findAllByRole('columnheader').eq(2).contains('Has no MetricThree')
                      })
                      break
                    case 1:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('cell').should('have.length', 3)
                        cy.findAllByRole('cell').eq(0).contains('Aug 24')
                        cy.findAllByRole('cell').eq(1).contains('ABC')
                        cy.findAllByRole('cell').eq(2).contains('447')
                      })
                      break
                    case 2:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('cell').should('have.length', 3)
                        cy.findAllByRole('cell').eq(0).contains('Sep 24')
                        cy.findAllByRole('cell').eq(1).contains('ABC')
                        cy.findAllByRole('cell').eq(2).contains('430')
                      })
                      break
                    case 3:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('cell').should('have.length', 3)
                        cy.findAllByRole('cell').eq(0).contains('Oct 24')
                        cy.findAllByRole('cell').eq(1).contains('ABC')
                        cy.findAllByRole('cell').eq(2).contains('767')
                      })
                      break
                    case 4:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('cell').should('have.length', 3)
                        cy.findAllByRole('cell').eq(0).contains('Nov 24')
                        cy.findAllByRole('cell').eq(1).contains('ABC')
                        cy.findAllByRole('cell').eq(2).contains('431')
                      })
                      break
                    case 5:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('cell').should('have.length', 3)
                        cy.findAllByRole('cell').eq(0).contains('Dec 24')
                        cy.findAllByRole('cell').eq(1).contains('ABC')
                        cy.findAllByRole('cell').eq(2).contains('423')
                      })
                      break
                    case 6:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('cell').should('have.length', 3)
                        cy.findAllByRole('cell').eq(0).contains('Jan 25')
                        cy.findAllByRole('cell').eq(1).contains('ABC')
                        cy.findAllByRole('cell').eq(2).contains('799')
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

      cy.findAllByLabelText(/Line timeseries charts - multiple line/).within(() => {
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
                        cy.findAllByRole('cell').eq(0).contains('Aug 24')
                        cy.findAllByRole('cell').eq(1).contains('ABC')
                        cy.findAllByRole('cell').eq(2).contains('781')
                      })
                      break
                    case 2:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('cell').should('have.length', 3)
                        cy.findAllByRole('cell').eq(0).contains('Aug 24')
                        cy.findAllByRole('cell').eq(1).contains('GHI')
                        cy.findAllByRole('cell').eq(2).contains('610')
                      })
                      break
                    case 3:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('cell').should('have.length', 3)
                        cy.findAllByRole('cell').eq(0).contains('Aug 24')
                        cy.findAllByRole('cell').eq(1).contains('DEF')
                        cy.findAllByRole('cell').eq(2).contains('499')
                      })
                      break
                    case 4:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('cell').should('have.length', 3)
                        cy.findAllByRole('cell').eq(0).contains('Sep 24')
                        cy.findAllByRole('cell').eq(1).contains('ABC')
                        cy.findAllByRole('cell').eq(2).contains('514')
                      })
                      break
                    case 5:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('cell').should('have.length', 3)
                        cy.findAllByRole('cell').eq(0).contains('Sep 24')
                        cy.findAllByRole('cell').eq(1).contains('GHI')
                        cy.findAllByRole('cell').eq(2).contains('518')
                      })
                      break
                    case 6:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('cell').should('have.length', 3)
                        cy.findAllByRole('cell').eq(0).contains('Sep 24')
                        cy.findAllByRole('cell').eq(1).contains('DEF')
                        cy.findAllByRole('cell').eq(2).contains('521')
                      })
                      break
                    case 13:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('cell').should('have.length', 3)
                        cy.findAllByRole('cell').eq(0).contains('Dec 24')
                        cy.findAllByRole('cell').eq(1).contains('ABC')
                        cy.findAllByRole('cell').eq(2).contains('431')
                      })
                      break
                    case 14:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('cell').should('have.length', 3)
                        cy.findAllByRole('cell').eq(0).contains('Dec 24')
                        cy.findAllByRole('cell').eq(1).contains('GHI')
                        cy.findAllByRole('cell').eq(2).contains('536')
                      })
                      break
                    case 15:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('cell').should('have.length', 3)
                        cy.findAllByRole('cell').eq(0).contains('Dec 24')
                        cy.findAllByRole('cell').eq(1).contains('DEF')
                        cy.findAllByRole('cell').eq(2).contains('590')
                      })
                      break
                    case 16:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('cell').should('have.length', 3)
                        cy.findAllByRole('cell').eq(0).contains('Jan 25')
                        cy.findAllByRole('cell').eq(1).contains('ABC')
                        cy.findAllByRole('cell').eq(2).contains('614')
                      })
                      break
                    case 17:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('cell').should('have.length', 3)
                        cy.findAllByRole('cell').eq(0).contains('Jan 25')
                        cy.findAllByRole('cell').eq(1).contains('GHI')
                        cy.findAllByRole('cell').eq(2).contains('713')
                      })
                      break
                    case 18:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('cell').should('have.length', 3)
                        cy.findAllByRole('cell').eq(0).contains('Jan 25')
                        cy.findAllByRole('cell').eq(1).contains('DEF')
                        cy.findAllByRole('cell').eq(2).contains('682')
                      })
                      break
                    default:
                      break
                  }
                })
            })
          })
        })

        cy.findByLabelText(/Missing MetricTwo timeseries chart/).within(() => {
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
                        cy.findAllByRole('columnheader').eq(2).contains('Has no MetricTwo')
                      })
                      break
                    case 1:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('cell').should('have.length', 3)
                        cy.findAllByRole('cell').eq(0).contains('Aug 24')
                        cy.findAllByRole('cell').eq(1).contains('ABC')
                        cy.findAllByRole('cell').eq(2).contains('528')
                      })
                      break
                    case 2:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('cell').should('have.length', 3)
                        cy.findAllByRole('cell').eq(0).contains('Aug 24')
                        cy.findAllByRole('cell').eq(1).contains('GHI')
                        cy.findAllByRole('cell').eq(2).contains('785')
                      })
                      break
                    case 3:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('cell').should('have.length', 3)
                        cy.findAllByRole('cell').eq(0).contains('Aug 24')
                        cy.findAllByRole('cell').eq(1).contains('DEF')
                        cy.findAllByRole('cell').eq(2).contains('524')
                      })
                      break
                    case 4:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('cell').should('have.length', 3)
                        cy.findAllByRole('cell').eq(0).contains('Sep 24')
                        cy.findAllByRole('cell').eq(1).contains('ABC')
                        cy.findAllByRole('cell').eq(2).contains('554')
                      })
                      break
                    case 5:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('cell').should('have.length', 3)
                        cy.findAllByRole('cell').eq(0).contains('Sep 24')
                        cy.findAllByRole('cell').eq(1).contains('GHI')
                        cy.findAllByRole('cell').eq(2).contains('758')
                      })
                      break
                    case 6:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('cell').should('have.length', 3)
                        cy.findAllByRole('cell').eq(0).contains('Sep 24')
                        cy.findAllByRole('cell').eq(1).contains('DEF')
                        cy.findAllByRole('cell').eq(2).contains('531')
                      })
                      break
                    case 13:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('cell').should('have.length', 3)
                        cy.findAllByRole('cell').eq(0).contains('Dec 24')
                        cy.findAllByRole('cell').eq(1).contains('ABC')
                        cy.findAllByRole('cell').eq(2).contains('605')
                      })
                      break
                    case 14:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('cell').should('have.length', 3)
                        cy.findAllByRole('cell').eq(0).contains('Dec 24')
                        cy.findAllByRole('cell').eq(1).contains('GHI')
                        cy.findAllByRole('cell').eq(2).contains('664')
                      })
                      break
                    case 15:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('cell').should('have.length', 3)
                        cy.findAllByRole('cell').eq(0).contains('Dec 24')
                        cy.findAllByRole('cell').eq(1).contains('DEF')
                        cy.findAllByRole('cell').eq(2).contains('708')
                      })
                      break
                    case 16:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('cell').should('have.length', 3)
                        cy.findAllByRole('cell').eq(0).contains('Jan 25')
                        cy.findAllByRole('cell').eq(1).contains('ABC')
                        cy.findAllByRole('cell').eq(2).contains('665')
                      })
                      break
                    case 17:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('cell').should('have.length', 3)
                        cy.findAllByRole('cell').eq(0).contains('Jan 25')
                        cy.findAllByRole('cell').eq(1).contains('GHI')
                        cy.findAllByRole('cell').eq(2).contains('506')
                      })
                      break
                    case 18:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('cell').should('have.length', 3)
                        cy.findAllByRole('cell').eq(0).contains('Jan 25')
                        cy.findAllByRole('cell').eq(1).contains('DEF')
                        cy.findAllByRole('cell').eq(2).contains('409')
                      })
                      break
                    default:
                      break
                  }
                })
            })
          })
        })

        cy.findByLabelText(/Missing MetricThree timeseries chart/).within(() => {
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
                        cy.findAllByRole('columnheader').eq(2).contains('Has no MetricThree')
                      })
                      break
                    case 1:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('cell').should('have.length', 3)
                        cy.findAllByRole('cell').eq(0).contains('Aug 24')
                        cy.findAllByRole('cell').eq(1).contains('ABC')
                        cy.findAllByRole('cell').eq(2).contains('447')
                      })
                      break
                    case 2:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('cell').should('have.length', 3)
                        cy.findAllByRole('cell').eq(0).contains('Aug 24')
                        cy.findAllByRole('cell').eq(1).contains('GHI')
                        cy.findAllByRole('cell').eq(2).contains('694')
                      })
                      break
                    case 3:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('cell').should('have.length', 3)
                        cy.findAllByRole('cell').eq(0).contains('Aug 24')
                        cy.findAllByRole('cell').eq(1).contains('DEF')
                        cy.findAllByRole('cell').eq(2).contains('404')
                      })
                      break
                    case 4:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('cell').should('have.length', 3)
                        cy.findAllByRole('cell').eq(0).contains('Sep 24')
                        cy.findAllByRole('cell').eq(1).contains('ABC')
                        cy.findAllByRole('cell').eq(2).contains('430')
                      })
                      break
                    case 5:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('cell').should('have.length', 3)
                        cy.findAllByRole('cell').eq(0).contains('Sep 24')
                        cy.findAllByRole('cell').eq(1).contains('GHI')
                        cy.findAllByRole('cell').eq(2).contains('430')
                      })
                      break
                    case 6:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('cell').should('have.length', 3)
                        cy.findAllByRole('cell').eq(0).contains('Sep 24')
                        cy.findAllByRole('cell').eq(1).contains('DEF')
                        cy.findAllByRole('cell').eq(2).contains('573')
                      })
                      break
                    case 13:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('cell').should('have.length', 3)
                        cy.findAllByRole('cell').eq(0).contains('Dec 24')
                        cy.findAllByRole('cell').eq(1).contains('ABC')
                        cy.findAllByRole('cell').eq(2).contains('423')
                      })
                      break
                    case 14:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('cell').should('have.length', 3)
                        cy.findAllByRole('cell').eq(0).contains('Dec 24')
                        cy.findAllByRole('cell').eq(1).contains('GHI')
                        cy.findAllByRole('cell').eq(2).contains('692')
                      })
                      break
                    case 15:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('cell').should('have.length', 3)
                        cy.findAllByRole('cell').eq(0).contains('Dec 24')
                        cy.findAllByRole('cell').eq(1).contains('DEF')
                        cy.findAllByRole('cell').eq(2).contains('718')
                      })
                      break
                    case 16:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('cell').should('have.length', 3)
                        cy.findAllByRole('cell').eq(0).contains('Jan 25')
                        cy.findAllByRole('cell').eq(1).contains('ABC')
                        cy.findAllByRole('cell').eq(2).contains('799')
                      })
                      break
                    case 17:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('cell').should('have.length', 3)
                        cy.findAllByRole('cell').eq(0).contains('Jan 25')
                        cy.findAllByRole('cell').eq(1).contains('GHI')
                        cy.findAllByRole('cell').eq(2).contains('457')
                      })
                      break
                    case 18:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('cell').should('have.length', 3)
                        cy.findAllByRole('cell').eq(0).contains('Jan 25')
                        cy.findAllByRole('cell').eq(1).contains('DEF')
                        cy.findAllByRole('cell').eq(2).contains('720')
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

  describe('Partial data', () => {
    let partialData = ''

    before(() => {
      cy.task('resetStubs')
      executeDashboardStubs()
      cy.task('stubLineTimeseriesDashboardPartialData')
      cy.task('stubDashboardResultPartialDataHistoric')
      cy.visit(path)

      requestReportByNameAndDescription({
        name: 'Line-timeseries - Partial dataset',
        description: 'This dashboard represents example line-timeseries visualisations using a partial dataset.',
      })

      cy.findByRole('heading', { level: 1, name: /Line-timeseries - Partial dataset/ }).should('be.visible')
      cy.injectAxe()
      cy.checkA11y()

      cy.url().then((url) => {
        partialData = url
      })
    })

    beforeEach(() => {
      cy.visit(partialData)
    })

    it('should should have the correct amount of sections', () => {
      cy.findAllByRole('heading', { level: 2 })
        .should('have.length', 2)
        .each((section, index) => {
          switch (index) {
            case 0:
              cy.wrap(section).contains('Section 1 title')
              break
            case 1:
              cy.wrap(section).contains('Full Dataset')
              break
            default:
              break
          }
        })
    })

    it('should should show the correct data for simple bar charts', () => {
      cy.findAllByLabelText(/Section 1 title/).within(() => {
        cy.findAllByRole('heading', { level: 3 }).should('have.length', 7)

        cy.findByLabelText(/Prisoner totals over time/).within(() => {
          cy.findByRole('tab', { name: /Table/ }).click()
          cy.findByLabelText(/Table.*/i).within(() => {
            cy.findByRole('table').within(() => {
              // TODO in followup PR
            })
          })
        })

        cy.findByLabelText(/Prisoner totals by establishment over time/).within(() => {
          cy.findByRole('tab', { name: /Table/ }).click()
          cy.findByLabelText(/Table.*/i).within(() => {
            cy.findByRole('table').within(() => {
              // TODO in followup PR
            })
          })
        })

        cy.findByLabelText(/DietOne totals over time line chart/).within(() => {
          cy.findByRole('tab', { name: /Table/ }).click()
          cy.findByLabelText(/Table.*/i).within(() => {
            cy.findByRole('table').within(() => {
              // TODO in followup PR
            })
          })
        })

        cy.findByLabelText(/DietThree totals over time line chart/).within(() => {
          cy.findByRole('tab', { name: /Table/ }).click()
          cy.findByLabelText(/Table.*/i).within(() => {
            cy.findByRole('table').within(() => {
              // TODO in followup PR
            })
          })
        })

        cy.findByLabelText(/DietOne totals over time by wing line/).within(() => {
          cy.findByRole('tab', { name: /Table/ }).click()
          cy.findByLabelText(/Table.*/i).within(() => {
            cy.findByRole('table').within(() => {
              // TODO in followup PR
            })
          })
        })

        cy.findByLabelText(/DietOne totals over time line by establishment/).within(() => {
          cy.findByRole('tab', { name: /Table/ }).click()
          cy.findByLabelText(/Table.*/i).within(() => {
            cy.findByRole('table').within(() => {
              // TODO in followup PR
            })
          })
        })

        cy.findByLabelText(/DietOne totals over time by cell/).within(() => {
          cy.findByRole('tab', { name: /Table/ }).click()
          cy.findByLabelText(/Table.*/i).within(() => {
            cy.findByRole('table').within(() => {
              // TODO in followup PR
            })
          })
        })
      })
    })
  })
})
