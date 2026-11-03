import {
  checkA11y,
  executeDashboardStubs,
  requestReportByNameAndDescription,
} from '../../../../../../../cypress-tests/cypressUtils'

context('Dashboard visualisation: Line chart - Bad data testing', () => {
  const path = '/'

  describe('Line chart - Bad data testing', () => {
    let dashboardUrl = ''

    before(() => {
      cy.task('resetStubs')
      executeDashboardStubs()

      cy.task('stubLineChartsDashboardDefinition')
      cy.task('stubDashboardResultBadData')

      cy.visit(path)

      requestReportByNameAndDescription({
        name: 'Line charts dashboard',
        description: 'This dashboard represents example Line visualisations using the default dataset.',
      })

      cy.findByRole('heading', { level: 1, name: /Line charts dashboard/ }).should('be.visible')
      checkA11y()

      cy.url().then(url => {
        dashboardUrl = url
      })
    })

    beforeEach(() => {
      cy.visit(dashboardUrl)
    })

    it('should render correctly when bad data is provided to the chart', () => {
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
                        cy.findAllByRole('columnheader').should('have.length', 6)
                        cy.findAllByRole('columnheader').eq(0).contains('Date')
                        cy.findAllByRole('columnheader').eq(1).contains('Establishment ID')
                        cy.findAllByRole('columnheader').eq(2).contains('Point 1')
                        cy.findAllByRole('columnheader').eq(3).contains('Point 2')
                        cy.findAllByRole('columnheader').eq(4).contains('Point 3')
                        cy.findAllByRole('columnheader').eq(5).contains('Point 4')
                      })
                      break
                    case 1:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('cell').should('have.length', 6)
                        cy.findAllByRole('cell').eq(1).contains('ABC')
                        cy.findAllByRole('cell').eq(2).contains('No data')
                        cy.findAllByRole('cell').eq(3).contains('614')
                        cy.findAllByRole('cell').eq(4).contains('No data')
                        cy.findAllByRole('cell').eq(5).contains('665')
                      })
                      break
                    case 2:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('cell').should('have.length', 6)
                        cy.findAllByRole('cell').eq(1).contains('DEF')
                        cy.findAllByRole('cell').eq(2).contains('No data')
                        cy.findAllByRole('cell').eq(3).contains('614')
                        cy.findAllByRole('cell').eq(4).contains('No data')
                        cy.findAllByRole('cell').eq(5).contains('665')
                      })
                      break
                    case 3:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('cell').should('have.length', 6)
                        cy.findAllByRole('cell').eq(1).contains('GHI')
                        cy.findAllByRole('cell').eq(2).contains('No data')
                        cy.findAllByRole('cell').eq(3).contains('614')
                        cy.findAllByRole('cell').eq(4).contains('No data')
                        cy.findAllByRole('cell').eq(5).contains('665')
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
                        cy.findAllByRole('columnheader').should('have.length', 8)
                        cy.findAllByRole('columnheader').eq(0).contains('Date')
                        cy.findAllByRole('columnheader').eq(1).contains('Establishment ID')
                        cy.findAllByRole('columnheader').eq(2).contains('Point 1')
                        cy.findAllByRole('columnheader').eq(3).contains('Point 2')
                        cy.findAllByRole('columnheader').eq(4).contains('Point 3')
                        cy.findAllByRole('columnheader').eq(5).contains('Point 4')
                        cy.findAllByRole('columnheader').eq(6).contains('Point 5')
                        cy.findAllByRole('columnheader').eq(7).contains('Point 6')
                      })
                      break
                    case 1:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('cell').should('have.length', 8)
                        cy.findAllByRole('cell').eq(1).contains('ABC')
                        cy.findAllByRole('cell').eq(2).contains('No data')
                        cy.findAllByRole('cell').eq(3).contains('665')
                        cy.findAllByRole('cell').eq(4).contains('680')
                        cy.findAllByRole('cell').eq(5).contains('799')
                        cy.findAllByRole('cell').eq(6).contains('No data')
                        cy.findAllByRole('cell').eq(7).contains('614')
                      })
                      break
                    case 2:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('cell').should('have.length', 8)
                        cy.findAllByRole('cell').eq(1).contains('DEF')
                        cy.findAllByRole('cell').eq(2).contains('No data')
                        cy.findAllByRole('cell').eq(3).contains('665')
                        cy.findAllByRole('cell').eq(4).contains('680')
                        cy.findAllByRole('cell').eq(5).contains('799')
                        cy.findAllByRole('cell').eq(6).contains('No data')
                        cy.findAllByRole('cell').eq(7).contains('614')
                      })
                      break
                    case 3:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('cell').should('have.length', 8)
                        cy.findAllByRole('cell').eq(1).contains('GHI')
                        cy.findAllByRole('cell').eq(2).contains('No data')
                        cy.findAllByRole('cell').eq(3).contains('665')
                        cy.findAllByRole('cell').eq(4).contains('680')
                        cy.findAllByRole('cell').eq(5).contains('799')
                        cy.findAllByRole('cell').eq(6).contains('No data')
                        cy.findAllByRole('cell').eq(7).contains('614')
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
