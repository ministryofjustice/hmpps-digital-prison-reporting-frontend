import { Then } from '@badeball/cypress-cucumber-preprocessor'
import AsyncHomePage from '../pages/AsyncHomePage'

Then('I click on the recently viewed reports tab', () => {
  new AsyncHomePage().recentlyViewedTab().click()
})

Then('the viewed reports are displayed correctly', () => {
  new AsyncHomePage().viewedReportsList().find('tr').should('have.length', 3)
})

Then('the status is displayed for each viewed report', () => {
  new AsyncHomePage().viewedReadyRow().find('td').contains('READY').should('exist')
  new AsyncHomePage().viewedExpiredRow().find('td').contains('EXPIRED').should('exist')
})

Then('the timestamp is displayed for each viewed report', () => {
  new AsyncHomePage().viewedReadyRow().find('td').contains('Last viewed:').should('exist')
  new AsyncHomePage().viewedExpiredRow().find('td').contains('Expired at:').should('exist')
})

Then('I click on a ready report', () => {
  new AsyncHomePage().viewedReadyRow().find('td').contains('Successful Report').click()
})

Then('I click on an expired viewed report', () => {
  new AsyncHomePage().viewedExpiredRow().find('td').contains('Successful Report').click()
})

Then('I click on the remove button of the expired viewed report', () => {
  new AsyncHomePage().viewedExpiredRemoveButton().click()
})

Then('I click on the refresh button on an expired viewed report', () => {
  new AsyncHomePage().viewedExpiredRefreshButton().click()
})

Then('the expired report is removed from the viewed reports list', () => {
  new AsyncHomePage().viewedExpiredRow().should('not.exist')
})

Then('I am taken to the query page for the viewed report', () => {
  cy.url().should(
    'eq',
    'http://localhost:3010/async/report/test-report-3/variantId-1/request?filters.field1=value1.3&filters.field2=value2.3&filters.field3.start=2003-09-05&filters.field3.end=2007-05-01&filters.field7=2007-05-04&sortColumn=field1&sortedAsc=true&filters.field4=Inigo+Montoya',
  )
})

Then('I am taken to the report page of the viewed report', () => {
  cy.url().should(
    'eq',
    'http://localhost:3010/async/report/test-report-3/variantId-1/request/tblId_1729766362362/report?columns=field1&columns=field2&columns=field3&columns=field6&columns=field7',
  )
})
