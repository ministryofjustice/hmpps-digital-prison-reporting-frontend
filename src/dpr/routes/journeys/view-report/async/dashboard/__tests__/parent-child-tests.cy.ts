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

    describe('parent dashboard', () => {
      it('should render the dashboard correctly', () => {
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

        // verify section order
        cy.findAllByRole('heading', { level: 2 }).then(headings => {
          const headingTexts = headings.map((_, heading) => heading.textContent).get()
          expect(headingTexts).to.deep.equal([
            'Parent - Section 1',
            'Parent - Section 2',
            'Child one - Section 1',
            'Child one - Section 2',
            'Child two - Section 1',
            'Child two - Section 2',
          ])
        })

        // check parent sections have the correct parent and child visualisations
        cy.findAllByLabelText(/Parent - Section 1/).within(() => {
          cy.findAllByRole('heading', { level: 3 }).should('have.length', 2)

          cy.findByLabelText(/MetricOne values/).should('exist')
          cy.findByLabelText(/MetricThree values/).should('exist')
        })

        cy.findAllByLabelText(/Parent - Section 2/).within(() => {
          cy.findAllByRole('heading', { level: 3 }).should('have.length', 2)

          cy.findByLabelText(/MetricTwo values/).should('exist')
          cy.findByLabelText(/MetricThree values/).should('exist')
        })
      })
    })

    describe('child one dashboard', () => {
      it('should render the dashboard correctly', () => {
        cy.task('stubFeatureFlags')
        resetFeatureFlags()

        // Request and run a report so we can go back to it for each test
        cy.visit(path)
        cy.findByLabelText(/Reports catalogue.*/i).within(() => {
          cy.findByRole('row', {
            name: (_, element) => {
              return (
                Boolean(element.textContent?.includes('Child one dashboard')) &&
                Boolean(element.textContent?.includes('Dashboard used for mocking child 1 dashboard'))
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
                    cy.findAllByRole('cell', { name: 'Child one dashboard' }).should('exist')
                    break
                  case 1:
                    cy.findAllByRole('cell', { name: 'Product:' }).should('exist')
                    cy.findAllByRole('cell', { name: 'Feature testing' }).should('exist')
                    break
                  case 2:
                    cy.findAllByRole('cell', { name: 'Description:' }).should('exist')
                    cy.findAllByRole('cell', { name: 'Dashboard used for mocking child 1 dashboard' }).should('exist')
                    break
                  case 3:
                    cy.findAllByRole('cell', { name: 'Requested at:' }).should('exist')
                    break
                  case 4:
                    cy.findAllByRole('cell', { name: 'No of sections:' }).should('exist')
                    cy.findAllByRole('cell', { name: '3' }).should('exist')
                    break
                  default:
                    break
                }
              })
            })
          })

        // verify section order
        cy.findAllByRole('heading', { level: 2 }).then(headings => {
          const headingTexts = headings.map((_, heading) => heading.textContent).get()
          expect(headingTexts).to.deep.equal([
            'Child one - Section 1',
            'Child one - Section 2',
            'Child one - Section 3',
          ])
        })
      })
    })

    describe('child two dashboard', () => {
      it('should render the dashboard correctly', () => {
        cy.task('stubFeatureFlags')
        resetFeatureFlags()

        // Request and run a report so we can go back to it for each test
        cy.visit(path)
        cy.findByLabelText(/Reports catalogue.*/i).within(() => {
          cy.findByRole('row', {
            name: (_, element) => {
              return (
                Boolean(element.textContent?.includes('Child two dashboard')) &&
                Boolean(element.textContent?.includes('Dashboard used for mocking child 2 dashboard'))
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
                    cy.findAllByRole('cell', { name: 'Child two dashboard' }).should('exist')
                    break
                  case 1:
                    cy.findAllByRole('cell', { name: 'Product:' }).should('exist')
                    cy.findAllByRole('cell', { name: 'Feature testing' }).should('exist')
                    break
                  case 2:
                    cy.findAllByRole('cell', { name: 'Description:' }).should('exist')
                    cy.findAllByRole('cell', { name: 'Dashboard used for mocking child 2 dashboard' }).should('exist')
                    break
                  case 3:
                    cy.findAllByRole('cell', { name: 'Requested at:' }).should('exist')
                    break
                  case 4:
                    cy.findAllByRole('cell', { name: 'No of sections:' }).should('exist')
                    cy.findAllByRole('cell', { name: '3' }).should('exist')
                    break
                  default:
                    break
                }
              })
            })
          })

        // verify section order
        cy.findAllByRole('heading', { level: 2 }).then(headings => {
          const headingTexts = headings.map((_, heading) => heading.textContent).get()
          expect(headingTexts).to.deep.equal([
            'Child two - Section 1',
            'Child two - Section 2',
            'Child two - Section 3',
          ])
        })
      })
    })
  })
})
