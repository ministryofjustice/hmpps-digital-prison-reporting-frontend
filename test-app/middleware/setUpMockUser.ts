import { RequestHandler } from 'express'

export default (): RequestHandler => {
  return async (req, res, next) => {
    try {
      const uuid = 'userId'
      const activeCaseLoadId = 'KMI'

      res.locals.user = {
        displayName: 'Test User',
        email: 'test@user.com',
        uuid,
        activeCaseLoadId,
        token: 'token',
      }
      return next()
    } catch (error) {
      return next(error)
    }
  }
}
