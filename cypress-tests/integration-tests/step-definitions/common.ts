/* eslint-disable func-names */

import { Then, When } from '@badeball/cypress-cucumber-preprocessor'

When(/I navigate to the main page/, () => {
  cy.visit('/')
})

When(/I navigate to the reports page/, () => {
  cy.visit('/reports')
})

When(/I navigate to the render types page/, () => {
  cy.visit('/reports/render-types')
})

When(/I navigate to the (method|handler) page/, (page: string) => {
  const type = page.toLowerCase()
  let path = 'reports/render-types/'
  if (type === 'method') {
    path += `${type}?dataProductDefinitionsPath=test-location`
  } else {
    path += type
  }
  cy.visit(`/${path}`)
})

When(/I navigate to the fail page/, () => {
  cy.visit('reports/render-types/fail', {
    failOnStatusCode: false,
  })
})

Then(/The text (.+) is displayed on the page/, (text) => {
  cy.get('body').should('contain.text', text)
})
