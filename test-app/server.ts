import createApp from './app'
import { initServices } from './utils/initMockClients'

async function start(): Promise<void> {
  const services = initServices({
    bookmarking: true,
    download: true,
    saveDefaults: true,
    collections: true,
    missingReports: true,
    feedbackOnDownload: true,
    subscriptions: true,
  })

  if (services.reportIdMigrationService.enabled) {
    await services.reportIdMigrationService.migrate()
  }

  const app = createApp(services)
  const port = Number(process.env['PORT']) || 3010

  // Start the server
  // eslint-disable-next-line no-console
  console.log(`Listening on port ${port} url: http://localhost:${port}`)
  app.listen(port)
}

void start().catch(error => {
  // eslint-disable-next-line no-console
  console.error(error, 'Failed to start application')
  process.exit(1)
})
