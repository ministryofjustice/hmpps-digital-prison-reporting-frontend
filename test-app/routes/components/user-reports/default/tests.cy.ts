import {
  requestedReady,
  requestedAborted,
  requestedExpired,
  requestedFailed,
  requestedSubmitted,
} from '@networkMocks/report/mockVariants/mockRequestedUserListData'
import {
  viewedDashboard,
  viewedExpired,
  viewedInteractive,
  viewedInteractiveAsync,
  viewedReady,
  expiredDashboard,
} from '@networkMocks/report/mockVariants/mockViewedUserListData'
import { setRedisState } from '../../../integrationTests/appStateUtils'
import {
  checkA11y,
  executeReportStubs,
  expectMyReportRowCountInTab,
  getMyReportRow,
  getMyReportRowCell,
  stubBaseTasks,
  stubDefinitionsTasks,
} from '../../../../../cypress-tests/cypressUtils'

context('User reports component', () => {
  const path = '/components/user-reports/default'

  after(() => {
    cy.task('resetRedis')
  })

  describe('Requested reports list', () => {
    beforeEach(() => {
      executeReportStubs()
      setRedisState({
        bookmarks: [],
        recentlyViewedReports: [],
        requestedReports: [requestedReady, requestedAborted, requestedExpired, requestedFailed, requestedSubmitted],
      })
      cy.visit(path)
      cy.findByRole('tab', { name: /Requested/ }).click()
    })

    it('should show the "Requested" tab', () => {
      cy.findByRole('tab', { name: /Requested/ }).should('be.visible')
      checkA11y()
    })

    it('should show the help text', () => {
      cy.findByLabelText(/Requested.*/i).within(() => {
        cy.findAllByRole('group').contains('Help').should('be.visible')
      })
    })

    it('should show the total reports', () => {
      cy.findByLabelText(/Requested.*/i).within(() => {
        cy.findAllByRole('paragraph')
          .contains(/Showing \d{1,4} of \d{1,4} reports/)
          .should('be.visible')
      })
    })

    it('should show the link to view all reports', () => {
      cy.findByLabelText(/Requested.*/i).within(() => {
        cy.findByRole('link', { name: 'show all' }).should('exist')
      })
    })

    it('should show the product and variant information', () => {
      expectMyReportRowCountInTab({ tabName: /Requested.*/i, count: 4 })

      cy.findByLabelText(/Requested*/i).within(() => {
        getMyReportRow({ name: 'Successful report' }).contains('FINISHED')
        getMyReportRow({ name: 'Cancelled report' }).contains('ABORTED')
        getMyReportRow({ name: 'Expiring report' }).contains('EXPIRED')
        getMyReportRow({ name: 'Failing report' }).contains('FAILED')
      })
    })
  })

  describe('Viewed reports list', () => {
    beforeEach(() => {
      stubBaseTasks()
      stubDefinitionsTasks()
      setRedisState({
        bookmarks: [],
        defaultFilters: [],
        downloadPermissions: [],
        recentlyViewedReports: [
          viewedReady,
          viewedDashboard,
          viewedInteractive,
          viewedExpired,
          expiredDashboard,
          viewedInteractiveAsync,
        ],
        requestedReports: [],
      })
      cy.visit(path)
      cy.findByRole('tab', { name: /Viewed/ }).click()
    })

    it('should show the "Viewed" tab', () => {
      cy.findByRole('tab', { name: /Viewed/ }).should('be.visible')
    })

    it('should show the help text', () => {
      cy.findByLabelText(/Viewed \(/).within(() => {
        cy.findAllByRole('group').contains('Help').should('be.visible')
      })
    })

    it('should show the total reports', () => {
      cy.findByLabelText(/Viewed \(/).within(() => {
        cy.findAllByRole('paragraph')
          .contains(/Showing \d{1,4} of \d{1,4} reports/)
          .should('be.visible')
      })
    })

    it('should show the link to view all reports', () => {
      cy.findByLabelText(/Viewed \(/).within(() => {
        cy.findByRole('link', { name: 'Show all' }).should('not.exist')
      })
    })

    it('should show the product and variant information', () => {
      cy.findByLabelText(/Viewed \(/).within(() => {
        getMyReportRow({ name: 'Viewed report' }).contains('READY')
        getMyReportRow({ name: 'Viewed dashboard' }).contains('READY')
        getMyReportRow({ name: 'Interactive Report' }).contains('READY')
        getMyReportRow({ name: 'Expired viewed report' }).contains('EXPIRED')
      })
    })
  })

  describe('Bookmarked reports list', () => {
    beforeEach(() => {
      executeReportStubs()
      setRedisState({
        bookmarks: [
          {
            reportId: requestedReady.reportId,
            automatic: false,
            id: requestedReady.id,
            type: requestedReady.type,
          },
        ],
        defaultFilters: [],
        downloadPermissions: [],
        recentlyViewedReports: [
          viewedReady,
          viewedDashboard,
          viewedInteractive,
          viewedExpired,
          expiredDashboard,
          viewedInteractiveAsync,
        ],
        requestedReports: [requestedReady, requestedAborted, requestedExpired, requestedFailed, requestedSubmitted],
      })
      cy.visit(path)
      cy.findByRole('tab', { name: /Bookmarks/ }).click()
    })

    it('should show the "Bookmarks" tab', () => {
      cy.findByRole('tab', { name: /Bookmarks/ }).should('be.visible')
    })

    it('should show the help text', () => {
      cy.findByLabelText(/Bookmarks.*/i).within(() => {
        cy.findAllByRole('group').contains('Help').should('be.visible')
      })
    })

    it('should show the total reports', () => {
      cy.findByLabelText(/Bookmarks.*/i).within(() => {
        cy.findAllByRole('paragraph')
          .contains(/Showing \d{1,4} of \d{1,4} reports/)
          .should('be.visible')
      })
    })

    it('should not show the link to view all reports', () => {
      cy.findByLabelText(/Bookmarks.*/i).within(() => {
        cy.findByRole('link', { name: 'Show all' }).should('not.exist')
      })
    })

    it('should show the product and variant information', () => {
      cy.findByLabelText(/Bookmarks.*/i).within(() => {
        getMyReportRowCell({ name: 'Successful Report', cell: 'actions' }).within(() => {
          cy.findByRole('link', { name: 'Remove bookmark' }).should('exist')
        })
      })
    })
  })
})
