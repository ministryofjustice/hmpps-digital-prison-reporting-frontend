import RequestedReportService from '../services/requestedReportService'
import RecentlyViewedStoreService from '../services/recentlyViewedService'
import BookmarkService from '../services/bookmarkService'
import DownloadPermissionService from '../services/downloadPermissionService'
import UserDataStore from '../data/reportDataStore'
import { Services } from '../types/Services'

export const createDprServices = (userDataStore: UserDataStore) => {
  const requestedReportService = new RequestedReportService(userDataStore)
  const recentlyViewedService = new RecentlyViewedStoreService(userDataStore)
  const bookmarkService = new BookmarkService(userDataStore)
  const downloadPermissionService = new DownloadPermissionService(userDataStore)

  return {
    requestedReportService,
    recentlyViewedService,
    bookmarkService,
    downloadPermissionService,
  }
}

export const initReportStoreServices = async (userId: string, services: Services) => {
  await services.requestedReportService.init(userId)
  await services.recentlyViewedService.init(userId)
  await services.bookmarkService.init(userId)
  await services.downloadPermissionService.init(userId)
}
