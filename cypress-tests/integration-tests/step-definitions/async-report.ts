import { Then } from '@badeball/cypress-cucumber-preprocessor'
import AysncReportPage from '../pages/AysncReportPage'

Then('I open the columns options', () => {
  new AysncReportPage().columnsDetails().click()
})

Then('I select the columns', () => {
  new AysncReportPage().column4CheckBox().click()
  new AysncReportPage().column5CheckBox().click()
  new AysncReportPage().column7CheckBox().click()
})

Then('the URL will show the correct columns', () => {
  cy.url().should(
    'eq',
    'http://localhost:3010/embedded/platform/dpr/view-report/async/report/request-examples/request-example-success/tblId_1729766362362/report?columns=field1&columns=field2&columns=field3&columns=field6&columns=field4&columns=field5',
  )
})

Then('the URL will show the default columns', () => {
  cy.url().should(
    'eq',
    'http://localhost:3010/embedded/platform/dpr/view-report/async/report/request-examples/request-example-success/tblId_1729766362362/report?columns=field1&columns=field2&columns=field3&columns=field6&columns=field7',
  )
})

Then('I click apply columns', () => {
  new AysncReportPage().applyColumnsButton().click()
})

Then('I click reset columns', () => {
  new AysncReportPage().resetColumns().click()
})

Then('the table will show the correct columns', () => {
  const page = new AysncReportPage()
  page.tableHeaders().find('th').should('have.length', 6)
  page.tableHeaders().find('th').contains('Field 1').should('exist')
  page.tableHeaders().find('th').contains('Field 2').should('exist')
  page.tableHeaders().find('th').contains('Field 3').should('exist')
  page.tableHeaders().find('th').contains('Field 4').should('exist')
  page.tableHeaders().find('th').contains('Field 5').should('exist')
  page.tableHeaders().find('th').contains('Field 6').should('exist')
})

Then('the table will show the default columns', () => {
  const page = new AysncReportPage()
  page.tableHeaders().find('th').should('have.length', 5)
  page.tableHeaders().find('th').contains('Field 1').should('exist')
  page.tableHeaders().find('th').contains('Field 2').should('exist')
  page.tableHeaders().find('th').contains('Field 3').should('exist')
  page.tableHeaders().find('th').contains('Field 6').should('exist')
  page.tableHeaders().find('th').contains('Field 7').should('exist')
})

Then('I change the page size to 10', () => {
  const page = new AysncReportPage()
  page.pageSizeSelector().select(`10`)
})

Then('the page size is set in the URL', () => {
  cy.url().should('include', 'pageSize=10')
})

Then('the totals should show the correct value', () => {
  new AysncReportPage().totals().should('have.text', 'Showing 1 to 10 of 100 results')
})

Then('the totals should show the correct pagination value', () => {
  new AysncReportPage().totals().should('have.text', 'Showing 91 to 100 of 100 results')
})

Then('I click on page 5', () => {
  new AysncReportPage().pagination_page10().click()
})

Then('the page number is set in the URL', () => {
  cy.url().should('include', 'selectedPage=10')
})
