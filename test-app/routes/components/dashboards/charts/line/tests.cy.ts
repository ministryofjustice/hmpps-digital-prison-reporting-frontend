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
              // TODO in followup PR
            })
          })
        })

        cy.findByLabelText(/Missing MetricTwo timeseries chart/).within(() => {
          cy.findByRole('tab', { name: /Table/ }).click()
          cy.findByLabelText(/Table.*/i).within(() => {
            cy.findByRole('table').within(() => {
              // TODO in followup PR
            })
          })
        })

        cy.findByLabelText(/Missing MetricThree timeseries chart/).within(() => {
          cy.findByRole('tab', { name: /Table/ }).click()
          cy.findByLabelText(/Table.*/i).within(() => {
            cy.findByRole('table').within(() => {
              // TODO in followup PR
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
              // TODO in followup PR
            })
          })
        })

        cy.findByLabelText(/Missing MetricTwo timeseries chart/).within(() => {
          cy.findByRole('tab', { name: /Table/ }).click()
          cy.findByLabelText(/Table.*/i).within(() => {
            cy.findByRole('table').within(() => {
              // TODO in followup PR
            })
          })
        })

        cy.findByLabelText(/Missing MetricThree timeseries chart/).within(() => {
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
