/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-underscore-dangle */
/* eslint-disable new-cap */
// Core dependencies

// NPM dependencies
import express from 'express'
import path from 'path'
import flash from 'connect-flash'

// middleware
import { Services } from 'dpr/types/Services'
import setUpDprResources from 'dpr/middleware/setUpDprResources'
import setUpStaticResources from './middleware/setUpStaticResources'
import setUpMockUser from './middleware/setUpMockUser'

// routes
import Routes from './routes/routes'
import nunjucksSetup from './utils/nujucksSetup'

// Mocks
import setUpMockSyncApis from './mocks/mockSyncData/mockSyncApis'
import setUpBookmarks from './middleware/setUpBookmarks'
import setUpWebSession from './middleware/setupSession'

export default function createApp(services: Services): express.Application {
  const app = express()
  const env = nunjucksSetup(app, path)
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.set('query parser', 'extended')
  app.use(setUpWebSession())
  app.use(flash())
  app.use(setUpStaticResources())
  app.use('/assets/images/favicon.ico', express.static(path.join(__dirname, './favicon.ico')))
  app.use(setUpMockUser())
  app.use(setUpBookmarks(services))
  app.use(setUpDprResources(services, 'views/page.njk', env))
  app.use(Routes(services))
  setUpMockSyncApis(app)

  return app
}
