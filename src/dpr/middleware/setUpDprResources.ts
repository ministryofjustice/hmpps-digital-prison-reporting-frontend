/* eslint-disable @typescript-eslint/no-explicit-any */
import { RequestHandler, Response, Request, ErrorRequestHandler, NextFunction } from 'express'
import type { ParsedQs } from 'qs'
import { HTTPError } from 'superagent'
import type { Environment } from 'nunjucks'
import { captureException } from '@sentry/node'
import { Services } from '../types/Services'
import { RequestedReport, StoredReportData } from '../types/UserReports'
import DefinitionUtils from '../utils/definitionUtils'
import { BookmarkStoreData } from '../types/Bookmark'
import { DprConfig } from '../types/DprConfig'
import localsHelper from '../utils/localsHelper'
import { FeatureFlagService, isBooleanFlagEnabledOrMissing } from '../services/featureFlagService'

const getQueryParamAsString = (query: ParsedQs, name: string) => (query[name] ? query[name].toString() : null)
const getDefinitionsPath = (query: ParsedQs) => getQueryParamAsString(query, 'dataProductDefinitionsPath')

const deriveDefinitionsPath = (query: ParsedQs): string | null => {
  const definitionsPath = getDefinitionsPath(query)
  if (definitionsPath) {
    return definitionsPath
  }

  return null
}

export const errorRequestHandler =
  (layoutPath: string): ErrorRequestHandler =>
  (error: HTTPError, _req: Request, res: Response, next: NextFunction) => {
    if (error.status === 401 || error.status === 403) {
      return res.render('dpr/routes/authError.njk', {
        layoutPath,
        message: 'Sorry, there is a problem with authenticating your request',
      })
    }
    captureException(error)
    if (error.status >= 400) {
      return res.render('dpr/routes/serviceProblem.njk', {
        layoutPath,
      })
    }
    return next(error)
  }

export const setupResources = (
  services: Services,
  layoutPath: string,
  env: Environment,
  config?: DprConfig,
): RequestHandler => {
  return async (req, res, next) => {
    populateValidationErrors(req, res)
    try {
      await setFeatures(res, services.featureFlagService)
      //Performance consideration: This seems to be called on every request. Not call GET definitions on every request.
      await populateDefinitions(services, req, res, config)
      await populateRequestedReports(services, res)
      setupRequestAwareNunjucks(env, res)
      return next()
    } catch (error) {
      return errorRequestHandler(layoutPath)(error, req, res, next)
    }
  }
}

const setupRequestAwareNunjucks = (env: Environment, res: Response) => {
  env.addGlobal('getLocals', () => ({ locals: { ...res.locals, ...res.app.locals } }))
}

const setFeatures = async (res: Response, featureFlagService: FeatureFlagService) => {
  if (res.app.locals.featureFlags === undefined) {
    res.app.locals.featureFlags = {
      flags: {},
      lastUpdated: new Date().getTime() - 601 * 1000,
    }
  }
  const { featureFlags } = res.app.locals
  const currentTime = new Date().getTime()
  const timeSinceLastUpdatedSeconds = (currentTime - featureFlags.lastUpdated) / 1000
  const shouldUpdate = timeSinceLastUpdatedSeconds > 600
  if (shouldUpdate) {
    // Refresh every 10 mins
    res.app.locals.featureFlags.lastUpdated = currentTime
    const flags = await featureFlagService.getFlags().catch((e) => {
      res.app.locals.featureFlags.lastUpdated = currentTime - 601 * 1000
      throw e
    })
    res.app.locals.featureFlags.flags = Object.fromEntries(flags.flags.map((flag) => [flag.key, flag]))
  }
}

const populateValidationErrors = (req: Request, res: Response) => {
  const errors = req.flash(`DPR_ERRORS`)
  if (errors && errors[0]) {
    res.locals['validationErrors'] = JSON.parse(errors[0])
  }
}

export const populateDefinitions = async (services: Services, req: Request, res: Response, config?: DprConfig) => {
  // Get the DPD path from the query
  const { token, dprUser } = localsHelper.getValues(res)

  const dpdPathFromQuery = deriveDefinitionsPath(req.query)
  const dpdPathFromBody = req.body?.dataProductDefinitionsPath
  const definitionsPathFromQuery = dpdPathFromQuery || dpdPathFromBody

  if (definitionsPathFromQuery) {
    res.locals['dpdPathFromQuery'] = true
  }

  // Get the DPD path from the config
  const dpdPathFromConfig = config?.dataProductDefinitionsPath
  if (dpdPathFromConfig) {
    res.locals['dpdPathFromConfig'] = true
  }

  // query takes presedence over config
  res.locals['definitionsPath'] = definitionsPathFromQuery || dpdPathFromConfig
  res.locals['pathSuffix'] = `?dataProductDefinitionsPath=${res.locals['definitionsPath']}`

  let selectedProductCollectionId: string | undefined
  if (token) {
    selectedProductCollectionId = await services.productCollectionStoreService.getSelectedProductCollectionId(
      dprUser.id,
    )
  }

  res.locals['definitions'] =
    (await Promise.all([
      services.reportingService.getDefinitions(token, res.locals['definitionsPath']),
      selectedProductCollectionId &&
        services.productCollectionService.getProductCollection(token, selectedProductCollectionId),
    ]).then(([defs, selectedProductCollection]) => {
      if (selectedProductCollection && selectedProductCollection) {
        const productIds = selectedProductCollection.products.map((product) => product.productId)
        return defs.filter((def) => productIds.includes(def.id))
      }
      return defs
    })) ?? []
}

export const populateRequestedReports = async (services: Services, res: Response) => {
  const { dprUser } = localsHelper.getValues(res)
  if (dprUser.id) {
    const { definitions, definitionsPath } = res.locals

    const recent = await services.recentlyViewedService.getAllReports(dprUser.id)
    await services.requestedReportService.cleanList(dprUser.id, recent)
    const requested = await services.requestedReportService.getAllReports(dprUser.id)

    res.locals['requestedReports'] = !definitionsPath
      ? requested
      : requested.filter((report: RequestedReport) => {
          return DefinitionUtils.getCurrentVariantDefinition(definitions, report.reportId, report.id)
        })

    res.locals['recentlyViewedReports'] = !definitionsPath
      ? recent
      : recent.filter((report: StoredReportData) => {
          return DefinitionUtils.getCurrentVariantDefinition(definitions, report.reportId, report.id)
        })

    res.locals['downloadingEnabled'] = services.downloadPermissionService.enabled
    res.locals['bookmarkingEnabled'] = services.bookmarkService.enabled
    res.locals['collectionsEnabled'] = services.productCollectionService.enabled
    res.locals['requestMissingEnabled'] = services.missingReportService.enabled
    res.locals['saveDefaultsEnabled'] = isBooleanFlagEnabledOrMissing('saveDefaultsEnabled', res.app)

    if (res.locals['bookmarkingEnabled']) {
      const bookmarks = await services.bookmarkService.getAllBookmarks(dprUser.id)
      res.locals['bookmarks'] = !definitionsPath
        ? bookmarks
        : bookmarks.filter((bookmark: BookmarkStoreData) => {
            return DefinitionUtils.getCurrentVariantDefinition(definitions, bookmark.reportId, bookmark.id)
          })
    }
  }
}

export default setupResources
