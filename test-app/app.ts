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
import { setupMocks } from '@networkMocks/setupMocks'

export default async function createApp(): Promise<express.Application> {
  await setupMocks()
  const app = express()
  nunjucksSetup(app, path)
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())
  app.use(setUpStaticResources())
  app.use('/assets/images/favicon.ico', express.static(path.join(__dirname, './favicon.ico')))
  app.use(setUpMockUser())
  app.use(Routes())
  setUpMockSyncApis(app)

  return app
}
