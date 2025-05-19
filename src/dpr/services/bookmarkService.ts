import ReportStoreService from './reportStoreService'
import ReportDataStore from '../data/reportDataStore'
import { ReportType } from '../types/UserReports'
import { ReportStoreConfig } from '../types/ReportStore'
import logger from '../utils/logger'

export default class BookmarkService extends ReportStoreService {
  bookmarksInitialised: boolean

  constructor(reportDataStore: ReportDataStore) {
    super(reportDataStore)
    logger.info('Service created: BookmarkService')
  }

  async getAllBookmarks(userId: string) {
    const userConfig = await this.getState(userId)
    return userConfig.bookmarks.filter((bookmark) => !bookmark.softRemoved)
  }

  /**
   * Add a bookmark
   *
   * @param {string} userId
   * @param {string} reportId
   * @param {string} id
   * @param {ReportType} type
   * @param {boolean} [automatic=false] states whether a bookmark was manaully, or automatically added.
   * @memberof BookmarkService
   */
  async addBookmark(userId: string, reportId: string, id: string, type: ReportType, automatic = false) {
    const userConfig = await this.getState(userId)
    const bookmark = this.getBookmark(userConfig, id)
    if (!bookmark) {
      // Bookmark not found, add it
      userConfig.bookmarks.unshift({ reportId, id, type, automatic })
    } else {
      if (bookmark.autoRemoved) {
        // re-instate the removed automatic bookmark
        const index = this.getBookmarkIndex(userConfig, id)
        bookmark.autoRemoved = false
        userConfig.bookmarks[index] = bookmark
      }
      if (bookmark.softRemoved) {
        // re-added manually. remove automatic bookmark, add manual one
        this.removeBookmarkPermanently(userConfig, id)
        userConfig.bookmarks.unshift({ reportId, id, type, automatic })
      }
    }
    await this.saveState(userId, userConfig)
  }

  /**
   * Removes the bookmark permanently, regardless of manual or automatic addition
   *
   * @param {ReportStoreConfig} userConfig
   * @param {string} id
   * @memberof BookmarkService
   */
  async removeBookmarkPermanently(userConfig: ReportStoreConfig, id: string) {
    const index = this.getBookmarkIndex(userConfig, id)
    if (index >= 0) {
      userConfig.bookmarks.splice(index, 1)
    }
  }

  /**
   * Manually remove a bookmark
   *
   * @param {string} userId
   * @param {string} id
   * @memberof BookmarkService
   */
  async removeBookmark(userId: string, id: string) {
    const userConfig = await this.getState(userId)
    const index = this.getBookmarkIndex(userConfig, id)

    if (index >= 0) {
      const bookmark = userConfig.bookmarks[index]
      if (!bookmark.automatic) {
        // added manually, remove it
        userConfig.bookmarks.splice(index, 1)
      } else {
        //
        userConfig.bookmarks[index].softRemoved = true
      }
    }
    await this.saveState(userId, userConfig)
  }

  async autoRemoveAllAutomaticBookmarks(userId: string) {
    const userConfig = await this.getState(userId)
    userConfig.bookmarks = userConfig.bookmarks.map((bookmark) => {
      if (bookmark.automatic) {
        // eslint-disable-next-line no-param-reassign
        bookmark.autoRemoved = true
      }
      return bookmark
    })
    await this.saveState(userId, userConfig)
  }

  getBookmark = (userConfig: ReportStoreConfig, id: string) => {
    return userConfig.bookmarks.find((bookmark) => {
      return bookmark.variantId === id || bookmark.id === id
    })
  }

  getBookmarkIndex = (userConfig: ReportStoreConfig, id: string) => {
    return userConfig.bookmarks.findIndex((bookmark) => {
      return bookmark.variantId === id || bookmark.id === id
    })
  }

  isBookmarked = async (id: string, userId: string) => {
    const userConfig = await this.getState(userId)
    return this.isBookmarkedCheck(userConfig, id)
  }

  isBookmarkedCheck = (userConfig: ReportStoreConfig, id: string) => {
    return userConfig.bookmarks.some((bookmark) => {
      return (bookmark.variantId === id || bookmark.id === id) && !bookmark.softRemoved
    })
  }

  async createBookMarkToggleHtml({
    userId,
    reportId,
    id,
    csrfToken,
    ctxId,
    reportType,
  }: {
    userId: string
    reportId: string
    id: string
    csrfToken: string
    ctxId: string
    reportType: ReportType
  }) {
    const userConfig = await this.getState(userId)
    const checked = this.isBookmarkedCheck(userConfig, id) ? 'checked' : null
    const tooltip = !checked ? 'Add bookmark' : 'Remove bookmark'

    return `<div class='dpr-bookmark dpr-bookmark-table' data-dpr-module="bookmark-toggle">
  <input class="bookmark-input" aria-label="bookmark toggle" type='checkbox' id='${reportId}-${id}-${ctxId}' data-report-id='${reportId}' data-id='${id}' data-report-type='${reportType}' data-csrf-token='${csrfToken}' ${checked} />
  <label id="${id}-${reportId}-${ctxId}-bookmark-label" for='${reportId}-${id}-${ctxId}'><span class="dpr-bookmark-label govuk-body-s">${tooltip}</span></label>
</div>`
  }
}
