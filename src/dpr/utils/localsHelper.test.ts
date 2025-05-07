import { Response, Request } from 'express'
import LocalsHelper from './localsHelper'
import { StoredReportData } from '../types/UserReports'
import { BookmarkStoreData } from '../types/Bookmark'
import { components } from '../types/api'

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
        pathSuffix: '',
        routePrefix: '',
        recentlyViewedReports: [] as StoredReportData[],
        requestedReports: [] as StoredReportData[],
        bookmarks: [] as BookmarkStoreData[],
        definitions: [] as components['schemas']['ReportDefinitionSummary'][],
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
