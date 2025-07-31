/* eslint-disable import/no-extraneous-dependencies */
import path from 'path'
import express, { Router } from 'express'
import noCache from 'nocache'

export default function setUpStaticResources(): Router {
  const router = express.Router()

  //  Static Resources Configuration
  const cacheControl = { maxAge: '24h' }

  Array.of(
    '/dist-test-app/assets',
    '/node_modules/govuk-frontend/dist/govuk/assets',
    '/node_modules/govuk-frontend/dist',
    '/node_modules/@ministryofjustice/frontend/moj/assets',
    '/node_modules/@ministryofjustice/frontend',
    '/node_modules/@microsoft/applicationinsights-web/dist/es5',
    '/node_modules/@microsoft/applicationinsights-clickanalytics-js/dist/es5',
  ).forEach((dir) => {
    router.use('/assets', express.static(path.join(process.cwd(), dir), cacheControl))
  })

  // Don't cache dynamic resources
  router.use(noCache())

  return router
}
