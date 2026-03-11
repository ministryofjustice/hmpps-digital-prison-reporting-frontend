import { RequestHandler } from 'express'

export const setupNestedRoute = (): RequestHandler => {
  return async (req, res, next) => {
    if (req.baseUrl && req.baseUrl.length) {
      res.locals['nestedBaseUrl'] = req.baseUrl
    }
    next()
  }
}

export default setupNestedRoute
