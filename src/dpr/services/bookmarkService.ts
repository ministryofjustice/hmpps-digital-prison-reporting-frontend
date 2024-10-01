import UserStoreService from './userStoreService'
import UserDataStore from '../data/userDataStore'

export default class BookmarkService extends UserStoreService {
  constructor(userDataStore: UserDataStore) {
    super(userDataStore)
  }

  async getAllBookmarks(userId: string) {
    const userConfig = await this.getState(userId)
    return userConfig.bookmarks
  }

  async addBookmark(userId: string, reportId: string, variantId: string) {
    const userConfig = await this.getState(userId)
    if (!userConfig.bookmarks.some((bookmark) => bookmark.variantId === variantId)) userConfig.bookmarks.unshift({ reportId, variantId })
    await this.saveState(userId, userConfig)
  }

  async removeBookmark(userId: string, variantId: string) {
    const userConfig = await this.getState(userId)
    const index = userConfig.bookmarks.findIndex((bookmark) => bookmark.variantId === variantId)
    if (index >= 0) {
      userConfig.bookmarks.splice(index, 1)
    }
    await this.saveState(userId, userConfig)
  }

  isBookmarked = async (variantId: string, userId: string) => {
    const userConfig = await this.getState(userId)
    return userConfig.bookmarks.some((bookmark) => bookmark.variantId === variantId)
  }

  async createBookMarkToggleHtml(userId: string, reportId: string, variantId: string, csrfToken: string, id: string) {
    const userConfig = await this.getState(userId)
    const checked = userConfig.bookmarks.some((bookmark) => bookmark.variantId === variantId) ? 'checked' : null
    const tooltip = !checked ? 'Add Bookmark' : 'Remove Bookmark'
    return `<div class='dpr-bookmark dpr-bookmark-tooltip dpr-bookmark-table' tooltip="${tooltip}" data-dpr-module="bookmark-toggle">
  <input class="bookmark-input" aria-label="bookmark toggle" type='checkbox' id='${reportId}-${variantId}-${id}' data-report-id='${reportId}' data-variant-id='${variantId}' data-csrf-token='${csrfToken}' ${checked} />
  <label id="${variantId}-${reportId}-${id}-bookmark-label" for='${reportId}-${variantId}-${id}'><span class="dpr-visually-hidden">Bookmark toggle</span></label>
</div>`
  }
}
