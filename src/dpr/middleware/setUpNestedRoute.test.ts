import { expect, jest, describe, test } from '@jest/globals'
import { Response, Request } from 'express'
import { setupNestedRoute } from './setUpNestedRoute'

jest.mock('../utils/logger', () => ({
  info: jest.fn(),
}))

describe('setupNestedRoute middleware', () => {
  let req: Request
  let res: Response
  let next: jest.Mock

  beforeEach(() => {
    req = { baseUrl: '', originalUrl: '' } as unknown as Request
    res = { app: { locals: { dprPaths: { bookmarkActionEndpoint: '/tests/path' } } } } as unknown as Response
    next = jest.fn()
  })

  test('does NOT set nestedBaseUrl when req.baseUrl is empty', async () => {
    const middleware = setupNestedRoute()

    await middleware(req, res, next)

    expect(res.app.locals.dprPaths.nestedBaseUrl).toBeUndefined()
    expect(res.app.locals.dprPaths.bookmarkActionEndpoint).toEqual('/tests/path')
    expect(next).toHaveBeenCalled()
  })

  test('does NOT set nestedBaseUrl when req.baseUrl is undefined', async () => {
    req.baseUrl = undefined as unknown as string

    const middleware = setupNestedRoute()

    await middleware(req, res, next)

    expect(res.app.locals.dprPaths.nestedBaseUrl).toBeUndefined()
    expect(res.app.locals.dprPaths.bookmarkActionEndpoint).toEqual('/tests/path')
    expect(next).toHaveBeenCalled()
  })

  test('sets nestedBaseUrl when req.baseUrl is a non-empty string', async () => {
    req.baseUrl = '/api'

    const middleware = setupNestedRoute()

    await middleware(req, res, next)

    expect(res.app.locals.dprPaths.nestedBaseUrl).toBe('/api')
    expect(res.app.locals.dprPaths.bookmarkActionEndpoint).toEqual('/api/tests/path')
    expect(next).toHaveBeenCalled()
  })

  test('sets nestedBaseUrl for deeper nested paths', async () => {
    req.baseUrl = '/api/v1/accounts'

    const middleware = setupNestedRoute()

    await middleware(req, res, next)

    expect(res.app.locals.dprPaths.nestedBaseUrl).toBe('/api/v1/accounts')
    expect(res.app.locals.dprPaths.bookmarkActionEndpoint).toEqual('/api/v1/accounts/tests/path')
    expect(next).toHaveBeenCalled()
  })

  test('sets nestedBaseUrl for nested paths, when on the same route stream', async () => {
    req.baseUrl = '/api/v1/accounts'
    req.originalUrl = '/api/v1/accounts/post/nesting/routes'

    const middleware = setupNestedRoute()

    await middleware(req, res, next)

    expect(res.app.locals.dprPaths.nestedBaseUrl).toBe('/api/v1/accounts')
    expect(res.app.locals.dprPaths.bookmarkActionEndpoint).toEqual('/api/v1/accounts/tests/path')
    expect(next).toHaveBeenCalled()
  })
})
