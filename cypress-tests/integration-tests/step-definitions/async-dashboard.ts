import { Then, When } from '@badeball/cypress-cucumber-preprocessor'
import DasboardPage from '../pages/DashboardPage'

Then('I see the dashboard data', () => {
  const page = new DasboardPage()
  page.dashboardName().contains('Test Dashboard')
})

Then('I see the dashboard sections', () => {
  const page = new DasboardPage()
  page.section1Name().contains('Section 1 - Ethnicity charts')
  page.section1Description().contains('Section 1 description - charts showing ethnicity data')

  page.section2Name().contains('Section 2 - Nationality charts')
  page.section2Description().contains('Section 2 description - charts showing nationality data')

  page.section3Name().contains('Section 3 - Religion charts')
  page.section3Description().contains('Section 3 description - charts showing religion data')

  page.section4Name().contains('Section 4 - Individual Scorecards')
  page.section4Description().contains('Section 4 description - Testing individually defined scorecards')

  page.section5Name().contains('Section 5 - Individual Scorecards targeting values')
  page
    .section5Description()
    .contains('Section 5 description - Testing individually defined scorecards that target specfic column value')

  page.section6Name().contains('Section 6 - Scorecard Group')
  page.section6Description().contains('Section 6 description - Testing scorecard groups created from list data')
})

Then('I see the dashboard chart visualisations', () => {
  const page = new DasboardPage()
  page.visBarTitle().contains('Missing Ethnicity Bar Chart')
  page.visBarDescription().contains('Prisoner totals for missing ethnicity')
  page.visBarTab().should('exist')
  page.visBarTableTab().should('exist')
})

When('I click the table tab', () => {
  new DasboardPage().visBarTableTab().click()
})

Then('I see the data in a table', () => {
  const page = new DasboardPage()
  page.visBarTable_head().contains('Has ethnicity')
  page.visBarTable_head().contains('Has no ethnicity')
})
