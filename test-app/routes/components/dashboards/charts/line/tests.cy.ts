import { executeDashboardStubs, requestReportByNameAndDescription } from '../../../../../../cypress-tests/cypressUtils'

context('Dashboard visualisation: line chart', () => {
  const path = '/embedded/platform/'

  describe('Complete data', () => {
    let completeUrl = ''

    before(() => {
      cy.task('resetStubs')
      executeDashboardStubs()
      cy.task('stubLineCompleteData')
      cy.task('stubDashboardResultCompleteData')
      cy.visit(path)

      requestReportByNameAndDescription({
        name: 'Line - Complete dataset',
        description: 'This dashboard represents example Line visualisations using a complete dataset.',
      })

      cy.findByRole('heading', { level: 1, name: /Line - Complete dataset/ }).should('be.visible')
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
        .should('have.length', 2)
        .each((section, index) => {
          switch (index) {
            case 0:
              cy.wrap(section).contains('Simple Line charts')
              break
            case 1:
              cy.wrap(section).contains('Full Dataset')
              break
            default:
              break
          }
        })
    })

    it('should should show the correct data for charts', () => {
      cy.findAllByLabelText(/Simple Line charts/).within(() => {
        cy.findAllByRole('heading', { level: 3 }).should('have.length', 2)

        cy.findByLabelText(/MetricOne & MetricTwo values/).within(() => {
          cy.findByRole('tab', { name: /Table/ }).click()
          cy.findByLabelText(/Table.*/i).within(() => {
            cy.findByRole('table').within(() => {
              cy.findAllByRole('row')
                .should('have.length', 4)
                .each((row, index) => {
                  switch (index) {
                    case 0:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('columnheader').should('have.length', 5)
                        cy.findAllByRole('columnheader').eq(0).contains('Establishment ID')
                        cy.findAllByRole('columnheader').eq(1).contains('Has MetricOne')
                        cy.findAllByRole('columnheader').eq(2).contains('No MetricOne')
                        cy.findAllByRole('columnheader').eq(3).contains('Has MetricTwo')
                        cy.findAllByRole('columnheader').eq(4).contains('No MetricTwo')
                      })
                      break
                    default:
                      break
                  }
                })
            })
          })
        })

        cy.findByLabelText(/All metrics together/).within(() => {
          cy.findByRole('tab', { name: /Table/ }).click()
          cy.findByLabelText(/Table.*/i).within(() => {
            cy.findByRole('table').within(() => {
              cy.findAllByRole('row')
                .should('have.length', 4)
                .each((row, index) => {
                  switch (index) {
                    case 0:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('columnheader').should('have.length', 7)
                        cy.findAllByRole('columnheader').eq(0).contains('Establishment ID')
                        cy.findAllByRole('columnheader').eq(1).contains('Has MetricTwo')
                        cy.findAllByRole('columnheader').eq(2).contains('No MetricTwo')
                        cy.findAllByRole('columnheader').eq(3).contains('Has MetricThree')
                        cy.findAllByRole('columnheader').eq(4).contains('No MetricThree')
                        cy.findAllByRole('columnheader').eq(5).contains('Has MetricOne')
                        cy.findAllByRole('columnheader').eq(6).contains('No MetricOne')
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
