import type { Response, Request } from 'express'
import { StoredReportData } from '../types/UserReports'
import { BookmarkStoreData } from '../types/Bookmark'
import { components } from '../types/api'

const getValues = (res: Response) => {
  const csrfToken = (res.locals.csrfToken as unknown as string) || 'csrfToken'

  return {
    ...setUserContext(res),
    ...setUserReports(res),
    ...setDpdPaths(res),
    ...setFeatures(res),
    ...setDefinitions(res),
    csrfToken,
    nestedBaseUrl: res.locals.nestedBaseUrl,
  }
}

const setDefinitions = (res: Response) => {
  const definitions: Array<components['schemas']['ReportDefinitionSummary']> = res.locals.definitions || []
  return {
    definitions,
  }
}

const setFeatures = (res: Response) => {
  return {
    bookmarkingEnabled: <boolean>res.locals.bookmarkingEnabled || false,
    downloadingEnabled: <boolean>res.locals.downloadingEnabled || false,
  }
}

const setUserReports = (res: Response) => {
  const requestedReports: StoredReportData[] = res.locals.requestedReports || []
  const recentlyViewedReports: StoredReportData[] = res.locals.recentlyViewedReports || []
  const bookmarks: BookmarkStoreData[] = res.locals.bookmarks || []

  return {
    requestedReports,
    recentlyViewedReports,
    bookmarks,
  }
}

const setDpdPaths = (res: Response) => {
  const { definitionsPath, dpdPathFromQuery, dpdPathFromConfig, pathSuffix } = res.locals
  return {
    definitionsPath,
    dpdPathFromQuery,
    dpdPathFromConfig,
    pathSuffix: pathSuffix || '',
  }
}

const setUserContext = (res: Response) => {
  const { dprContext, user } = res.locals

  const userId = dprContext?.uuid || user?.uuid
  const token = dprContext?.token || user?.token
  const activeCaseLoadId = dprContext?.activeCaseLoadId || user.activeCaseLoadId

  return {
    userId,
    token,
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
