import { logAccessibilityViolations } from './axeCoreUtils'

export const checkA11y = () => {
  cy.injectAxe()
  cy.checkA11y(undefined, undefined, logAccessibilityViolations)
}

export const checkSelectedFilterValues = ({
  length,
  buttonValues,
}: {
  length: number
  buttonValues: { key: string; value: string }[]
}) => {
  cy.findByLabelText(/Selected filters.*/i).within(() => {
    cy.findAllByRole('link')
      .should('have.length', length)
      .each((filter, index) => {
        if (buttonValues[index]) {
          const { key, value } = buttonValues[index]
          cy.wrap(filter).contains(key).should('be.visible')
          cy.wrap(filter).contains(value).should('be.visible')
        }
      })
  })
}

export const requestReport = async ({
  name,
  description,
  path,
}: {
  name: string
  description: string
  path: string
}) => {
  cy.visit(path)
  checkA11y()
  cy.findByLabelText(/Reports catalogue.*/i).within(() => {
    cy.findByRole('row', {
      name: (_, element) => {
        return element.textContent.includes(name) && element.textContent.includes(description)
      },
    }).within(() => {
      cy.findByRole('link', { name: 'Request report' }).click()
    })
  })
  checkA11y()
  cy.findByRole('button', { name: /Request/ }).click()
  checkA11y()
  const regexName = new RegExp(`${name}`)
  cy.findByRole('heading', { level: 1, name: regexName }).should('be.visible')
}

export const executeReportStubs = () => {
  stubBaseTasks()
  stubDefinitionsTasks()
  cy.task('stubReportsFinishedStatus')
  cy.task('stubViewAsyncReportingResults')
  cy.task('stubRequestSuccessReportTablesCount')
  cy.task('stubAsyncRequestSuccessReportTablesCount')
}

export const executeDashboardStubs = () => {
  stubBaseTasks()
  stubDefinitionsTasks()
  cy.task('stubMockDashboardsStatusFinished')
  cy.task('stubViewAsyncResults')
}

export const stubDefinitionsTasks = () => {
  cy.task('stubDefinitions')
  cy.task('stubSingleSummaries')
  cy.task('stubGetProductCollections')
  stubBookmarks()
}

export const stubBaseTasks = () => {
  cy.task('resetStubs')
  cy.task('resetRedis')
}

export const stubBookmarks = () => {
  cy.task('stubDefinitionUnprintable')
  cy.task('stubDefinitionEmptyReport')
}
