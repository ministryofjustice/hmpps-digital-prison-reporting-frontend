import { Result } from 'axe-core'
import { resetStubs, resetRedis, deleteStub } from './cypress-tests/mockApis/wiremock'
import missingRequestStubs from './cypress-tests/mockApis/missingRequest'
import reportingStubs from './cypress-tests/mockApis/reporting'
import dashboardStubs from './cypress-tests/mockApis/dashboards'

const config: Cypress.ConfigOptions = {
  chromeWebSecurity: false,
  videosFolder: 'cypress-tests/integration-tests/videos',
  screenshotsFolder: 'cypress-tests/integration-tests/screenshots',
  fixturesFolder: 'cypress-tests/integration-tests/fixtures',
  video: true,
  taskTimeout: 60000,
  e2e: {
    baseUrl: 'http://localhost:3010',
    supportFile: 'cypress-tests/integration-tests/support/index.ts',
    setupNodeEvents(on, cfg) {
      on('task', {
        resetRedis,
        resetStubs,
        deleteStub,
        ...missingRequestStubs,
        ...reportingStubs,
        ...dashboardStubs,
        logAccessibilityViolationsSummary: (message: string): null => {
          // eslint-disable-next-line no-console
          console.log(message)

          return null
        },
        logAccessibilityViolationsTable: (violations: Result[]): null => {
          // eslint-disable-next-line no-console
          console.table(violations)

          return null
        },
      })
      return cfg
    },
  },
}

export default config
