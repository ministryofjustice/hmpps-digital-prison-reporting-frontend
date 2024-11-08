/* eslint-disable func-names */
import { Then, When } from '@badeball/cypress-cucumber-preprocessor'
import AsyncHomePage from '../pages/AsyncHomePage'

Then('I click on the requested reports tab', () => {
  new AsyncHomePage().requestedTab().click()
})

Then('the requested reports are displayed correctly', () => {
  new AsyncHomePage().requestedReportsList().find('tr').should('have.length', 14)
})

Then('the status and timestamp is displayed for each request', () => {
  new AsyncHomePage().requestedReportRow_Finished_Full().should('exist')
  new AsyncHomePage().requestedReportRow_Expired_Full().should('exist')
  new AsyncHomePage().requestedReportRow_Failed_Full().should('exist')
  new AsyncHomePage().requestedReportRow_Aborted_Full().should('exist')
  new AsyncHomePage().requestedReportRow_FinishedV2_Full().should('exist')
  new AsyncHomePage().requestedReportRow_ExpiredV2_Full().should('exist')
  new AsyncHomePage().requestedReportRow_FailedV2_Full().should('exist')
  new AsyncHomePage().requestedReportRow_AbortedV2_Full().should('exist')
  new AsyncHomePage().requestedDashboardRow_Finished_Full().should('exist')
  new AsyncHomePage().requestedDashboardRow_Expired_Full().should('exist')
  new AsyncHomePage().requestedDashboardRow_Failed_Full().should('exist')
  new AsyncHomePage().requestedDashboardRow_Aborted_Full().should('exist')
})

When(/^I click on a finished (report|reportV2|dashboard)$/, function (this: Mocha.Context, reportType: string) {
  if (reportType === 'report') {
    new AsyncHomePage()
      .requestedReportRow_Finished()
      .parent()
      .parent()
      .parent()
      .parent()
      .contains('Go to report')
      .click()
  }

  if (reportType === 'reportV2') {
    new AsyncHomePage()
      .requestedReportRow_FinishedV2()
      .parent()
      .parent()
      .parent()
      .parent()
      .contains('Go to report')
      .click()
  }

  if (reportType === 'dashboard') {
    new AsyncHomePage()
      .requestedDashboardRow_Finished()
      .parent()
      .parent()
      .parent()
      .parent()
      .contains('Go to dashboard')
      .click()
  }
})

When(/^I am taken to the (report|reportV2|dashboard) page$/, function (this: Mocha.Context, reportType: string) {
  if (reportType === 'report') {
    cy.url().should(
      'match',
      /http:\/\/localhost:3010\/async\/report\/test-report-(.*)\/variantId-1\/request\/(.*)\/report\?columns=field1&columns=field2&columns=field3&columns=field6&columns=field7/i,
    )
  }

  if (reportType === 'reportV2') {
    cy.url().should(
      'match',
      /http:\/\/localhost:3010\/async\/report\/test-report-(.*)\/variantId-1\/request\/(.*)\/report\?columns=field1&columns=field2&columns=field3&columns=field6&columns=field7/i,
    )
  }

  if (reportType === 'dashboard') {
    cy.url().should(
      'match',
      /http:\/\/localhost:3010\/async\/dashboard\/test-report-(.*)\/test-dashboard-8\/request\/(.*)\/report/i,
    )
  }
})

When(/^I am taken to the (report|reportV2|dashboard) status page$/, function (this: Mocha.Context, reportType: string) {
  if (reportType === 'report') {
    cy.url().should('eq', 'http://localhost:3010/async/report/test-report-3/variantId-2/request/exId_1729765694790')
  }

  if (reportType === 'reportV2') {
    cy.url().should('eq', 'http://localhost:3010/async/report/test-report-3/variantId-2/request/exId_1729765694790')
  }

  if (reportType === 'dashboard') {
    cy.url().should(
      'eq',
      'http://localhost:3010/async/dashboard/test-report-1/test-dashboard-2/request/exId_1724943092123',
    )
  }
})

