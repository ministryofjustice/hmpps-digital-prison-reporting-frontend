import { executeDashboardStubs, requestReportByNameAndDescription } from '../../../../../../cypress-tests/cypressUtils'

context('Dashboard visualisation: Doughnut chart', () => {
  const path = '/embedded/platform/'

  describe('Complete data', () => {
    let completeDashboardUrl = ''

    before(() => {
      cy.task('resetStubs')
      executeDashboardStubs()
      cy.task('stubDoughnutDashboardCompleteData')
      cy.task('stubDashboardResultCompleteData')
      cy.visit(path)

      requestReportByNameAndDescription({
        name: 'Doughnut - Complete dataset',
        description: 'This dashboard represents example Doughnut visualisations using a complete dataset.',
      })

      cy.findByRole('heading', { level: 1, name: /Doughnut - Complete dataset/ }).should('be.visible')
      cy.injectAxe()
      cy.checkA11y()

      cy.url().then((url) => {
        completeDashboardUrl = url
      })
    })

    beforeEach(() => {
      cy.visit(completeDashboardUrl)
    })

    it('should should have the correct amount of sections', () => {
      cy.findAllByRole('heading', { level: 2 })
        .should('have.length', 4)
        .each((section, index) => {
          switch (index) {
            case 0:
              cy.wrap(section).contains('Simple Doughnut charts')
              break
            case 1:
              cy.wrap(section).contains('Two ring Doughnut charts')
              break
            case 2:
              cy.wrap(section).contains('Multiple rings Doughnut charts')
              break
            case 3:
              cy.wrap(section).contains('Full Dataset')
              break
            default:
              break
          }
        })
    })

    it('should should show the correct data for charts', () => {
      cy.findAllByLabelText(/Simple Doughnut charts/).within(() => {
        cy.findAllByRole('heading', { level: 3 }).should('have.length', 4)

        cy.findByLabelText(/MetricOne values/).within(() => {
          cy.findByRole('tab', { name: /Table/ }).click()
          cy.findByLabelText(/Table.*/i).within(() => {
            cy.findByRole('table').within(() => {
              //
            })
          })
        })

        cy.findByLabelText(/MetricTwo values/).within(() => {
          cy.findByRole('tab', { name: /Table/ }).click()
          cy.findByLabelText(/Table.*/i).within(() => {
            cy.findByRole('table').within(() => {
              //
            })
          })
        })

        cy.findAllByLabelText(/MetricThree values/)
          .eq(0)
          .within(() => {
            cy.findByRole('tab', { name: /Table/ }).click()
            cy.findByLabelText(/Table.*/i).within(() => {
              cy.findByRole('table').within(() => {
                //
              })
            })
          })

        cy.findAllByLabelText(/MetricTwo & MetricThree values/).within(() => {
          cy.findByRole('tab', { name: /Table/ }).click()
          cy.findByLabelText(/Table.*/i).within(() => {
            cy.findByRole('table').within(() => {
              //
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
              //
            })
          })
        })

        cy.findByLabelText(/MetricTwo values/).within(() => {
          cy.findByRole('tab', { name: /Table/ }).click()
          cy.findByLabelText(/Table.*/i).within(() => {
            cy.findByRole('table').within(() => {
              //
            })
          })
        })

        cy.findAllByLabelText(/MetricThree values/)
          .eq(0)
          .within(() => {
            cy.findByRole('tab', { name: /Table/ }).click()
            cy.findByLabelText(/Table.*/i).within(() => {
              cy.findByRole('table').within(() => {
                //
              })
            })
          })

        cy.findAllByLabelText(/MetricTwo & MetricThree values/).within(() => {
          cy.findByRole('tab', { name: /Table/ }).click()
          cy.findByLabelText(/Table.*/i).within(() => {
            cy.findByRole('table').within(() => {
              //
            })
          })
        })
      })

      cy.findAllByLabelText(/Multiple rings Doughnut charts/).within(() => {
        cy.findAllByRole('heading', { level: 3 }).should('have.length', 4)

        cy.findByLabelText(/MetricOne values/).within(() => {
          cy.findByRole('tab', { name: /Table/ }).click()
          cy.findByLabelText(/Table.*/i).within(() => {
            cy.findByRole('table').within(() => {
              //
            })
          })
        })

        cy.findByLabelText(/MetricTwo values/).within(() => {
          cy.findByRole('tab', { name: /Table/ }).click()
          cy.findByLabelText(/Table.*/i).within(() => {
            cy.findByRole('table').within(() => {
              //
            })
          })
        })

        cy.findAllByLabelText(/MetricThree values/)
          .eq(0)
          .within(() => {
            cy.findByRole('tab', { name: /Table/ }).click()
            cy.findByLabelText(/Table.*/i).within(() => {
              cy.findByRole('table').within(() => {
                //
              })
            })
          })

        cy.findAllByLabelText(/MetricTwo & MetricThree values/).within(() => {
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
