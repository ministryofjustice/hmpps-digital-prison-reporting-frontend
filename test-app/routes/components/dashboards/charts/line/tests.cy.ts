import {
  checkA11y,
  executeDashboardStubs,
  requestReportByNameAndDescription,
} from '../../../../../../cypress-tests/cypressUtils'

context('Dashboard visualisation: line chart', () => {
  const path = '/'

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
      checkA11y()

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
                        cy.findAllByRole('columnheader').eq(1).contains('Point 1')
                        cy.findAllByRole('columnheader').eq(2).contains('Point 2')
                        cy.findAllByRole('columnheader').eq(3).contains('Point 3')
                        cy.findAllByRole('columnheader').eq(4).contains('Point 4')
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
                        cy.findAllByRole('columnheader').eq(1).contains('Point 1')
                        cy.findAllByRole('columnheader').eq(2).contains('Point 2')
                        cy.findAllByRole('columnheader').eq(3).contains('Point 3')
                        cy.findAllByRole('columnheader').eq(4).contains('Point 4')
                        cy.findAllByRole('columnheader').eq(5).contains('Point 5')
                        cy.findAllByRole('columnheader').eq(6).contains('Point 6')
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
    let partialUrl = ''

    before(() => {
      cy.task('resetStubs')
      executeDashboardStubs()
      cy.task('stubLinePartialData')
      cy.task('stubDashboardResultPartialData')
      cy.visit(path)

      requestReportByNameAndDescription({
        name: 'Line - Partial dataset',
        description: 'This dashboard represents example Line visualisations using a partial dataset.',
      })

      cy.findByRole('heading', { level: 1, name: /Line - Partial dataset/ }).should('be.visible')
      checkA11y()

      cy.url().then((url) => {
        partialUrl = url
      })
    })

    beforeEach(() => {
      cy.visit(partialUrl)
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
        cy.findAllByRole('heading', { level: 3 }).should('have.length', 3)

        cy.findByLabelText(/Diet totals as line chart/).within(() => {
          cy.findByRole('tab', { name: /Table/ }).click()
          cy.findByLabelText(/Table.*/i).within(() => {
            cy.findByRole('table').within(() => {
              cy.findAllByRole('row')
                .should('have.length', 5)
                .each((row, index) => {
                  switch (index) {
                    case 0:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('columnheader').should('have.length', 2)
                        cy.findAllByRole('columnheader').eq(0).contains('Diet')
                        cy.findAllByRole('columnheader').eq(1).contains('Total prisoners')
                      })
                      break
                    case 1:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('cell').should('have.length', 2)
                        cy.findAllByRole('cell').eq(0).contains('Diet one')
                        cy.findAllByRole('cell').eq(1).contains('1219')
                      })
                      break
                    case 2:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('cell').should('have.length', 2)
                        cy.findAllByRole('cell').eq(0).contains('Diet two')
                        cy.findAllByRole('cell').eq(1).contains('1125')
                      })
                      break
                    case 3:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('cell').should('have.length', 2)
                        cy.findAllByRole('cell').eq(0).contains('Diet three')
                        cy.findAllByRole('cell').eq(1).contains('1838')
                      })
                      break
                    case 4:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('cell').should('have.length', 2)
                        cy.findAllByRole('cell').eq(0).contains('Diet four')
                        cy.findAllByRole('cell').eq(1).contains('818')
                      })
                      break
                    default:
                      break
                  }
                })
            })
          })
        })

        cy.findByLabelText(/Diet totals by establishment/).within(() => {
          cy.findByRole('tab', { name: /Table/ }).click()
          cy.findByLabelText(/Table.*/i).within(() => {
            cy.findByRole('table').within(() => {
              cy.findAllByRole('row')
                .should('have.length', 9)
                .each((row, index) => {
                  switch (index) {
                    case 0:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('columnheader').should('have.length', 3)
                        cy.findAllByRole('columnheader').eq(0).contains('Establishment ID')
                        cy.findAllByRole('columnheader').eq(1).contains('Diet')
                        cy.findAllByRole('columnheader').eq(2).contains('Total prisoners')
                      })
                      break
                    case 1:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('cell').should('have.length', 3)
                        cy.findAllByRole('cell').eq(0).contains('ABC')
                        cy.findAllByRole('cell').eq(1).contains('Diet one')
                        cy.findAllByRole('cell').eq(2).contains('360')
                      })
                      break
                    case 2:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('cell').should('have.length', 3)
                        cy.findAllByRole('cell').eq(0).contains('ABC')
                        cy.findAllByRole('cell').eq(1).contains('Diet two')
                        cy.findAllByRole('cell').eq(2).contains('256')
                      })
                      break
                    case 3:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('cell').should('have.length', 3)
                        cy.findAllByRole('cell').eq(0).contains('ABC')
                        cy.findAllByRole('cell').eq(1).contains('Diet three')
                        cy.findAllByRole('cell').eq(2).contains('559')
                      })
                      break
                    case 4:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('cell').should('have.length', 3)
                        cy.findAllByRole('cell').eq(0).contains('ABC')
                        cy.findAllByRole('cell').eq(1).contains('Diet four')
                        cy.findAllByRole('cell').eq(2).contains('144')
                      })
                      break
                    case 5:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('cell').should('have.length', 3)
                        cy.findAllByRole('cell').eq(0).contains('DEF')
                        cy.findAllByRole('cell').eq(1).contains('Diet one')
                        cy.findAllByRole('cell').eq(2).contains('260')
                      })
                      break
                    case 6:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('cell').should('have.length', 3)
                        cy.findAllByRole('cell').eq(0).contains('DEF')
                        cy.findAllByRole('cell').eq(1).contains('Diet two')
                        cy.findAllByRole('cell').eq(2).contains('281')
                      })
                      break
                    case 7:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('cell').should('have.length', 3)
                        cy.findAllByRole('cell').eq(0).contains('DEF')
                        cy.findAllByRole('cell').eq(1).contains('Diet three')
                        cy.findAllByRole('cell').eq(2).contains('520')
                      })
                      break
                    case 8:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('cell').should('have.length', 3)
                        cy.findAllByRole('cell').eq(0).contains('DEF')
                        cy.findAllByRole('cell').eq(1).contains('Diet four')
                        cy.findAllByRole('cell').eq(2).contains('160')
                      })
                      break
                    default:
                      break
                  }
                })
            })
          })
        })

        cy.findByLabelText(/Diet totals by wing/).within(() => {
          cy.findByRole('tab', { name: /Table/ }).click()
          cy.findByLabelText(/Table.*/i).within(() => {
            cy.findByRole('table').within(() => {
              cy.findAllByRole('row')
                .should('have.length', 17)
                .each((row, index) => {
                  switch (index) {
                    case 0:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('columnheader').should('have.length', 4)
                        cy.findAllByRole('columnheader').eq(0).contains('Establishment ID')
                        cy.findAllByRole('columnheader').eq(1).contains('Wing')
                        cy.findAllByRole('columnheader').eq(2).contains('Diet')
                        cy.findAllByRole('columnheader').eq(3).contains('Total prisoners')
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
