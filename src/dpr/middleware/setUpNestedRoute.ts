import { RequestHandler } from 'express'

export default (): RequestHandler => {
  return async (req, res, next) => {
    res.locals.nestedBaseUrl = req.baseUrl
    next()
  }
}
