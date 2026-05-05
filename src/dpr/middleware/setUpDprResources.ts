import { type RequestHandler, Response, Request } from 'express'
import type { Environment } from 'nunjucks'
import { Services } from '../types/Services'
import { RequestedReport, StoredReportData } from '../types/UserReports'
import DefinitionUtils, { getDefinitionsPath } from '../utils/definitionUtils'
import { BookmarkStoreData } from '../types/Bookmark'
import { DprConfig } from '../types/DprConfig'
import localsHelper from '../utils/localsHelper'
import { FeatureFlagService, isBooleanFlagEnabledOrMissing } from '../services/featureFlagService'
import { FEATURE_FLAGS, getFeatureFlagEvaluationSubject } from '../utils/featureFlagsHelper'
import setUpNunjucksFilters from '../setUpNunjucksFilters'
import { errorRequestHandler } from '../routes'
import logger from '../utils/logger'

/**
 * Middleware helper to populate all locals configuration
 * to enable DPR lib to operate correctly within a service.
 *
 * @param {Services} services
 * @param {string} layoutPath
 * @param {Environment} env
 * @param {DprConfig} [config]
 * @return {*}  {RequestHandler}
 */
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
      await populateDefinitions(services, req, res, config)
      await setLocalsFromServices(services, res)
      await populateRequestedReports(services, res)
      setUpDprPaths(res)

      setupRequestAwareNunjucks(env, res)
      setUpNunjucksFilters(env)
      return next()
    } catch (error) {
      return errorRequestHandler(layoutPath)(error, req, res, next)
    }
  }
}

const setupRequestAwareNunjucks = (env: Environment, res: Response) => {
  env.addGlobal('getLocals', () => ({ locals: { ...res.locals, ...res.app.locals } }))
}

/**
 * Sets the feature flags to locals
 *
 * @param {Response} res
 * @param {FeatureFlagService} featureFlagService
 */
const setFeatures = async (res: Response, featureFlagService: FeatureFlagService) => {
  if (res.app.locals['featureFlags'] === undefined) {
    res.app.locals['featureFlags'] = {
      flags: {},
    }
  }
  const subject = getFeatureFlagEvaluationSubject(res)
  res.app.locals['featureFlags'].flags = await featureFlagService.evaluateBooleanFlags(FEATURE_FLAGS, subject)

  logger.info(`FEATURE FLAGS: ${JSON.stringify(res.locals['downloadingEnabled'])}`)
}

/**
 * Populates the validation errors
 *
 * @param {Request} req
 * @param {Response} res
 */
const populateValidationErrors = (req: Request, res: Response) => {
  const errors = req.flash(`DPR_ERRORS`)
  if (errors && errors[0]) {
    res.locals['validationErrors'] = JSON.parse(errors[0])
  }
}

/**
 * Derives the definition path and sets the locals
 *
 * @param {Request} req
 * @param {Response} res
 * @param {DprConfig} [config]
 */
const deriveDefinitionsPath = (req: Request, res: Response, config?: DprConfig) => {
  // Check definitions path from config
  const dpdPathFromConfig = config?.dataProductDefinitionsPath
  res.locals['dpdPathFromConfig'] = !!dpdPathFromConfig

  // Check definitions path from request
  const dpdPathFromQuery = getDefinitionsPath(req.query) || null
  const dpdPathFromBody = req.body?.dataProductDefinitionsPath as string | undefined
  const definitionsPathFromQuery = dpdPathFromQuery || dpdPathFromBody
  res.locals['dpdPathFromQuery'] = !!definitionsPathFromQuery

  // Set the definitions path to locals
  // - incoming query overwrites config
  const activeDefinitionsPath = definitionsPathFromQuery || dpdPathFromConfig
  if (activeDefinitionsPath) {
    res.locals['hasDefinitionPath'] = !!activeDefinitionsPath
    res.locals['definitionsPath'] = activeDefinitionsPath

    // TODO: check if this is needed - its possibly been superceded
    res.locals['pathSuffix'] = `?dataProductDefinitionsPath=${res.locals['definitionsPath']}`

    logger.info(
      `DEFINITIONS PATH SET: ${JSON.stringify({
        definitionsPath: res.locals['definitionsPath'],
        dpdPathFromBody: res.locals['dpdPathFromBody'],
        dpdPathFromQuery: res.locals['dpdPathFromQuery'],
      })}`,
    )
  }
}

/**
 * Popluates the definitions in to locals
 *
 * @param {Services} services
 * @param {Request} req
 * @param {Response} res
 * @param {DprConfig} [config]
 */
const populateDefinitions = async (services: Services, req: Request, res: Response, config?: DprConfig) => {
  const { token, dprUser } = localsHelper.getValues(res)

  deriveDefinitionsPath(req, res, config)

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

  if (res.locals['definitions'] && res.locals['definitions'].length) {
    logger.info(`DEFINITIONS SET: ${res.locals['definitions'].length}`)
  }
}

/**
 * Sets active service config to locals
 *
 * @param {Services} services
 * @param {Response} res
 */
const setLocalsFromServices = async (services: Services, res: Response) => {
  const { dprUser } = localsHelper.getValues(res)
  if (dprUser.id) {
    res.locals['downloadingEnabled'] = services.downloadPermissionService.enabled
    res.locals['bookmarkingEnabled'] = services.bookmarkService.enabled
    res.locals['collectionsEnabled'] = services.productCollectionService.enabled
    res.locals['requestMissingEnabled'] = services.missingReportService.enabled

    // If saveDefaultsEnabled is turned off by feature flag, overwrite all other privileges,
    // otherwise let the defaultFilterValuesService decide.
    const saveDefaultsEnabledFlag = isBooleanFlagEnabledOrMissing('saveDefaultsEnabled', res.app)
    res.locals['saveDefaultsEnabled'] = saveDefaultsEnabledFlag ? services.defaultFilterValuesService.enabled : false

    logger.info(
      `ENABLED SERVICES: ${JSON.stringify({
        downloadingEnabled: res.locals['downloadingEnabled'],
        bookmarkingEnabled: res.locals['bookmarkingEnabled'],
        collectionsEnabled: res.locals['collectionsEnabled'],
        requestMissingEnabled: res.locals['requestMissingEnabled'],
        saveDefaultsEnabled: res.locals['saveDefaultsEnabled'],
      })}`,
    )
  }
}

/**
 * Populates the requested reports to locals
 *
 * @param {Services} services
 * @param {Response} res
 */
const populateRequestedReports = async (services: Services, res: Response) => {
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

/**
 * Initialises the DPR paths to locals
 *
 * @param {Response} res
 */
const setUpDprPaths = (res: Response) => {
  res.app.locals.dprPaths ??= {
    bookmarkActionEndpoint: '/dpr/my-reports/bookmarks',
    downloadActionEndpoint: '/dpr/download-report/',
    productCollectionEndpoint: '/dpr/product-collection/selected',
    bookmarkListPath: '/dpr/my-reports/bookmarks/list',
    requestedListPath: '/dpr/my-reports/requested-reports/list',
    recentlyViewedListPath: '/dpr/my-reports/recently-viewed/list',
    reportsCatalogue: '/dpr/report-catalogue',
    userReportsList: '/dpr/my-reports',
    dprHomepage: '/dpr',
  }
}

export default setupResources
