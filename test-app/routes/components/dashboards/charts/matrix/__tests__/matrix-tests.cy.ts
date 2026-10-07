import {
  checkA11y,
  executeDashboardStubs,
  requestReportByNameAndDescription,
} from '../../../../../../../cypress-tests/cypressUtils'

context('Dashboard visualisation: matrix chart', () => {
  const path = '/'

  describe('Complete data', () => {
    let completeDashboardUrl = ''

    before(() => {
      cy.task('resetStubs')
      executeDashboardStubs()
      cy.task('stubMatrixCompleteDailyData')
      cy.task('stubMatrixCompleteMonthlyData')
      cy.task('stubMatrixCompleteAnnuallyData')

      cy.task('stubDashboardResultCompleteDataDaily')
      cy.task('stubDashboardResultCompleteDataMonthly')
      cy.task('stubDashboardResultCompleteDataAnnually')
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
      cy.findAllByRole('heading', { level: 2 }).then(headings => {
        const texts = [...headings].map(h => h.textContent?.trim())
        expect(texts).to.deep.equal([
          'Automatic bucketing',
          'Full Dataset',
          'Automatic bucketing',
          'Full Dataset',
          'Automatic bucketing',
          'Full Dataset',
        ])
      })
    })

    it('should show the correct data for charts', () => {
      cy.findAllByLabelText(/Automatic bucketing/)
        .first()
        .within(() => {
          cy.findAllByRole('heading', { level: 3 }).should('have.length', 1)

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
})
