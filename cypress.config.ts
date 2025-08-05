// eslint-disable-next-line import/no-extraneous-dependencies
import { defineConfig } from 'cypress'

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
  },
})
