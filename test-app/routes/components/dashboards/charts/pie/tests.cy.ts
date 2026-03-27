import {
  checkA11y,
  executeDashboardStubs,
  requestReportByNameAndDescription,
} from '../../../../../../cypress-tests/cypressUtils'

context('Dashboard visualisation: Doughnut chart', () => {
  const path = '/'

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
      checkA11y()

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
              cy.findAllByRole('row')
                .should('have.length', 2)
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
                    case 1:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('cell').should('have.length', 3)
                        cy.findAllByRole('cell').eq(0).contains('ABC')
                        cy.findAllByRole('cell').eq(1).contains('533')
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
                        cy.findAllByRole('columnheader').should('have.length', 3)
                        cy.findAllByRole('columnheader').eq(0).contains('Establishment ID')
                        cy.findAllByRole('columnheader').eq(1).contains('Has MetricTwo')
                        cy.findAllByRole('columnheader').eq(2).contains('No MetricTwo')
                      })
                      break
                    case 1:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('cell').should('have.length', 3)
                        cy.findAllByRole('cell').eq(0).contains('ABC')
                        cy.findAllByRole('cell').eq(1).contains('684')
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

        cy.findAllByLabelText(/MetricThree values/)
          .eq(0)
          .within(() => {
            cy.findByRole('tab', { name: /Table/ }).click()
            cy.findByLabelText(/Table.*/i).within(() => {
              cy.findByRole('table').within(() => {
                cy.findAllByRole('row')
                  .should('have.length', 2)
                  .each((row, index) => {
                    switch (index) {
                      case 0:
                        cy.wrap(row).within(() => {
                          cy.findAllByRole('columnheader').should('have.length', 3)
                          cy.findAllByRole('columnheader').eq(0).contains('Establishment ID')
                          cy.findAllByRole('columnheader').eq(1).contains('Has MetricThree')
                          cy.findAllByRole('columnheader').eq(2).contains('No MetricThree')
                        })
                        break
                      case 1:
                        cy.wrap(row).within(() => {
                          cy.findAllByRole('cell').should('have.length', 3)
                          cy.findAllByRole('cell').eq(0).contains('ABC')
                          cy.findAllByRole('cell').eq(1).contains('680')
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

        cy.findAllByLabelText(/MetricTwo & MetricThree values/).within(() => {
          cy.findByRole('tab', { name: /Table/ }).click()
          cy.findByLabelText(/Table.*/i).within(() => {
            cy.findByRole('table').within(() => {
              cy.findAllByRole('row')
                .should('have.length', 2)
                .each((row, index) => {
                  switch (index) {
                    case 0:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('columnheader').should('have.length', 5)
                        cy.findAllByRole('columnheader').eq(0).contains('Establishment ID')
                        cy.findAllByRole('columnheader').eq(1).contains('Has MetricTwo')
                        cy.findAllByRole('columnheader').eq(2).contains('No MetricTwo')
                        cy.findAllByRole('columnheader').eq(3).contains('Has MetricThree')
                        cy.findAllByRole('columnheader').eq(4).contains('No MetricThree')
                      })
                      break
                    case 1:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('cell').should('have.length', 5)
                        cy.findAllByRole('cell').eq(0).contains('ABC')
                        cy.findAllByRole('cell').eq(1).contains('684')
                        cy.findAllByRole('cell').eq(2).contains('665')
                        cy.findAllByRole('cell').eq(3).contains('680')
                        cy.findAllByRole('cell').eq(4).contains('799')
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
                        cy.findAllByRole('columnheader').should('have.length', 3)
                        cy.findAllByRole('columnheader').eq(0).contains('Establishment ID')
                        cy.findAllByRole('columnheader').eq(1).contains('Has MetricOne')
                        cy.findAllByRole('columnheader').eq(2).contains('No MetricOne')
                      })
                      break
                    case 1:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('cell').should('have.length', 3)
                        cy.findAllByRole('cell').eq(0).contains('ABC')
                        cy.findAllByRole('cell').eq(1).contains('533')
                        cy.findAllByRole('cell').eq(2).contains('614')
                      })
                      break
                    case 2:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('cell').should('have.length', 3)
                        cy.findAllByRole('cell').eq(0).contains('GHI')
                        cy.findAllByRole('cell').eq(1).contains('484')
                        cy.findAllByRole('cell').eq(2).contains('713')
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
                        cy.findAllByRole('columnheader').should('have.length', 3)
                        cy.findAllByRole('columnheader').eq(0).contains('Establishment ID')
                        cy.findAllByRole('columnheader').eq(1).contains('Has MetricTwo')
                        cy.findAllByRole('columnheader').eq(2).contains('No MetricTwo')
                      })
                      break
                    case 1:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('cell').should('have.length', 3)
                        cy.findAllByRole('cell').eq(0).contains('ABC')
                        cy.findAllByRole('cell').eq(1).contains('684')
                        cy.findAllByRole('cell').eq(2).contains('665')
                      })
                      break
                    case 2:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('cell').should('have.length', 3)
                        cy.findAllByRole('cell').eq(0).contains('GHI')
                        cy.findAllByRole('cell').eq(1).contains('700')
                        cy.findAllByRole('cell').eq(2).contains('506')
                      })
                      break
                    default:
                      break
                  }
                })
            })
          })
        })

        cy.findAllByLabelText(/MetricThree values/)
          .eq(0)
          .within(() => {
            cy.findByRole('tab', { name: /Table/ }).click()
            cy.findByLabelText(/Table.*/i).within(() => {
              cy.findByRole('table').within(() => {
                cy.findAllByRole('row')
                  .should('have.length', 3)
                  .each((row, index) => {
                    switch (index) {
                      case 0:
                        cy.wrap(row).within(() => {
                          cy.findAllByRole('columnheader').should('have.length', 3)
                          cy.findAllByRole('columnheader').eq(0).contains('Establishment ID')
                          cy.findAllByRole('columnheader').eq(1).contains('Has MetricThree')
                          cy.findAllByRole('columnheader').eq(2).contains('No MetricThree')
                        })
                        break
                      case 1:
                        cy.wrap(row).within(() => {
                          cy.findAllByRole('cell').should('have.length', 3)
                          cy.findAllByRole('cell').eq(0).contains('ABC')
                          cy.findAllByRole('cell').eq(1).contains('680')
                          cy.findAllByRole('cell').eq(2).contains('799')
                        })
                        break
                      case 2:
                        cy.wrap(row).within(() => {
                          cy.findAllByRole('cell').should('have.length', 3)
                          cy.findAllByRole('cell').eq(0).contains('GHI')
                          cy.findAllByRole('cell').eq(1).contains('771')
                          cy.findAllByRole('cell').eq(2).contains('457')
                        })
                        break
                      default:
                        break
                    }
                  })
              })
            })
          })

        cy.findAllByLabelText(/MetricTwo & MetricThree values/).within(() => {
          cy.findByRole('tab', { name: /Table/ }).click()
          cy.findByLabelText(/Table.*/i).within(() => {
            cy.findByRole('table').within(() => {
              cy.findAllByRole('row')
                .should('have.length', 3)
                .each((row, index) => {
                  switch (index) {
                    case 0:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('columnheader').should('have.length', 5)
                        cy.findAllByRole('columnheader').eq(0).contains('Establishment ID')
                        cy.findAllByRole('columnheader').eq(1).contains('Has MetricTwo')
                        cy.findAllByRole('columnheader').eq(2).contains('No MetricTwo')
                        cy.findAllByRole('columnheader').eq(3).contains('Has MetricThree')
                        cy.findAllByRole('columnheader').eq(4).contains('No MetricThree')
                      })
                      break
                    case 1:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('cell').should('have.length', 5)
                        cy.findAllByRole('cell').eq(0).contains('ABC')
                        cy.findAllByRole('cell').eq(1).contains('684')
                        cy.findAllByRole('cell').eq(2).contains('665')
                        cy.findAllByRole('cell').eq(3).contains('680')
                        cy.findAllByRole('cell').eq(4).contains('799')
                      })
                      break
                    case 2:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('cell').should('have.length', 5)
                        cy.findAllByRole('cell').eq(0).contains('GHI')
                        cy.findAllByRole('cell').eq(1).contains('700')
                        cy.findAllByRole('cell').eq(2).contains('506')
                        cy.findAllByRole('cell').eq(3).contains('771')
                        cy.findAllByRole('cell').eq(4).contains('457')
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

      cy.findAllByLabelText(/Multiple rings Doughnut charts/).within(() => {
        cy.findAllByRole('heading', { level: 3 }).should('have.length', 4)

        cy.findByLabelText(/MetricOne values/).within(() => {
          cy.findByRole('tab', { name: /Table/ }).click()
          cy.findByLabelText(/Table.*/i).within(() => {
            cy.findByRole('table').within(() => {
              cy.findAllByRole('row')
                .should('have.length', 4)
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
                    case 1:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('cell').should('have.length', 3)
                        cy.findAllByRole('cell').eq(0).contains('ABC')
                        cy.findAllByRole('cell').eq(1).contains('533')
                        cy.findAllByRole('cell').eq(2).contains('614')
                      })
                      break
                    case 2:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('cell').should('have.length', 3)
                        cy.findAllByRole('cell').eq(0).contains('GHI')
                        cy.findAllByRole('cell').eq(1).contains('484')
                        cy.findAllByRole('cell').eq(2).contains('713')
                      })
                      break
                    case 3:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('cell').should('have.length', 3)
                        cy.findAllByRole('cell').eq(0).contains('DEF')
                        cy.findAllByRole('cell').eq(1).contains('406')
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

        cy.findByLabelText(/MetricTwo values/).within(() => {
          cy.findByRole('tab', { name: /Table/ }).click()
          cy.findByLabelText(/Table.*/i).within(() => {
            cy.findByRole('table').within(() => {
              cy.findAllByRole('row')
                .should('have.length', 4)
                .each((row, index) => {
                  switch (index) {
                    case 0:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('columnheader').should('have.length', 3)
                        cy.findAllByRole('columnheader').eq(0).contains('Establishment ID')
                        cy.findAllByRole('columnheader').eq(1).contains('Has MetricTwo')
                        cy.findAllByRole('columnheader').eq(2).contains('No MetricTwo')
                      })
                      break
                    case 1:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('cell').should('have.length', 3)
                        cy.findAllByRole('cell').eq(0).contains('ABC')
                        cy.findAllByRole('cell').eq(1).contains('684')
                        cy.findAllByRole('cell').eq(2).contains('665')
                      })
                      break
                    case 2:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('cell').should('have.length', 3)
                        cy.findAllByRole('cell').eq(0).contains('GHI')
                        cy.findAllByRole('cell').eq(1).contains('700')
                        cy.findAllByRole('cell').eq(2).contains('506')
                      })
                      break
                    case 3:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('cell').should('have.length', 3)
                        cy.findAllByRole('cell').eq(0).contains('DEF')
                        cy.findAllByRole('cell').eq(1).contains('703')
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

        cy.findAllByLabelText(/MetricThree values/)
          .eq(0)
          .within(() => {
            cy.findByRole('tab', { name: /Table/ }).click()
            cy.findByLabelText(/Table.*/i).within(() => {
              cy.findByRole('table').within(() => {
                cy.findAllByRole('row')
                  .should('have.length', 4)
                  .each((row, index) => {
                    switch (index) {
                      case 0:
                        cy.wrap(row).within(() => {
                          cy.findAllByRole('columnheader').should('have.length', 3)
                          cy.findAllByRole('columnheader').eq(0).contains('Establishment ID')
                          cy.findAllByRole('columnheader').eq(1).contains('Has MetricThree')
                          cy.findAllByRole('columnheader').eq(2).contains('No MetricThree')
                        })
                        break
                      case 1:
                        cy.wrap(row).within(() => {
                          cy.findAllByRole('cell').should('have.length', 3)
                          cy.findAllByRole('cell').eq(0).contains('ABC')
                          cy.findAllByRole('cell').eq(1).contains('680')
                          cy.findAllByRole('cell').eq(2).contains('799')
                        })
                        break
                      case 2:
                        cy.wrap(row).within(() => {
                          cy.findAllByRole('cell').should('have.length', 3)
                          cy.findAllByRole('cell').eq(0).contains('GHI')
                          cy.findAllByRole('cell').eq(1).contains('771')
                          cy.findAllByRole('cell').eq(2).contains('457')
                        })
                        break
                      case 3:
                        cy.wrap(row).within(() => {
                          cy.findAllByRole('cell').should('have.length', 3)
                          cy.findAllByRole('cell').eq(0).contains('DEF')
                          cy.findAllByRole('cell').eq(1).contains('648')
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

        cy.findAllByLabelText(/MetricTwo & MetricThree values/).within(() => {
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
                        cy.findAllByRole('columnheader').eq(1).contains('Has MetricTwo')
                        cy.findAllByRole('columnheader').eq(2).contains('No MetricTwo')
                        cy.findAllByRole('columnheader').eq(3).contains('Has MetricThree')
                        cy.findAllByRole('columnheader').eq(4).contains('No MetricThree')
                      })
                      break
                    case 1:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('cell').should('have.length', 5)
                        cy.findAllByRole('cell').eq(0).contains('ABC')
                        cy.findAllByRole('cell').eq(1).contains('684')
                        cy.findAllByRole('cell').eq(2).contains('665')
                        cy.findAllByRole('cell').eq(3).contains('680')
                        cy.findAllByRole('cell').eq(4).contains('799')
                      })
                      break
                    case 2:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('cell').should('have.length', 5)
                        cy.findAllByRole('cell').eq(0).contains('GHI')
                        cy.findAllByRole('cell').eq(1).contains('700')
                        cy.findAllByRole('cell').eq(2).contains('506')
                        cy.findAllByRole('cell').eq(3).contains('771')
                        cy.findAllByRole('cell').eq(4).contains('457')
                      })
                      break
                    case 3:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('cell').should('have.length', 5)
                        cy.findAllByRole('cell').eq(0).contains('DEF')
                        cy.findAllByRole('cell').eq(1).contains('703')
                        cy.findAllByRole('cell').eq(2).contains('409')
                        cy.findAllByRole('cell').eq(3).contains('648')
                        cy.findAllByRole('cell').eq(4).contains('720')
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
