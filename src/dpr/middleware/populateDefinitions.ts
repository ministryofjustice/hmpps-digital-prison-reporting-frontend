import { RequestHandler } from 'express'
import type { ParsedQs } from 'qs'
import ReportingService from '../services/reportingService'
import Dict = NodeJS.Dict

const getQueryParamAsString = (query: ParsedQs, name: string) => (query[name] ? query[name].toString() : null)
const getDefinitionsPath = (query: ParsedQs) => getQueryParamAsString(query, 'dataProductDefinitionsPath')

const deriveDefinitionsPath = (query: ParsedQs, config: Dict<string>): string | null => {
  const definitionsPath = getDefinitionsPath(query)
  if (definitionsPath) {
    return definitionsPath
  }

  const { dprDataProductDefinitionPath } = config
  if (dprDataProductDefinitionPath) {
    return dprDataProductDefinitionPath
  }

  return null
}

export default (service: ReportingService, config: Dict<string>): RequestHandler => {
  return async (req, res, next) => {
    try {
      const definitionsPath = deriveDefinitionsPath(req.query, config)
      res.locals.pathSuffix = definitionsPath ? `?dataProductDefinitionsPath=${definitionsPath}` : ''
      if (res.locals.user.token && service) {
        res.locals.definitions = await service.getDefinitions(res.locals.user.token, definitionsPath)
      }
      return next()
    } catch (error) {
      return next(error)
    }
  }
}
