/* eslint-disable func-names */

import { When } from '@badeball/cypress-cucumber-preprocessor'

When(/I navigate to the main page/, () => {
  cy.visit('/')
})

When(/I navigate to the (method|handler) page/, (page: string) => {
  cy.visit(`/${page.toLowerCase()}`)
})
