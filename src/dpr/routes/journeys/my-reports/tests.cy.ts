import {
  requestedAborted,
  requestedExpired,
  requestedFailed,
  requestedReady,
} from '@networkMocks/report/mockVariants/mockRequestedUserListData'
import {
  expiredDashboard,
  viewedDashboard,
  viewedReady,
} from '@networkMocks/report/mockVariants/mockViewedUserListData'
import { getMyReportRow, stubBaseTasks, stubDefinitionsTasks } from 'cypress-tests/cypressUtils'
import { setRedisState, resetStaleReportsCheck } from '../../../../../test-app/routes/integrationTests/appStateUtils'
import { RequestedReport, StoredReportData } from '../../../types/UserReports'

describe('My Reports', () => {
  const paths = [
    '/',
    // '/dpr', '/embedded/platform', '/embedded/platform/dpr'
  ]

  const sharedTests = (path: string) => {
    describe(`My reports - ${path}`, () => {
      after(() => {
        cy.task('resetRedis')
      })

      beforeEach(() => {
        cy.task('resetStubs')
        stubBaseTasks()
        stubDefinitionsTasks()
      })

      afterEach(() => {
        cy.task('resetRedis')
      })

      it('Should do an expiry check on each row that is in a terminal state', () => {
        setRedisState({
          bookmarks: [],
          recentlyViewedReports: [viewedReady, viewedDashboard, expiredDashboard],
          requestedReports: [requestedReady, requestedAborted, requestedExpired, requestedFailed],
        })

        cy.task('stubExpiredEndpoint')
        cy.visit(path)

        cy.findByRole('tab', { name: /Requested/ }).click()
        getMyReportRow({ name: 'Successful report' }).contains('EXPIRED')

        cy.findByRole('tab', { name: /Viewed/ }).click()
        getMyReportRow({ name: 'Viewed report' }).contains('EXPIRED')
      })

      it('should remove stale reports', () => {
        const lastMonth = new Date()
        lastMonth.setMonth(lastMonth.getMonth() - 1)

        const staleRequestedAborted: RequestedReport = {
          ...requestedAborted,
          timestamp: {
            ...requestedAborted.timestamp,
            aborted: lastMonth,
          },
        }

        const staleRequestedExpired: RequestedReport = {
          ...requestedExpired,
          timestamp: {
            ...requestedExpired.timestamp,
            expired: lastMonth,
          },
        }

        const staleRequestedFailed: RequestedReport = {
          ...requestedFailed,
          timestamp: {
            ...requestedFailed.timestamp,
            failed: lastMonth,
          },
        }

        const staleViewedExpiredDashboard: StoredReportData = {
          ...expiredDashboard,
          timestamp: {
            ...expiredDashboard.timestamp,
            expired: lastMonth,
          },
        }

        setRedisState({
          bookmarks: [],
          recentlyViewedReports: [viewedReady, viewedDashboard, staleViewedExpiredDashboard],
          requestedReports: [requestedReady, staleRequestedAborted, staleRequestedExpired, staleRequestedFailed],
        })

        resetStaleReportsCheck()

        cy.visit(path)

        // Check stale requested have been removed
        cy.findByRole('tab', { name: /Requested/ }).click()

        cy.findByLabelText(/Requested \(/).within(() => {
          cy.findAllByRole('paragraph')
            .contains(/Showing 1 of 1 reports/)
            .should('be.visible')
        })

        // Check stale viewed have been removed
        cy.findByRole('tab', { name: /Viewed/ }).click()

        cy.findByLabelText(/Viewed \(/).within(() => {
          cy.findAllByRole('paragraph')
            .contains(/Showing 2 of 2 reports/)
            .should('be.visible')
        })

        // Validate the notification is correct
        cy.findByRole('region')
          .should('contain.text', '4 reports were removed from your list')
          .within(() => {
            // Open details
            cy.findByText('Details').click()

            // Assert list length
            cy.findByRole('list').findAllByRole('listitem').should('have.length', 4)

            // Assert values
            const expected = [
              'Request examples - Cancelled report',
              'Request examples - Expiring report',
              'Request examples - Failing report',
              'Mock dashboards - Expired viewed dashboard',
            ]

            cy.findByRole('list')
              .findAllByRole('listitem')
              .should($items => {
                const texts = [...$items].map(el => el.textContent?.trim())
                expect(texts).to.deep.equal(expected)
              })
          })
      })
    })
  }

  paths.forEach(route => sharedTests(route))
})
