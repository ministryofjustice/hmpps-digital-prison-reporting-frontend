import { RequestHandler } from 'express'
import type { ParsedQs } from 'qs'
import ReportingService from '../services/reportingService'

const getQueryParamAsString = (query: ParsedQs, name: string) => (query[name] ? query[name].toString() : null)
const getDefinitionsPath = (query: ParsedQs) => getQueryParamAsString(query, 'dataProductDefinitionsPath')

const deriveDefinitionsPath = (query: ParsedQs): string | null => {
  const definitionsPath = getDefinitionsPath(query)
  if (definitionsPath) {
    return definitionsPath
  }
  return null
}

export default (service: ReportingService): RequestHandler => {
  return async (req, res, next) => {
    try {
      const definitionsPath = deriveDefinitionsPath(req.query)
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
