import { executeReportStubs, getMyReportRowCell } from '../../../../../../../cypress-tests/cypressUtils'

context('Recently viewed list', () => {
  const path = '/embedded/platform'

  const checkStatuses = () => {
    cy.task('stubReportsSubmittedStatus')
    cy.findByRole('strong').contains('SUBMITTED')
    cy.task('stubReportsPickedStatus')
    cy.findByRole('strong').contains('PICKED')
    cy.task('stubReportsStartedStatus')
    cy.findByRole('strong').contains('STARTED')
    cy.task('stubReportsFinishedStatus')
  }

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
        level: 1,
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
        level: 1,
      }).should('exist')
    })
  })

  it('should behave correctly for an expired request', () => {
    cy.findByRole('tab', { name: /Viewed \(0\)/ }).should('be.visible')
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
      getMyReportRowCell({ name: 'Successful Report', cell: 'status' }).contains('EXPIRED')
      getMyReportRowCell({ name: 'Successful Report', cell: 'actions' }).within(() => {
        cy.findByRole('button', { name: 'Remove' }).should('be.visible')
        cy.findByRole('link', { name: 'Refresh' }).should('be.visible').click()
      })
    })
    const filtersHref = '/embedded/platform/dpr/request-report/report/request-examples/request-example-success/filters'
    cy.url().should('have.string', filtersHref)

    cy.visit(path)
    cy.findByRole('tab', { name: /Viewed/ }).click()
    cy.findByLabelText(/Viewed \(/).within(() => {
      getMyReportRowCell({ name: 'Successful Report', cell: 'actions' }).within(() => {
        cy.findByRole('button', { name: 'Remove' }).should('be.visible').click()
      })
    })

    cy.findByLabelText(/Requested/i).within(() => {
      cy.findByRole('heading', {
        name: 'Successful Report',
        level: 1,
      }).should('not.exist')
    })
  })
})
