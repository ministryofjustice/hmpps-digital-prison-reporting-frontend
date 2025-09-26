/* eslint-disable @typescript-eslint/no-explicit-any */
import BookmarkService from './service'
import type ReportDataStore from '../../../../data/reportDataStore'
import { MockUserStoreService } from '../../../../../../test-app/mocks/mockClients/store/mockRedisStore'
import { ReportStoreConfig } from '../../../../types/ReportStore'
import { ReportType } from '../../../../types/UserReports'
import { BookmarkStoreData } from '../../../../types/Bookmark'

describe('BookmarkService', () => {
  const mockUserStore: ReportDataStore = new MockUserStoreService() as unknown as ReportDataStore
  const bookmarkService: BookmarkService = new BookmarkService(mockUserStore)

  let saveStateSpy: jest.SpyInstance<Promise<void>, [userId: string, userConfig: ReportStoreConfig], any>
  const mockDate = new Date(1466424490000)
  jest.spyOn(global, 'Date').mockImplementation(() => mockDate)

  let bm1: BookmarkStoreData
  let bm2: BookmarkStoreData
  let bm3: BookmarkStoreData

  beforeEach(() => {
    bm1 = {
      reportId: 'reportId',
      variantId: 'variantId',
      type: ReportType.REPORT,
    }

    bm2 = {
      reportId: 'reportId',
      id: 'just-id',
      type: ReportType.REPORT,
    }

    bm3 = {
      reportId: 'reportId',
      id: 'dashboard-id',
      type: ReportType.DASHBOARD,
    }

    jest.spyOn(bookmarkService, 'getState').mockResolvedValue({
      bookmarks: [bm1, bm2, bm3],
    } as unknown as ReportStoreConfig)

    saveStateSpy = jest.spyOn(bookmarkService, 'saveState')
  })

  describe('getAllBookmarks', () => {
    it('should get all bookmarks', async () => {
      const res = await bookmarkService.getAllBookmarks('userId')

      expect(res.length).toEqual(3)
      expect(res[0]).toEqual(bm1)
      expect(res[1]).toEqual(bm2)
      expect(res[2]).toEqual(bm3)
    })
  })

  describe('addBookmark', () => {
    it('should not add a bookmark if already bookmarked, with variantId', async () => {
      await bookmarkService.addBookmark('userId', 'reportId', 'variantId', ReportType.REPORT)

      const userCongfig = {
        bookmarks: [bm1, bm2, bm3],
      } as unknown as ReportStoreConfig

      expect(saveStateSpy).toHaveBeenCalledWith('userId', userCongfig)
    })

    it('should not add a bookmark if already bookmarked, with id', async () => {
      await bookmarkService.addBookmark('userId', 'reportId', 'just-id', ReportType.DASHBOARD)

      const userCongfig = {
        bookmarks: [bm1, bm2, bm3],
      } as unknown as ReportStoreConfig

      expect(saveStateSpy).toHaveBeenCalledWith('userId', userCongfig)
    })
  })

  describe('createBookMarkToggleHtml', () => {
    it('should return a bookmarkToggle Component', async () => {
      const res = await bookmarkService.createBookMarkToggleHtml({
        userId: 'userId',
        reportId: 'report-id',
        id: 'variant-id',
        csrfToken: 'csrfToken',
        ctxId: 'context-id',
        reportType: ReportType.REPORT,
      })

      expect(res).toEqual(`<button class='dpr-bookmark dpr-bookmark-table' data-dpr-module='bookmark-toggle'>
  <input class='bookmark-input' type='checkbox' id='report-id-variant-id-context-id' data-report-id='report-id' data-id='variant-id' data-report-type='report' data-csrf-token='csrfToken' null />
  <label tabindex='0' id='variant-id-report-id-context-id-bookmark-label' for='report-id-variant-id-context-id'><span class='dpr-bookmark-label govuk-body-s'>Add bookmark</span></label>
</button>`)
    })
  })
})
