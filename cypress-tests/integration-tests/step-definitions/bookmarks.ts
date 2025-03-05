/* eslint-disable func-names */
import { Then } from '@badeball/cypress-cucumber-preprocessor'
import AsyncHomePage from '../pages/AsyncHomePage'

Then('I click on the bookmarks tab', () => {
  new AsyncHomePage().bookmarksTab().click()
})

Then(
  /^the bookmarks are displayed correctly with a length of (\d+)$/,
  function (this: Mocha.Context, rowCount: number) {
    new AsyncHomePage().bookmarkTable().find('tr').should('have.length', rowCount)
  },
)

Then('I click on a bookmark button of a report', () => {
  new AsyncHomePage().bookmarkButton().first().click()
})

Then('I click on a bookmark button of a dashboard', () => {
  new AsyncHomePage().bookmarkDashboardButton().first().click()
})

Then('the report bookmark is removed', () => {
  new AsyncHomePage().bookmarkButton().should('not.exist')
})

Then('the dashboard bookmark is removed', () => {
  new AsyncHomePage().bookmarkDashboardButton().should('not.exist')
})

Then('I click a report bookmark button from the reports list', () => {
  new AsyncHomePage().bookmarkButtonFromList().click()
})

Then('I click a dashboard bookmark button from the reports list', () => {
  new AsyncHomePage().bookmarkDashboardButtonFromList().click()
})

Then('the report bookmark is added', () => {
  new AsyncHomePage().bookmarkTable().find('tr').should('have.length', 2)
})

Then('the dashboard bookmark is added', () => {
  new AsyncHomePage().bookmarkTable().find('tr').should('have.length', 2)
})

Then('I click on a selected report bookmark button from the reports list', () => {
  new AsyncHomePage().bookmarkButtonFromList().click()
})

Then('I click on a selected dashboard bookmark button from the reports list', () => {
  new AsyncHomePage().bookmarkDashboardButtonFromList().click()
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
    'http://localhost:3010/async/report/test-report-3/variantId-1/request?filters.field1=value1.2&filters.field3.start=2003-02-01&filters.field3.end=2006-05-04&filters.field7=2005-02-01&filters.field8=value8.2&filters.field8=value8.3&sortColumn=field1&sortedAsc=true',
  )
})

Then('I am taken to the request page of the bookmarked dashboard', () => {
  cy.url().should(
    'eq',
    'http://localhost:3010/async/dashboard/test-report-3/variantId-1/request?filters.field1=value1.2&filters.field3.start=2003-02-01&filters.field3.end=2006-05-04&filters.field7=2005-02-01&sortColumn=field1&sortedAsc=true',
  )
})
