import UserStoreService from './userStoreService'
import UserDataStore from '../data/userDataStore'
import { BookmarkStoreData } from '../types/Bookmark'

export default class BookmarkService extends UserStoreService {
  bookmarks: BookmarkStoreData[]

  constructor(userDataStore: UserDataStore) {
    super(userDataStore)
  }

  async getBookmarkState() {
    await this.getState()
    this.bookmarks = this.userConfig.bookmarks
  }

  async saveBookmarkState() {
    this.userConfig.bookmarks = this.bookmarks
    await this.saveState()
  }

  async getBookmark(id: string) {
    await this.getBookmarkState()
    return this.bookmarks.find((report) => report.variantId === id)
  }

  async getAllBookmarks() {
    await this.getBookmarkState()
    return this.bookmarks
  }

  async addBookmark(reportId: string, variantId: string) {
    await this.getBookmarkState()
    if (!this.isBookmarked(variantId)) this.bookmarks.unshift({ reportId, variantId })
    await this.saveBookmarkState()
  }

  async removeBookmark(variantId: string) {
    await this.getBookmarkState()
    const index = this.bookmarks.findIndex((bookmark) => bookmark.variantId === variantId)
    if (index >= 0) {
      this.bookmarks.splice(index, 1)
    }
    await this.saveBookmarkState()
  }

  async bumpBookmark(reportId: string, variantId: string) {
    await this.getBookmarkState()
    if (this.isBookmarked(variantId)) {
      await this.removeBookmark(variantId)
      await this.addBookmark(reportId, variantId)
    }
  }

  isBookmarked = (variantId: string) => {
    return this.bookmarks.filter((bookmark) => bookmark.variantId === variantId).length > 0
  }

  createBookMarkToggleHtml(reportId: string, variantId: string, csrfToken: string, id: string) {
    const checked = this.isBookmarked(variantId) ? 'checked' : null
    const tooltip = !checked ? 'Add Bookmark' : 'Remove Bookmark'
    return `<div class='dpr-bookmark dpr-bookmark-tooltip dpr-bookmark-table' tooltip="${tooltip}">
  <input class="bookmark-input" aria-label="bookmark toggle" type='checkbox' id='${variantId}-${id}' data-report-id='${reportId}' data-variant-id='${variantId}' data-csrf-token='${csrfToken}' ${checked} />
  <label id="${variantId}-${reportId}-bookmark-label" for='${variantId}-${id}'></label>
</div>`
  }
}
