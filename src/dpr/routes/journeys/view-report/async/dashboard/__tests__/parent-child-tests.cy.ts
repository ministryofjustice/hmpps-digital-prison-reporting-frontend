import { resetFeatureFlags } from 'test-app/routes/integrationTests/appStateUtils'
import { checkA11y, executeDashboardStubs } from '../../../../../../../../cypress-tests/cypressUtils'

context('Viewing a parent-child dashboard', () => {
  const path = '/'

  describe('parent-child dashboards', () => {
    beforeEach(() => {
      executeDashboardStubs()
      cy.task('stubTestDashboardWithParentChild')
      cy.task('stubTestDashboardWithChildOne')
      cy.task('stubTestDashboardWithChildTwo')
      cy.task('stubDashboardResultCompleteData')
    })

    it('should show the dashboard details', () => {
      cy.task('stubFeatureFlags')
      resetFeatureFlags()

      // Request and run a report so we can go back to it for each test
      cy.visit(path)
      cy.findByLabelText(/Reports catalogue.*/i).within(() => {
        cy.findByRole('row', {
          name: (_, element) => {
            return (
              Boolean(element.textContent?.includes('Test Parent Dashboard')) &&
              Boolean(element.textContent?.includes('Dashboard used for mocking parent-child dashboards'))
            )
          },
        }).within(() => {
          cy.findByRole('link', { name: 'Request dashboard' }).click()
        })
      })
      checkA11y()
      cy.findByRole('button', { name: /Request/ }).click()

      cy.findAllByRole('group').contains('Dashboard details').should('be.visible').click()

      cy.findAllByRole('group')
        .contains('Dashboard details')
        .parent()
        .parent()
        .within(() => {
          cy.findAllByRole('row').each((row, index) => {
            cy.wrap(row).within(() => {
              switch (index) {
                case 0:
                  cy.findAllByRole('cell', { name: 'Name:' }).should('exist')
                  cy.findAllByRole('cell', { name: 'Test Parent Dashboard' }).should('exist')
                  break
                case 1:
                  cy.findAllByRole('cell', { name: 'Product:' }).should('exist')
                  cy.findAllByRole('cell', { name: 'Feature testing' }).should('exist')
                  break
                case 2:
                  cy.findAllByRole('cell', { name: 'Description:' }).should('exist')
                  cy.findAllByRole('cell', { name: 'Dashboard used for mocking parent-child dashboards' }).should(
                    'exist',
                  )
                  break
                case 3:
                  cy.findAllByRole('cell', { name: 'Requested at:' }).should('exist')
                  break
                case 4:
                  cy.findAllByRole('cell', { name: 'No of sections:' }).should('exist')
                  cy.findAllByRole('cell', { name: '6' }).should('exist')
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
