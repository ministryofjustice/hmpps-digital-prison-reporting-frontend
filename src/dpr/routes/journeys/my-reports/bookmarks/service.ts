import ReportStoreService from '../../../../services/reportStoreService'
import ReportDataStore from '../../../../data/reportDataStore'
import { ReportType } from '../../../../types/UserReports'
import { ReportStoreConfig } from '../../../../types/ReportStore'
import logger from '../../../../utils/logger'
import { BookmarkStoreData } from '../../../../types/Bookmark'
import { ServiceFeatureConfig } from '../../../../types/DprConfig'

class BookmarkService extends ReportStoreService {
  enabled: boolean

  constructor(reportDataStore: ReportDataStore, serviceFeatureConfig: ServiceFeatureConfig) {
    super(reportDataStore)
    this.enabled = Boolean(serviceFeatureConfig.bookmarking)
    if (!this.enabled) logger.info(`Bookmarking: disabled `)
  }

  async getAllBookmarks(userId: string): Promise<BookmarkStoreData[]> {
    if (!this.enabled) return []

    const userConfig = await this.getState(userId)
    return userConfig.bookmarks
  }

  async addBookmark(
    userId: string,
    reportId: string,
    id: string,
    type: ReportType,
    automatic?: boolean,
  ): Promise<void> {
    if (!this.enabled) return

    const userConfig = await this.getState(userId)
    if (!this.isBookmarkedCheck(userConfig, id, reportId)) {
      userConfig.bookmarks.unshift({ reportId, id, type, automatic })
    }
    await this.saveState(userId, userConfig)
  }

  async removeBookmark(userId: string, id: string, reportId: string): Promise<void> {
    if (!this.enabled) return

    const userConfig = await this.getState(userId)
    const index = userConfig.bookmarks.findIndex((bookmark) => {
      const bmVarId = bookmark.id
      return bmVarId === id && bookmark.reportId === reportId
    })
    if (index >= 0) {
      userConfig.bookmarks.splice(index, 1)
    }
    await this.saveState(userId, userConfig)
  }

  isBookmarked = async (id: string, reportId: string, userId: string): Promise<boolean | undefined> => {
    if (!this.enabled) return false

    const userConfig = await this.getState(userId)
    const isBookmarked = this.isBookmarkedCheck(userConfig, id, reportId)
    let bookmark
    if (isBookmarked) {
      bookmark = this.getBookmark(userConfig, id, reportId)
    }
    return bookmark?.automatic ? undefined : isBookmarked
  }

  private isBookmarkedCheck = (userConfig: ReportStoreConfig, id: string, reportId: string): boolean => {
    return userConfig.bookmarks.some((bookmark) => {
      const bmVarId = bookmark.id
      return bmVarId === id && bookmark.reportId === reportId
    })
  }

  private getBookmark = (userConfig: ReportStoreConfig, id: string, reportId: string) => {
    return userConfig.bookmarks.find((bookmark) => {
      const bmVarId = bookmark.id
      return bmVarId === id && bookmark.reportId === reportId
    })
  }

  async createBookMarkToggleHtml({
    userConfig,
    reportId,
    id,
    csrfToken,
    ctxId,
    reportType,
    isMissing,
  }: {
    userConfig: ReportStoreConfig
    reportId: string
    id: string
    csrfToken: string
    ctxId: string
    reportType: ReportType
    isMissing: boolean
  }) {
    let tooltip = 'Add bookmark'
    let automatic = false
    let checked = null
    if (userConfig?.bookmarks) {
      const bookmark = this.getBookmark(userConfig, id, reportId)
      if (bookmark) {
        checked = 'checked'
        tooltip = 'Remove bookmark'
        automatic = Boolean(bookmark.automatic)
      }
    }

    return automatic || isMissing
      ? ''
      : `<button class='dpr-bookmark dpr-bookmark-table' data-dpr-module='bookmark-toggle'>
  <input class='bookmark-input' type='checkbox' id='${reportId}-${id}-${ctxId}' data-report-id='${reportId}' data-id='${id}' data-report-type='${reportType}' data-csrf-token='${csrfToken}' ${checked} />
  <label tabindex='0' id='${id}-${reportId}-${ctxId}-bookmark-label' for='${reportId}-${id}-${ctxId}'><span class='dpr-bookmark-label govuk-body-s'>${tooltip}</span></label>
</button>`
  }
}

export { BookmarkService }
export default BookmarkService
