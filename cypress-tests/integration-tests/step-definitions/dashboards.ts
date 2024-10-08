import { Then, When } from '@badeball/cypress-cucumber-preprocessor'
import AsyncHomePage from '../pages/AsyncHomePage'
import DasboardPage from '../pages/DashboardPage'

When('I click the dashboard link', () => {
  const page = new AsyncHomePage()
  page.dashboardLink().should('have.attr', 'href').and('eq', '/dashboards/test-report-1/load/test-dashboard-1')
  page.dashboardLink().click()
})

Then('I am taken to the dashboard', () => {
  cy.url().should('eq', 'http://localhost:3010/dashboards/test-report-1/dashboard/test-dashboard-1')
})

Then('I see the dashboard data', () => {
  const page = new DasboardPage()
  page.dashboardName().contains('Test Dashboard 1')
  page.dashboardDescription().contains('Test Dashboard 1 Description')
})

Then('I see the metric data', () => {
  const page = new DasboardPage()
  page.metricName().contains('Missing Ethnicity By Establishment Metric')
  page.metricDescription().contains('Missing Ethnicity By Establishment Metric')

  page.metricBarTab().should('exist')
  page.matricTableTab().should('exist')
  page.metricDoughnutTab().should('exist')
})

When('I click the table tab', () => {
  new DasboardPage().matricTableTab().click()
})

Then('I see the metric data in a table', () => {
  const page = new DasboardPage()
  page.metricTable_row1().contains('KMI')
  page.metricTable_row1().contains('25.09%')

  page.metricTable_row2().contains('LEI')
  page.metricTable_row2().contains('47.09%')
})
