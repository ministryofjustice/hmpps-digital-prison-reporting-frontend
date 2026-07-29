import { Result } from 'axe-core'
import fs from 'fs'
import { globSync } from 'glob'
import DateMapper from 'src/dpr/utils/DateMapper/DateMapper'
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
  viewportWidth: 1800,
  viewportHeight: 1000,
  e2e: {
    baseUrl: 'http://localhost:3010',
    supportFile: 'cypress-tests/integration-tests/support/index.ts',
    specPattern: '{src/dpr,test-app}/**/*.cy.{js,jsx,ts,tsx}',
    setupNodeEvents(on, cfg) {
      on('task', {
        resetRedis,
        resetStubs,
        deleteStub,
        ...missingRequestStubs,
        ...reportingStubs,
        ...dashboardStubs,
        dateMapperToDateString(dateValue) {
          return new DateMapper().toDateString(dateValue, 'iso')
        },
        countFiles() {
          return fs.readdirSync(cfg.downloadsFolder).length
        },
        checkCsvDownload4RowsValid() {
          const files = globSync(`${cfg.downloadsFolder}/*.csv`)
          if (files.length === 0) return false

          const mostRecentReportPath = files
            .map(name => ({ name, ctime: fs.statSync(name).ctime }))
            .sort((a, b) => b.ctime.getTime() - a.ctime.getTime())[0].name

          const contents = String(fs.readFileSync(mostRecentReportPath)).trim().split('\n')
          const numCols = contents[0]?.split(',').length ?? 0

          return (
            contents.length === 4 &&
            contents.reduce((acc, row) => acc && row.split(',').length === numCols, true) &&
            contents.every(row => row.length > 0)
          )
        },
        checkXlsxDownloadValid() {
          const files = globSync(`${cfg.downloadsFolder}/*.xlsx`)
          if (files.length === 0) return false

          const mostRecent = files
            .map(name => ({ name, ctime: fs.statSync(name).ctime }))
            .sort((a, b) => b.ctime.getTime() - a.ctime.getTime())[0]

          // The downloads folder is shared across specs, so require the file to be recent.
          // Without this the assertion passes on a file an earlier spec left behind.
          if (Date.now() - mostRecent.ctime.getTime() > 30_000) return false

          // An xlsx is a zip container, so a valid one starts with the zip magic bytes.
          // Catches a truncated or mis-encoded stream, which is the realistic failure here.
          const contents = fs.readFileSync(mostRecent.name)

          return contents.length > 1000 && contents.subarray(0, 2).toString() === 'PK'
        },
        async checkFilesIncremented(beforeCount) {
          for (let i = 3; i > 0; i -= 1) {
            // eslint-disable-next-line no-await-in-loop
            await new Promise(r => {
              setTimeout(r, 500)
            })
            if (Number(fs.readdirSync(cfg.downloadsFolder).length) === Number(beforeCount + 1)) {
              return true
            }
          }
          return false
        },
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
