import { type RequestHandler, Response, Request } from 'express'
import type { Environment } from 'nunjucks'
import { Services } from '../types/Services'
import { DprConfig } from '../types/DprConfig'
import localsHelper from '../utils/localsHelper'
import { FeatureFlagService, isBooleanFlagEnabledOrMissing } from '../services/featureFlagService'
import { FEATURE_FLAGS, getFeatureFlagEvaluationSubject } from '../utils/featureFlagsHelper'
import setUpNunjucksFilters from '../setUpNunjucksFilters'
import { errorRequestHandler } from '../routes'
import { getAllMyBookmarks, getAllMyReports } from '../utils/reportStoreHelper'
import logger from '../utils/logger'
import { getDefinitionsPath } from '../utils/definitionUtils'
import { cleanupReports } from '../utils/cleanupMyReports'

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
      // 1. Initialise our feature flags to app.locals
      await setFeatureFlags(res, services.featureFlagService)

      // 2. Initialise definitions, collections and definitions path
      await populateDefinitions(services, req, res, config)

      // 3. Initialise enabled service flags to app.locals
      await initialiseServices(services, res)

      // 4. Populate user reports state with up to date list
      await populateRequestedReports(services, res, req)

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
const setFeatureFlags = async (res: Response, featureFlagService: FeatureFlagService) => {
  if (res.app.locals['featureFlags'] === undefined) {
    res.app.locals['featureFlags'] = {
      flags: {},
    }
  }

  const subject = getFeatureFlagEvaluationSubject(res)

  const currentFlags = res.app.locals['featureFlags'].flags
  const newFlags = await featureFlagService.evaluateBooleanFlags(FEATURE_FLAGS, subject)

  const hasChanged = JSON.stringify(currentFlags) !== JSON.stringify(newFlags)

  if (hasChanged) {
    res.app.locals['featureFlags'].flags = newFlags

    logger.info(`FEATURE FLAGS UPDATED: ${JSON.stringify(newFlags)}`)
  }
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
 * Populates the definitions and sets the local collection
 *
 * @param {Services} services
 * @param {Request} req
 * @param {Response} res
 * @param {DprConfig} [config]
 */
const populateDefinitions = async (services: Services, req: Request, res: Response, config?: DprConfig) => {
  // 1. set the definitions path
  deriveDefinitionsPath(req, res, config)

  // 2. set the definitions
  await setDefinitions(services, req, res, config)

  // 3. set the collections
  await setProductCollection(services, req, res)
}

/**
 * Set the current collection in the UI
 *
 * - only updates and makes API call if collection ID has changed
 *
 * @param {Services} services
 * @param {Request} req
 * @param {Response} res
 */
const setProductCollection = async (services: Services, req: Request, res: Response) => {
  const { token, dprUser } = localsHelper.getValues(res)

  const selectedProductCollectionId = await services.productCollectionStoreService.getSelectedProductCollectionId(
    dprUser.id,
  )

  const currentId = req.session['currentCollectionId']
  const updateCollection = currentId !== selectedProductCollectionId

  req.session['currentCollectionId'] = selectedProductCollectionId

  const allDefs = req.session['allDefinitions']
  res.locals['definitions'] = allDefs ?? []

  if (updateCollection) {
    if (selectedProductCollectionId && allDefs) {
      const collection = await services.productCollectionService.getProductCollection(
        token,
        selectedProductCollectionId,
      )

      if (collection) {
        req.session['currentCollection'] = collection

        const productIds = collection.products.map(p => p.productId)
        res.locals['definitions'] = allDefs.filter(def => productIds.includes(def.id))

        logger.info(`COLLECTION SET: ${res.locals['definitions'].length}`)
        return
      }
    }

    res.locals['definitions'] = allDefs ?? []
  }
}

/**
 * Set the full catalogue of definitions to app.locals
 *
 * @param {Services} services
 * @param {Request} req
 * @param {Response} res
 * @param {DprConfig} [config]
 */
const setDefinitions = async (services: Services, req: Request, res: Response, config?: DprConfig) => {
  const { token } = localsHelper.getValues(res)

  if (shouldRunDefinitionsCheck(req.session, config)) {
    const defs = await services.reportingService.getDefinitions(token, res.locals['definitionsPath'])
    if (!defs) return

    req.session['allDefinitions'] = defs

    logger.info(`Definitions set: ${req.session['allDefinitions'].length}`)

    recordDefinitionsCheck(req.session)
  }
}

/**
 * Checks if the get definition endpoint should be run
 *
 * @export
 * @param {{ lastDefinitionsCheck?: number }} session
 * @param {DprConfig} [config]
 * @return {*}  {boolean}
 */
export function shouldRunDefinitionsCheck(session: { lastDefinitionsCheck?: number }, config?: DprConfig): boolean {
  const interval = config?.checkDefinitionsInterval

  // No config -> always run
  if (interval === undefined) {
    return true
  }

  // Explicit override -> always run
  if (interval === 0) {
    return true
  }

  const lastRun = session.lastDefinitionsCheck

  // Never run before -> run now
  if (!lastRun) {
    return true
  }

  // Check interval
  return Date.now() - lastRun > interval
}

/**
 * Records the last run into the session
 *
 * @export
 * @param {{ lastDefinitionsCheck?: number }} session
 */
export function recordDefinitionsCheck(session: { lastDefinitionsCheck?: number }) {
  // eslint-disable-next-line no-param-reassign
  session.lastDefinitionsCheck = Date.now()
}

/**
 * Sets active service config to app.locals
 *
 * @param {Services} services
 * @param {Response} res
 */
const initialiseServices = async (services: Services, res: Response) => {
  const { dprUser } = localsHelper.getValues(res)
  if (dprUser.id) {
    // Downloading
    if (!res.app.locals['downloadingEnabled']) {
      res.app.locals['downloadingEnabled'] = services.downloadPermissionService.enabled

      logger.info(`Init service: downloadPermissionService: ${res.app.locals['downloadingEnabled']}`)
    }

    // Bookmarking
    if (!res.app.locals['bookmarkingEnabled']) {
      res.app.locals['bookmarkingEnabled'] = services.bookmarkService.enabled

      logger.info(`Init service: bookmarkService: ${res.app.locals['bookmarkingEnabled']}`)
    }

    // Collections
    if (!res.app.locals['collectionsEnabled']) {
      res.app.locals['collectionsEnabled'] = services.productCollectionService.enabled

      logger.info(`Init service: productCollectionService: ${res.app.locals['collectionsEnabled']}`)
    }

    // Missing reports
    if (!res.app.locals['requestMissingEnabled']) {
      res.app.locals['requestMissingEnabled'] = services.missingReportService.enabled

      logger.info(`Init service: missingReportService: ${res.app.locals['requestMissingEnabled']}`)
    }

    // Save defaults
    const enabled = isBooleanFlagEnabledOrMissing('saveDefaultsEnabled', res.app)
      ? services.defaultFilterValuesService.enabled
      : false

    const current = res.app.locals['saveDefaultsEnabled']
    if (current !== enabled) {
      res.app.locals['saveDefaultsEnabled'] = enabled

      logger.info(`Init service: defaultFilterValuesService: ${res.app.locals['saveDefaultsEnabled']}`)
    }
  }
}

/**
 * Populates the requested reports to locals
 *
 * @param {Services} services
 * @param {Response} res
 */
const populateRequestedReports = async (services: Services, res: Response, req: Request) => {
  const { dprUser } = localsHelper.getValues(res)
  if (dprUser.id) {
    const myReports = await getAllMyReports(res, services, dprUser.id)

    const { requestedReports, recentlyViewedReports } = await cleanupReports(
      services,
      dprUser.id,
      myReports.requestedReports,
      myReports.recentlyViewedReports,
      res,
    )

    res.locals['requestedReports'] = requestedReports

    res.locals['recentlyViewedReports'] = recentlyViewedReports

    res.locals['subscriptions'] = myReports.subscriptions

    if (res.app.locals['bookmarkingEnabled']) {
      res.locals['bookmarks'] = await getAllMyBookmarks(res, services, dprUser.id)
    }

    const removedReports = req.flash('DPR_REMOVED_REPORTS')
    if (removedReports && removedReports[0]) {
      const [firstRemovedReport] = removedReports
      res.locals['removedReports'] = JSON.parse(firstRemovedReport)
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
    bookmarkListPath: '/dpr/my-reports/bookmarks',
    requestedListPath: '/dpr/my-reports/requested-reports',
    recentlyViewedListPath: '/dpr/my-reports/recently-viewed',
    reportsCatalogue: '/dpr/report-catalogue',
    userReportsList: '/dpr/my-reports',
    requestReportPath: '/dpr/request-report',
    viewReportPath: '/dpr/view-report',
    dprHomepage: '/dpr',
  }
}

export default setupResources
