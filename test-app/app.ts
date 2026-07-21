/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-underscore-dangle */
/* eslint-disable new-cap */
// Core dependencies

// NPM dependencies
import flash from 'connect-flash'
import express from 'express'
import path from 'path'

// middleware
import setUpDprResources from 'src/dpr/middleware/setUpDprResources'
import { Services } from 'src/dpr/types/Services'
import setUpMockUser from './middleware/setUpMockUser'
import setUpStaticResources from './middleware/setUpStaticResources'

// routes
import Routes from './routes/routes'
import nunjucksSetup from './utils/nunjucksSetup'

// Mocks
import setUpBookmarks from './middleware/setUpBookmarks'
import setUpWebSession from './middleware/setupSession'
import setUpMockSyncApis from './mocks/mockSyncData/mockSyncApis'

export default function createApp(services: Services): express.Application {
  const app = express()
  const env = nunjucksSetup(app, path)
  app.locals['digitalPrisonServicesUrl'] = 'https://digital-prison-services.example.com'
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.set('query parser', 'extended')

  // Test helper: must run before setUpDprResources so it still works when API stubs are failing
  app.post('/embedded/platform/setIsProbationService', (req, res) => {
    const { isProbationService } = req.body as { isProbationService?: boolean }
    if (isProbationService === undefined) {
      delete app.locals['isProbationService']
    } else {
      app.locals['isProbationService'] = isProbationService
    }
    res.sendStatus(200)
  })

  app.use(setUpWebSession())
  app.use(flash())
  app.use(setUpStaticResources())
  app.use('/assets/images/favicon.ico', express.static(path.join(__dirname, './favicon.ico')))
  app.use(setUpMockUser())
  app.use(setUpBookmarks(services))
  app.use(setUpDprResources(services, 'views/page.njk', env, { checkDefinitionsInterval: 5 * 60 * 1000 }))
  app.use(Routes(services))
  setUpMockSyncApis(app)

  return app
}
