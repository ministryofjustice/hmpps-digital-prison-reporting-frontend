import {
  checkA11y,
  executeDashboardStubs,
  requestReportByNameAndDescription,
} from '../../../../../../../cypress-tests/cypressUtils'

context('Dashboard visualisation: bar chart - Bad data testing', () => {
  const path = '/'

  describe('Bar chart - Bad data testing', () => {
    let dashboardUrl = ''

    before(() => {
      cy.task('resetStubs')
      executeDashboardStubs()

      cy.task('stubBarChartsDashboardDefinition')
      cy.task('stubDashboardResultBadData')

      cy.visit(path)

      requestReportByNameAndDescription({
        name: 'Bar charts dashboard',
        description: 'This dashboard represents example Bar visualisations using the default dataset. ...',
      })

      cy.findByRole('heading', { level: 1, name: /Bar charts dashboard/ }).should('be.visible')
      checkA11y()

      cy.url().then(url => {
        dashboardUrl = url
      })
    })

    beforeEach(() => {
      cy.visit(dashboardUrl)
    })

    it('should render correctly when bad data is provided to the chart', () => {
      cy.findAllByLabelText(/Simple bar charts/).within(() => {
        cy.findAllByRole('heading', { level: 3 }).should('have.length', 4)

        cy.findByLabelText(/MetricOne values/).within(() => {
          cy.findAllByRole('paragraph').eq(1).contains('No data')
        })

        cy.findByLabelText(/MetricTwo values/).within(() => {
          cy.findAllByRole('paragraph').eq(1).contains('No data')
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
                        cy.findAllByRole('columnheader').should('have.length', 4)
                        cy.findAllByRole('columnheader').eq(0).contains('Date')
                        cy.findAllByRole('columnheader').eq(1).contains('Establishment ID')
                        cy.findAllByRole('columnheader').eq(2).contains('Has MetricThree')
                        cy.findAllByRole('columnheader').eq(3).contains('No MetricThree')
                      })
                      break
                    case 1:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('cell').should('have.length', 4)
                        cy.findAllByRole('cell').eq(1).contains('ABC')
                        cy.findAllByRole('cell').eq(2).contains('680')
                        cy.findAllByRole('cell').eq(3).contains('799')
                      })
                      break
                    case 2:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('cell').should('have.length', 4)
                        cy.findAllByRole('cell').eq(1).contains('DEF')
                        cy.findAllByRole('cell').eq(2).contains('680')
                        cy.findAllByRole('cell').eq(3).contains('799')
                      })
                      break
                    case 3:
                      cy.wrap(row).within(() => {
                        cy.findAllByRole('cell').should('have.length', 4)
                        cy.findAllByRole('cell').eq(1).contains('GHI')
                        cy.findAllByRole('cell').eq(2).contains('680')
                        cy.findAllByRole('cell').eq(3).contains('799')
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
