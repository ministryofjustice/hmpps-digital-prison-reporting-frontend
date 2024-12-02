/* eslint-disable func-names */

import { Then, When } from '@badeball/cypress-cucumber-preprocessor'
import * as axe from 'axe-core'

function terminalLog(violations: axe.Result[]) {
  const violationData = violations.map(({ id, impact, help, helpUrl, nodes }) => ({
    id,
    impact,
    help,
    helpUrl,
    nodes: nodes.length,
  }))

  if (violationData.length > 0) {
    cy.task('log', 'Violation summary')
    cy.task('table', violationData)

    cy.task('log', 'Violation detail')
    cy.task('log', '----------------')

    violations.forEach((v) => {
      v.nodes.forEach((node) => {
        cy.task('log', node.failureSummary)
        cy.task('log', `Impact: ${node.impact}`)
        cy.task('log', `Target: ${node.target}`)
        cy.task('log', `HTML: ${node.html}`)
        cy.task('log', '----------------')
      })
    })
  }
}

When(/I navigate to the main page/, () => {
  cy.visit('/')
})

When(/I navigate to the reports page/, () => {
  cy.visit('/test-reports')
})

When(/I navigate to the fail page/, () => {
  cy.visit('/test-reports/fail', {
    failOnStatusCode: false,
  })
})

When(/I navigate to the search page/, () => {
  cy.visit('/search')
})

When(/I navigate to the (method|handler|validation) page/, (page: string) => {
  const type = page.toLowerCase()
  let path = '/test-reports/'
  if (type === 'method') {
    path += `${type}?dataProductDefinitionsPath=test-location`
  } else {
    path += type
  }
  cy.visit(`/${path}`)
})

When(/I navigate to the async-home page/, () => {
  cy.visit('/dpr-service')
})

When(/I navigate to the async-query page/, () => {
  cy.visit('/async-reports/test-report-3/variantId-1/request')
})

Then(/The text (.+) is displayed on the page/, (text) => {
  cy.get('body').should('contain.text', text)
})

Then(/the page is accessible/, () => {
  cy.injectAxe()
  cy.checkA11y(null, null, terminalLog)
})
