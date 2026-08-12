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
import { setRedisState } from 'test-app/routes/integrationTests/appStateUtils'

import {
  subscribedReport1,
  subscribedReport2,
  subscribedReport3,
} from '@networkMocks/report/mockVariants/mockSubscriptions'

describe('Subscriptions', () => {
  const reportName = 'Scheduled Report'
  const reportDescription = 'This is an scheduled report'

  const paths = [
    '/?search=sch',
    // '/dpr?search=sch',
    // '/embedded/platform?search=sch',
    // '/embedded/platform/dpr?search=sch',
  ]

  after(() => {
    cy.task('resetRedis')
  })

  const sharedTests = (path: string) => {
    describe(`Subscribing and Unsubscribing from ${path}`, () => {
      before(() => {
        executeReportStubs()
        cy.task('stubDefinitionFeatureTestingScheduled')
        cy.task('stubGetSubscriptionsEndpoint')
        cy.task('stubSubscribeEndpoint')
        cy.task('stubUnsubscribeEndpoint')
        cy.task('stubResultSuccessResult')
      })

      after(() => {
        cy.task('resetRedis')
        cy.task('resetStubs')
      })

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

    describe(`Notifications from ${path}`, () => {
      before(() => {
        executeReportStubs()
        cy.task('stubDefinitionFeatureTestingScheduled')
        cy.task('stubGetSubscriptionsEndpoint')
        cy.task('stubSubscribeEndpoint')
        cy.task('stubUnsubscribeEndpoint')
        cy.task('stubResultSuccessResult')
      })

      after(() => {
        cy.task('resetRedis')
        cy.task('resetStubs')
      })

      describe('Refreshed subscription notification', () => {
        beforeEach(() => {
          setRedisState({
            bookmarks: [],
            recentlyViewedReports: [],
            requestedReports: [],
            subscriptions: [subscribedReport1, subscribedReport2, subscribedReport3],
          })
          cy.visit(path)
        })

        it('should show an in-app notification when a subscription has been refreshed', () => {
          cy.findByRole('tab', { name: /Subscriptions/ }).click()
          expectMyReportRowCountInTab({ tabName: /Subscriptions.*/i, count: 3 })

          cy.get('.moj-alert__content').within(() => {
            cy.findAllByRole('paragraph').contains('2 of your subscribed reports were refreshed')

            cy.findAllByRole('group')
              .contains(/Details/)
              .click()

            cy.findAllByRole('group')
              .contains(/Details/)
              .parent()
              .parent()
              .within(() => {
                cy.findAllByRole('paragraph').contains(
                  'The following subscriptions were refreshed and are available with new data:',
                )
                cy.findAllByRole('list').contains('Feature testing - Scheduled Report 2.')
                cy.findAllByRole('list').contains('Feature testing - Scheduled Report 3.')
              })
          })
        })
      })
    })

    describe(`Subscription before report is ready`, () => {
      before(() => {
        executeReportStubs()
        cy.task('stubDefinitionFeatureTestingScheduled')
        cy.task('stubGetSubscriptionsPendingEndpoint')
        cy.task('stubSubscribeEndpoint')
        cy.task('stubUnsubscribeEndpoint')
        cy.task('stubResultSuccessResult')
      })

      after(() => {
        cy.task('resetRedis')
        cy.task('resetStubs')
      })

      describe('from the catalogue', () => {
        beforeEach(() => {
          cy.visit(path)
        })

        it('subscribe to the report and not show view link', () => {
          // Subs list should be empty
          cy.findByRole('tab', { name: /Subscriptions/ }).click()
          expectMyReportRowCountInTab({ tabName: /Subscriptions.*/i, count: 0 })

          // Subscribe from the catalogue
          findCatalogueRowAndInitAction(reportName, 'Subscribe', 'button')

          // Go to report should not be shown
          cy.findByRole('tab', { name: /Subscriptions/ }).click()

          cy.findByLabelText(/Subscriptions.*/i).within(() => {
            getMyReportRow({ name: reportName })
            getMyReportRowCell({ name: reportName, cell: 'actions' }).within(() => {
              cy.findByRole('link', { name: 'Go to report' }).should('not.exist')
              cy.findByRole('button', { name: 'Unsubscribe' }).should('exist').click()
            })
          })

          cy.findByRole('tab', { name: /Subscriptions/ }).click()
          expectMyReportRowCountInTab({ tabName: /Subscriptions.*/i, count: 0 })
        })
      })

      describe('from the request page', () => {
        beforeEach(() => {
          cy.visit(path)
        })

        it('subscribe to the report and not show view link', () => {
          cy.findByRole('tab', { name: /Subscriptions/ }).click()
          expectMyReportRowCountInTab({ tabName: /Subscriptions.*/i, count: 0 })

          startReportRequest({ name: reportName, description: reportDescription })

          // Subscribe to it
          cy.findByRole('button', { name: 'Subscribe' }).click()

          // Shows the reports is subscribed
          cy.findByRole('heading', { name: /You are subscribed to this report/ })
          cy.findAllByRole('paragraph').contains('Weekly at 9:00am').should('exist')
          cy.findByRole('button', { name: 'Unsubscribe' }).should('exist')

          // Not show the report link
          cy.findByRole('link', { name: 'View the report now' }).should('not.exist')

          // Reset sub
          cy.findByRole('button', { name: 'Unsubscribe' }).click()
        })
      })

      describe('from the report', () => {
        beforeEach(() => {
          cy.visit(path)
        })

        it('subscribe to the report and not show view link', () => {
          // Subs list should be empty
          cy.findByRole('tab', { name: /Subscriptions/ }).click()
          expectMyReportRowCountInTab({ tabName: /Subscriptions.*/i, count: 0 })

          // Request the report
          requestReport({ name: reportName, description: reportDescription, path })

          // Subscribe
          cy.findByRole('button', { name: 'Subscribe' }).click()

          // Check report link does not exist
          cy.visit(path)

          cy.findByRole('tab', { name: /Subscriptions/ }).click()
          expectMyReportRowCountInTab({ tabName: /Subscriptions.*/i, count: 1 })

          cy.findByLabelText(/Subscriptions.*/i).within(() => {
            getMyReportRow({ name: reportName })
            getMyReportRowCell({ name: reportName, cell: 'actions' }).within(() => {
              cy.findByRole('link', { name: 'Go to report' }).should('not.exist')
              cy.findByRole('button', { name: 'Unsubscribe' }).should('exist').click()
            })
          })
        })
      })
    })

    describe(`Subscribing failure from ${path}`, () => {
      before(() => {
        executeReportStubs()
        cy.task('stubDefinitionFeatureTestingScheduled')
        cy.task('stubGetSubscriptionsPendingEndpoint')
        cy.task('stubSubscribeEndpointError')
        cy.task('stubResultSuccessResult')
      })

      after(() => {
        cy.task('resetRedis')
        cy.task('resetStubs')
      })

      describe('from the catalogue', () => {
        beforeEach(() => {
          cy.visit(path)
        })

        it('should show error message when subscribe fails', () => {
          // Subscribe from the catalogue
          findCatalogueRowAndInitAction(reportName, 'Subscribe', 'button')

          cy.get('.moj-alert__content').within(() => {
            cy.findAllByRole('paragraph').contains('Failed to subscribe to Feature testing - Scheduled Report')
          })
        })
      })

      describe('from the request page', () => {
        beforeEach(() => {
          cy.visit(path)
        })

        it('should show error message when subscribe fails', () => {
          startReportRequest({ name: reportName, description: reportDescription })

          // Subscribe to it
          cy.findByRole('button', { name: 'Subscribe' }).click()

          cy.get('.moj-alert__content').within(() => {
            cy.findAllByRole('paragraph').contains('Failed to subscribe to Scheduled Report - Scheduled Report')
          })
        })
      })

      describe('from the report', () => {
        beforeEach(() => {
          cy.visit(path)
        })

        it('should show error message when subscribe fails', () => {
          // Request the report
          requestReport({ name: reportName, description: reportDescription, path })

          // Subscribe
          cy.findByRole('button', { name: 'Subscribe' }).click()

          cy.get('.moj-alert__content').within(() => {
            cy.findAllByRole('paragraph').contains('Failed to subscribe to Scheduled Report - Scheduled Report')
          })
        })
      })
    })

    describe(`Unubscribing failure from ${path}`, () => {
      before(() => {
        executeReportStubs()
        cy.task('stubDefinitionFeatureTestingScheduled')
        cy.task('stubGetSubscriptionsPendingEndpoint')
        cy.task('stubSubscribeEndpoint')
        cy.task('stubUnsubscribeEndpointError')
        cy.task('stubResultSuccessResult')
      })

      after(() => {
        cy.task('resetRedis')
        cy.task('resetStubs')
      })

      describe('from the catalogue', () => {
        beforeEach(() => {
          cy.visit(path)
        })

        it('should show error message when subscribe fails', () => {
          // Subscribe from the catalogue
          findCatalogueRowAndInitAction(reportName, 'Subscribe', 'button')

          findCatalogueRowAndInitAction(reportName, 'Unsubscribe', 'button')

          cy.get('.moj-alert__content').within(() => {
            cy.findAllByRole('paragraph').contains('Failed to unsubscribe from Feature testing - Scheduled Report')
          })
        })
      })

      describe('from the request page', () => {
        beforeEach(() => {
          cy.visit(path)
        })

        it('should show error message when subscribe fails', () => {
          startReportRequest({ name: reportName, description: reportDescription })

          cy.findByRole('button', { name: 'Unsubscribe' }).click()

          cy.get('.moj-alert__content').within(() => {
            cy.findAllByRole('paragraph').contains('Failed to unsubscribe from Feature testing - Scheduled Report')
          })
        })
      })

      describe('from the report', () => {
        beforeEach(() => {
          cy.visit(path)
        })

        it('should show error message when subscribe fails', () => {
          // Request the report
          requestReport({ name: reportName, description: reportDescription, path })

          cy.findByRole('button', { name: 'Unsubscribe' }).click()

          cy.get('.moj-alert__content').within(() => {
            cy.findAllByRole('paragraph').contains('Failed to unsubscribe from Feature testing - Scheduled Report')
          })
        })
      })
    })
  }

  paths.forEach(route => sharedTests(route))
})
