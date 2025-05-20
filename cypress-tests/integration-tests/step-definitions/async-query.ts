import { Then } from '@badeball/cypress-cucumber-preprocessor'
import AsyncQueryPage from '../pages/AsyncQueryPage'

Then('I click the reports details button', () => {
  new AsyncQueryPage().reportDetails().click()
})

Then('the report details are displayed', () => {
  new AsyncQueryPage().reportDetailsTable().contains('Name:')
  new AsyncQueryPage().reportDetailsTable().contains('Successful Report')

  new AsyncQueryPage().reportDetailsTable().contains('Product:')
  new AsyncQueryPage().reportDetailsTable().contains('Test Report')
})

Then('the url is initialised to the default values', () => {
  cy.url().should(
    'eq',
    'http://localhost:3010/async/report/test-report-3/variantId-1/request?filters.field1=value1.2&filters.field3.start=2003-02-01&filters.field3.end=2006-05-04&filters.field7=2005-02-01&filters.field8=value8.2&filters.field8=value8.3&sortColumn=field1&sortedAsc=true',
  )
})

Then('the url is set to the default values', () => {
  cy.url().should(
    'eq',
    'http://localhost:3010/async/report/test-report-3/variantId-1/request?sortColumn=field2&sortedAsc=true&filters.field1=value1.2&filters.field3.start=2003-02-01&filters.field3.end=2006-05-04&filters.field7=2005-02-01&filters.field8=value8.2&filters.field8=value8.3',
  )
})

Then('I update the filters values', () => {
  new AsyncQueryPage().radioFilterButton().click()
})

Then('I update the sort values', () => {
  new AsyncQueryPage().radioSortButton().click()
})

Then('the URL is updated', () => {
  cy.url().should(
    'eq',
    'http://localhost:3010/async/report/test-report-3/variantId-1/request?filters.field1=value1.1&filters.field3.start=2003-02-01&filters.field3.end=2006-05-04&filters.field7=2005-02-01&filters.field8=value8.2&filters.field8=value8.3&sortColumn=field2&sortedAsc=true',
  )
})

Then('I click the reset filters button', () => {
  new AsyncQueryPage().resetFiltersButton().first().click()
})

Then('I click the submit button', () => {
  new AsyncQueryPage().submitFiltersButton().first().click().wait(500)
})

Then('I am take to the polling page', () => {
  cy.url().should('include', 'http://localhost:3010/async/report/test-report-3/variantId-1/request/exId_')
})
