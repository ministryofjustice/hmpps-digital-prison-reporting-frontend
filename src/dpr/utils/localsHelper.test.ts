import { Response, Request } from 'express'
import LocalsHelper from './localsHelper'

describe('LocalsHelper', () => {
  let res: Response
  let req: Request

  beforeEach(() => {
    res = {
      locals: {
        csrfToken: 'csrfTokenValue',
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
    it('should set the user from the dprUser locals', () => {
      res.locals.dprUser = {
        token: 'userToken',
        id: 'dprUserId',
        activeCaseLoadId: 'MDI',
        staffId: 123456,
        emailAddress: 'test@user.com',
        displayName: 'Test User',
      }

      const values = LocalsHelper.getValues(res)

      expect(values).toEqual(
        expect.objectContaining({
          token: 'userToken',
          dprUser: {
            id: 'dprUserId',
            token: 'userToken',
            activeCaseLoadId: 'MDI',
            email: 'test@user.com',
            displayName: 'Test User',
            staffId: 123456,
          },
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
