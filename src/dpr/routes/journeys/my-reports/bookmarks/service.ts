import ReportStoreService from '../../../../services/reportStoreService'
import ReportDataStore from '../../../../data/reportDataStore'
import { ReportType } from '../../../../types/UserReports'
import { ReportStoreConfig } from '../../../../types/ReportStore'
import logger from '../../../../utils/logger'

export default class BookmarkService extends ReportStoreService {
  bookmarksInitialised: boolean

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
    const checked = this.isBookmarkedCheck(userConfig, id, reportId) ? 'checked' : null

    let tooltip = 'Add bookmark'
    let automatic = false
    if (checked) {
      tooltip = 'Remove bookmark'
      const bookmark = this.getBookmark(userConfig, id, reportId)
      automatic = bookmark.automatic
    }

    return automatic
      ? ''
      : `<div class='dpr-bookmark dpr-bookmark-table' data-dpr-module="bookmark-toggle">
  <input class="bookmark-input" aria-label="bookmark toggle" type='checkbox' id='${reportId}-${id}-${ctxId}' data-report-id='${reportId}' data-id='${id}' data-report-type='${reportType}' data-csrf-token='${csrfToken}' ${checked} />
  <label id="${id}-${reportId}-${ctxId}-bookmark-label" for='${reportId}-${id}-${ctxId}'><span class="dpr-bookmark-label govuk-body-s">${tooltip}</span></label>
</div>`
  }
}
