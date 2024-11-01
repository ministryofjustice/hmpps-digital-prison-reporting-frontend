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
  new AsyncHomePage().viewedReportRow_Finished().parent().parent().parent().parent().contains('READY').should('exist')
  new AsyncHomePage().viewedReportRow_Expired().parent().parent().parent().parent().contains('EXPIRED').should('exist')
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

Then(/^I click on a ready viewed (report|reportV2|dashboard)$/, function (this: Mocha.Context, reportType: string) {
  if (reportType === 'report') {
    new AsyncHomePage().viewedReportRow_Finished().parent().parent().parent().parent().contains('Go to report').click()
  }

  if (reportType === 'reportV2') {
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
})

Then(
  /^I click on the (Remove|Refresh) button of an expired viewed (report|reportV2|dashboard)$/,
  function (this: Mocha.Context, action: string, reportType: string) {
    if (reportType === 'report') {
      new AsyncHomePage().viewedReportRow_Expired().parent().parent().parent().parent().contains(action).click()
    }

    if (reportType === 'reportV2') {
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

    if (reportType === 'reportV2') {
      new AsyncHomePage().viewedReportRow_ExpiredV2().should('not.exist')
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
        'http://localhost:3010/async/report/test-report-3/variantId-1/request?filters.field1=value1.3&filters.field2=value2.3&filters.field3.start=2003-09-05&filters.field3.end=2007-05-01&filters.field7=2007-05-04&sortColumn=field1&sortedAsc=true&filters.field4=Inigo+Montoya',
      )
    }

    if (reportType === 'reportV2') {
      cy.url().should(
        'eq',
        'http://localhost:3010/async/report/test-report-3/variantId-1/request?filters.field2=value2.3&filters.field3.start=2003-09-05&filters.field3.end=2007-05-01&filters.field7=2007-05-04&sortColumn=field1&sortedAsc=true&filters.field4=Inigo+Montoya&filters.field1=value1.2',
      )
    }

    if (reportType === 'dashboard') {
      cy.url().should('eq', 'http://localhost:3010/async/dashboard/test-report-1/test-dashboard-8/request?')
    }
  },
)

Then(/^I am taken to the async (report|reportV2|dashboard)$/, function (this: Mocha.Context, reportType: string) {
  if (reportType === 'report') {
    cy.url().should(
      'eq',
      'http://localhost:3010/async/report/test-report-3/variantId-1/request/tblId_1729766362362/report?columns=field1&columns=field2&columns=field3&columns=field6&columns=field7',
    )
  }

  if (reportType === 'reportV2') {
    cy.url().should(
      'eq',
      'http://localhost:3010/async/report/test-report-3/variantId-1/request/tblId_1729766362362/report?columns=field1&columns=field2&columns=field3&columns=field6&columns=field7',
    )
  }

  if (reportType === 'dashboard') {
    cy.url().should(
      'eq',
      'http://localhost:3010/async/dashboard/test-report-1/test-dashboard-8/request/tblId_1730302242487/report',
    )
  }
})
