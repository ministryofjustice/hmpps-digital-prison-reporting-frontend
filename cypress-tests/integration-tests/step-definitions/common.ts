/* eslint-disable func-names */

import { When } from '@badeball/cypress-cucumber-preprocessor'

When(/I navigate to the main page/, () => {
    cy.visit('/')
})
