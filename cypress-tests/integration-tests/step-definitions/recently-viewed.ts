import { Then } from '@badeball/cypress-cucumber-preprocessor'
import AsyncHomePage from '../pages/AsyncHomePage'

Then('I click on the recently viewed reports tab', () => {
  new AsyncHomePage().recentlyViewedTab().click()
})

Then('the viewed reports are displayed correctly', () => {
  new AsyncHomePage().viewedReportsList().find('tr').should('have.length', 4)
})

Then('the status is displayed for each viewed report', () => {
  new AsyncHomePage()
    .viewedReportsList()
    .get('tr')
    .should('contain', 'READY')
    .and('contain', 'Successful Report')
    .should('exist')

  new AsyncHomePage()
    .viewedReportsList()
    .get('tr')
    .should('contain', 'EXPIRED')
    .and('contain', 'Successful Report')
    .should('exist')

  new AsyncHomePage()
    .viewedReportsList()
    .get('tr')
    .should('contain', 'READY')
    .and('contain', 'Test Dashboard 8')
    .should('exist')
})

Then('the timestamp is displayed for each viewed report', () => {
  new AsyncHomePage()
    .viewedReportsList()
    .get('tr')
    .should('contain', 'READY')
    .and('contain', 'Successful Report')
    .and('contain', 'Last viewed:')
    .should('exist')

  new AsyncHomePage()
    .viewedReportsList()
    .get('tr')
    .should('contain', 'EXPIRED')
    .and('contain', 'Successful Report')
    .and('contain', 'Expired at:')
    .should('exist')

  new AsyncHomePage()
    .viewedReportsList()
    .get('tr')
    .should('contain', 'READY')
    .and('contain', 'Test Dashboard 8')
    .and('contain', 'Last viewed:')
    .should('exist')
})

Then('I click on a ready report', () => {
  const row = new AsyncHomePage()
    .viewedReportsList()
    .find('tr')
    .contains('READY')
    .parent()
    .parent()
    .contains('Successful Report')
    .click()
})

Then('I click on a ready dashboard', () => {
  new AsyncHomePage()
    .viewedReportsList()
    .find('tr')
    .contains('READY')
    .parent()
    .parent()
    .contains('dashboard')
    .parent()
    .parent()
    .contains('Test Dashboard 8')
    .click()
})

Then('I click on an expired viewed report', () => {
  new AsyncHomePage()
    .viewedReportsList()
    .find('tr')
    .contains('EXPIRED')
    .parent()
    .parent()
    .contains('Successful Report')
    .click()
})

Then('I click on the remove button of the expired viewed report', () => {
  new AsyncHomePage()
    .viewedReportsList()
    .find('tr')
    .contains('EXPIRED')
    .parent()
    .parent()
    .contains('Successful Report')
    .parent()
    .parent()
    .contains('Remove')
    .click()
})

Then('I click on the refresh button on an expired viewed report', () => {
  new AsyncHomePage()
    .viewedReportsList()
    .find('tr')
    .contains('EXPIRED')
    .parent()
    .parent()
    .contains('Successful Report')
    .parent()
    .parent()
    .contains('Refresh')
    .click()
})

Then('the expired report is removed from the viewed reports list', () => {
  new AsyncHomePage().viewedReportsList().find('tr').contains('EXPIRED').should('not.exist')
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
