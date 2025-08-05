import { RequestHandler } from 'express'

import mockBarChartData from '../../../../../mocks/mockChartData/mockBarChartData'

export default class BarChartController {
  GET: RequestHandler = async (req, res, next) => {
    res.render('views/pages/components/dashboards/charts/view.njk', {
      title: 'Bar charts',
      charts: mockBarChartData,
    })
  }
}
