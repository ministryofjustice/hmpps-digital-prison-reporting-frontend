import path from 'node:path'
import express, { type Router } from 'express'
import Dict = NodeJS.Dict

export default function setDPRResources(config: Dict<string>): Router {
  const router = express.Router()

  const cacheControl = { maxAge: config.staticResourceCacheDuration }

  function staticRoute(assetUrl: string, assetPath: string): void {
    router.use(
      assetUrl,
      express.static(path.join(process.cwd(), assetPath), {
        redirect: false,
        ...cacheControl,
      }),
    )
  }

  const staticResources = [
    {
      path: '/assets/dpr',
      location: '/node_modules/@ministryofjustice/hmpps-digital-prison-reporting-frontend/dpr/assets',
    },
    {
      path: '/assets/govuk/all.js',
      location: '/node_modules/govuk-frontend/dist/govuk/govuk-frontend.min.js',
    },
  ]

  staticResources.forEach((r) => {
    staticRoute(r.path, r.location)
  })

  return router
}
