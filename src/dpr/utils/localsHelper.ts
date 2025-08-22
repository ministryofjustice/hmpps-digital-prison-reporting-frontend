import type { Response, Request } from 'express'
import { StoredReportData } from '../types/UserReports'
import { BookmarkStoreData } from '../types/Bookmark'
import { components } from '../types/api'

const getValues = (res: Response) => {
  const csrfToken = (res.locals.csrfToken as unknown as string) || 'csrfToken'
  const dprUser = setDprUserContext(res)

  return {
    token: dprUser.token,
    dprUser,
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
    bookmarkingEnabled: <boolean>res.locals.bookmarkingEnabled,
    downloadingEnabled: <boolean>res.locals.downloadingEnabled,
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

const setDprUserContext = (res: Response) => {
  const { dprUser } = res.locals
  const id = dprUser?.userId
  const token = dprUser?.token
  const activeCaseLoadId = dprUser?.activeCaseLoadId
  const staffId = dprUser?.staffId
  const email = dprUser?.emailAddress || ''
  const displayName = dprUser?.displayName || ''

  return {
    id,
    token,
    activeCaseLoadId,
    staffId,
    email,
    displayName,
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
