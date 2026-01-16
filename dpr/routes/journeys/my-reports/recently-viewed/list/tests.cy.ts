import { executeReportStubs } from '../../../../../../cypress-tests/cypressUtils'

context('Recently viewed list', () => {
  const path = '/embedded/platform/'

  const checkStatuses = () => {
    cy.task('stubReportsSubmittedStatus')
    cy.findByRole('strong').contains('SUBMITTED')
    cy.task('stubReportsPickedStatus')
    cy.findByRole('strong').contains('PICKED')
    cy.task('stubReportsStartedStatus')
    cy.findByRole('strong').contains('STARTED')
    cy.task('stubReportsFinishedStatus')
  }

  before(() => {
    cy.task('resetStubs')
    cy.task('resetRedis')
    cy.task('stubDefinitions')
    cy.task('stubSingleSummaries')
  })

  beforeEach(() => {
    executeReportStubs()
    cy.task('stubDefinitionRequestExamplesSuccess')
    cy.task('stubRequestSuccessResult20')
    cy.visit(path)
  })

  it('should have no reports in recently viewed', () => {
    cy.visit(path)
    cy.findByRole('tab', { name: /Viewed \(0\)/ }).should('be.visible')
  })

  it('should behave correctly for an expired request', () => {
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
    cy.url().should(
      'have.string',
      '/embedded/platform/dpr/request-report/report/request-examples/request-example-success/filters',
    )
    cy.findByRole('button', { name: 'Request report' }).click()
    checkStatuses()
    cy.findByRole('button', { name: /Enable download/ }).should('be.visible')

    cy.task('stubReportsExpiredStatus')
    cy.visit(path)
    cy.findByRole('tab', { name: /Viewed/ }).click()
    cy.reload().reload().reload()
    cy.findByLabelText(/Viewed \(/).within(() => {
      cy.findByRole('row', {
        name: (_, element) => {
          return Boolean(element.textContent?.includes('Successful Report'))
        },
      }).within(() => {
        cy.findByRole('link', { name: 'Remove' }).should('be.visible')
        cy.findByRole('cell', { name: 'EXPIRED' }).should('be.visible')
        cy.findByRole('link', { name: 'Refresh' }).click()
      })
    })
    const filtersHref = '/embedded/platform/dpr/request-report/report/request-examples/request-example-success/filters'
    cy.url().should('have.string', filtersHref)

    cy.visit(path)
    cy.findByRole('tab', { name: /Viewed/ }).click()
    cy.findByLabelText(/Viewed \(/).within(() => {
      cy.findByRole('row', {
        name: (_, element) => {
          return Boolean(element.textContent?.includes('Successful Report'))
        },
      }).within(() => {
        cy.findByRole('link', { name: 'Remove' }).click()
      })
    })

    cy.findByLabelText(/Requested/i).within(() => {
      cy.findByRole('row', {
        name: (_, element) => {
          return Boolean(element.textContent?.includes('Successful Report'))
        },
      }).should('not.exist')
    })
  })
})
