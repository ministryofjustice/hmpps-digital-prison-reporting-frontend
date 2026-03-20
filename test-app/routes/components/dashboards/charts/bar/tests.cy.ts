import { executeDashboardStubs, requestReportByNameAndDescription } from '../../../../../../cypress-tests/cypressUtils'

context('Dashboard visualisation: bar chart', () => {
  const path = '/embedded/platform'

  describe('Complete data', () => {
    let completeDashboardUrl = ''

    before(() => {
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
              cy.wrap(section).contains('Simple bar charts')
              break
            case 1:
              cy.wrap(section).contains('Horizontal bar charts')
              break
            case 2:
              cy.wrap(section).contains('Specified Unit type')
              break
            case 3:
              cy.wrap(section).contains('Full Dataset')
              break
            default:
              break
          }
        })
    })

    it('should navigate to the correct sections via the side navigation', () => {
      cy.findByRole('link', { name: 'Simple bar charts' }).click()
      cy.location('hash').should('eq', '#section-1-dashboard-section')
      cy.get('#section-1-dashboard-section').should('exist').and('be.visible')

      cy.findByRole('link', { name: 'MetricTwo values' }).click()
      cy.location('hash').should('eq', '#bar-data-quality-has-MetricTwo-dash-section-visualisation')
      cy.get('#bar-data-quality-has-MetricTwo-dash-section-visualisation').should('exist').and('be.visible')

      cy.findByRole('link', { name: 'Horizontal bar charts' }).click()
      cy.location('hash').should('eq', '#section-2-dashboard-section')
      cy.get('#section-2-dashboard-section').should('exist').and('be.visible')

      cy.findAllByRole('link', { name: 'All metrics together' }).first().click()
      cy.location('hash').should('eq', '#bar-data-quality-all-dash-section-visualisation')
      cy.get('#bar-data-quality-all-dash-section-visualisation').should('exist').and('be.visible')
    })

    it('should should show the correct data for charts', () => {
      cy.findAllByLabelText(/Simple bar charts/).within(() => {
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

        cy.findByLabelText(/MetricThree values/).within(() => {
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
                    case 1:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('cell').should('have.length', 7)
                        cy.findAllByRole('cell').eq(0).contains('ABC')
                        cy.findAllByRole('cell').eq(1).contains('533')
                        cy.findAllByRole('cell').eq(2).contains('614')
                        cy.findAllByRole('cell').eq(3).contains('684')
                        cy.findAllByRole('cell').eq(4).contains('665')
                        cy.findAllByRole('cell').eq(5).contains('680')
                        cy.findAllByRole('cell').eq(6).contains('799')
                      })
                      break
                    case 2:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('cell').should('have.length', 7)
                        cy.findAllByRole('cell').eq(0).contains('GHI')
                        cy.findAllByRole('cell').eq(1).contains('484')
                        cy.findAllByRole('cell').eq(2).contains('713')
                        cy.findAllByRole('cell').eq(3).contains('700')
                        cy.findAllByRole('cell').eq(4).contains('506')
                        cy.findAllByRole('cell').eq(5).contains('771')
                        cy.findAllByRole('cell').eq(6).contains('457')
                      })
                      break
                    case 3:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('cell').should('have.length', 7)
                        cy.findAllByRole('cell').eq(0).contains('DEF')
                        cy.findAllByRole('cell').eq(1).contains('406')
                        cy.findAllByRole('cell').eq(2).contains('682')
                        cy.findAllByRole('cell').eq(3).contains('703')
                        cy.findAllByRole('cell').eq(4).contains('409')
                        cy.findAllByRole('cell').eq(5).contains('648')
                        cy.findAllByRole('cell').eq(6).contains('720')
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

      cy.findAllByLabelText(/Specified Unit type/).within(() => {
        cy.findAllByRole('heading', { level: 3 }).should('have.length', 2)

        cy.findByLabelText(/All metrics together with unit/).within(() => {
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
                        cy.findAllByRole('columnheader').eq(1).contains('Has MetricTwo (%)')
                        cy.findAllByRole('columnheader').eq(2).contains('No MetricTwo (%)')
                        cy.findAllByRole('columnheader').eq(3).contains('Has MetricThree (%)')
                        cy.findAllByRole('columnheader').eq(4).contains('No MetricThree (%)')
                        cy.findAllByRole('columnheader').eq(5).contains('Has MetricOne (%)')
                        cy.findAllByRole('columnheader').eq(6).contains('No MetricOne (%)')
                      })
                      break
                    case 1:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('cell').should('have.length', 7)
                        cy.findAllByRole('cell').eq(0).contains('ABC')
                        cy.findAllByRole('cell').eq(1).contains('533')
                        cy.findAllByRole('cell').eq(2).contains('614')
                        cy.findAllByRole('cell').eq(3).contains('684')
                        cy.findAllByRole('cell').eq(4).contains('665')
                        cy.findAllByRole('cell').eq(5).contains('680')
                        cy.findAllByRole('cell').eq(6).contains('799')
                      })
                      break
                    case 2:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('cell').should('have.length', 7)
                        cy.findAllByRole('cell').eq(0).contains('GHI')
                        cy.findAllByRole('cell').eq(1).contains('484')
                        cy.findAllByRole('cell').eq(2).contains('713')
                        cy.findAllByRole('cell').eq(3).contains('700')
                        cy.findAllByRole('cell').eq(4).contains('506')
                        cy.findAllByRole('cell').eq(5).contains('771')
                        cy.findAllByRole('cell').eq(6).contains('457')
                      })
                      break
                    case 3:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('cell').should('have.length', 7)
                        cy.findAllByRole('cell').eq(0).contains('DEF')
                        cy.findAllByRole('cell').eq(1).contains('406')
                        cy.findAllByRole('cell').eq(2).contains('682')
                        cy.findAllByRole('cell').eq(3).contains('703')
                        cy.findAllByRole('cell').eq(4).contains('409')
                        cy.findAllByRole('cell').eq(5).contains('648')
                        cy.findAllByRole('cell').eq(6).contains('720')
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

  // describe('Partial data', () => {
  //   let partialDashboardUrl = ''

  //   before(() => {
  //     cy.task('resetStubs')
  //     executeDashboardStubs()
  //     cy.task('stubBarDashboardPartialData')
  //     cy.task('stubDashboardResultPartialData')
  //     cy.visit(path)

  //     requestReportByNameAndDescription({
  //       name: 'Bar - Partial dataset',
  //       description: 'This dashboard represents example bar visualisations using a partial dataset.',
  //     })

  //     cy.findByRole('heading', { level: 1, name: /Bar - Partial dataset/ }).should('be.visible')
  //     cy.injectAxe()
  //     cy.checkA11y()

  //     cy.url().then((url) => {
  //       partialDashboardUrl = url
  //     })
  //   })

  //   beforeEach(() => {
  //     cy.visit(partialDashboardUrl)
  //   })

  //   it('should should have the correct amount of sections', () => {
  //     cy.findAllByRole('heading', { level: 2 })
  //       .should('have.length', 4)
  //       .each((section, index) => {
  //         switch (index) {
  //           case 0:
  //             cy.wrap(section).contains('Bar charts from a list')
  //             break
  //           case 1:
  //             cy.wrap(section).contains('Bar charts from a list, with units')
  //             break
  //           case 3:
  //             cy.wrap(section).contains('Full Dataset')
  //             break
  //           default:
  //             break
  //         }
  //       })
  //   })

  //   it('should should show the correct data for charts', () => {
  //     cy.findAllByLabelText(/Bar charts from a list/).within(() => {
  //       cy.findAllByRole('heading', { level: 3 }).should('have.length', 4)

  //       cy.findByLabelText(/Diet totals as bar chart/).within(() => {
  //         cy.findByRole('tab', { name: /Table/ }).click()
  //         cy.findByLabelText(/Table.*/i).within(() => {
  //           cy.findByRole('table').within(() => {
  //             cy.findAllByRole('row')
  //               .should('have.length', 5)
  //               .each((row, index) => {
  //                 switch (index) {
  //                   case 0:
  //                     cy.wrap(row).within(() => {
  //                       cy.findAllByRole('columnheader').should('have.length', 2)
  //                       cy.findAllByRole('columnheader').eq(0).contains('Diet')
  //                       cy.findAllByRole('columnheader').eq(1).contains('Total prisoners')
  //                     })
  //                     break
  //                   case 1:
  //                     cy.wrap(row).within(() => {
  //                       cy.findAllByRole('cell').should('have.length', 2)
  //                       cy.findAllByRole('cell').eq(0).contains('Diet one')
  //                       cy.findAllByRole('cell').eq(1).contains('1219')
  //                     })
  //                     break
  //                   case 2:
  //                     cy.wrap(row).within(() => {
  //                       cy.findAllByRole('cell').should('have.length', 2)
  //                       cy.findAllByRole('cell').eq(0).contains('Diet two')
  //                       cy.findAllByRole('cell').eq(1).contains('1125')
  //                     })
  //                     break
  //                   case 3:
  //                     cy.wrap(row).within(() => {
  //                       cy.findAllByRole('cell').should('have.length', 2)
  //                       cy.findAllByRole('cell').eq(0).contains('Diet three')
  //                       cy.findAllByRole('cell').eq(1).contains('1838')
  //                     })
  //                     break
  //                   case 4:
  //                     cy.wrap(row).within(() => {
  //                       cy.findAllByRole('cell').should('have.length', 2)
  //                       cy.findAllByRole('cell').eq(0).contains('Diet four')
  //                       cy.findAllByRole('cell').eq(1).contains('818')
  //                     })
  //                     break
  //                   default:
  //                     break
  //                 }
  //               })
  //           })
  //         })
  //       })

  //       cy.findByLabelText(/Diet totals by establishment/).within(() => {
  //         cy.findByRole('tab', { name: /Table/ }).click()
  //         cy.findByLabelText(/Table.*/i).within(() => {
  //           cy.findByRole('table').within(() => {
  //             cy.findAllByRole('row')
  //               .should('have.length', 9)
  //               .each((row, index) => {
  //                 switch (index) {
  //                   case 0:
  //                     cy.wrap(row).within(() => {
  //                       cy.findAllByRole('columnheader').should('have.length', 3)
  //                       cy.findAllByRole('columnheader').eq(0).contains('Establishment ID')
  //                       cy.findAllByRole('columnheader').eq(1).contains('Diet')
  //                       cy.findAllByRole('columnheader').eq(2).contains('Total prisoners')
  //                     })
  //                     break
  //                   case 1:
  //                     cy.wrap(row).within(() => {
  //                       cy.findAllByRole('cell').should('have.length', 3)
  //                       cy.findAllByRole('cell').eq(0).contains('ABC')
  //                       cy.findAllByRole('cell').eq(1).contains('Diet one')
  //                       cy.findAllByRole('cell').eq(2).contains('360')
  //                     })
  //                     break
  //                   case 2:
  //                     cy.wrap(row).within(() => {
  //                       cy.findAllByRole('cell').should('have.length', 3)
  //                       cy.findAllByRole('cell').eq(0).contains('ABC')
  //                       cy.findAllByRole('cell').eq(1).contains('Diet two')
  //                       cy.findAllByRole('cell').eq(2).contains('256')
  //                     })
  //                     break
  //                   case 3:
  //                     cy.wrap(row).within(() => {
  //                       cy.findAllByRole('cell').should('have.length', 3)
  //                       cy.findAllByRole('cell').eq(0).contains('ABC')
  //                       cy.findAllByRole('cell').eq(1).contains('Diet three')
  //                       cy.findAllByRole('cell').eq(2).contains('559')
  //                     })
  //                     break
  //                   case 4:
  //                     cy.wrap(row).within(() => {
  //                       cy.findAllByRole('cell').should('have.length', 3)
  //                       cy.findAllByRole('cell').eq(0).contains('ABC')
  //                       cy.findAllByRole('cell').eq(1).contains('Diet four')
  //                       cy.findAllByRole('cell').eq(2).contains('144')
  //                     })
  //                     break
  //                   case 5:
  //                     cy.wrap(row).within(() => {
  //                       cy.findAllByRole('cell').should('have.length', 3)
  //                       cy.findAllByRole('cell').eq(0).contains('DEF')
  //                       cy.findAllByRole('cell').eq(1).contains('Diet one')
  //                       cy.findAllByRole('cell').eq(2).contains('260')
  //                     })
  //                     break
  //                   case 6:
  //                     cy.wrap(row).within(() => {
  //                       cy.findAllByRole('cell').should('have.length', 3)
  //                       cy.findAllByRole('cell').eq(0).contains('DEF')
  //                       cy.findAllByRole('cell').eq(1).contains('Diet two')
  //                       cy.findAllByRole('cell').eq(2).contains('281')
  //                     })
  //                     break
  //                   case 7:
  //                     cy.wrap(row).within(() => {
  //                       cy.findAllByRole('cell').should('have.length', 3)
  //                       cy.findAllByRole('cell').eq(0).contains('DEF')
  //                       cy.findAllByRole('cell').eq(1).contains('Diet three')
  //                       cy.findAllByRole('cell').eq(2).contains('520')
  //                     })
  //                     break
  //                   case 8:
  //                     cy.wrap(row).within(() => {
  //                       cy.findAllByRole('cell').should('have.length', 3)
  //                       cy.findAllByRole('cell').eq(0).contains('DEF')
  //                       cy.findAllByRole('cell').eq(1).contains('Diet four')
  //                       cy.findAllByRole('cell').eq(2).contains('160')
  //                     })
  //                     break
  //                   default:
  //                     break
  //                 }
  //               })
  //           })
  //         })
  //       })

  //       cy.findByLabelText(/Diet totals by wing/).within(() => {
  //         cy.findByRole('tab', { name: /Table/ }).click()
  //         cy.findByLabelText(/Table.*/i).within(() => {
  //           cy.findByRole('table').within(() => {
  //             cy.findAllByRole('row')
  //               .should('have.length', 17)
  //               .each((row, index) => {
  //                 switch (index) {
  //                   case 0:
  //                     cy.wrap(row).within(() => {
  //                       cy.findAllByRole('columnheader').should('have.length', 4)
  //                       cy.findAllByRole('columnheader').eq(0).contains('Establishment ID')
  //                       cy.findAllByRole('columnheader').eq(1).contains('Wing')
  //                       cy.findAllByRole('columnheader').eq(2).contains('Diet')
  //                       cy.findAllByRole('columnheader').eq(3).contains('Total prisoners')
  //                     })
  //                     break
  //                   case 1:
  //                     cy.wrap(row).within(() => {
  //                       cy.findAllByRole('cell').should('have.length', 4)
  //                       cy.findAllByRole('cell').eq(0).contains('ABC')
  //                       cy.findAllByRole('cell').eq(1).contains('north')
  //                       cy.findAllByRole('cell').eq(2).contains('Diet one')
  //                       cy.findAllByRole('cell').eq(3).contains('75')
  //                     })
  //                     break
  //                   case 2:
  //                     cy.wrap(row).within(() => {
  //                       cy.findAllByRole('cell').should('have.length', 4)
  //                       cy.findAllByRole('cell').eq(0).contains('ABC')
  //                       cy.findAllByRole('cell').eq(1).contains('north')
  //                       cy.findAllByRole('cell').eq(2).contains('Diet two')
  //                       cy.findAllByRole('cell').eq(3).contains('26')
  //                     })
  //                     break
  //                   case 3:
  //                     cy.wrap(row).within(() => {
  //                       cy.findAllByRole('cell').should('have.length', 4)
  //                       cy.findAllByRole('cell').eq(0).contains('ABC')
  //                       cy.findAllByRole('cell').eq(1).contains('north')
  //                       cy.findAllByRole('cell').eq(2).contains('Diet three')
  //                       cy.findAllByRole('cell').eq(3).contains('22')
  //                     })
  //                     break
  //                   case 4:
  //                     cy.wrap(row).within(() => {
  //                       cy.findAllByRole('cell').should('have.length', 4)
  //                       cy.findAllByRole('cell').eq(0).contains('ABC')
  //                       cy.findAllByRole('cell').eq(1).contains('north')
  //                       cy.findAllByRole('cell').eq(2).contains('Diet four')
  //                       cy.findAllByRole('cell').eq(3).contains('76')
  //                     })
  //                     break
  //                   case 5:
  //                     cy.wrap(row).within(() => {
  //                       cy.findAllByRole('cell').should('have.length', 4)
  //                       cy.findAllByRole('cell').eq(0).contains('ABC')
  //                       cy.findAllByRole('cell').eq(1).contains('south')
  //                       cy.findAllByRole('cell').eq(2).contains('Diet one')
  //                       cy.findAllByRole('cell').eq(3).contains('47')
  //                     })
  //                     break
  //                   case 6:
  //                     cy.wrap(row).within(() => {
  //                       cy.findAllByRole('cell').should('have.length', 4)
  //                       cy.findAllByRole('cell').eq(0).contains('ABC')
  //                       cy.findAllByRole('cell').eq(1).contains('south')
  //                       cy.findAllByRole('cell').eq(2).contains('Diet two')
  //                       cy.findAllByRole('cell').eq(3).contains('46')
  //                     })
  //                     break
  //                   case 7:
  //                     cy.wrap(row).within(() => {
  //                       cy.findAllByRole('cell').should('have.length', 4)
  //                       cy.findAllByRole('cell').eq(0).contains('ABC')
  //                       cy.findAllByRole('cell').eq(1).contains('south')
  //                       cy.findAllByRole('cell').eq(2).contains('Diet three')
  //                       cy.findAllByRole('cell').eq(3).contains('41')
  //                     })
  //                     break
  //                   case 8:
  //                     cy.wrap(row).within(() => {
  //                       cy.findAllByRole('cell').should('have.length', 4)
  //                       cy.findAllByRole('cell').eq(0).contains('ABC')
  //                       cy.findAllByRole('cell').eq(1).contains('south')
  //                       cy.findAllByRole('cell').eq(2).contains('Diet four')
  //                       cy.findAllByRole('cell').eq(3).contains('17')
  //                     })
  //                     break
  //                   case 9:
  //                     cy.wrap(row).within(() => {
  //                       cy.findAllByRole('cell').should('have.length', 4)
  //                       cy.findAllByRole('cell').eq(0).contains('DEF')
  //                       cy.findAllByRole('cell').eq(1).contains('north')
  //                       cy.findAllByRole('cell').eq(2).contains('Diet one')
  //                       cy.findAllByRole('cell').eq(3).contains('91')
  //                     })
  //                     break
  //                   case 10:
  //                     cy.wrap(row).within(() => {
  //                       cy.findAllByRole('cell').should('have.length', 4)
  //                       cy.findAllByRole('cell').eq(0).contains('DEF')
  //                       cy.findAllByRole('cell').eq(1).contains('north')
  //                       cy.findAllByRole('cell').eq(2).contains('Diet two')
  //                       cy.findAllByRole('cell').eq(3).contains('75')
  //                     })
  //                     break
  //                   case 11:
  //                     cy.wrap(row).within(() => {
  //                       cy.findAllByRole('cell').should('have.length', 4)
  //                       cy.findAllByRole('cell').eq(0).contains('DEF')
  //                       cy.findAllByRole('cell').eq(1).contains('north')
  //                       cy.findAllByRole('cell').eq(2).contains('Diet three')
  //                       cy.findAllByRole('cell').eq(3).contains('78')
  //                     })
  //                     break
  //                   case 12:
  //                     cy.wrap(row).within(() => {
  //                       cy.findAllByRole('cell').should('have.length', 4)
  //                       cy.findAllByRole('cell').eq(0).contains('DEF')
  //                       cy.findAllByRole('cell').eq(1).contains('north')
  //                       cy.findAllByRole('cell').eq(2).contains('Diet four')
  //                       cy.findAllByRole('cell').eq(3).contains('42')
  //                     })
  //                     break
  //                   case 13:
  //                     cy.wrap(row).within(() => {
  //                       cy.findAllByRole('cell').should('have.length', 4)
  //                       cy.findAllByRole('cell').eq(0).contains('DEF')
  //                       cy.findAllByRole('cell').eq(1).contains('south')
  //                       cy.findAllByRole('cell').eq(2).contains('Diet one')
  //                       cy.findAllByRole('cell').eq(3).contains('34')
  //                     })
  //                     break
  //                   case 14:
  //                     cy.wrap(row).within(() => {
  //                       cy.findAllByRole('cell').should('have.length', 4)
  //                       cy.findAllByRole('cell').eq(0).contains('DEF')
  //                       cy.findAllByRole('cell').eq(1).contains('south')
  //                       cy.findAllByRole('cell').eq(2).contains('Diet two')
  //                       cy.findAllByRole('cell').eq(3).contains('29')
  //                     })
  //                     break
  //                   case 15:
  //                     cy.wrap(row).within(() => {
  //                       cy.findAllByRole('cell').should('have.length', 4)
  //                       cy.findAllByRole('cell').eq(0).contains('DEF')
  //                       cy.findAllByRole('cell').eq(1).contains('south')
  //                       cy.findAllByRole('cell').eq(2).contains('Diet three')
  //                       cy.findAllByRole('cell').eq(3).contains('22')
  //                     })
  //                     break
  //                   case 16:
  //                     cy.wrap(row).within(() => {
  //                       cy.findAllByRole('cell').should('have.length', 4)
  //                       cy.findAllByRole('cell').eq(0).contains('DEF')
  //                       cy.findAllByRole('cell').eq(1).contains('south')
  //                       cy.findAllByRole('cell').eq(2).contains('Diet four')
  //                       cy.findAllByRole('cell').eq(3).contains('63')
  //                     })
  //                     break
  //                   default:
  //                     break
  //                 }
  //               })
  //           })
  //         })
  //       })

  //       cy.findByLabelText(/Diet totals by cell bar/).within(() => {
  //         cy.findByRole('tab', { name: /Table/ }).click()
  //         cy.findByLabelText(/Table.*/i).within(() => {
  //           cy.findByRole('table').within(() => {
  //             cy.findAllByRole('row').should('have.length', 81)
  //           })
  //         })
  //       })
  //     })

  //     cy.findAllByLabelText(/Bar charts from a list/).within(() => {
  //       cy.findAllByRole('heading', { level: 3 }).should('have.length', 4)

  //       cy.findByLabelText(/Diet totals by establishment/).within(() => {
  //         cy.findByRole('tab', { name: /Table/ }).click()
  //         cy.findByLabelText(/Table.*/i).within(() => {
  //           cy.findByRole('table').within(() => {
  //             cy.findAllByRole('row')
  //               .should('have.length', 9)
  //               .each((row, index) => {
  //                 switch (index) {
  //                   case 0:
  //                     cy.wrap(row).within(() => {
  //                       cy.findAllByRole('columnheader').should('have.length', 3)
  //                       cy.findAllByRole('columnheader').eq(0).contains('Establishment ID')
  //                       cy.findAllByRole('columnheader').eq(1).contains('Diet')
  //                       cy.findAllByRole('columnheader').eq(2).contains('Total prisoners (%)')
  //                     })
  //                     break
  //                   case 1:
  //                     cy.wrap(row).within(() => {
  //                       cy.findAllByRole('cell').should('have.length', 3)
  //                       cy.findAllByRole('cell').eq(0).contains('ABC')
  //                       cy.findAllByRole('cell').eq(1).contains('Diet one')
  //                       cy.findAllByRole('cell').eq(2).contains('360')
  //                     })
  //                     break
  //                   case 2:
  //                     cy.wrap(row).within(() => {
  //                       cy.findAllByRole('cell').should('have.length', 3)
  //                       cy.findAllByRole('cell').eq(0).contains('ABC')
  //                       cy.findAllByRole('cell').eq(1).contains('Diet two')
  //                       cy.findAllByRole('cell').eq(2).contains('256')
  //                     })
  //                     break
  //                   case 3:
  //                     cy.wrap(row).within(() => {
  //                       cy.findAllByRole('cell').should('have.length', 3)
  //                       cy.findAllByRole('cell').eq(0).contains('ABC')
  //                       cy.findAllByRole('cell').eq(1).contains('Diet three')
  //                       cy.findAllByRole('cell').eq(2).contains('559')
  //                     })
  //                     break
  //                   case 4:
  //                     cy.wrap(row).within(() => {
  //                       cy.findAllByRole('cell').should('have.length', 3)
  //                       cy.findAllByRole('cell').eq(0).contains('ABC')
  //                       cy.findAllByRole('cell').eq(1).contains('Diet four')
  //                       cy.findAllByRole('cell').eq(2).contains('144')
  //                     })
  //                     break
  //                   case 5:
  //                     cy.wrap(row).within(() => {
  //                       cy.findAllByRole('cell').should('have.length', 3)
  //                       cy.findAllByRole('cell').eq(0).contains('DEF')
  //                       cy.findAllByRole('cell').eq(1).contains('Diet one')
  //                       cy.findAllByRole('cell').eq(2).contains('260')
  //                     })
  //                     break
  //                   case 6:
  //                     cy.wrap(row).within(() => {
  //                       cy.findAllByRole('cell').should('have.length', 3)
  //                       cy.findAllByRole('cell').eq(0).contains('DEF')
  //                       cy.findAllByRole('cell').eq(1).contains('Diet two')
  //                       cy.findAllByRole('cell').eq(2).contains('281')
  //                     })
  //                     break
  //                   case 7:
  //                     cy.wrap(row).within(() => {
  //                       cy.findAllByRole('cell').should('have.length', 3)
  //                       cy.findAllByRole('cell').eq(0).contains('DEF')
  //                       cy.findAllByRole('cell').eq(1).contains('Diet three')
  //                       cy.findAllByRole('cell').eq(2).contains('520')
  //                     })
  //                     break
  //                   case 8:
  //                     cy.wrap(row).within(() => {
  //                       cy.findAllByRole('cell').should('have.length', 3)
  //                       cy.findAllByRole('cell').eq(0).contains('DEF')
  //                       cy.findAllByRole('cell').eq(1).contains('Diet four')
  //                       cy.findAllByRole('cell').eq(2).contains('160')
  //                     })
  //                     break
  //                   default:
  //                     break
  //                 }
  //               })
  //           })
  //         })
  //       })
  //     })
  //   })
  // })

  describe('Invalid definition', () => {
    let invalidDashboardUrl = ''

    before(() => {
      cy.task('resetStubs')
      executeDashboardStubs()
      cy.task('stubBarInvalid')
      cy.task('stubDashboardResultPartialData')
      cy.visit(path)

      requestReportByNameAndDescription({
        name: 'Bar - Invalid visualisation',
        description:
          'This dashboard represents example of invlaid bar visualisation definition using a partial dataset.',
      })

      cy.url().then((url) => {
        invalidDashboardUrl = url
      })
    })

    beforeEach(() => {
      cy.visit(invalidDashboardUrl)
    })

    it('should show the correct validation messages', () => {
      cy.findByRole('heading', { name: /Your report has failed to generate/ }).should('be.visible')
      cy.findAllByRole('paragraph')
        .eq(1)
        .contains('Error: Schema validation: Dashboard Visualisation validation failed:')
      cy.findAllByRole('paragraph')
        .eq(2)
        .contains("Type: 'bar'. ID: 'invalid-y-axis-defintion-bar'. Issues: X and Y axis must be defined in measure")
      cy.findAllByRole('paragraph')
        .eq(3)
        .contains("Type: 'bar'. ID: 'invalid-x-axis-defintion-bar'. Issues: X and Y axis must be defined in measure")
    })
  })
})
