import { ErrorRequestHandler, NextFunction, Request, Response, Router } from 'express'
import { captureException } from '@sentry/node'
import { HTTPError } from 'superagent'
import type { Services } from '../types/Services'
import logger from '../utils/logger'
import JourneyRoutes from './journeys/routes'
// middleware
import setUpNestedRoute from '../middleware/setUpNestedRoute'

export const errorRequestHandler =
  (layoutPath: string): ErrorRequestHandler =>
  (error: HTTPError, _req: Request, res: Response, next: NextFunction) => {
    if (error.status === 401 || error.status === 403) {
      return res.render('dpr/routes/authError.njk', {
        layoutPath,
        message: 'Sorry, there is a problem with authenticating your request',
      })
    }
    captureException(error)
    if (error.status >= 400) {
      return res.render('dpr/routes/serviceProblem.njk', {
        layoutPath,
      })
    }
    return next(error)
  }

export function routes(routeImportParams: { services: Services; layoutPath: string }): Router {
  logger.info('Initialiasing DPR routes...')
  const router = Router({ mergeParams: true })

  router.get('/', (_req, _res, next) => next())
  router.use(
    '/',
    setUpNestedRoute(),
    JourneyRoutes(routeImportParams),
    errorRequestHandler(routeImportParams.layoutPath),
  )

  return router
}

export default routes
