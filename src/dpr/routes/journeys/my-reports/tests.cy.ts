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
import { setRedisState } from '../../../../../test-app/routes/integrationTests/appStateUtils'

describe('My Reports', () => {
  const paths = ['/', '/dpr', '/embedded/platform', '/embedded/platform/dpr']

  const sharedTests = (path: string) => {
    describe(`My reports - ${path}`, () => {
      after(() => {
        cy.task('resetRedis')
      })

      before(() => {
        stubBaseTasks()
        stubDefinitionsTasks()
        cy.task('stubExpiredEndpoint')

        setRedisState({
          bookmarks: [],
          recentlyViewedReports: [viewedReady, viewedDashboard, expiredDashboard],
          requestedReports: [requestedReady, requestedAborted, requestedExpired, requestedFailed],
        })

        cy.visit(path)
      })

      it('Should do an expiry check on each row that is in a terminal state', () => {
        cy.findByRole('tab', { name: /Requested/ }).click()
        getMyReportRow({ name: 'Successful report' }).contains('EXPIRED')

        cy.findByRole('tab', { name: /Viewed/ }).click()
        getMyReportRow({ name: 'Viewed report' }).contains('EXPIRED')
      })
    })
  }

  paths.forEach((route) => sharedTests(route))
})
