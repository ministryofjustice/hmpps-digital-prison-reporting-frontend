import { RequestHandler } from 'express'

export default (): RequestHandler => {
  return async (req, res, next) => {
    try {
      const uuid = 'userId'
      const activeCaseLoadId = 'KMI'
      const token = 'mockToken'

      res.locals.user = {
        displayName: 'Test User',
        email: 'test@user.com',
      }

      res.locals.dprContext = {
        uuid,
        activeCaseLoadId,
        token,
      }

      return next()
    } catch (error) {
      return next(error)
    }
  }
}
