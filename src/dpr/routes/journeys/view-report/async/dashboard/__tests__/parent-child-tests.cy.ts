import { resetFeatureFlags } from 'test-app/routes/integrationTests/appStateUtils'
import { checkA11y, executeDashboardStubs } from '../../../../../../../../cypress-tests/cypressUtils'

context('Viewing a parent-child dashboard', () => {
  const path = '/'

  describe('parent-child dashboards', () => {
    before(() => {
      executeDashboardStubs()
      cy.task('stubTestDashboardWithParentChild')
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
                  cy.findAllByRole('cell', { name: 'Test Dashboard' }).should('exist')
                  break
                case 1:
                  cy.findAllByRole('cell', { name: 'Product:' }).should('exist')
                  cy.findAllByRole('cell', { name: 'Feature testing' }).should('exist')
                  break
                case 2:
                  cy.findAllByRole('cell', { name: 'Description:' }).should('exist')
                  cy.findAllByRole('cell', { name: 'Test Dashboard used for testing' }).should('exist')
                  break
                case 3:
                  cy.findAllByRole('cell', { name: 'Requested at:' }).should('exist')
                  break
                case 4:
                  cy.findAllByRole('cell', { name: 'Applied Filters:' }).should('exist')
                  cy.findAllByRole('listitem').each((item, i) => {
                    switch (i) {
                      case 0:
                        cy.wrap(item).contains('Establishment id: ABC')
                        break
                      default:
                        break
                    }
                  })
                  break
                case 5:
                  cy.findAllByRole('cell', { name: 'No of sections:' }).should('exist')
                  cy.findAllByRole('cell', { name: '1' }).should('exist')
                  break
                default:
                  break
              }
            })
          })
        })
    })

    // it('should show viz', () => {
    //   cy.task('stubFeatureFlags')
    //   resetFeatureFlags()
    //   // Request and run a report so we can go back to it for each test
    //   cy.visit(path)
    //   cy.findByLabelText(/Reports catalogue.*/i).within(() => {
    //     cy.findByRole('row', {
    //       name: (_, element) => {
    //         return (
    //           Boolean(element.textContent?.includes('Test Dashboard')) &&
    //           Boolean(element.textContent?.includes('Test Dashboard used for testing'))
    //         )
    //       },
    //     }).within(() => {
    //       cy.findByRole('link', { name: 'Request dashboard' }).click()
    //     })
    //   })
    //   checkA11y()
    //   cy.findByRole('button', { name: /Request/ }).click()
    //   checkA11y()
    //   cy.findByRole('heading', { level: 1, name: /Test Dashboard/ }).should('be.visible')
    //   checkA11y()
    //   cy.findAllByText(/This visualisation type is not supported yet./).should('have.length', 0)
    //   cy.get('canvas').should('have.length.at.least', 1)
    // })
  })
})
