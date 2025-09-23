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
    await ViewReportUtils.applyInteractiveFilters(req, res, this.services)
  }

  applyColumns: RequestHandler = async (req, res, next) => {
    const { type } = req.params
    res.redirect(`${req.baseUrl}/${type}`)
  }
}
