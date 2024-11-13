import { Then, When } from '@badeball/cypress-cucumber-preprocessor'
import DasboardPage from '../pages/DashboardPage'

Then('I see the dashboard data', () => {
  const page = new DasboardPage()
  page.dashboardName().contains('Test Dashboard 8')
})

Then('I see the metric data', () => {
  const page = new DasboardPage()
  page.metricName().contains('Missing Ethnicity')
  page.metricDescription().contains('Missing Ethnicity')

  page.metricBarTab().should('exist')
  page.matricTableTab().should('exist')
  page.metricDoughnutTab().should('exist')
})

When('I click the table tab', () => {
  new DasboardPage().matricTableTab().click()
})

Then('I see the metric data in a table', () => {
  const page = new DasboardPage()
  page.metricTable_row1().contains('IWI')
  page.metricTable_row1().contains('200')

  page.metricTable_row2().contains('LTI')
  page.metricTable_row2().contains('300')
})