When(/^I am taken to the (report|reportV2|dashboard) query page$/, function (this: Mocha.Context, reportType: string) {
  if (reportType === 'report') {
    cy.url().should(
      'eq',
      'http://localhost:3010/async/report/test-report-3/variantId-4/request?filters.field1=value1.3&filters.field3.start=2003-02-01&filters.field3.end=2006-05-04&sortColumn=field1&sortedAsc=true',
    )
  }

  if (reportType === 'reportV2') {
    cy.url().should(
      'eq',
      'http://localhost:3010/async/report/test-report-3/variantId-4/request?filters.field1=value1.3&filters.field3.start=2003-02-01&filters.field3.end=2006-05-04&sortColumn=field1&sortedAsc=true',
    )
  }

  if (reportType === 'dashboard') {
    cy.url().should('eq', 'http://localhost:3010/async/dashboard/test-report-1/test-dashboard-3/request?')
  }
})

When(
  /^I click on the (Remove|Retry|Refresh) button on a (expired|failed|aborted) (report|reportV2|dashboard)$/,
  function (this: Mocha.Context, action: string, status: string, reportType: string) {
    if (reportType === 'report') {
      if (status === 'expired') {
        new AsyncHomePage().requestedReportRow_Expired().parent().parent().parent().parent().contains(action).click()
      }
      if (status === 'failed') {
        new AsyncHomePage().requestedReportRow_Failed().parent().parent().parent().parent().contains(action).click()
      }
      if (status === 'aborted') {
        new AsyncHomePage().requestedReportRow_Aborted().parent().parent().parent().parent().contains(action).click()
      }
    }

    if (reportType === 'reportV2') {
      if (status === 'expired') {
        new AsyncHomePage().requestedReportRow_ExpiredV2().parent().parent().parent().parent().contains(action).click()
      }
      if (status === 'failed') {
        new AsyncHomePage().requestedReportRow_FailedV2().parent().parent().parent().parent().contains(action).click()
      }
      if (status === 'aborted') {
        new AsyncHomePage().requestedReportRow_AbortedV2().parent().parent().parent().parent().contains(action).click()
      }
    }

    if (reportType === 'dashboard') {
      if (status === 'expired') {
        new AsyncHomePage().requestedDashboardRow_Expired().parent().parent().parent().parent().contains(action).click()
      }
      if (status === 'failed') {
        new AsyncHomePage().requestedDashboardRow_Failed().parent().parent().parent().parent().contains(action).click()
      }
      if (status === 'aborted') {
        new AsyncHomePage().requestedDashboardRow_Aborted().parent().parent().parent().parent().contains(action).click()
      }
    }
  },
)

Then(
  /^the (expired|failed|aborted|finished) (report|reportV2|dashboard) is removed from the list$/,
  function (this: Mocha.Context, status: string, reportType: string) {
    if (reportType === 'report') {
      if (status === 'expired') {
        new AsyncHomePage().requestedReportRow_Expired().should('not.exist')
      }
      if (status === 'failed') {
        new AsyncHomePage().requestedReportRow_Failed().should('not.exist')
      }
      if (status === 'aborted') {
        new AsyncHomePage().requestedReportRow_Aborted().should('not.exist')
      }
    }

    if (reportType === 'reportV2') {
      if (status === 'expired') {
        new AsyncHomePage().requestedReportRow_ExpiredV2().should('not.exist')
      }
      if (status === 'failed') {
        new AsyncHomePage().requestedReportRow_FailedV2().should('not.exist')
      }
      if (status === 'aborted') {
        new AsyncHomePage().requestedReportRow_AbortedV2().should('not.exist')
      }
    }

    if (reportType === 'dashboard') {
      if (status === 'expired') {
        new AsyncHomePage().requestedDashboardRow_Expired().should('not.exist')
      }
      if (status === 'failed') {
        new AsyncHomePage().requestedDashboardRow_Failed().should('not.exist')
      }
      if (status === 'aborted') {
        new AsyncHomePage().requestedDashboardRow_Aborted().should('not.exist')
      }
    }
  },
)
