import ReportStoreService from './reportStoreService'
import ReportDataStore from '../data/reportDataStore'
import { ReportType } from '../types/UserReports'
import { ReportStoreConfig } from '../types/ReportStore'

export default class BookmarkService extends ReportStoreService {
  constructor(reportDataStore: ReportDataStore) {
    super(reportDataStore)
  }

  async getAllBookmarks(userId: string) {
    const userConfig = await this.getState(userId)
    return userConfig.bookmarks
  }

  async addBookmark(userId: string, reportId: string, id: string, type: ReportType) {
    const userConfig = await this.getState(userId)
    if (!this.isBookmarkedCheck(userConfig, id)) {
      userConfig.bookmarks.unshift({ reportId, id, type })
    }
    await this.saveState(userId, userConfig)
  }

  async removeBookmark(userId: string, id: string) {
    const userConfig = await this.getState(userId)
    const index = userConfig.bookmarks.findIndex((bookmark) => {
      return bookmark.variantId === id || bookmark.id === id
    })
    if (index >= 0) {
      userConfig.bookmarks.splice(index, 1)
    }
    await this.saveState(userId, userConfig)
  }

  isBookmarked = async (id: string, userId: string) => {
    const userConfig = await this.getState(userId)
    return this.isBookmarkedCheck(userConfig, id)
  }

  isBookmarkedCheck = (userConfig: ReportStoreConfig, id: string) => {
    return userConfig.bookmarks.some((bookmark) => {
      return bookmark.variantId === id || bookmark.id === id
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
