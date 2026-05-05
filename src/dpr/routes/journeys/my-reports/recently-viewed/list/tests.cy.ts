import { executeReportStubs } from '../../../../../../../cypress-tests/cypressUtils'

context('Recently viewed list', () => {
  const path = '/embedded/platform'

  beforeEach(() => {
    executeReportStubs()
    cy.task('stubDefinitionRequestExamplesSuccess')
    cy.task('stubDefinitionFeatureTestingInteractive')
    cy.task('stubRequestSuccessResult20')
    cy.visit(path)
  })

  it('should ensure it most the most recently viewed at the top of the list, even when its a duplicate run', () => {
    cy.findByLabelText(/Reports catalogue.*/i).within(() => {
      cy.findByRole('row', {
        name: (_, element) => {
          return (
            Boolean(element.textContent?.includes('Successful Report')) &&
            Boolean(element.textContent?.includes('this will succeed'))
          )
        },
      }).within(() => {
        cy.findByRole('link', { name: 'Request report' }).click()
      })
    })
    cy.findByRole('button', { name: 'Request report' }).click()
    cy.findByRole('button', { name: /Enable download/ }).should('be.visible')

    cy.visit(path)
    cy.findByLabelText(/Reports catalogue.*/i).within(() => {
      cy.findByRole('row', {
        name: (_, element) => {
          return (
            Boolean(element.textContent?.includes('Interactive Report')) &&
            Boolean(element.textContent?.includes('this is an interactive report'))
          )
        },
      }).within(() => {
        cy.findByRole('link', { name: 'Request report' }).click()
      })
    })
    cy.findByRole('button', { name: 'Request report' }).click()
    cy.findByRole('button', { name: /Enable download/ }).should('be.visible')

    cy.visit(path)
    cy.findByRole('tab', { name: /Viewed/ }).click()
    cy.findByLabelText(/Viewed/i).within(() => {
      cy.findByRole('heading', {
        name: 'Interactive Report',
        level: 2,
      }).should('exist')
    })

    cy.findByLabelText(/Reports catalogue.*/i).within(() => {
      cy.findByRole('row', {
        name: (_, element) => {
          return (
            Boolean(element.textContent?.includes('Successful Report')) &&
            Boolean(element.textContent?.includes('this will succeed'))
          )
        },
      }).within(() => {
        cy.findByRole('link', { name: 'Request report' }).click()
      })
    })
    cy.findByRole('button', { name: 'Request report' }).click()
    cy.findByRole('button', { name: /Enable download/ }).should('be.visible')

    cy.visit(path)
    cy.findByRole('tab', { name: /Viewed/ }).click()
    cy.findByLabelText(/Viewed \(2\)/i).within(() => {
      cy.findByRole('heading', {
        name: 'Successful Report',
        level: 2,
      }).should('exist')
    })
  })
})
