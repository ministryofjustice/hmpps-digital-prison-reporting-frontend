import type { Response, Request } from 'express'
import { StoredReportData } from '../types/UserReports'
import { BookmarkStoreData } from '../types/Bookmark'

const getValues = (res: Response) => {
  const csrfToken = (res.locals.csrfToken as unknown as string) || 'csrfToken'
  const userId = res.locals.user?.uuid ? res.locals.user.uuid : 'userId'
  const token = res.locals.user?.token ? res.locals.user.token : 'token'
  const activeCaseLoadId = res.locals.user?.activeCaseLoadId || ''
  const pathSuffix = res.locals.pathSuffix || ''
  const routePrefix = res.locals.routePrefix || ''
  const definitions = res.locals.definitions || []
  const requestedReports: StoredReportData[] = res.locals.requestedReports || []
  const recentlyViewedReports: StoredReportData[] = res.locals.recentlyViewedReports || []
  const bookmarks: BookmarkStoreData[] = res.locals.bookmarks || []
  const { bookmarkingEnabled, downloadingEnabled, definitionsPath, dpdPathFromQuery, dpdPathFromConfig } = res.locals

  return {
    csrfToken,
    userId,
    token,
    definitions,
    requestedReports,
    recentlyViewedReports,
    bookmarks,
    bookmarkingEnabled,
    downloadingEnabled,
    dpdPathFromQuery,
    dpdPathFromConfig,
    definitionsPath,
    pathSuffix,
    routePrefix,
    activeCaseLoadId,
  }
}

const setDdpPathToReqQuery = (req: Request, value: string) => {
  if (value) {
    req.query = {
      ...req.query,
      dataProductDefinitionsPath: value,
    }
  }

  return req.query
}

export default {
  getValues,
  setDdpPathToReqQuery,
}
