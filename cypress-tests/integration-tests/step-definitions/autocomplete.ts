/* eslint-disable func-names */

import { Then, When } from '@badeball/cypress-cucumber-preprocessor'
import ReportPage from '../pages/ReportPage'

const shortMatchingText = 'Pr'
const longMatchingText = 'Pri'
const staticFieldName = 'field4'
const dynamicFieldName = 'field5'

const getFieldNameFromType = (type) => (type === 'static' ? staticFieldName : dynamicFieldName)

When(
  /^I enter text (longer|shorter) than the minimum data length into the (static|dynamic) Autocomplete box$/,
  function (this: Mocha.Context, length: string, type: string) {
    const text = length === 'longer' ? longMatchingText : shortMatchingText
    const fieldName = getFieldNameFromType(type)

    this.selectedFieldName = fieldName

    new ReportPage().filter(fieldName).type(text)
  },
)

When(/^I select an autocomplete option$/, function (this: Mocha.Context) {
  new ReportPage().visibleAutocompleteOptions(this.selectedFieldName).first().click()
})

Then(/^the (static|dynamic) Autocomplete box is shown$/, (type: string) => {
  new ReportPage().filter(getFieldNameFromType(type)).should('exist')
})

Then(/^a list of matching options is displayed$/, function (this: Mocha.Context) {
  const visibleAutocompleteOptions = new ReportPage().visibleAutocompleteOptions(this.selectedFieldName)
  visibleAutocompleteOptions.should('have.length', 2)
  visibleAutocompleteOptions.first().should('contain', 'Prince Humperdink')
  visibleAutocompleteOptions.first().next().should('contain', 'Princess Buttercup')
})

Then(/^a list of options is not displayed$/, function (this: Mocha.Context) {
  new ReportPage().visibleAutocompleteOptions(this.selectedFieldName).should('have.length', 0)
})

Then(/^that value is displayed in the autocomplete box$/, function (this: Mocha.Context) {
  new ReportPage().filter(this.selectedFieldName).should('have.value', 'Prince Humperdink')
})

Then(/^the select option is displayed in the Selected Filters section$/, () => {
  new ReportPage().selectedFilterButton().contains(`Prince Humperdink`)
})

Then('the selected option is displayed in the URL', function (this: Mocha.Context) {
  cy.location().should((location) => {
    expect(location.search).to.contain(`filters.${this.selectedFieldName}=Prince%20Humperdink`)
  })
})
