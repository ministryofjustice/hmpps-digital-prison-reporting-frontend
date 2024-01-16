/* eslint-disable func-names */

import { Then, When } from '@badeball/cypress-cucumber-preprocessor'
import ReportPage from '../pages/ReportPage'

const shortMatchingText = 'Pr'
const longMatchingText = 'Pri'

When(/^I enter text (longer|shorter) than the minimum data length$/, (length: string) => {
  const text = length === 'longer' ? longMatchingText : shortMatchingText
  new ReportPage().filter('field4').type(text)
})

When(/^I select an autocomplete option$/, () => {
  new ReportPage().visibleAutocompleteOptions('field4').first().click()
})

Then(/^the Autocomplete box is shown$/, () => {
  new ReportPage().filter('field4').should('exist')
})

Then(/^a list of matching options is displayed beneath the autocomplete box$/, () => {
  const page = new ReportPage()

  page.hiddenAutocompleteOptions('field4').should('have.length', 3)

  const visibleAutocompleteOptions = new ReportPage().visibleAutocompleteOptions('field4')
  visibleAutocompleteOptions.should('have.length', 2)
  visibleAutocompleteOptions.first().should('contain', 'Prince Humperdink')
  visibleAutocompleteOptions.first().next().should('contain', 'Princess Buttercup')
})

Then(/^a list of options is not displayed$/, () => {
  const page = new ReportPage()

  page.hiddenAutocompleteOptions('field4').should('have.length', 5)
  page.visibleAutocompleteOptions('field4').should('have.length', 0)
})

Then(/^that value is displayed in the autocomplete box$/, () => {
  new ReportPage().filter('field4').should('have.value', 'Prince Humperdink')
})

Then(/^the select option is displayed in the Selected Filters section$/, () => {
  new ReportPage().selectedFilterButton().contains(`Field 4: Prince Humperdink`)
})

Then('the selected option is displayed in the URL', function (this: Mocha.Context) {
  cy.location().should((location) => {
    expect(location.search).to.contain('filters.field4=Prince%20Humperdink')
  })
})
