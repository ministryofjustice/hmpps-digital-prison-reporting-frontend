/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, RequestHandler, Response, Request } from 'express'
import type { ParsedQs } from 'qs'
import Dict = NodeJS.Dict
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

// const dprExcludeRoutes = ['/getExpiredStatus/', '/getRequestedExpiredStatus/', '/getStatus/']

export default (services: Services, config: any): RequestHandler => {
  return async (req, res, next) => {
    return populateDefinitions(services, config, req, res, next)
  }
}

export const populateDefinitions = async (
  services: Services,
  config: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // Get the DPD path from the query
    const dpdPathFromQuery = deriveDefinitionsPath(req.query)
    const dpdPathFromBody = req.body.dataProductDefinitionsPath
    const definitionsPathFromQuery = dpdPathFromQuery || dpdPathFromBody

    if (definitionsPathFromQuery) {
      res.locals.dpdPathFromQuery = true
    }

    // Get the DPD path from the config
    const { dprDataProductDefinitionPath: dpdPathFromConfig } = config
    if (dpdPathFromConfig) {
      res.locals.dpdPathFromConfig = true
    }

    // query takes presedence over config
    res.locals.definitionsPath = definitionsPathFromQuery || dpdPathFromConfig
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
