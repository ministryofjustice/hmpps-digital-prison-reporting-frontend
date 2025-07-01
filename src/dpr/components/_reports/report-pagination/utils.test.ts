import { Url } from 'url'
import type { Request } from 'express'
import PaginationUtils from './utils'

describe('PaginationUtils', () => {
  describe('getPaginationData', () => {
    it('should create the pagination data to default values', () => {
      const req: Request = {
        originalUrl: 'originalUrl?someOtherParam=blue',
      } as unknown as Request

      const search = `?someOtherParam=blue`
      const url = {
        search,
      } as unknown as Url
      const totalRows = 200

      const expectedPages = [
        {
          number: 1,
          href: 'originalUrl?someOtherParam=blue&selectedPage=1',
          current: true,
        },
        {
          number: 2,
          href: 'originalUrl?someOtherParam=blue&selectedPage=2',
          current: false,
        },
        { ellipsis: true },
        {
          number: 10,
          href: 'originalUrl?someOtherParam=blue&selectedPage=10',
          current: false,
        },
      ]

      const result = PaginationUtils.getPaginationData(url, totalRows, req)

      expect(result.pageSize).toEqual(20)
      expect(result.currentPage).toEqual(1)
      expect(result.totalRows).toEqual(200)
      expect(result.next).toEqual('originalUrl?someOtherParam=blue&selectedPage=2')
      expect(result.prev).toBeUndefined()
      expect(result.pages).toEqual(expectedPages)
    })

    it('should create the pagination data when query param is set', () => {
      const req: Request = {
        originalUrl: 'originalUrl?selectedPage=3&pageSize=50',
      } as unknown as Request
      const search = `?selectedPage=3&pageSize=50`
      const totalRows = 1000
      const url = {
        search,
      } as unknown as Url

      const expectedPages = [
        {
          number: 1,
          href: 'originalUrl?selectedPage=1&pageSize=50',
          current: false,
        },
        {
          number: 2,
          href: 'originalUrl?selectedPage=2&pageSize=50',
          current: false,
        },
        {
          number: 3,
          href: 'originalUrl?selectedPage=3&pageSize=50',
          current: true,
        },
        {
          number: 4,
          href: 'originalUrl?selectedPage=4&pageSize=50',
          current: false,
        },
        { ellipsis: true },
        {
          number: 20,
          href: 'originalUrl?selectedPage=20&pageSize=50',
          current: false,
        },
      ]

      const result = PaginationUtils.getPaginationData(url, totalRows, req)

      expect(result.pageSize).toEqual(50)
      expect(result.currentPage).toEqual(3)
      expect(result.totalRows).toEqual(1000)
      expect(result.next).toEqual('originalUrl?selectedPage=4&pageSize=50')
      expect(result.prev).toEqual('originalUrl?selectedPage=2&pageSize=50')
      expect(result.pages).toEqual(expectedPages)
    })
  })
})
