import { checkA11y } from '../../../../../../../cypress-tests/cypressUtils'

context('Viewing a report', () => {
  let viewReportUrl: string
  const path = '/embedded/platform/'

  describe('dashboard tests', () => {
    before(() => {
      cy.task('stubDefinitions')
      cy.task('stubTestDashboard8')
      cy.task('stubMockDashboardsStatusFinished')
      cy.task('stubViewAsyncResults')
      cy.task('stubDashboardSuccessResult20')

      // Request and run a report so we can go back to it for each test
      cy.visit(path)
      checkA11y()
      cy.findByLabelText(/Reports catalogue.*/i).within(() => {
        cy.findByRole('row', {
          name: (_, element) => {
            return (
              element.textContent.includes('Test Dashboard') &&
              element.textContent.includes('Dashboard used for testing testing')
            )
          },
        }).within(() => {
          cy.findByRole('link', { name: 'Request dashboard' }).click()
        })
      })
      checkA11y()
      cy.findByRole('button', { name: /Request/ }).click()
      checkA11y()
      cy.findByRole('heading', { level: 1, name: /Test Dashboard/ }).should('be.visible')
      cy.url().then((url) => {
        viewReportUrl = url
      })
    })

    it('is accessible', () => {
      cy.visit(viewReportUrl)
      cy.injectAxe()
      cy.checkA11y()
    })
  })
})
