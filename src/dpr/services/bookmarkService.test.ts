/* eslint-disable @typescript-eslint/no-explicit-any */
import BookmarkService from './bookmarkService'
import type UserDataStore from '../data/userDataStore'
import MockUserStoreService from '../../../test-app/mocks/mockClients/store/mockRedisStore'
import { UserStoreConfig } from '../types/UserStore'
import { ReportType } from '../types/UserReports'
import { BookmarkStoreData } from '../types/Bookmark'

describe('RequestedReportService', () => {
  const mockUserStore: UserDataStore = new MockUserStoreService() as unknown as UserDataStore
  const bookmarkService: BookmarkService = new BookmarkService(mockUserStore)

  let saveStateSpy: jest.SpyInstance<Promise<void>, [userId: string, userConfig: UserStoreConfig], any>
  const mockDate = new Date(1466424490000)
  jest.spyOn(global, 'Date').mockImplementation(() => mockDate)

  let bm1: BookmarkStoreData
  let bm2: BookmarkStoreData
  let bm3: BookmarkStoreData

  beforeEach(() => {
    bm1 = {
      reportId: 'reportId',
      variantId: 'variantId',
      reportType: ReportType.REPORT,
    }

    bm2 = {
      reportId: 'reportId',
      id: 'just-id',
      reportType: ReportType.REPORT,
    }

    bm3 = {
      reportId: 'reportId',
      id: 'dashboard-id',
      reportType: ReportType.DASHBOARD,
    }

    jest.spyOn(bookmarkService, 'getState').mockResolvedValue({
      bookmarks: [bm1, bm2, bm3],
    } as unknown as UserStoreConfig)

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
    it('should add a bookmark', async () => {
      await bookmarkService.addBookmark('userId', 'reportId', 'new-bm-id')

      const userCongfig = {
        bookmarks: [
          {
            reportId: 'reportId',
            id: 'new-bm-id',
            reportType: ReportType.REPORT,
          },
          bm1,
          bm2,
          bm3,
        ],
      } as unknown as UserStoreConfig

      expect(saveStateSpy).toHaveBeenCalledWith('userId', userCongfig)
    })

    it('should add a report bookmark', async () => {
      await bookmarkService.addBookmark('userId', 'reportId', 'new-report-bm-id', ReportType.REPORT)

      const userCongfig = {
        bookmarks: [
          {
            reportId: 'reportId',
            id: 'new-report-bm-id',
            reportType: ReportType.REPORT,
          },
          bm1,
          bm2,
          bm3,
        ],
      } as unknown as UserStoreConfig

      expect(saveStateSpy).toHaveBeenCalledWith('userId', userCongfig)
    })

    it('should add a dashboard bookmark', async () => {
      await bookmarkService.addBookmark('userId', 'reportId', 'new-dashboard-bm-id', ReportType.DASHBOARD)

      const userCongfig = {
        bookmarks: [
          {
            reportId: 'reportId',
            id: 'new-dashboard-bm-id',
            reportType: ReportType.DASHBOARD,
          },
          bm1,
          bm2,
          bm3,
        ],
      } as unknown as UserStoreConfig

      expect(saveStateSpy).toHaveBeenCalledWith('userId', userCongfig)
    })

    it('should not add a bookmark if already bookmarked, with variantId', async () => {
      await bookmarkService.addBookmark('userId', 'reportId', 'variantId')

      const userCongfig = {
        bookmarks: [bm1, bm2, bm3],
      } as unknown as UserStoreConfig

      expect(saveStateSpy).toHaveBeenCalledWith('userId', userCongfig)
    })

    it('should not add a bookmark if already bookmarked, with id', async () => {
      await bookmarkService.addBookmark('userId', 'reportId', 'just-id')

      const userCongfig = {
        bookmarks: [bm1, bm2, bm3],
      } as unknown as UserStoreConfig

      expect(saveStateSpy).toHaveBeenCalledWith('userId', userCongfig)
    })
  })

  describe('removeBookmark', () => {
    it('should remove a bookamrk with variantId', async () => {
      await bookmarkService.removeBookmark('userId', 'variantId')

      const userCongfig = {
        bookmarks: [bm2, bm3],
      } as unknown as UserStoreConfig

      expect(saveStateSpy).toHaveBeenCalledWith('userId', userCongfig)
    })

    it('should remove a bookmark with id', async () => {
      await bookmarkService.removeBookmark('userId', 'just-id')

      const userCongfig = {
        bookmarks: [bm1, bm3],
      } as unknown as UserStoreConfig

      expect(saveStateSpy).toHaveBeenCalledWith('userId', userCongfig)
    })
  })

  describe('isBookmarked', () => {
    it('should confirm an id is bookmarked', async () => {
      const res = await bookmarkService.isBookmarked('just-id', 'userId')
      expect(res).toBeTruthy()
    })

    it('should confirm an id is not bookmarked', async () => {
      const res = await bookmarkService.isBookmarked('new-id', 'userId')
      expect(res).toBeFalsy()
    })
  })

  describe('createBookMarkToggleHtml', () => {
    it('should return a bookmarkToggle Component', async () => {
      const res = await bookmarkService.createBookMarkToggleHtml(
        'userId',
        'report-id',
        'variant-id',
        'csrfToken',
        'unique-id',
      )

      expect(res).toEqual(`<div class='dpr-bookmark dpr-bookmark-table' data-dpr-module="bookmark-toggle">
  <input class="bookmark-input" aria-label="bookmark toggle" type='checkbox' id='report-id-variant-id-unique-id' data-report-id='report-id' data-variant-id='variant-id' data-csrf-token='csrfToken' null />
  <label id="variant-id-report-id-unique-id-bookmark-label" for='report-id-variant-id-unique-id'><span class="dpr-bookmark-label govuk-body-xs">Add Bookmark</span></label>
</div>`)
    })
  })
})
