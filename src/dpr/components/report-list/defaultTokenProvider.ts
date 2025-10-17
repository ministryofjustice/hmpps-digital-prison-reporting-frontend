import { NextFunction, Request, Response } from 'express'

export const setupDefaultToken = (request: Request, response: Response, next: NextFunction): string => {
  if (response.locals.user && response.locals.user.token) {
    return response.locals.user.token
  }
  next('Could not find user token in response.locals.user.token')
  return null
}

export default setupDefaultToken
