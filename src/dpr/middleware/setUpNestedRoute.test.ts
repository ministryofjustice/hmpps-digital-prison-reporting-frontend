import { expect, jest } from '@jest/globals'
import { Response, Request } from 'express'
import { setupNestedRoute } from './setUpNestedRoute'

describe('setupNestedRoute middleware', () => {
  let req: Request
  let res: Response
  let next: jest.Mock

  beforeEach(() => {
    req = { baseUrl: '' } as unknown as Request
    res = { app: { locals: {} } } as unknown as Response
    next = jest.fn()
  })

  test('does NOT set nestedBaseUrl when req.baseUrl is empty', async () => {
    const middleware = setupNestedRoute()

    await middleware(req, res, next)

    expect(res.app.locals.nestedBaseUrl).toBeUndefined()
    expect(next).toHaveBeenCalled()
  })

  test('does NOT set nestedBaseUrl when req.baseUrl is undefined', async () => {
    req.baseUrl = undefined as unknown as string

    const middleware = setupNestedRoute()

    await middleware(req, res, next)

    expect(res.app.locals.nestedBaseUrl).toBeUndefined()
    expect(next).toHaveBeenCalled()
  })

  test('sets nestedBaseUrl when req.baseUrl is a non-empty string', async () => {
    req.baseUrl = '/api'

    const middleware = setupNestedRoute()

    await middleware(req, res, next)

    expect(res.app.locals.nestedBaseUrl).toBe('/api')
    expect(next).toHaveBeenCalled()
  })

  test('sets nestedBaseUrl for deeper nested paths', async () => {
    req.baseUrl = '/api/v1/accounts'

    const middleware = setupNestedRoute()

    await middleware(req, res, next)

    expect(res.app.locals.nestedBaseUrl).toBe('/api/v1/accounts')
    expect(next).toHaveBeenCalled()
  })
})
