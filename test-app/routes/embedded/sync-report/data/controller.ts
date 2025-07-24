import { RequestHandler } from 'express'

export default class SyncReportByDataController {
  layoutPath: string

  constructor(layoutPath: string) {
    this.layoutPath = layoutPath
  }

  GET: RequestHandler = async (req, res, next) => {
    //
  }
}
