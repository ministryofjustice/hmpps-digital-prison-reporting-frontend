import {
  checkA11y,
  executeDashboardStubs,
  requestReportByNameAndDescription,
} from '../../../../../cypress-tests/cypressUtils'

context('Dashboard visualisation: List', () => {
  const path = '/'

  describe('complete data', () => {
    let completeDashboardUrl = ''

    before(() => {
      cy.task('resetStubs')
      executeDashboardStubs()
      cy.task('stubListDashboardCompleteData')
      cy.task('stubDashboardResultCompleteData')
      cy.visit(path)

      requestReportByNameAndDescription({
        name: 'List - Complete dataset',
        description: 'This dashboard represents example list visualisations using a complete dataset',
      })

      cy.findByRole('heading', { level: 1, name: /List - Complete dataset/ }).should('be.visible')
      checkA11y()

      cy.url().then((url) => {
        completeDashboardUrl = url
      })
    })

    beforeEach(() => {
      cy.visit(completeDashboardUrl)
    })

    it('should show the correct section headings', () => {
      cy.findAllByRole('heading', { level: 2 })
        .should('have.length', 3)
        .each((section, index) => {
          switch (index) {
            case 0:
              cy.wrap(section).contains('Rows as list')
              break
            case 1:
              cy.wrap(section).contains('Column values as list')
              break
            case 2:
              cy.wrap(section).contains('Full Dataset')
              break
            default:
              break
          }
        })
    })

    it('should show the correct charts in sections', () => {
      cy.findAllByLabelText(/Rows as list/).within(() => {
        cy.findAllByRole('heading', { level: 3 }).should('have.length', 3)

        cy.findByLabelText(/MetricOne values/).within(() => {
          cy.findAllByRole('paragraph').first().contains('List visualisation showing MetricOne values')

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

        cy.findByLabelText(/MetricTwo values/).within(() => {
          cy.findAllByRole('paragraph').first().contains('List visualisation showing MetricTwo values')
          cy.findByRole('table').should('exist')
        })

        cy.findByLabelText(/MetricThree values/).within(() => {
          cy.findAllByRole('paragraph').first().contains('List visualisation showing MetricThree values')
          cy.findByRole('table').should('exist')
        })
      })

      cy.findAllByLabelText(/Column values as list/).within(() => {
        cy.findAllByRole('heading', { level: 3 }).should('have.length', 1)
        cy.findByLabelText(/Data quality values/).within(() => {
          cy.findAllByRole('paragraph').first().contains('Example list showing column values rows')

          cy.findByRole('table').within(() => {
            cy.findAllByRole('row')
              .should('have.length', 7)
              .each((row, index) => {
                switch (index) {
                  case 0:
                    cy.wrap(row).within(() => {
                      cy.findAllByRole('columnheader').should('have.length', 4)
                      cy.findAllByRole('columnheader').eq(1).contains('ABC')
                      cy.findAllByRole('columnheader').eq(2).contains('GHI')
                      cy.findAllByRole('columnheader').eq(3).contains('DEF')
                    })
                    break

                  case 1:
                    cy.wrap(row).within(() => {
                      cy.findAllByRole('cell').should('have.length', 4)
                      cy.findAllByRole('cell').eq(0).contains('Has MetricOne')
                    })
                    break

                  case 2:
                    cy.wrap(row).within(() => {
                      cy.findAllByRole('cell').should('have.length', 4)
                      cy.findAllByRole('cell').eq(0).contains('No MetricOne')
                    })
                    break

                  case 3:
                    cy.wrap(row).within(() => {
                      cy.findAllByRole('cell').should('have.length', 4)
                      cy.findAllByRole('cell').eq(0).contains('Has MetricThree')
                    })
                    break

                  case 4:
                    cy.wrap(row).within(() => {
                      cy.findAllByRole('cell').should('have.length', 4)
                      cy.findAllByRole('cell').eq(0).contains('No MetricThree')
                    })
                    break

                  case 5:
                    cy.wrap(row).within(() => {
                      cy.findAllByRole('cell').should('have.length', 4)
                      cy.findAllByRole('cell').eq(0).contains('Has MetricTwo')
                    })
                    break

                  case 6:
                    cy.wrap(row).within(() => {
                      cy.findAllByRole('cell').should('have.length', 4)
                      cy.findAllByRole('cell').eq(0).contains('No MetricTwo')
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

  describe('complete data with links', () => {
    let completeDashboardWithLinksUrl = ''

    before(() => {
      cy.task('resetStubs')
      executeDashboardStubs()
      cy.task('stubTestDashboardWithLink')
      cy.task('stubListDashboardCompleteData')
      cy.task('stubDashboardResultCompleteData')
      cy.visit(path)

      requestReportByNameAndDescription({
        name: 'List - with links',
        description: 'This dashboard represents example list visualisations using a complete dataset',
      })

      cy.findByRole('heading', { level: 1, name: /List - with links/ }).should('be.visible')
      checkA11y()

      cy.url().then((url) => {
        completeDashboardWithLinksUrl = url
      })
    })

    beforeEach(() => {
      cy.visit(completeDashboardWithLinksUrl)
    })

    it('should show a list with clickable links in it', () => {
      cy.findAllByLabelText(/Links in list/).within(() => {
        cy.findAllByRole('heading', { level: 3 }).should('have.length', 1)

        cy.findByLabelText(/List with links in it/).within(() => {
          cy.findAllByRole('paragraph').first().contains('Example list with a link it in')

          cy.findByRole('table').within(() => {
            cy.findAllByRole('row').each((row, index) => {
              switch (index) {
                case 0:
                  cy.wrap(row).within(() => {
                    cy.findAllByRole('columnheader').should('have.length', 1)
                    cy.findAllByRole('columnheader').eq(0).contains('HTML link')
                  })
                  break

                case 1:
                  cy.wrap(row).within(() => {
                    cy.findAllByRole('cell').should('have.length', 1)
                    cy.findByRole('cell').eq(0).find('a').should('have.text', 'Some link').and('have.attr', 'href', '#')
                  })
                  break
              }
            })
          })
        })
      })
    })
  })

  describe('complete data historic', () => {
    let completeHistoricDashboardUrl = ''

    before(() => {
      cy.task('resetStubs')
      executeDashboardStubs()
      cy.task('stubListDashboardCompleteDataHistoric')
      cy.task('stubDashboardResultCompleteData')
      cy.visit(path)

      requestReportByNameAndDescription({
        name: 'List - Complete dataset - Historic',
        description: 'This dashboard represents example list visualidations using a complete dataset of historic data.',
      })

      cy.findByRole('heading', { level: 1, name: /List - Complete dataset - Historic/ }).should('be.visible')
      checkA11y()

      cy.url().then((url) => {
        completeHistoricDashboardUrl = url
      })
    })

    beforeEach(() => {
      cy.visit(completeHistoricDashboardUrl)
    })

    it('should show the correct section headings', () => {
      cy.findAllByRole('heading', { level: 2 })
        .should('have.length', 2)
        .each((section, index) => {
          switch (index) {
            case 0:
              cy.wrap(section).contains('Rows as list')
              break
            case 1:
              cy.wrap(section).contains('Full Dataset')
              break
            default:
              break
          }
        })
    })

    it('should show the correct charts in sections', () => {
      cy.findAllByLabelText(/Rows as list/).within(() => {
        cy.findAllByRole('heading', { level: 3 }).should('have.length', 3)

        cy.findByLabelText(/MetricOne values/).within(() => {
          cy.findAllByRole('paragraph').first().contains('List visualisation showing historic MetricOne values')

          cy.findByRole('table').within(() => {
            cy.findAllByRole('row')
              .should('have.length', 19)
              .each((row, index) => {
                const i = index + 1
                switch (i) {
                  case 1:
                    cy.wrap(row).within(() => {
                      cy.findAllByRole('columnheader').should('have.length', 4)
                      cy.findAllByRole('columnheader').eq(0).contains('Date')
                      cy.findAllByRole('columnheader').eq(1).contains('Establishment ID')
                      cy.findAllByRole('columnheader').eq(2).contains('Has MetricOne')
                      cy.findAllByRole('columnheader').eq(3).contains('No MetricOne')
                    })
                    break

                  case 2:
                    cy.wrap(row).within(() => {
                      cy.findAllByRole('cell').should('have.length', 4)
                      cy.findAllByRole('cell').eq(0).contains('Aug 24')
                      cy.findAllByRole('cell').eq(1).contains('ABC')
                      cy.findAllByRole('cell').eq(2).contains('424')
                      cy.findAllByRole('cell').eq(3).contains('781')
                    })
                    break

                  case 3:
                    cy.wrap(row).within(() => {
                      cy.findAllByRole('cell').should('have.length', 4)
                      cy.findAllByRole('cell').eq(0).contains('Aug 24')
                      cy.findAllByRole('cell').eq(1).contains('GHI')
                      cy.findAllByRole('cell').eq(2).contains('761')
                      cy.findAllByRole('cell').eq(3).contains('610')
                    })
                    break

                  case 8:
                    cy.wrap(row).within(() => {
                      cy.findAllByRole('cell').should('have.length', 4)
                      cy.findAllByRole('cell').eq(0).contains('Oct 24')
                      cy.findAllByRole('cell').eq(1).contains('ABC')
                      cy.findAllByRole('cell').eq(2).contains('738')
                      cy.findAllByRole('cell').eq(3).contains('598')
                    })
                    break

                  case 10:
                    cy.wrap(row).within(() => {
                      cy.findAllByRole('cell').should('have.length', 4)
                      cy.findAllByRole('cell').eq(0).contains('Oct 24')
                      cy.findAllByRole('cell').eq(1).contains('DEF')
                      cy.findAllByRole('cell').eq(2).contains('665')
                      cy.findAllByRole('cell').eq(3).contains('687')
                    })
                    break

                  case 16:
                    cy.wrap(row).within(() => {
                      cy.findAllByRole('cell').should('have.length', 4)
                      cy.findAllByRole('cell').eq(0).contains('Dec 24')
                      cy.findAllByRole('cell').eq(1).contains('DEF')
                      cy.findAllByRole('cell').eq(2).contains('660')
                      cy.findAllByRole('cell').eq(3).contains('590')
                    })
                    break
                  default:
                    break
                }
              })
          })
        })

        cy.findByLabelText(/MetricTwo values/).within(() => {
          cy.findAllByRole('paragraph').first().contains('List visualisation showing historic MetricTwo values')
          cy.findByRole('table').should('exist')
        })

        cy.findByLabelText(/MetricThree Values/).within(() => {
          cy.findAllByRole('paragraph').first().contains('List visualisation showing historic MetricThree values')
          cy.findByRole('table').should('exist')
        })
      })
    })
  })

  describe('partial data', () => {
    let partialDashboardUrl = ''

    before(() => {
      cy.task('resetStubs')
      executeDashboardStubs()
      cy.task('stubListDashboardPartialData')
      cy.task('stubDashboardResultPartialData')
      cy.visit(path)

      requestReportByNameAndDescription({
        name: 'List - Partial dataset',
        description: 'This dashboard represents example list visualisations using a partial dataset',
      })

      checkA11y()

      cy.url().then((url) => {
        partialDashboardUrl = url
      })
    })

    beforeEach(() => {
      cy.visit(partialDashboardUrl)
    })

    it('should show the correct section headings', () => {
      cy.findAllByRole('heading', { level: 2 })
        .should('have.length', 2)
        .each((section, index) => {
          switch (index) {
            case 0:
              cy.wrap(section).contains('Column values as list')
              break
            case 1:
              cy.wrap(section).contains('Full Dataset')
              break
            default:
              break
          }
        })
    })

    it('should show the correct charts in sections', () => {
      cy.findAllByLabelText(/Column values as list/).within(() => {
        cy.findAllByRole('heading', { level: 3 }).should('have.length', 7)

        cy.findByLabelText('Diet totals').within(() => {
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

        cy.findByLabelText('Diet totals by establishment').within(() => {
          cy.findByRole('table')
            .should('exist')
            .within(() => {
              cy.findAllByRole('row')
                .should('have.length', 10)
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
                    case 9:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('cell').should('have.length', 3)
                        cy.findAllByRole('cell').eq(0).contains('Total')
                        cy.findAllByRole('cell').eq(2).contains('2540')
                      })
                      break
                    default:
                      break
                  }
                })
            })
        })

        cy.findByLabelText('Diet totals by establishment, by wing').within(() => {
          cy.findByRole('table')
            .should('exist')
            .within(() => {
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
                    case 1:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('cell').should('have.length', 4)
                        cy.findAllByRole('cell').eq(0).contains('ABC')
                        cy.findAllByRole('cell').eq(1).contains('north')
                        cy.findAllByRole('cell').eq(2).contains('Diet one')
                        cy.findAllByRole('cell').eq(3).contains('75')
                      })
                      break
                    case 2:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('cell').should('have.length', 4)
                        cy.findAllByRole('cell').eq(0).contains('ABC')
                        cy.findAllByRole('cell').eq(1).contains('north')
                        cy.findAllByRole('cell').eq(2).contains('Diet two')
                        cy.findAllByRole('cell').eq(3).contains('26')
                      })
                      break
                    case 3:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('cell').should('have.length', 4)
                        cy.findAllByRole('cell').eq(0).contains('ABC')
                        cy.findAllByRole('cell').eq(1).contains('north')
                        cy.findAllByRole('cell').eq(2).contains('Diet three')
                        cy.findAllByRole('cell').eq(3).contains('22')
                      })
                      break
                    case 4:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('cell').should('have.length', 4)
                        cy.findAllByRole('cell').eq(0).contains('ABC')
                        cy.findAllByRole('cell').eq(1).contains('north')
                        cy.findAllByRole('cell').eq(2).contains('Diet four')
                        cy.findAllByRole('cell').eq(3).contains('76')
                      })
                      break
                    default:
                      break
                  }
                })
            })
        })

        cy.findByLabelText('Diet totals by cell').within(() => {
          cy.findByRole('table')
            .should('exist')
            .within(() => {
              cy.findAllByRole('row')
                .should('have.length', 81)
                .eq(0)
                .within(() => {
                  cy.findAllByRole('columnheader').should('have.length', 5)
                  cy.findAllByRole('columnheader').eq(0).contains('Est code')
                  cy.findAllByRole('columnheader').eq(1).contains('Wing')
                  cy.findAllByRole('columnheader').eq(2).contains('Cell')
                  cy.findAllByRole('columnheader').eq(3).contains('Diet')
                  cy.findAllByRole('columnheader').eq(4).contains('Total prisoners')
                })
            })
        })

        cy.findByLabelText('Diet totals by cell with filters').within(() => {
          cy.findByRole('table')
            .should('exist')
            .within(() => {
              cy.findAllByRole('row')
                .should('have.length', 9)
                .each((row, index) => {
                  switch (index) {
                    case 0:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('columnheader').should('have.length', 5)
                        cy.findAllByRole('columnheader').eq(0).contains('Est code')
                        cy.findAllByRole('columnheader').eq(1).contains('Wing')
                        cy.findAllByRole('columnheader').eq(2).contains('Cell')
                        cy.findAllByRole('columnheader').eq(3).contains('Diet')
                        cy.findAllByRole('columnheader').eq(4).contains('Total prisoners')
                      })
                      break
                    case 1:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('cell').should('have.length', 5)
                        cy.findAllByRole('cell').eq(0).contains('ABC')
                        cy.findAllByRole('cell').eq(1).contains('north')
                        cy.findAllByRole('cell').eq(2).contains('cell-1')
                        cy.findAllByRole('cell').eq(3).contains('Diet one')
                        cy.findAllByRole('cell').eq(4).contains('1')
                      })
                      break
                    case 2:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('cell').should('have.length', 5)
                        cy.findAllByRole('cell').eq(0).contains('ABC')
                        cy.findAllByRole('cell').eq(1).contains('north')
                        cy.findAllByRole('cell').eq(2).contains('cell-1')
                        cy.findAllByRole('cell').eq(3).contains('Diet four')
                        cy.findAllByRole('cell').eq(4).contains('0')
                      })
                      break
                    case 3:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('cell').should('have.length', 5)
                        cy.findAllByRole('cell').eq(0).contains('ABC')
                        cy.findAllByRole('cell').eq(1).contains('north')
                        cy.findAllByRole('cell').eq(2).contains('cell-2')
                        cy.findAllByRole('cell').eq(3).contains('Diet one')
                        cy.findAllByRole('cell').eq(4).contains('10')
                      })
                      break
                    case 4:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('cell').should('have.length', 5)
                        cy.findAllByRole('cell').eq(0).contains('ABC')
                        cy.findAllByRole('cell').eq(1).contains('north')
                        cy.findAllByRole('cell').eq(2).contains('cell-2')
                        cy.findAllByRole('cell').eq(3).contains('Diet four')
                        cy.findAllByRole('cell').eq(4).contains('16')
                      })
                      break
                    case 5:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('cell').should('have.length', 5)
                        cy.findAllByRole('cell').eq(0).contains('ABC')
                        cy.findAllByRole('cell').eq(1).contains('south')
                        cy.findAllByRole('cell').eq(2).contains('cell-1')
                        cy.findAllByRole('cell').eq(3).contains('Diet one')
                        cy.findAllByRole('cell').eq(4).contains('1')
                      })
                      break
                    case 6:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('cell').should('have.length', 5)
                        cy.findAllByRole('cell').eq(0).contains('ABC')
                        cy.findAllByRole('cell').eq(1).contains('south')
                        cy.findAllByRole('cell').eq(2).contains('cell-1')
                        cy.findAllByRole('cell').eq(3).contains('Diet four')
                        cy.findAllByRole('cell').eq(4).contains('0')
                      })
                      break
                    default:
                      break
                  }
                })
            })
        })

        cy.findByLabelText('Diet totals filter on DietOne').within(() => {
          cy.findByRole('table')
            .should('exist')
            .within(() => {
              cy.findAllByRole('row')
                .should('have.length', 2)
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
                    default:
                      break
                  }
                })
            })
        })

        cy.findByLabelText('Diet totals single column').within(() => {
          cy.findByRole('table')
            .should('exist')
            .within(() => {
              cy.findAllByRole('row')
                .should('have.length', 3)
                .each((row, index) => {
                  switch (index) {
                    case 0:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('columnheader').should('have.length', 1)
                        cy.findAllByRole('columnheader').eq(0).contains('Total prisoners')
                      })
                      break
                    case 1:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('cell').should('have.length', 1)
                        cy.findAllByRole('cell').eq(0).contains('1219')
                      })
                      break
                    case 2:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('cell').should('have.length', 1)
                        cy.findAllByRole('cell').eq(0).contains('1125')
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

  describe('invalid definitions', () => {
    describe('Invalid vis definition', () => {
      beforeEach(() => {
        cy.task('resetStubs')
        executeDashboardStubs()
        cy.task('stubListInvalidVisDefs')
        cy.task('stubDashboardResultCompleteData')
        cy.visit(path)

        requestReportByNameAndDescription({
          name: 'List - Invalid vis definition',
          description: 'Invalid vis definition',
        })
      })

      it('should show an appropriate error message', () => {
        cy.findByRole('heading', { name: /Your report has failed to generate/ }).should('be.visible')
        cy.findAllByRole('paragraph').eq(1).contains('Error: Schema validation error: measures is required')
      })
    })

    describe('Invalid definition', () => {
      beforeEach(() => {
        cy.task('resetStubs')
        executeDashboardStubs()
        cy.task('stubListInvalidDefs')
        cy.task('stubDashboardResultCompleteData')
        cy.visit(path)

        requestReportByNameAndDescription({
          name: 'Invalid definition',
          description: 'Missing sections array',
        })
      })

      it('should show an appropriate error message', () => {
        cy.findByRole('heading', { name: /Your report has failed to generate/ }).should('be.visible')
        cy.findAllByRole('paragraph')
          .eq(1)
          .contains('Error: Schema validation error: Dashboard definition: Sections is required')
      })
    })
  })
})
