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
    cy.findAllByRole('button')
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

export const startReportRequest = ({ name, description }: { name: string; description: string }) => {
  cy.findByLabelText(/Reports catalogue.*/i).within(() => {
    cy.findAllByRole('row', {
      name: (_, element) => {
        return Boolean(element?.textContent?.includes(name)) && Boolean(element?.textContent?.includes(description))
      },
    })
      .first()
      .within(() => {
        cy.findByRole('link', { name: /Request/ }).click()
      })
  })
}

export const requestReportByNameAndDescription = ({ name, description }: { name: string; description: string }) => {
  startReportRequest({ name, description })
  checkA11y()
  cy.findByRole('button', { name: /Request/ }).click()
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
  requestReportByNameAndDescription({ name, description })
  checkA11y()
  const regexName = new RegExp(`${name}`)
  cy.findByRole('heading', { level: 1, name: regexName }).should('be.visible')
}

export const executeReportStubs = (resetRedis: boolean = true) => {
  stubBaseTasks(resetRedis)
  stubDefinitionsTasks()
  cy.task('stubReportsFinishedStatus')
  cy.task('stubViewAsyncReportingResults')
  cy.task('stubViewAsyncReportingResultsBadData')
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
  cy.log('STUB DEFINITIONS')
    .then(() => cy.task('stubFeatureFlags'))
    .then(() => cy.task('stubDefinitions'))
    .then(() => cy.task('stubSingleSummaries'))
    .then(() => cy.task('stubGetProductCollections'))
    .then(() => cy.task('stubGenericDefinitionRequest'))
    .then(() => stubBookmarks())
}

export const stubBaseTasks = (resetRedis: boolean = true) => {
  cy.task('resetStubs')
  if (resetRedis) {
    cy.task('resetRedis')
  }
  cy.task('stubFeatureFlags')
}

export const stubBookmarks = () => {
  cy.log('STUB BOOKMARKS')
    .then(() => cy.task('stubDefinitionUnprintable'))
    .then(() => cy.task('stubDefinitionEmptyReport'))
}
