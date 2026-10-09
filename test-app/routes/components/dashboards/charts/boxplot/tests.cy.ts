import {
  checkA11y,
  executeDashboardStubs,
  requestReportByNameAndDescription,
} from '../../../../../../cypress-tests/cypressUtils'

context('Dashboard visualisation: bar chart', () => {
  const path = '/'

  describe('Complete data', () => {
    let boxPlotDashboardUrl = ''

    before(() => {
      cy.task('resetStubs')
      executeDashboardStubs()
      cy.task('stubDefinitionBoxPlotDashboard')
      cy.task('stubDashboardResultBoxPlotData')
      cy.visit(path)

      requestReportByNameAndDescription({
        name: 'Box plot chart Examples',
        description: 'A set of box plot chart examples',
      })

      cy.findByRole('heading', { level: 1, name: /Box plot chart Examples/ }).should('be.visible')
      checkA11y()

      cy.url().then(url => {
        boxPlotDashboardUrl = url
      })
    })

    beforeEach(() => {
      cy.visit(boxPlotDashboardUrl)
    })

    it('should load the page', () => {
      cy.findByRole('heading', { level: 1, name: /Box plot chart Examples/ }).should('be.visible')
    })

    it('should have the correct amount of sections', () => {
      cy.findAllByRole('heading', { level: 2 })
        .should('have.length', 3)
        .each((section, index) => {
          switch (index) {
            case 0:
              cy.wrap(section).contains('Basic box plot charts - wide')
              break
            case 1:
              cy.wrap(section).contains('Basic box plot charts - grouped')
              break
            case 2:
              cy.wrap(section).contains('Dashboard dataset')
              break
            default:
              break
          }
        })
    })

    it('should navigate to the correct sections via the side navigation', () => {
      cy.findByRole('link', { name: 'Basic box plot charts - wide' }).click()
      cy.location('hash').should('eq', '#section-1-dashboard-section')
      cy.get('#section-1-dashboard-section').should('exist').and('be.visible')

      cy.findByRole('link', { name: 'Box plot example 1' }).click()
      cy.location('hash').should('eq', '#box-plot-wide-1-dash-section-visualisation')
      cy.get('#box-plot-wide-1-dash-section-visualisation').should('exist').and('be.visible')

      cy.findByRole('link', { name: 'Box plot example 2' }).click()
      cy.location('hash').should('eq', '#box-plot-wide-2-dash-section-visualisation')
      cy.get('#box-plot-wide-2-dash-section-visualisation').should('exist').and('be.visible')
    })

    it('should show the correct data for charts', () => {
      cy.findAllByLabelText(/Basic box plot charts - wide/).within(() => {
        cy.findAllByRole('heading', { level: 3 }).should('have.length', 2)

        cy.findByLabelText(/Box plot example 1/).within(() => {
          cy.findByRole('tab', { name: /Table 1/ }).click()
          cy.findByLabelText(/Table 1.*/i).within(() => {
            cy.findByRole('table').within(() => {
              cy.findAllByRole('row')
                .should('have.length', 5)
                .each((row, index) => {
                  switch (index) {
                    case 0:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('columnheader').should('have.length', 8)
                        cy.findAllByRole('columnheader').eq(0).contains('Category')
                        cy.findAllByRole('columnheader').eq(1).contains('Dataset')
                        cy.findAllByRole('columnheader').eq(2).contains('Min')
                        cy.findAllByRole('columnheader').eq(3).contains('Q1')
                        cy.findAllByRole('columnheader').eq(4).contains('Median')
                        cy.findAllByRole('columnheader').eq(5).contains('Mean')
                        cy.findAllByRole('columnheader').eq(6).contains('Q3')
                        cy.findAllByRole('columnheader').eq(7).contains('Max')
                      })
                      break
                    case 1:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('cell').should('have.length', 8)
                        cy.findAllByRole('cell').eq(0).contains('Category 1')
                        cy.findAllByRole('cell').eq(1).contains('Box plot example 1')
                        cy.findAllByRole('cell').eq(2).contains('9')
                        cy.findAllByRole('cell').eq(3).contains('20.25')
                        cy.findAllByRole('cell').eq(4).contains('42.5')
                        cy.findAllByRole('cell').eq(5).contains('44.083333333333336')
                        cy.findAllByRole('cell').eq(6).contains('64')
                        cy.findAllByRole('cell').eq(7).contains('91')
                      })
                      break
                    case 2:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('cell').should('have.length', 8)
                        cy.findAllByRole('cell').eq(0).contains('Category 2')
                        cy.findAllByRole('cell').eq(1).contains('Box plot example 1')
                        cy.findAllByRole('cell').eq(2).contains('8')
                        cy.findAllByRole('cell').eq(3).contains('27.5')
                        cy.findAllByRole('cell').eq(4).contains('62')
                        cy.findAllByRole('cell').eq(5).contains('54.833333333333336')
                        cy.findAllByRole('cell').eq(6).contains('76.75')
                        cy.findAllByRole('cell').eq(7).contains('97')
                      })
                      break
                    case 3:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('cell').should('have.length', 8)
                        cy.findAllByRole('cell').eq(0).contains('Category 3')
                        cy.findAllByRole('cell').eq(1).contains('Box plot example 1')
                        cy.findAllByRole('cell').eq(2).contains('15')
                        cy.findAllByRole('cell').eq(3).contains('33')
                        cy.findAllByRole('cell').eq(4).contains('47')
                        cy.findAllByRole('cell').eq(5).contains('49.916666666666664')
                        cy.findAllByRole('cell').eq(6).contains('65.25')
                        cy.findAllByRole('cell').eq(7).contains('92')
                      })
                      break
                    case 4:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('cell').should('have.length', 8)
                        cy.findAllByRole('cell').eq(0).contains('Category 4')
                        cy.findAllByRole('cell').eq(1).contains('Box plot example 1')
                        cy.findAllByRole('cell').eq(2).contains('6')
                        cy.findAllByRole('cell').eq(3).contains('21.75')
                        cy.findAllByRole('cell').eq(4).contains('50')
                        cy.findAllByRole('cell').eq(5).contains('48.25')
                        cy.findAllByRole('cell').eq(6).contains('68.75')
                        cy.findAllByRole('cell').eq(7).contains('96')
                      })
                      break
                    default:
                      break
                  }
                })
            })
          })

          cy.findByRole('tab', { name: /Table 2/ }).click()
          cy.findByLabelText(/Table 2.*/i).within(() => {
            cy.findByRole('table').within(() => {
              cy.findAllByRole('row')
                .should('have.length', 13)
                .each((row, index) => {
                  switch (index) {
                    case 0:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('columnheader').should('have.length', 4)
                        cy.findAllByRole('columnheader').eq(0).contains('Category 1')
                        cy.findAllByRole('columnheader').eq(1).contains('Category 2')
                        cy.findAllByRole('columnheader').eq(2).contains('Category 3')
                        cy.findAllByRole('columnheader').eq(3).contains('Category 4')
                      })
                      break
                    case 1:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('cell').should('have.length', 4)
                        cy.findAllByRole('cell').eq(0).contains('14')
                        cy.findAllByRole('cell').eq(1).contains('82')
                        cy.findAllByRole('cell').eq(2).contains('37')
                        cy.findAllByRole('cell').eq(3).contains('65')
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
