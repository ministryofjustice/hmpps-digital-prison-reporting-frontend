import { RequestHandler } from 'express'

import mockLineChartData from '../../../../../mocks/mockChartData/mockLineChartData'

export default class ListChartController {
  GET: RequestHandler = async (req, res, next) => {
    res.render('views/pages/components/dashboards/charts/view.njk', {
      title: 'Bar charts',
      charts: mockLineChartData,
    })
  }
}
