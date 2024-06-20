/* eslint-disable func-names */

import { Then, When } from '@badeball/cypress-cucumber-preprocessor'
import SearchPage from '../pages/SearchPage'

When(/^I enter a search value of (.+)$/, (searchText: string) => {
  new SearchPage().textBox().type(searchText)
})

Then(/^(\d+) results are displayed$/, (numberOfResults: number) => {
  new SearchPage().results().should('have.length', numberOfResults)
})
When(/^I enter an empty search value$/, function() {
  new SearchPage().textBox().clear()
});