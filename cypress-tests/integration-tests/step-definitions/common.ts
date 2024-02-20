/* eslint-disable func-names */

import { Then, When } from '@badeball/cypress-cucumber-preprocessor'

When(/I navigate to the main page/, () => {
  cy.visit('/')
})

When(/I navigate to the (method|handler) page/, (page: string) => {
  let path = page.toLowerCase()
  if (path === 'method') {
    path += '?dataProductDefinitionsPath=test-location'
  }
  cy.visit(`/${path}`)
})

When(/I navigate to the fail page/, () => {
  cy.visit('/fail', {
    failOnStatusCode: false,
  })
})

Then(/The text (.+) is displayed on the page/, (text) => {
  cy.get('body').should('contain.text', text)
})
