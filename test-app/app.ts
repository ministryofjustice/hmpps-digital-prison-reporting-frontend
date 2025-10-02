/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-underscore-dangle */
/* eslint-disable new-cap */
// Core dependencies

// NPM dependencies
import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'

// middleware
import setUpStaticResources from './middleware/setUpStaticResources'
import setUpMockUser from './middleware/setUpMockUser'

// routes
import Routes from './routes/routes'
import nunjucksSetup from './utils/nujucksSetup'

// Mocks
import setUpMockSyncApis from './mocks/mockSyncData/mockSyncApis'
import setUpBookmarks from './middleware/setUpBookmarks'
import { Services } from 'src/dpr/types/Services'
import setUpDprResources from 'src/dpr/middleware/setUpDprResources'

export default function createApp(services: Services): express.Application {
  const app = express()
  nunjucksSetup(app, path)
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())
  app.use(setUpStaticResources())
  app.use('/assets/images/favicon.ico', express.static(path.join(__dirname, './favicon.ico')))
  app.use(setUpMockUser())
  app.use(setUpBookmarks(services))
  app.use(setUpDprResources(services))
  app.use(Routes(services))
  setUpMockSyncApis(app)

  return app
}
