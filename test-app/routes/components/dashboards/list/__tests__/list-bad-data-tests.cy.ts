import {
  checkA11y,
  executeDashboardStubs,
  requestReportByNameAndDescription,
} from '../../../../../../cypress-tests/cypressUtils'

context('Dashboard visualisation: List chart - Bad data testing', () => {
  const path = '/'

  describe('List chart - Bad data testing', () => {
    let dashboardUrl = ''

    before(() => {
      cy.task('resetStubs')
      executeDashboardStubs()

      cy.task('stubListDashboardDefinition')
      cy.task('stubDashboardResultBadData')

      cy.visit(path)

      requestReportByNameAndDescription({
        name: 'List charts dashboard',
        description: 'This dashboard represents example list visualisations using the default dataset....',
      })

      cy.findByRole('heading', { level: 1, name: /List charts dashboard/ }).should('be.visible')
      checkA11y()

      cy.url().then(url => {
        dashboardUrl = url
      })
    })

    beforeEach(() => {
      cy.visit(dashboardUrl)
    })

    it('should render correctly when bad data is provided to the chart', () => {
      cy.findAllByLabelText(/Rows as list/).within(() => {
        cy.findAllByRole('heading', { level: 3 }).should('have.length', 3)

        cy.findByLabelText(/MetricOne values/).within(() => {
          cy.findAllByRole('paragraph').eq(1).contains('No data')
        })

        cy.findByLabelText(/MetricTwo values/).within(() => {
          cy.findAllByRole('paragraph').eq(1).contains('No data')
        })
      })

      cy.findAllByLabelText(/Column values as list/).within(() => {
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
                      cy.findAllByRole('columnheader').eq(2).contains('DEF')
                      cy.findAllByRole('columnheader').eq(3).contains('GHI')
                    })
                    break

                  case 1:
                    cy.wrap(row).within(() => {
                      cy.findAllByRole('cell').should('have.length', 4)
                      cy.findAllByRole('cell').eq(0).contains('Has MetricOne')
                      cy.findAllByRole('cell').eq(1).contains('undefined')
                      cy.findAllByRole('cell').eq(2).contains('undefined')
                      cy.findAllByRole('cell').eq(3).contains('undefined')
                    })
                    break

                  case 2:
                    cy.wrap(row).within(() => {
                      cy.findAllByRole('cell').should('have.length', 4)
                      cy.findAllByRole('cell').eq(0).contains('No MetricOne')
                      cy.findAllByRole('cell').eq(1).contains('614')
                      cy.findAllByRole('cell').eq(1).contains('614')
                      cy.findAllByRole('cell').eq(1).contains('614')
                    })
                    break

                  case 3:
                    cy.wrap(row).within(() => {
                      cy.findAllByRole('cell').should('have.length', 4)
                      cy.findAllByRole('cell').eq(0).contains('Has MetricThree')
                      cy.findAllByRole('cell').eq(1).contains('680')
                      cy.findAllByRole('cell').eq(1).contains('680')
                      cy.findAllByRole('cell').eq(1).contains('680')
                    })
                    break

                  case 4:
                    cy.wrap(row).within(() => {
                      cy.findAllByRole('cell').should('have.length', 4)
                      cy.findAllByRole('cell').eq(0).contains('No MetricThree')
                      cy.findAllByRole('cell').eq(1).contains('799')
                      cy.findAllByRole('cell').eq(1).contains('799')
                      cy.findAllByRole('cell').eq(1).contains('799')
                    })
                    break

                  case 5:
                    cy.wrap(row).within(() => {
                      cy.findAllByRole('cell').should('have.length', 4)
                      cy.findAllByRole('cell').eq(0).contains('Has MetricTwo')
                      cy.findAllByRole('cell').eq(1).contains('undefined')
                      cy.findAllByRole('cell').eq(2).contains('undefined')
                      cy.findAllByRole('cell').eq(3).contains('undefined')
                    })
                    break

                  case 6:
                    cy.wrap(row).within(() => {
                      cy.findAllByRole('cell').should('have.length', 4)
                      cy.findAllByRole('cell').eq(0).contains('No MetricTwo')
                      cy.findAllByRole('cell').eq(1).contains('665')
                      cy.findAllByRole('cell').eq(2).contains('665')
                      cy.findAllByRole('cell').eq(3).contains('665')
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
