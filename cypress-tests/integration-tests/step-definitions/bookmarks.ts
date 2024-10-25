import { Then } from '@badeball/cypress-cucumber-preprocessor'
import AsyncHomePage from '../pages/AsyncHomePage'

Then('I click on the bookmarks tab', () => {
  new AsyncHomePage().bookmarksTab().click()
})

Then('the bookmarks are displayed correctly', () => {
  new AsyncHomePage().bookmarkTable().find('tr').should('have.length', 2)
})

Then('I click on a bookmark button', () => {
  new AsyncHomePage().bookmarkButton().first().click()
})

Then('the bookmark is removed', () => {
  new AsyncHomePage().bookmarkTable().should('not.exist')
})

Then('I click a bookmark button from the reports list', () => {
  new AsyncHomePage().bookmarkButtonFromList().click()
})

Then('the bookmark is added', () => {
  new AsyncHomePage().bookmarkTable().find('tr').should('have.length', 2)
})

Then('I click on a selected bookmark button from the reports list', () => {
  new AsyncHomePage().bookmarkButtonFromList().find('label').click()
})

Then('I click the bookmark button on the report', () => {
  new AsyncHomePage().bookmarkButtonFromReport().click()
})

Then('I click on a bookmarked report', () => {
  new AsyncHomePage().bookmarkLink().click()
})

Then('I am taken to the query page of the bookmarked report', () => {
  cy.url().should(
    'eq',
    'http://localhost:3010/async/report/test-report-3/variantId-1/request?filters.field1=value1.2&filters.field2=value2.1&filters.field3.start=2003-02-01&filters.field3.end=2006-05-04&filters.field7=2005-02-01&sortColumn=field1&sortedAsc=true',
  )
})
