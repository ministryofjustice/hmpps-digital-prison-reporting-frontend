import UserStoreService from './userStoreService'
import UserDataStore from '../data/userDataStore'
import { BookmarkedReportData } from '../types/Bookmark'

export default class RecentlyViewedStoreService extends UserStoreService {
  bookmarks: BookmarkedReportData[]

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

  async addBookmark() {
    await this.getBookmarkState()
    //
    await this.saveBookmarkState()
  }

  async removeBookmark(id: string) {
    await this.getBookmarkState()
    //
    await this.saveBookmarkState()
  }
}
