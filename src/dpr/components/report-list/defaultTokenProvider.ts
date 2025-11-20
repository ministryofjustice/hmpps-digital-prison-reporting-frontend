import { NextFunction, Request, Response } from 'express'

export const setupDefaultToken = (_request: Request, response: Response, next: NextFunction): string | null => {
  if (response.locals['user'] && response.locals['user'].token) {
    return response.locals['user'].token
  }
  next('Could not find user token in response.locals.user.token')
  return null
}

export default setupDefaultToken
