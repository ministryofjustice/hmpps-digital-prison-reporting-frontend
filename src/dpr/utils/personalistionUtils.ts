import { Request, Response } from 'express'
import { Services } from '../types/Services'
import localsHelper from './localsHelper'
import FiltersUtils from '../components/_filters/utils'

export enum FiltersType {
  INTERACTIVE = 'interactive',
  REQUEST = 'request',
}

const saveDefaults = async (type: FiltersType, res: Response, req: Request, services: Services) => {
  const defaultValuesForReport = await FiltersUtils.setUserDefinedDefaultValuesForReport(req, res, services, type)
  const { dprUser } = localsHelper.getValues(res)
  const { reportId, id } = req.body
  return services.defaultFilterValuesService.save(dprUser.id, reportId, id, defaultValuesForReport)
}

const removeDefaults = async (type: FiltersType, res: Response, req: Request, services: Services) => {
  const { dprUser } = localsHelper.getValues(res)
  const { reportId, id } = req.params
  return services.defaultFilterValuesService.delete(dprUser.id, reportId, id, type)
}

const saveInteractiveDefaults = () => {}

const saveRequestDefaults = () => {}

const removeInteractiveDefaults = () => {}

const removeRequestDefaults = () => {}

export default { saveDefaults, removeDefaults }
