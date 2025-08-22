import { Response, Request } from 'express'
import LocalsHelper from './localsHelper'

describe('LocalsHelper', () => {
  let res: Response
  let req: Request

  beforeEach(() => {
    res = {
      locals: {
        csrfToken: 'csrfTokenValue',
        user: {
          uuid: 'userIdValue',
        },
        token: 'token',
      },
    } as unknown as Response

    req = {
      query: {
        value1: 'value1',
        value2: 'value2',
      },
    } as unknown as Request
  })

  describe('getValues', () => {
    it('should set the user context from the user', () => {
      res.locals.user = {
        uuid: 'userIdValueOne',
        token: 'userToken',
        activeCaseLoadId: 'KMI',
      }
      const values = LocalsHelper.getValues(res)

      expect(values).toEqual(
        expect.objectContaining({
          userId: 'userIdValueOne',
          token: 'userToken',
          activeCaseLoadId: 'KMI',
        }),
      )
    })

    it('should set the user context from the dpr context', () => {
      res.locals.user = {
        uuid: 'userIdValue',
        token: 'userToken',
        activeCaseLoadId: 'KMI',
      }
      res.locals.dprContext = {
        uuid: 'dprContextIdValue',
        token: 'dprContextToken',
        activeCaseLoadId: 'MDI',
      }

      const values = LocalsHelper.getValues(res)

      expect(values).toEqual(
        expect.objectContaining({
          userId: 'dprContextIdValue',
          token: 'dprContextToken',
          activeCaseLoadId: 'MDI',
        }),
      )
    })
  })

  describe('setDdpPathToReqQuery', () => {
    it('should set the dpd path the the reqeust query', () => {
      const values = LocalsHelper.setDdpPathToReqQuery(req, '/one/two/three')
      expect(values).toEqual({
        value1: 'value1',
        value2: 'value2',
        dataProductDefinitionsPath: '/one/two/three',
      })
    })
  })
})
