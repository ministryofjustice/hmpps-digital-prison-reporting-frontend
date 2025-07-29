import { RequestHandler } from 'express'

export default class ParentChildSectionTemplateController {
  layoutPath: string

  GET: RequestHandler = async (req, res, next) => {
    res.render('views/pages/components/catalogue/view.njk', {})
  }
}
