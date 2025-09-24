import { RequestHandler } from 'express'
import { Services } from '../../../../types/Services'
import ViewReportUtils from '../utils'

export default class AsyncController {
  layoutPath: string

  services: Services

  constructor(layoutPath: string, services: Services) {
    this.layoutPath = layoutPath
    this.services = services
  }

  applyFilters: RequestHandler = async (req, res, next) => {
    await ViewReportUtils.applyInteractiveQuery(req, res, this.services, 'filters')
  }

  applyColumns: RequestHandler = async (req, res, next) => {
    await ViewReportUtils.applyInteractiveQuery(req, res, this.services, 'columns')
  }
}
