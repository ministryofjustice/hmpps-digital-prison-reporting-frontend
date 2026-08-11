import {
  executeReportStubs,
  expectMyReportRowCountInTab,
  findCatalogueRowAndConfirmActionExists,
  findCatalogueRowAndInitAction,
  getMyReportRow,
  getMyReportRowCell,
  requestReport,
  startReportRequest,
} from 'cypress-tests/cypressUtils'

describe('Subscriptions', () => {
  const reportName = 'Scheduled Report'
  const reportDescription = 'This is an scheduled report'

  const paths = [
    '/?search=sch',
    '/dpr?search=sch',
    '/embedded/platform?search=sch',
    '/embedded/platform/dpr?search=sch',
  ]

  after(() => {
    cy.task('resetRedis')
  })

  before(() => {
    executeReportStubs()
    cy.task('stubDefinitionFeatureTestingScheduled')
    cy.task('stubSubscribeEndpoint')
    cy.task('stubUnsubscribeEndpoint')
    cy.task('stubGetSubscriptionsEndpoint')
    cy.task('stubResultSuccessResult')
  })

  const sharedTests = (path: string) => {
    describe(`Subscribing and Unsubscribing from ${path}`, () => {
      describe('from the catalogue', () => {
        beforeEach(() => {
          cy.visit(path)
        })

        it('should subscribe to the report', () => {
          // Subs list should be empty
          cy.findByRole('tab', { name: /Subscriptions/ }).click()
          expectMyReportRowCountInTab({ tabName: /Subscriptions.*/i, count: 0 })

          // Subscribe from the catalogue
          findCatalogueRowAndInitAction(reportName, 'Subscribe', 'button')
          findCatalogueRowAndConfirmActionExists(reportName, 'Unsubscribe', 'button')

          // Should be added to subs list
          cy.findByRole('tab', { name: /Subscriptions/ }).click()
          expectMyReportRowCountInTab({ tabName: /Subscriptions.*/i, count: 1 })
          cy.findByLabelText(/Subscriptions.*/i).within(() => {
            getMyReportRow({ name: reportName })
          })

          cy.get('.moj-alert__content').within(() => {
            cy.findAllByRole('paragraph').contains('You have subscribed to Feature testing - Scheduled Report report.')
            cy.findAllByRole('paragraph').contains('This report refreshes Weekly at 9:00am')
          })

          // User can go straight to subscribed reports
          cy.findByLabelText(/Subscriptions/i).within(() => {
            getMyReportRowCell({ name: reportName, cell: 'actions' }).within(() => {
              cy.findByRole('link', { name: 'Go to report' }).should('be.visible').click()
            })
          })
          cy.findByRole('heading', { level: 1, name: new RegExp(reportName, 'i') }).should('be.visible')
        })

        it('should unsubscribe to the report', () => {
          // Subs list should have one entry
          cy.findByRole('tab', { name: /Subscriptions/ }).click()
          expectMyReportRowCountInTab({ tabName: /Subscriptions.*/i, count: 1 })

          // Unsubscribe via the catalogue
          findCatalogueRowAndInitAction(reportName, 'Unsubscribe', 'button')
          findCatalogueRowAndConfirmActionExists(reportName, 'Subscribe', 'button')

          // Subs list should be empty
          cy.findByRole('tab', { name: /Subscriptions/ }).click()
          expectMyReportRowCountInTab({ tabName: /Subscriptions.*/i, count: 0 })

          cy.get('.moj-alert__content').within(() => {
            cy.findAllByRole('paragraph').contains(
              'You have unsubscribed from Feature testing - Scheduled Report report',
            )
            cy.findAllByRole('paragraph').contains('You will no longer recieve refreshed versions of this report')
          })
        })
      })

      describe('from the subscription list', () => {
        beforeEach(() => {
          cy.visit(path)
        })

        it('should unsubscribe to the report', () => {
          // re-subscribe
          findCatalogueRowAndInitAction(reportName, 'Subscribe', 'button')

          // Subs list should have one entry
          cy.findByRole('tab', { name: /Subscriptions/ }).click()
          expectMyReportRowCountInTab({ tabName: /Subscriptions.*/i, count: 1 })

          // Unsubscribe via the subs list
          cy.findByLabelText(/Subscriptions/i).within(() => {
            getMyReportRowCell({ name: reportName, cell: 'actions' }).within(() => {
              cy.findByRole('button', { name: 'Unsubscribe' }).should('be.visible').click()
            })
          })

          // Subs list should be empty
          cy.findByRole('tab', { name: /Subscriptions/ }).click()
          expectMyReportRowCountInTab({ tabName: /Subscriptions.*/i, count: 0 })

          cy.get('.moj-alert__content').within(() => {
            cy.findAllByRole('paragraph').contains(
              'You have unsubscribed from Feature testing - Scheduled Report report',
            )
            cy.findAllByRole('paragraph').contains('You will no longer recieve refreshed versions of this report')
          })
        })
      })

      describe('from the request page', () => {
        beforeEach(() => {
          cy.visit(path)
        })

        after(() => {
          cy.task('resetRedis')
        })

        it('should subscribe to the report', () => {
          cy.findByRole('tab', { name: /Subscriptions/ }).click()
          expectMyReportRowCountInTab({ tabName: /Subscriptions.*/i, count: 0 })

          startReportRequest({ name: reportName, description: reportDescription })

          // Shows that the report is scheduled and unsubscribed
          cy.findByRole('heading', { name: /This is a scheduled report/ })
          cy.findAllByRole('paragraph').contains('Weekly at 9:00am').should('exist')

          // Subscribe to it
          cy.findByRole('button', { name: 'Subscribe' }).click()

          // Shows the reports is subscribed
          cy.findByRole('heading', { name: /You are subscribed to this report/ })
          cy.findAllByRole('paragraph').contains('Weekly at 9:00am').should('exist')
          cy.findByRole('button', { name: 'Unsubscribe' }).should('exist')

          // Subscribed reports can go to the report
          cy.findByRole('link', { name: 'View the report now' }).should('exist').click()
          cy.findByRole('heading', { level: 1, name: new RegExp(reportName, 'i') }).should('be.visible')

          // Should show the subscribed report in the list
          cy.visit(path)
          cy.findByRole('tab', { name: /Subscriptions/ }).click()
          expectMyReportRowCountInTab({ tabName: /Subscriptions.*/i, count: 1 })
          findCatalogueRowAndConfirmActionExists(reportName, 'Unsubscribe', 'button')
        })

        it('should unsubscribe to the report', () => {
          cy.findByRole('tab', { name: /Subscriptions/ }).click()
          expectMyReportRowCountInTab({ tabName: /Subscriptions.*/i, count: 1 })

          startReportRequest({ name: reportName, description: reportDescription })

          // Shows the reports is subscribed
          cy.findByRole('heading', { name: /You are subscribed to this report/ })
          cy.findAllByRole('paragraph').contains('Weekly at 9:00am').should('exist')
          cy.findByRole('button', { name: 'Unsubscribe' }).should('exist')
          cy.findByRole('link', { name: 'View the report now' }).should('exist')

          // Unsubscribe from it
          cy.findByRole('button', { name: 'Unsubscribe' }).click()

          // Shows that the report is scheduled and unsubscribed
          cy.findByRole('heading', { name: /This is a scheduled report/ })
          cy.findAllByRole('paragraph').contains('Weekly at 9:00am').should('exist')

          // Should show the subscribed report in the list
          cy.visit(path)
          cy.findByRole('tab', { name: /Subscriptions/ }).click()
          expectMyReportRowCountInTab({ tabName: /Subscriptions.*/i, count: 0 })
        })
      })

      describe('from the the report page', () => {
        beforeEach(() => {
          cy.visit(path)
          cy.task('stubReportsFinishedStatus')
        })

        it('should subscribe to the report', () => {
          // Subs list should be empty
          cy.findByRole('tab', { name: /Subscriptions/ }).click()
          expectMyReportRowCountInTab({ tabName: /Subscriptions.*/i, count: 0 })

          // Request the report
          requestReport({ name: reportName, description: reportDescription, path })

          // Subscribe
          cy.findByRole('button', { name: 'Subscribe' }).click()

          // TODO: Notification
          cy.get('.moj-alert__content').within(() => {
            cy.findAllByRole('paragraph').contains('You have subscribed to Scheduled Report - Scheduled Report report.')
            cy.findAllByRole('paragraph').contains('This report refreshes Weekly at 9:00am')
          })

          cy.visit(path)
          cy.findByRole('tab', { name: /Subscriptions/ }).click()
          expectMyReportRowCountInTab({ tabName: /Subscriptions.*/i, count: 1 })
        })

        it('should unsubscribe to the report', () => {
          // Subs list should be empty
          cy.findByRole('tab', { name: /Subscriptions/ }).click()
          expectMyReportRowCountInTab({ tabName: /Subscriptions.*/i, count: 1 })

          // Go to the report
          cy.findByLabelText(/Subscriptions/i).within(() => {
            getMyReportRowCell({ name: reportName, cell: 'actions' }).within(() => {
              cy.findByRole('link', { name: 'Go to report' }).should('be.visible').click()
            })
          })

          // Subscribe
          cy.findByRole('button', { name: 'Unsubscribe' }).click()

          // TODO: Notification
          cy.get('.moj-alert__content').within(() => {
            cy.findAllByRole('paragraph').contains(
              'You have unsubscribed from Scheduled Report - Scheduled Report report',
            )
            cy.findAllByRole('paragraph').contains('You will no longer recieve refreshed versions of this report')
          })

          cy.visit(path)
          cy.findByRole('tab', { name: /Subscriptions/ }).click()
          expectMyReportRowCountInTab({ tabName: /Subscriptions.*/i, count: 0 })
        })
      })
    })

    // describe('Notifications', () => {
    //   describe('Refreshed subscription notification', () => {
    //     it('should show an in-app notification when a subscription has been refreshed', () => {})
    //   })
    // })
  }

  paths.forEach(route => sharedTests(route))
})
