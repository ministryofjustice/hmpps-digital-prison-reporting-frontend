/* eslint-disable func-names */
import { Then } from '@badeball/cypress-cucumber-preprocessor'
import AsyncHomePage from '../pages/AsyncHomePage'

Then('I click on the recently viewed reports tab', () => {
  new AsyncHomePage().recentlyViewedTab().click()
})

Then('the viewed reports are displayed correctly', () => {
  new AsyncHomePage().viewedReportsList().find('tr').should('have.length', 7)
})

Then('the status and timestamp is displayed for each viewed report', () => {
  new AsyncHomePage().viewedReportRow_FinishedV2().parent().parent().parent().parent().contains('READY').should('exist')
  new AsyncHomePage()
    .viewedReportRow_ExpiredV2()
    .parent()
    .parent()
    .parent()
    .parent()
    .contains('EXPIRED')
    .should('exist')
  new AsyncHomePage().viewedDashboardRow_Ready().parent().parent().parent().parent().contains('READY').should('exist')
  new AsyncHomePage()
    .viewedDashboardRow_Expired()
    .parent()
    .parent()
    .parent()
    .parent()
    .contains('EXPIRED')
    .should('exist')
})

Then(
  /^I click on a ready viewed (report|reportV2|dashboard|interactive report)$/,
  function (this: Mocha.Context, reportType: string) {
    if (reportType === 'report') {
      new AsyncHomePage()
        .viewedReportRow_FinishedV2()
        .parent()
        .parent()
        .parent()
        .parent()
        .contains('Go to report')
        .click()
    }

    if (reportType === 'dashboard') {
      new AsyncHomePage()
        .viewedDashboardRow_Ready()
        .parent()
        .parent()
        .parent()
        .parent()
        .contains('Go to dashboard')
        .click()
    }

    if (reportType === 'interactive report') {
      new AsyncHomePage()
        .viewedInteractiveRow_Ready()
        .parent()
        .parent()
        .parent()
        .parent()
        .contains('Go to report')
        .click()
    }
  },
)

Then(
  /^I click on the (Remove|Refresh) button of an expired viewed (report|reportV2|dashboard)$/,
  function (this: Mocha.Context, action: string, reportType: string) {
    if (reportType === 'report') {
      new AsyncHomePage().viewedReportRow_ExpiredV2().parent().parent().parent().parent().contains(action).click()
    }

    if (reportType === 'dashboard') {
      new AsyncHomePage().viewedDashboardRow_Expired().parent().parent().parent().parent().contains(action).click()
    }
  },
)

Then(
  /^the expired (report|reportV2|dashboard) is removed from the viewed reports list$/,
  function (this: Mocha.Context, reportType: string) {
    if (reportType === 'report') {
      new AsyncHomePage().viewedReportRow_Expired().should('not.exist')
    }

    if (reportType === 'dashboard') {
      new AsyncHomePage().viewedDashboardRow_Expired().should('not.exist')
    }
  },
)

Then(
  /^I am taken to the query page for the viewed (report|reportV2|dashboard)$/,
  function (this: Mocha.Context, reportType: string) {
    if (reportType === 'report') {
      cy.url().should(
        'eq',
        'http://localhost:3010/embedded/platform/dpr/request-report/report/test-report-3/variantId-1/filters?filters.field1=value1.2&filters.field3.start=2003-02-01&filters.field3.end=2006-05-04&filters.field7=2005-02-01&filters.field8=value8.2&filters.field8=value8.3&sortColumn=field1&sortedAsc=false',
      )
    }

    if (reportType === 'dashboard') {
      cy.url().should(
        'eq',
        'http://localhost:3010/embedded/platform/dpr/request-report/dashboard/test-report-1/test-dashboard-8/filters',
      )
    }
  },
)

Then(/^I am taken to the async (report|reportV2|dashboard)$/, function (this: Mocha.Context, reportType: string) {
  if (reportType === 'report') {
    cy.url().should(
      'eq',
      'http://localhost:3010/embedded/platform/dpr/view-report/async/report/test-report-3/variantId-1/tblId_1729766362362/report?columns=field1&columns=field2&columns=field3&columns=field6&columns=field7&pageSize=10&selectedPage=10',
    )
  }

  if (reportType === 'dashboard') {
    cy.url().should(
      'have.string',
      'http://localhost:3010/embedded/platform/dpr/view-report/async/dashboard/test-report-1/test-dashboard-8/tblId_1730302242487/dashboard',
    )
  }
})
