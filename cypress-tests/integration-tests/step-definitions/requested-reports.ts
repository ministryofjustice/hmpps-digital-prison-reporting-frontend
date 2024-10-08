import { Then } from '@badeball/cypress-cucumber-preprocessor'
import AsyncHomePage from '../pages/AsyncHomePage'

Then('I click on the requested reports tab', () => {
  new AsyncHomePage().requestedTab().click()
})

Then('the requested reports are displayed correctly', () => {
  new AsyncHomePage().requestedReportsList().find('tr').should('have.length', 5)
})

Then('the status is displayed for each request', () => {
  new AsyncHomePage().requestedReportFinishedRow().find('td').contains('FINISHED').should('exist')
  new AsyncHomePage().requestedReportFailedRow().find('td').contains('FAILED').should('exist')
  new AsyncHomePage().requestedReportExpiredRow().find('td').contains('EXPIRED').should('exist')
})

Then('the timestamp is displayed for each request', () => {
  new AsyncHomePage().requestedReportFinishedRow().find('td').contains('Ready at:').should('exist')
  new AsyncHomePage().requestedReportFailedRow().find('td').contains('Failed at:').should('exist')
  new AsyncHomePage().requestedReportExpiredRow().find('td').contains('Expired at:').should('exist')
})

Then('I click on a finished report', () => {
  cy.reload()
  cy.reload()
  new AsyncHomePage().requestedReportFinishedRow().find('td').contains('Test Variant 1').click()
})

Then('I click on a failed report', () => {
  new AsyncHomePage().requestedReportFailedRow().find('td').contains('Test Variant 2').click()
})

Then('I click on an expired report', () => {
  new AsyncHomePage().requestedReportExpiredRow().find('td').contains('Test Variant 3').click()
})

Then('I am taken to the report page', () => {
  cy.url().should(
    'eq',
    'http://localhost:3010/async-reports/test-report-1/variantId-1/request/tblId_1724943092549/report?columns=field1&columns=field2&columns=field3&columns=field6&columns=field7',
  )
})

Then('I am taken to the status page', () => {
  cy.url().should('eq', 'http://localhost:3010/async-reports/test-report-2/variantId-2/request/exId_1721738244285')
})

Then('I am taken to the query page', () => {
  cy.url().should(
    'eq',
    'http://localhost:3010/async-reports/test-report-1/variantId-1/request?filters.field1=value1.2&filters.field2=value2.1&filters.field3.start=2003-02-01&filters.field3.end=2006-05-04&filters.field7=2005-02-01&sortColumn=field1&sortedAsc=true',
  )
})

Then('I click on the remove button of the failed report', () => {
  new AsyncHomePage().requestedFailedRemoveButton().click()
})

Then('I click on the remove button of the expired report', () => {
  new AsyncHomePage().requestedExpiredRemoveButton().click()
})

Then('I click on the retry button on a failed report', () => {
  new AsyncHomePage().requestedFailedRetryButton().click()
})

Then('I click on the refresh button on an expired report', () => {
  new AsyncHomePage().requestedExpiredRetryButton().click()
})

Then('the expired report is removed from the list', () => {
  new AsyncHomePage().requestedReportExpiredRow().should('not.exist')
})

Then('the failed report is removed from the list', () => {
  new AsyncHomePage().requestedReportFailedRow().should('not.exist')
})

Then('the report is removed from the list', () => {
  new AsyncHomePage().requestedReportFailedRow().should('not.exist')
})

Then('the finished report is removed from the list', () => {
  new AsyncHomePage().requestedReportFinishedRow().should('not.exist')
})
