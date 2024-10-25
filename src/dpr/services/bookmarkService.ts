import UserStoreService from './userStoreService'
import UserDataStore from '../data/userDataStore'
import { ReportType } from '../types/UserReports'

export default class BookmarkService extends UserStoreService {
  constructor(userDataStore: UserDataStore) {
    super(userDataStore)
  }

  async getAllBookmarks(userId: string) {
    const userConfig = await this.getState(userId)
    return userConfig.bookmarks
  }

  async addBookmark(userId: string, reportId: string, id: string, type?: ReportType) {
    const userConfig = await this.getState(userId)
    const reportType = type || ReportType.REPORT
    if (
      !userConfig.bookmarks.some((bookmark) => {
        return bookmark.variantId === id || bookmark.id === id
      })
    )
      userConfig.bookmarks.unshift({ reportId, id, reportType })
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
    return userConfig.bookmarks.some((bookmark) => {
      return bookmark.variantId === id || bookmark.id === id
    })
  }

  async createBookMarkToggleHtml(userId: string, reportId: string, id: string, csrfToken: string, uniqid: string) {
    const userConfig = await this.getState(userId)
    const checked = userConfig.bookmarks.some((bookmark) => {
      return bookmark.variantId === id || bookmark.id === id
    })
      ? 'checked'
      : null
    const tooltip = !checked ? 'Add Bookmark' : 'Remove Bookmark'
    return `<div class='dpr-bookmark dpr-bookmark-table' data-dpr-module="bookmark-toggle">
  <input class="bookmark-input" aria-label="bookmark toggle" type='checkbox' id='${reportId}-${id}-${uniqid}' data-report-id='${reportId}' data-variant-id='${id}' data-csrf-token='${csrfToken}' ${checked} />
  <label id="${id}-${reportId}-${uniqid}-bookmark-label" for='${reportId}-${id}-${uniqid}'><span class="dpr-bookmark-label govuk-body-xs">${tooltip}</span></label>
</div>`
  }
}
