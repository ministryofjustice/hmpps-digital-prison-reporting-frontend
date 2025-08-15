// eslint-disable-next-line import/no-extraneous-dependencies
import { defineConfig } from 'cypress'
import { resetStubs } from './cypress-tests/mockApis/wiremock'
import missingRequestStubs from './cypress-tests/mockApis/missingRequest'
import reportingStubs from './cypress-tests/mockApis/reporting'

export default defineConfig({
  chromeWebSecurity: false,
  videosFolder: 'cypress-tests/integration-tests/videos',
  screenshotsFolder: 'cypress-tests/integration-tests/screenshots',
  fixturesFolder: 'cypress-tests/integration-tests/fixtures',
  video: true,
  taskTimeout: 60000,
  e2e: {
    baseUrl: 'http://localhost:3010',
    supportFile: 'cypress-tests/integration-tests/support/index.ts',
    specPattern: '{test-app,src/dpr}/**/*.cy.{js,jsx,ts,tsx}',
    setupNodeEvents(on, config) {
      on('task', {
        reset: resetStubs,
        ...missingRequestStubs,
        ...reportingStubs,
      })
      return config
    },
  },
})
