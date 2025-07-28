import { Then, When } from '@badeball/cypress-cucumber-preprocessor'
import InteractiveReportPage from '../pages/InteractiveReportPage'

Then('the Update filters button is displayed', () => {
  const page = new InteractiveReportPage()

  page.updateFiltersAccordion().should('exist')
})

Then(/^the Update filters panel is (open|closed)$/, (panelStatus) => {
  const panel = new InteractiveReportPage().updateFiltersDetails()

  if (panelStatus === 'open') {
    panel.should('have.attr', 'open')
  } else {
    panel.should('not.have.attr', 'open')
  }
})

When(/^I click the Update filters button$/, () => {
  const page = new InteractiveReportPage()
  page.updateFiltersAccordion().click()
})

When(/I navigate to the interactive report page/, () => {
  cy.visit('/embedded/platform/async/report/test-report-6/variantId-23/request/tblId_1733925499607/report')
})

When('I update the filter inputs', () => {
  const page = new InteractiveReportPage()

  page.radioFilterInput().click()
  page.textFilterInput().type('Value 6.1')
})

When('I click the Apply filters button', () => {
  const page = new InteractiveReportPage()

  page.applyFiltersButton().click()
})

Then('the selected filter values are displayed', () => {
  const page = new InteractiveReportPage()

  page.selectedFilterOne().contains('Field 1: Value 1.1')
  page.selectedFilterThree().contains('Field 6: Value 6.1')
})

Then('the selected filter values are shown in the URL', () => {
  cy.location().should((location) => {
    expect(location.search).to.contain(`filters.field1=value1.1`)
    expect(location.search).to.contain(`filters.field6=Value+6.1`)
  })
})

When('I click a selected filter button', () => {
  const page = new InteractiveReportPage()

  page.selectedFilterOne().click()
})

Then('the selected filter is removed', () => {
  cy.location().should((location) => {
    expect(location.search).not.to.contain(`filters.field1=value1.1`)
  })
})

When('I click the reset filter button', () => {
  const page = new InteractiveReportPage()

  page.resetFiltersButton().click()
})

Then('the filters are reset', () => {
  cy.location().should((location) => {
    expect(location.search).not.to.contain(`filters.field1=value1.1`)
    expect(location.search).not.to.contain(`filters.field6=Value+6.1`)
    expect(location.search).to.contain(
      `filters.field1=value1.2&filters.field3.start=2003-02-01&filters.field3.end=2006-05-04&filters.field7=2005-02-01`,
    )
  })
})
