import {
  checkA11y,
  executeDashboardStubs,
  requestReportByNameAndDescription,
} from '../../../../../../cypress-tests/cypressUtils'

context('Dashboard visualisation: matrix chart', () => {
  const path = '/'

  // TODO: add test for monthly data and annually data

  describe('Complete data daily', () => {
    let completeDashboardUrl = ''

    before(() => {
      cy.task('resetStubs')
      executeDashboardStubs()
      cy.task('stubMatrixCompleteData')
      cy.task('stubDashboardResultCompleteDataDaily')
      cy.visit(path)

      requestReportByNameAndDescription({
        name: 'Matrix - Complete data',
        description: 'Matrix examples',
      })

      cy.findByRole('heading', { level: 1, name: /Matrix - Complete data/ }).should('be.visible')
      checkA11y()

      cy.url().then(url => {
        completeDashboardUrl = url
      })
    })

    beforeEach(() => {
      cy.visit(completeDashboardUrl)
    })

    it('should have the correct amount of sections', () => {
      cy.findAllByRole('heading', { level: 2 })
        .filter('[id^="section-title"]') // excludes filter heading
        .should('have.length', 3)
        .each((section, index) => {
          switch (index) {
            case 0:
              cy.wrap(section).contains('Automatic bucketing')
              break
            case 1:
              cy.wrap(section).contains('User defined custom buckets')
              break
            case 3:
              cy.wrap(section).contains('Full Dataset')
              break
            default:
              break
          }
        })
    })

    it('should show the correct data for charts', () => {
      cy.findAllByLabelText(/Automatic bucketing/)
        .first()
        .within(() => {
          cy.findAllByRole('heading', { level: 3 }).should('have.length', 4)

          cy.findByLabelText(/Automatic bucketing example/).within(() => {
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
                          cy.findAllByRole('columnheader').eq(2).contains('Has MetricTwo')
                        })
                        break
                      case 1:
                        cy.wrap(row).within(() => {
                          cy.findAllByRole('cell').should('have.length', 3)
                          cy.findAllByRole('cell').eq(0).contains('24/08/2024')
                          cy.findAllByRole('cell').eq(2).contains('459')
                        })
                        break
                      case 2:
                        cy.wrap(row).within(() => {
                          cy.findAllByRole('cell').should('have.length', 3)
                          cy.findAllByRole('cell').eq(0).contains('24/09/2024')
                          cy.findAllByRole('cell').eq(2).contains('573')
                        })
                        break
                      case 3:
                        cy.wrap(row).within(() => {
                          cy.findAllByRole('cell').should('have.length', 3)
                          cy.findAllByRole('cell').eq(0).contains('24/10/2024')
                          cy.findAllByRole('cell').eq(2).contains('638')
                        })
                        break
                      case 4:
                        cy.wrap(row).within(() => {
                          cy.findAllByRole('cell').should('have.length', 3)
                          cy.findAllByRole('cell').eq(0).contains('24/11/2024')
                          cy.findAllByRole('cell').eq(2).contains('471')
                        })
                        break
                      case 5:
                        cy.wrap(row).within(() => {
                          cy.findAllByRole('cell').should('have.length', 3)
                          cy.findAllByRole('cell').eq(0).contains('24/12/2024')
                          cy.findAllByRole('cell').eq(2).contains('584')
                        })
                        break
                      case 6:
                        cy.wrap(row).within(() => {
                          cy.findAllByRole('cell').should('have.length', 3)
                          cy.findAllByRole('cell').eq(0).contains('24/01/2025')
                          cy.findAllByRole('cell').eq(2).contains('684')
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

  describe.skip('Partial data', () => {
    let partialDashboardUrl = ''

    before(() => {
      cy.task('resetStubs')
      executeDashboardStubs()
      cy.task('stubMatrixCompleteData')
      cy.task('stubDashboardResultPartialData')
      cy.visit(path)

      requestReportByNameAndDescription({
        name: 'Bar - Partial dataset',
        description: 'This dashboard represents example bar visualisations using a partial dataset.',
      })

      cy.findByRole('heading', { level: 1, name: /Bar - Partial dataset/ }).should('be.visible')
      checkA11y()

      cy.url().then(url => {
        partialDashboardUrl = url
      })
    })

    beforeEach(() => {
      cy.visit(partialDashboardUrl)
    })

    it('should have the correct amount of sections', () => {
      cy.findAllByRole('heading', { level: 2 })
        .should('have.length', 3)
        .each((section, index) => {
          switch (index) {
            case 0:
              cy.wrap(section).contains('Automatic bucketing')
              break
            case 1:
              cy.wrap(section).contains('User defined custom buckets')
              break
            case 3:
              cy.wrap(section).contains('Full Dataset')
              break
            default:
              break
          }
        })
    })

    it('should show the correct data for charts', () => {
      cy.findAllByLabelText(/Bar charts from a list/).within(() => {
        cy.findAllByRole('heading', { level: 3 }).should('have.length', 4)

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
                        cy.findAllByRole('columnheader').eq(0).contains('Date')
                        cy.findAllByRole('columnheader').eq(1).contains('Diet')
                        cy.findAllByRole('columnheader').eq(2).contains('Total prisoners')
                      })
                      break
                    case 1:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('cell').should('have.length', 3)
                        cy.findAllByRole('cell').eq(1).contains('Diet one')
                        cy.findAllByRole('cell').eq(2).contains('1219')
                      })
                      break
                    case 2:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('cell').should('have.length', 3)
                        cy.findAllByRole('cell').eq(1).contains('Diet two')
                        cy.findAllByRole('cell').eq(2).contains('1125')
                      })
                      break
                    case 3:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('cell').should('have.length', 3)
                        cy.findAllByRole('cell').eq(1).contains('Diet three')
                        cy.findAllByRole('cell').eq(2).contains('1838')
                      })
                      break
                    case 4:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('cell').should('have.length', 3)
                        cy.findAllByRole('cell').eq(1).contains('Diet four')
                        cy.findAllByRole('cell').eq(2).contains('818')
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
                        cy.findAllByRole('columnheader').should('have.length', 4)
                        cy.findAllByRole('columnheader').eq(0).contains('Date')
                        cy.findAllByRole('columnheader').eq(1).contains('Establishment ID')
                        cy.findAllByRole('columnheader').eq(2).contains('Diet')
                        cy.findAllByRole('columnheader').eq(3).contains('Total prisoners')
                      })
                      break
                    case 1:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('cell').should('have.length', 4)
                        cy.findAllByRole('cell').eq(1).contains('ABC')
                        cy.findAllByRole('cell').eq(2).contains('Diet one')
                        cy.findAllByRole('cell').eq(3).contains('360')
                      })
                      break
                    case 2:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('cell').should('have.length', 4)
                        cy.findAllByRole('cell').eq(1).contains('ABC')
                        cy.findAllByRole('cell').eq(2).contains('Diet two')
                        cy.findAllByRole('cell').eq(3).contains('256')
                      })
                      break
                    case 3:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('cell').should('have.length', 4)
                        cy.findAllByRole('cell').eq(1).contains('ABC')
                        cy.findAllByRole('cell').eq(2).contains('Diet three')
                        cy.findAllByRole('cell').eq(3).contains('559')
                      })
                      break
                    case 4:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('cell').should('have.length', 4)
                        cy.findAllByRole('cell').eq(1).contains('ABC')
                        cy.findAllByRole('cell').eq(2).contains('Diet four')
                        cy.findAllByRole('cell').eq(3).contains('144')
                      })
                      break
                    case 5:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('cell').should('have.length', 4)
                        cy.findAllByRole('cell').eq(1).contains('DEF')
                        cy.findAllByRole('cell').eq(2).contains('Diet one')
                        cy.findAllByRole('cell').eq(3).contains('260')
                      })
                      break
                    case 6:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('cell').should('have.length', 4)
                        cy.findAllByRole('cell').eq(1).contains('DEF')
                        cy.findAllByRole('cell').eq(2).contains('Diet two')
                        cy.findAllByRole('cell').eq(3).contains('281')
                      })
                      break
                    case 7:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('cell').should('have.length', 4)
                        cy.findAllByRole('cell').eq(1).contains('DEF')
                        cy.findAllByRole('cell').eq(2).contains('Diet three')
                        cy.findAllByRole('cell').eq(3).contains('520')
                      })
                      break
                    case 8:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('cell').should('have.length', 4)
                        cy.findAllByRole('cell').eq(1).contains('DEF')
                        cy.findAllByRole('cell').eq(2).contains('Diet four')
                        cy.findAllByRole('cell').eq(3).contains('160')
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
                        cy.findAllByRole('columnheader').should('have.length', 5)
                        cy.findAllByRole('columnheader').eq(0).contains('Date')
                        cy.findAllByRole('columnheader').eq(1).contains('Establishment ID')
                        cy.findAllByRole('columnheader').eq(2).contains('Wing')
                        cy.findAllByRole('columnheader').eq(3).contains('Diet')
                        cy.findAllByRole('columnheader').eq(4).contains('Total prisoners')
                      })
                      break
                    case 1:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('cell').should('have.length', 5)
                        cy.findAllByRole('cell').eq(1).contains('ABC')
                        cy.findAllByRole('cell').eq(2).contains('north')
                        cy.findAllByRole('cell').eq(3).contains('Diet one')
                        cy.findAllByRole('cell').eq(4).contains('75')
                      })
                      break
                    case 2:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('cell').should('have.length', 5)
                        cy.findAllByRole('cell').eq(1).contains('ABC')
                        cy.findAllByRole('cell').eq(2).contains('north')
                        cy.findAllByRole('cell').eq(3).contains('Diet two')
                        cy.findAllByRole('cell').eq(4).contains('26')
                      })
                      break
                    case 3:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('cell').should('have.length', 5)
                        cy.findAllByRole('cell').eq(1).contains('ABC')
                        cy.findAllByRole('cell').eq(2).contains('north')
                        cy.findAllByRole('cell').eq(3).contains('Diet three')
                        cy.findAllByRole('cell').eq(4).contains('22')
                      })
                      break
                    case 4:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('cell').should('have.length', 5)
                        cy.findAllByRole('cell').eq(1).contains('ABC')
                        cy.findAllByRole('cell').eq(2).contains('north')
                        cy.findAllByRole('cell').eq(3).contains('Diet four')
                        cy.findAllByRole('cell').eq(4).contains('76')
                      })
                      break
                    case 5:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('cell').should('have.length', 5)
                        cy.findAllByRole('cell').eq(1).contains('ABC')
                        cy.findAllByRole('cell').eq(2).contains('south')
                        cy.findAllByRole('cell').eq(3).contains('Diet one')
                        cy.findAllByRole('cell').eq(4).contains('47')
                      })
                      break
                    case 6:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('cell').should('have.length', 5)
                        cy.findAllByRole('cell').eq(1).contains('ABC')
                        cy.findAllByRole('cell').eq(2).contains('south')
                        cy.findAllByRole('cell').eq(3).contains('Diet two')
                        cy.findAllByRole('cell').eq(4).contains('46')
                      })
                      break
                    case 7:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('cell').should('have.length', 5)
                        cy.findAllByRole('cell').eq(1).contains('ABC')
                        cy.findAllByRole('cell').eq(2).contains('south')
                        cy.findAllByRole('cell').eq(3).contains('Diet three')
                        cy.findAllByRole('cell').eq(4).contains('41')
                      })
                      break
                    case 8:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('cell').should('have.length', 5)
                        cy.findAllByRole('cell').eq(1).contains('ABC')
                        cy.findAllByRole('cell').eq(2).contains('south')
                        cy.findAllByRole('cell').eq(3).contains('Diet four')
                        cy.findAllByRole('cell').eq(4).contains('17')
                      })
                      break
                    case 9:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('cell').should('have.length', 5)
                        cy.findAllByRole('cell').eq(1).contains('DEF')
                        cy.findAllByRole('cell').eq(2).contains('north')
                        cy.findAllByRole('cell').eq(3).contains('Diet one')
                        cy.findAllByRole('cell').eq(4).contains('91')
                      })
                      break
                    case 10:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('cell').should('have.length', 5)
                        cy.findAllByRole('cell').eq(1).contains('DEF')
                        cy.findAllByRole('cell').eq(2).contains('north')
                        cy.findAllByRole('cell').eq(3).contains('Diet two')
                        cy.findAllByRole('cell').eq(4).contains('75')
                      })
                      break
                    case 11:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('cell').should('have.length', 5)
                        cy.findAllByRole('cell').eq(1).contains('DEF')
                        cy.findAllByRole('cell').eq(2).contains('north')
                        cy.findAllByRole('cell').eq(3).contains('Diet three')
                        cy.findAllByRole('cell').eq(4).contains('78')
                      })
                      break
                    case 12:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('cell').should('have.length', 5)
                        cy.findAllByRole('cell').eq(1).contains('DEF')
                        cy.findAllByRole('cell').eq(2).contains('north')
                        cy.findAllByRole('cell').eq(3).contains('Diet four')
                        cy.findAllByRole('cell').eq(4).contains('42')
                      })
                      break
                    case 13:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('cell').should('have.length', 5)
                        cy.findAllByRole('cell').eq(1).contains('DEF')
                        cy.findAllByRole('cell').eq(2).contains('south')
                        cy.findAllByRole('cell').eq(3).contains('Diet one')
                        cy.findAllByRole('cell').eq(4).contains('34')
                      })
                      break
                    case 14:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('cell').should('have.length', 5)
                        cy.findAllByRole('cell').eq(1).contains('DEF')
                        cy.findAllByRole('cell').eq(2).contains('south')
                        cy.findAllByRole('cell').eq(3).contains('Diet two')
                        cy.findAllByRole('cell').eq(4).contains('29')
                      })
                      break
                    case 15:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('cell').should('have.length', 5)
                        cy.findAllByRole('cell').eq(1).contains('DEF')
                        cy.findAllByRole('cell').eq(2).contains('south')
                        cy.findAllByRole('cell').eq(3).contains('Diet three')
                        cy.findAllByRole('cell').eq(4).contains('22')
                      })
                      break
                    case 16:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('cell').should('have.length', 5)
                        cy.findAllByRole('cell').eq(1).contains('DEF')
                        cy.findAllByRole('cell').eq(2).contains('south')
                        cy.findAllByRole('cell').eq(3).contains('Diet four')
                        cy.findAllByRole('cell').eq(4).contains('63')
                      })
                      break
                    default:
                      break
                  }
                })
            })
          })
        })

        cy.findByLabelText(/Diet totals by cell bar/).within(() => {
          cy.findByRole('tab', { name: /Table/ }).click()
          cy.findByLabelText(/Table.*/i).within(() => {
            cy.findByRole('table').within(() => {
              cy.findAllByRole('row').should('have.length', 81)
            })
          })
        })
      })

      cy.findAllByLabelText(/Bar charts with units/).within(() => {
        cy.findAllByRole('heading', { level: 3 }).should('have.length', 1)

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
                        cy.findAllByRole('columnheader').should('have.length', 4)
                        cy.findAllByRole('columnheader').eq(0).contains('Date')
                        cy.findAllByRole('columnheader').eq(1).contains('Establishment ID')
                        cy.findAllByRole('columnheader').eq(2).contains('Diet')
                        cy.findAllByRole('columnheader').eq(3).contains('Total prisoners (%)')
                      })
                      break
                    case 1:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('cell').should('have.length', 4)
                        cy.findAllByRole('cell').eq(1).contains('ABC')
                        cy.findAllByRole('cell').eq(2).contains('Diet one')
                        cy.findAllByRole('cell').eq(3).contains('360')
                      })
                      break
                    case 2:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('cell').should('have.length', 4)
                        cy.findAllByRole('cell').eq(1).contains('ABC')
                        cy.findAllByRole('cell').eq(2).contains('Diet two')
                        cy.findAllByRole('cell').eq(3).contains('256')
                      })
                      break
                    case 3:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('cell').should('have.length', 4)
                        cy.findAllByRole('cell').eq(1).contains('ABC')
                        cy.findAllByRole('cell').eq(2).contains('Diet three')
                        cy.findAllByRole('cell').eq(3).contains('559')
                      })
                      break
                    case 4:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('cell').should('have.length', 4)
                        cy.findAllByRole('cell').eq(1).contains('ABC')
                        cy.findAllByRole('cell').eq(2).contains('Diet four')
                        cy.findAllByRole('cell').eq(3).contains('144')
                      })
                      break
                    case 5:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('cell').should('have.length', 4)
                        cy.findAllByRole('cell').eq(1).contains('DEF')
                        cy.findAllByRole('cell').eq(2).contains('Diet one')
                        cy.findAllByRole('cell').eq(3).contains('260')
                      })
                      break
                    case 6:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('cell').should('have.length', 4)
                        cy.findAllByRole('cell').eq(1).contains('DEF')
                        cy.findAllByRole('cell').eq(2).contains('Diet two')
                        cy.findAllByRole('cell').eq(3).contains('281')
                      })
                      break
                    case 7:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('cell').should('have.length', 4)
                        cy.findAllByRole('cell').eq(1).contains('DEF')
                        cy.findAllByRole('cell').eq(2).contains('Diet three')
                        cy.findAllByRole('cell').eq(3).contains('520')
                      })
                      break
                    case 8:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('cell').should('have.length', 4)
                        cy.findAllByRole('cell').eq(1).contains('DEF')
                        cy.findAllByRole('cell').eq(2).contains('Diet four')
                        cy.findAllByRole('cell').eq(3).contains('160')
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

  describe.skip('Invalid definition', () => {
    let invalidDashboardUrl = ''

    before(() => {
      cy.task('resetStubs')
      executeDashboardStubs()
      cy.task('stubBarInvalid')
      cy.task('stubDashboardResultPartialData')
      cy.visit(path)

      requestReportByNameAndDescription({
        name: 'Bar - Invalid visualisation',
        description: 'This dashboard represents example of invlaid bar visualisation definition using',
      })

      cy.url().should('include', '/view-report')

      cy.url().then(url => {
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
        .contains("Type: 'bar'. ID: 'invalid-y-axis-definition-bar'. Issues: X and Y axis must be defined in measure")
      cy.findAllByRole('paragraph')
        .eq(3)
        .contains("Type: 'bar'. ID: 'invalid-x-axis-definition-bar'. Issues: X and Y axis must be defined in measure")
    })
  })
})
