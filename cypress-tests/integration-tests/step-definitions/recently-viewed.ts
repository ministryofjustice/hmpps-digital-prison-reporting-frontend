import { Then } from '@badeball/cypress-cucumber-preprocessor'
import AsyncHomePage from '../pages/AsyncHomePage'

Then('I click on the recently viewed reports tab', () => {
  new AsyncHomePage().recentlyViewedTab().click()
})

Then('the viewed reports are displayed correctly', () => {
  new AsyncHomePage().viewedReportsList().find('tr').should('have.length', 7)
})

Then('the status and timestamp is displayed for each viewed report', () => {
  new AsyncHomePage()
    .viewedReportRow_Finished()
    .parent()
    .parent()
    .contains('Last viewed:')
    .parent()
    .parent()
    .contains('READY')
    .should('exist')

  new AsyncHomePage()
    .viewedReportRow_Expired()
    .parent()
    .parent()
    .contains('Expired at:')
    .parent()
    .parent()
    .contains('EXPIRED')
    .should('exist')

  new AsyncHomePage()
    .viewedReportRow_FinishedV2()
    .parent()
    .parent()
    .contains('Last viewed:')
    .parent()
    .parent()
    .contains('READY')
    .should('exist')

  new AsyncHomePage()
    .viewedReportRow_ExpiredV2()
    .parent()
    .parent()
    .contains('Expired at:')
    .parent()
    .parent()
    .contains('EXPIRED')
    .should('exist')

  new AsyncHomePage()
    .viewedDashboardRow_Ready()
    .parent()
    .parent()
    .contains('Last viewed:')
    .parent()
    .parent()
    .contains('READY')
    .should('exist')

  new AsyncHomePage()
    .viewedDashboardRow_Expired()
    .parent()
    .parent()
    .contains('Expired at:')
    .parent()
    .parent()
    .contains('EXPIRED')
    .should('exist')
})

Then('I click on a ready report', () => {
  new AsyncHomePage().viewedReportRow_Finished().click()
})

Then('I click on a ready report v2', () => {
  new AsyncHomePage().viewedReportRow_FinishedV2().click()
})

Then('I click on a ready dashboard', () => {
  new AsyncHomePage().viewedDashboardRow_Ready().click()
})

Then('I click on an expired viewed report', () => {
  new AsyncHomePage().viewedReportRow_Expired().click()
})

Then('I click on an expired viewed report v2', () => {
  new AsyncHomePage().viewedReportRow_ExpiredV2().click()
})

Then('I click on an expired viewed dashboard', () => {
  new AsyncHomePage().viewedDashboardRow_Expired().click()
})

Then('I click on the remove button of the expired viewed report', () => {
  new AsyncHomePage().viewedReportRow_Expired().parent().parent().contains('Remove').click()
})

Then('I click on the remove button of the expired viewed report v2', () => {
  new AsyncHomePage().viewedReportRow_ExpiredV2().parent().parent().contains('Remove').click()
})

Then('I click on the refresh button on an expired viewed report', () => {
  new AsyncHomePage().viewedReportRow_Expired().parent().parent().contains('Refresh').click()
})

Then('I click on the refresh button on an expired viewed report v2', () => {
  new AsyncHomePage().viewedReportRow_ExpiredV2().parent().parent().contains('Refresh').click()
})

Then('I click on the remove button of the expired viewed dashboard', () => {
  new AsyncHomePage().viewedDashboardRow_Expired().parent().parent().contains('Remove').click()
})

Then('I click on the refresh button on an expired viewed dashboard', () => {
  new AsyncHomePage().viewedDashboardRow_Expired().parent().parent().contains('Refresh').click()
})

Then('the expired report is removed from the viewed reports list', () => {
  new AsyncHomePage().viewedReportRow_Expired().should('not.exist')
})

Then('the expired report v2 is removed from the viewed reports list', () => {
  new AsyncHomePage().viewedReportRow_ExpiredV2().should('not.exist')
})

Then('the expired dashboard is removed from the viewed reports list', () => {
  new AsyncHomePage().viewedDashboardRow_Expired().should('not.exist')
})

Then('I am taken to the query page for the viewed report', () => {
  cy.url().should(
    'eq',
    'http://localhost:3010/async/report/test-report-3/variantId-1/request?filters.field1=value1.3&filters.field2=value2.3&filters.field3.start=2003-09-05&filters.field3.end=2007-05-01&filters.field7=2007-05-04&sortColumn=field1&sortedAsc=true&filters.field4=Inigo+Montoya',
  )
})

Then('I am taken to the query page for the viewed report v2', () => {
  cy.url().should(
    'eq',
    'http://localhost:3010/async/report/test-report-3/variantId-1/request?filters.field2=value2.3&filters.field3.start=2003-09-05&filters.field3.end=2007-05-01&filters.field7=2007-05-04&sortColumn=field1&sortedAsc=true&filters.field4=Inigo+Montoya&filters.field1=value1.2',
  )
})

Then('I am taken to the query page for the viewed dashboard', () => {
  cy.url().should('eq', 'http://localhost:3010/async/dashboard/test-report-1/test-dashboard-8/request?')
})

Then('I am taken to the async dashboard', () => {
  cy.url().should(
    'eq',
    'http://localhost:3010/async/dashboard/test-report-1/test-dashboard-8/request/tblId_1730302242487/report',
  )
})

Then('I am taken to the report', () => {
  cy.url().should(
    'eq',
    'http://localhost:3010/async/report/test-report-3/variantId-1/request/tblId_1729766362362/report?columns=field1&columns=field2&columns=field3&columns=field6&columns=field7',
  )
})

Then('I am taken to the report v2', () => {
  cy.url().should(
    'eq',
    'http://localhost:3010/async/report/test-report-3/variantId-1/request/tblId_1729766362362/report?columns=field1&columns=field2&columns=field3&columns=field6&columns=field7',
  )
})
