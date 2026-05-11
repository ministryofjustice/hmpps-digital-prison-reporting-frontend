import { executeReportStubs, requestReport } from 'cypress-tests/cypressUtils'

export const setupInteractiveReportStubs = () => {
  executeReportStubs()
  cy.task('stubDefinitionFeatureTestingInteractive')
  cy.task('stubAsyncRequestSuccessReportTablesCount')
}

export const requestInteractiveReport = (path = '/') => {
  requestReport({
    name: 'Interactive Report',
    description: 'this is an interactive report',
    path,
  })
}

export const applyFilters = () => {
  cy.findByRole('button', { name: 'Apply filters' }).click()
}

export const showFilters = () => {
  cy.findAllByRole('group')
    .contains(/Show filters/)
    .click()
}

export const removeAllFilters = (count = 4) => {
  Cypress._.times(count, () => {
    cy.findByLabelText('Selected filters').within(() => {
      cy.findAllByRole('button').first().click()
    })
  })
}
