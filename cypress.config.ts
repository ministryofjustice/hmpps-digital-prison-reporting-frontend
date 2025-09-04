import { defineConfig } from 'cypress'
import sharedConfig from './sharedCypressConfig'

export default defineConfig({
  ...sharedConfig,
  e2e: {
    ...sharedConfig.e2e,
    specPattern: 'src/dpr/**/*.cy.{js,jsx,ts,tsx}',
  },
})
