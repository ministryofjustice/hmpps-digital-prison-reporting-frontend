import { RequestHandler } from 'express'
import type { ParsedQs } from 'qs'
import Dict = NodeJS.Dict
import logger from '../utils/logger'
import { Services } from '../types/Services'

const getQueryParamAsString = (query: ParsedQs, name: string) => (query[name] ? query[name].toString() : null)
const getDefinitionsPath = (query: ParsedQs) => getQueryParamAsString(query, 'dataProductDefinitionsPath')

const deriveDefinitionsPath = (query: ParsedQs): string | null => {
  const definitionsPath = getDefinitionsPath(query)
  if (definitionsPath) {
    return definitionsPath
  }

  return null
}

const dprExcludeRoutes = ['/getExpiredStatus/', '/getRequestedExpiredStatus/', '/requestReport/', '/getStatus/']

export default (services: Services, config: Dict<string>): RequestHandler => {
  return async (req, res, next) => {
    try {
      if (dprExcludeRoutes.includes(req.originalUrl)) {
        return next()
      }

      // Get the DPD path from the query
      const definitionsPathFromQuery = deriveDefinitionsPath(req.query)
      if (definitionsPathFromQuery) {
        res.locals.dpdPathFromQuery = true
      }

      // Get the DPD path from the config
      const { dprDataProductDefinitionPath: dpdPathFromConfig } = config
      if (dpdPathFromConfig) {
        res.locals.dpdPathFromConfig = true
      }

      // query takes presedence over config
      if (definitionsPathFromQuery) {
        logger.info(`DPD from config: ${definitionsPathFromQuery}`)
        res.locals.definitionsPath = definitionsPathFromQuery
      } else if (dpdPathFromConfig) {
        logger.info(`DPD from config: ${dpdPathFromConfig}`)
        res.locals.definitionsPath = dpdPathFromConfig
      }

      res.locals.pathSuffix = `?dataProductDefinitionsPath=${res.locals.definitionsPath}`

      if (res.locals.user.token && services.reportingService) {
        res.locals.definitions = await services.reportingService.getDefinitions(
          res.locals.user.token,
          res.locals.definitionsPath,
        )
      }

      return next()
    } catch (error) {
      return next(error)
    }
  }
}
