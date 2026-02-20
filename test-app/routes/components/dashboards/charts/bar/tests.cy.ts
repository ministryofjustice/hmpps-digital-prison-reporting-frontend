import { executeDashboardStubs, requestReportByNameAndDescription } from '../../../../../../cypress-tests/cypressUtils'

context('Dashboard visualisation: bar chart', () => {
  const path = '/embedded/platform/'

  describe('Complete data', () => {
    beforeEach(() => {
      cy.task('resetStubs')
      executeDashboardStubs()
      cy.task('stubBarDashboardCompleteData')
      cy.task('stubDashboardResultCompleteData')
      cy.visit(path)

      requestReportByNameAndDescription({
        name: 'Bar - Complete dataset',
        description: 'This dashboard represents example Bar visualisations using a complete dataset.',
      })

      cy.findByRole('heading', { level: 1, name: /Bar - Complete dataset/ }).should('be.visible')
      cy.injectAxe()
      cy.checkA11y()
    })

    it('should should have the correct amount of sections', () => {
      cy.findAllByRole('heading', { level: 2 })
        .should('have.length', 3)
        .each((section, index) => {
          switch (index) {
            case 0:
              cy.wrap(section).contains('Simple bar charts')
              break
            case 1:
              cy.wrap(section).contains('Horizontal bar charts')
              break
            case 2:
              cy.wrap(section).contains('Full Dataset')
              break
            default:
              break
          }
        })
    })

    it('should should show the correct data for simple bar charts', () => {
      cy.findAllByLabelText(/Simple bar charts/).within(() => {
        cy.findAllByRole('heading', { level: 3 }).should('have.length', 3)

        cy.findByLabelText(/Diet totals as bar chart/).within(() => {
          cy.findByRole('tab', { name: /Table/ }).click()
          cy.findByLabelText(/Table.*/i).within(() => {
            cy.findByRole('table').within(() => {
              cy.findAllByRole('row')
                .should('have.length', 5)
                .each((row, index) => {
                  switch (index) {
                    case 0:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('columnheader').should('have.length', 3)
                        cy.findAllByRole('columnheader').eq(0).contains('Establishment ID')
                        cy.findAllByRole('columnheader').eq(1).contains('Has MetricOne')
                        cy.findAllByRole('columnheader').eq(2).contains('No MetricOne')
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
    beforeEach(() => {
      cy.task('resetStubs')
      executeDashboardStubs()
      cy.task('stubBarDashboardPartialData')
      cy.task('stubDashboardResultPartialData')
      cy.visit(path)

      requestReportByNameAndDescription({
        name: 'Bar - Partial dataset',
        description: 'This dashboard represents example bar visualisations using a partial dataset.',
      })

      cy.findByRole('heading', { level: 1, name: /Bar - Partial dataset/ }).should('be.visible')
      cy.injectAxe()
      cy.checkA11y()
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
        cy.findAllByRole('heading', { level: 3 }).should('have.length', 4)

        cy.findByLabelText(/Diet totals as bar chart/).within(() => {
          cy.findByRole('tab', { name: /Table/ }).click()
          cy.findByLabelText(/Table.*/i).within(() => {
            cy.findByRole('table').within(() => {
              //
            })
          })
        })

        cy.findByLabelText(/Diet totals by establishment/).within(() => {
          cy.findByRole('tab', { name: /Table/ }).click()
          cy.findByLabelText(/Table.*/i).within(() => {
            cy.findByRole('table').within(() => {
              //
            })
          })
        })

        cy.findByLabelText(/Diet totals by wing/).within(() => {
          cy.findByRole('tab', { name: /Table/ }).click()
          cy.findByLabelText(/Table.*/i).within(() => {
            cy.findByRole('table').within(() => {
              //
            })
          })
        })

        cy.findByLabelText(/Diet totals by cell bar/).within(() => {
          cy.findByRole('tab', { name: /Table/ }).click()
          cy.findByLabelText(/Table.*/i).within(() => {
            cy.findByRole('table').within(() => {
              //
            })
          })
        })
      })
    })
  })
})
