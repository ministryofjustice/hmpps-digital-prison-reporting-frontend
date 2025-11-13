import { checkA11y, executeDashboardStubs } from '../../../../../../../cypress-tests/cypressUtils'

context('Viewing a report', () => {
  const path = '/embedded/platform/'

  describe('dashboard tests', () => {
    before(() => {
      executeDashboardStubs()
      cy.task('stubTestDashboard8')
      cy.task('stubDashboardSuccessResult20')
    })

    it('should mark the dashboard as recently viewed', () => {
      // Request and run a report so we can go back to it for each test
      cy.visit(path)
      cy.findByRole('tab', { name: /Viewed \(0\)/ }).should('be.visible')
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
      checkA11y()
      cy.visit(path)
      cy.findByRole('tab', { name: /Viewed \(1\)/ }).should('be.visible')
    })
  })
})
