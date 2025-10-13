import ReportStoreService from '../../../../services/reportStoreService'
import ReportDataStore from '../../../../data/reportDataStore'
import { ReportType } from '../../../../types/UserReports'
import { ReportStoreConfig } from '../../../../types/ReportStore'
import logger from '../../../../utils/logger'

export default class BookmarkService extends ReportStoreService {
  constructor(reportDataStore: ReportDataStore) {
    super(reportDataStore)
    logger.info('Service created: BookmarkService')
  }

  async getAllBookmarks(userId: string) {
    const userConfig = await this.getState(userId)
    return userConfig.bookmarks
  }

  async addBookmark(userId: string, reportId: string, id: string, type: ReportType, automatic?: boolean) {
    const userConfig = await this.getState(userId)
    if (!this.isBookmarkedCheck(userConfig, id, reportId)) {
      userConfig.bookmarks.unshift({ reportId, id, type, automatic })
    }
    await this.saveState(userId, userConfig)
  }

  async removeBookmark(userId: string, id: string, reportId: string) {
    const userConfig = await this.getState(userId)
    const index = userConfig.bookmarks.findIndex((bookmark) => {
      const bmVarId = bookmark.variantId || bookmark.id
      return bmVarId === id && bookmark.reportId === reportId
    })
    if (index >= 0) {
      userConfig.bookmarks.splice(index, 1)
    }
    await this.saveState(userId, userConfig)
  }

  isBookmarked = async (id: string, reportId: string, userId: string) => {
    const userConfig = await this.getState(userId)
    const isBookmarked = this.isBookmarkedCheck(userConfig, id, reportId)
    let bookmark
    if (isBookmarked) {
      bookmark = this.getBookmark(userConfig, id, reportId)
    }
    return bookmark?.automatic ? undefined : isBookmarked
  }

  isBookmarkedCheck = (userConfig: ReportStoreConfig, id: string, reportId: string) => {
    return userConfig.bookmarks.some((bookmark) => {
      const bmVarId = bookmark.variantId || bookmark.id
      return bmVarId === id && bookmark.reportId === reportId
    })
  }

  getBookmark = (userConfig: ReportStoreConfig, id: string, reportId: string) => {
    return userConfig.bookmarks.find((bookmark) => {
      const bmVarId = bookmark.variantId || bookmark.id
      return bmVarId === id && bookmark.reportId === reportId
    })
  }

  isAutomatic = async (userId: string, id: string, reportId: string) => {
    const userConfig = await this.getState(userId)
    const bookmark = this.getBookmark(userConfig, id, reportId)
    return bookmark?.automatic
  }

  async createBookMarkToggleHtml({
    userConfig,
    reportId,
    id,
    csrfToken,
    ctxId,
    reportType,
  }: {
    userConfig: ReportStoreConfig
    reportId: string
    id: string
    csrfToken: string
    ctxId: string
    reportType: ReportType
  }) {
    if (!userConfig?.bookmarks) return ''
    const bookmark = this.getBookmark(userConfig, id, reportId)
    let tooltip = 'Add bookmark'
    let automatic = false
    const checked = Boolean(bookmark)
    if (bookmark) {
      tooltip = 'Remove bookmark'
      automatic = bookmark.automatic
    }

    return automatic
      ? ''
      : `<button class='dpr-bookmark dpr-bookmark-table' data-dpr-module='bookmark-toggle'>
  <input class='bookmark-input' type='checkbox' id='${reportId}-${id}-${ctxId}' data-report-id='${reportId}' data-id='${id}' data-report-type='${reportType}' data-csrf-token='${csrfToken}' ${checked} />
  <label tabindex='0' id='${id}-${reportId}-${ctxId}-bookmark-label' for='${reportId}-${id}-${ctxId}'><span class='dpr-bookmark-label govuk-body-s'>${tooltip}</span></label>
</button>`
  }
}
