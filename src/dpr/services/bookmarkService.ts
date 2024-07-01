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
    return [
      { reportId: 'string', variantId: 'string' },
      { reportId: 'string', variantId: 'string' },
      { reportId: 'string', variantId: 'string' },
    ]
  }

  async addBookmark(reportId: string, variantId: string) {
    await this.getBookmarkState()
    console.log('addBookmark')
    await this.saveBookmarkState()
  }

  async removeBookmark(reportId: string, variantId: string) {
    await this.getBookmarkState()
    console.log('removeBookmark')
    await this.saveBookmarkState()
  }

  isBookmarked = (variantId: string) => {
    return this.bookmarks.filter((bookmark) => bookmark.variantId === variantId).length > 0
  }
}
