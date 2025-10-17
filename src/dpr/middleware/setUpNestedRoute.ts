import { RequestHandler } from 'express'

export const setupNestedRoute = (): RequestHandler => {
  return async (req, res, next) => {
    res.locals.nestedBaseUrl = req.baseUrl
    next()
  }
}

export default setupNestedRoute