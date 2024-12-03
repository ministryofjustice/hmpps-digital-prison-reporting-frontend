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
    it('should get the local values', () => {
      const values = LocalsHelper.getValues(res)

      const expected = {
        csrfToken: 'csrfTokenValue',
        userId: 'userIdValue',
        token: 'token',
      }
      expect(values).toEqual(expected)
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
