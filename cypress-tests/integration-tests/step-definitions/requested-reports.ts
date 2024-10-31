import { Then } from '@badeball/cypress-cucumber-preprocessor'
import AsyncHomePage from '../pages/AsyncHomePage'

Then('I click on the requested reports tab', () => {
  new AsyncHomePage().requestedTab().click()
})

Then('the requested reports are displayed correctly', () => {
  new AsyncHomePage().requestedReportsList().find('tr').should('have.length', 6)
})

Then('the status and timestamp is displayed for each request', () => {
  new AsyncHomePage()
    .requestedReportRow_Finished()
    .parent()
    .parent()
    .contains('Ready at:')
    .parent()
    .parent()
    .contains('FINISHED')
    .should('exist')
  new AsyncHomePage()
    .requestedReportRow_Expired()
    .parent()
    .parent()
    .contains('Expired at:')
    .parent()
    .parent()
    .contains('EXPIRED')
    .should('exist')
  new AsyncHomePage()
    .requestedReportRow_Failed()
    .parent()
    .parent()
    .contains('Failed at:')
    .parent()
    .parent()
    .contains('FAILED')
    .should('exist')
  new AsyncHomePage()
    .requestedReportRow_Aborted()
    .parent()
    .parent()
    .contains('Aborted at:')
    .parent()
    .parent()
    .contains('ABORTED')
    .should('exist')
})

Then('I click on a finished report', () => {
  cy.reload()
  cy.reload()

  new AsyncHomePage().requestedReportRow_Finished().click()
})

Then('I click on a failed report', () => {
  new AsyncHomePage().requestedReportRow_Failed().click()
})

Then('I click on an expired report', () => {
  new AsyncHomePage().requestedReportRow_Expired().click()
})

Then('I click on an aborted report', () => {
  new AsyncHomePage().requestedReportRow_Aborted().click()
})

Then('I am taken to the report page', () => {
  cy.url().should(
    'match',
    /http:\/\/localhost:3010\/async\/report\/test-report-(.*)\/variantId-1\/request\/(.*)\/report\?columns=field1&columns=field2&columns=field3&columns=field6&columns=field7/i,
  )
})

Then('I am taken to the status page', () => {
  cy.url().should('eq', 'http://localhost:3010/async/report/test-report-3/variantId-2/request/exId_1729765694790')
})

Then('I am taken to the query page', () => {
  cy.url().should(
    'eq',
    'http://localhost:3010/async/report/test-report-3/variantId-4/request?filters.field1=value1.3&filters.field3.start=2003-02-01&filters.field3.end=2006-05-04&sortColumn=field1&sortedAsc=true&filters.field2=value2.1',
  )
})

Then('I click on the remove button of the failed report', () => {
  new AsyncHomePage().requestedReportRow_Failed().parent().parent().contains('Remove').click()
})

Then('I click on the remove button of the expired report', () => {
  new AsyncHomePage().requestedReportRow_Expired().parent().parent().contains('Remove').click()
})

Then('I click on the remove button of the aborted report', () => {
  new AsyncHomePage().requestedReportRow_Expired().parent().parent().contains('Remove').click()
})

Then('I click on the retry button on a failed report', () => {
  new AsyncHomePage().requestedReportRow_Failed().parent().parent().contains('Retry').click()
})

Then('I click on the refresh button on an expired report', () => {
  new AsyncHomePage().requestedReportRow_Expired().parent().parent().contains('Retry').click()
})

Then('I click on the refresh button on an aborted report', () => {
  new AsyncHomePage().requestedReportRow_Aborted().parent().parent().contains('Retry').click()
})

Then('the expired report is removed from the list', () => {
  new AsyncHomePage().requestedReportRow_Expired().should('not.exist')
})

Then('the failed report is removed from the list', () => {
  new AsyncHomePage().requestedReportRow_Failed().should('not.exist')
})

Then('the aborted report is removed from the list', () => {
  new AsyncHomePage().requestedReportRow_Aborted().should('not.exist')
})

Then('the finished report is removed from the list', () => {
  new AsyncHomePage().requestedReportRow_Finished().should('not.exist')
})
