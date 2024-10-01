import UserStoreService from './userStoreService'
import UserDataStore from '../data/userDataStore'
import { BookmarkStoreData } from '../types/Bookmark'

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
    if (!this.isBookmarked(variantId, userConfig.bookmarks)) userConfig.bookmarks.unshift({ reportId, variantId })
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

  isBookmarked = (variantId: string, bookmarks: BookmarkStoreData[]) => {
    return bookmarks.some((bookmark) => bookmark.variantId === variantId)
  }

  async createBookMarkToggleHtml(userId: string, reportId: string, variantId: string, csrfToken: string, id: string) {
    const userConfig = await this.getState(userId)
    const checked = this.isBookmarked(variantId, userConfig.bookmarks) ? 'checked' : null
    const tooltip = !checked ? 'Add Bookmark' : 'Remove Bookmark'
    return `<div class='dpr-bookmark dpr-bookmark-tooltip dpr-bookmark-table' tooltip="${tooltip}" data-dpr-module="bookmark-toggle">
  <input class="bookmark-input" aria-label="bookmark toggle" type='checkbox' id='${reportId}-${variantId}-${id}' data-report-id='${reportId}' data-variant-id='${variantId}' data-csrf-token='${csrfToken}' ${checked} />
  <label id="${variantId}-${reportId}-${id}-bookmark-label" for='${reportId}-${variantId}-${id}'><span class="dpr-visually-hidden">Bookmark toggle</span></label>
</div>`
  }
}
