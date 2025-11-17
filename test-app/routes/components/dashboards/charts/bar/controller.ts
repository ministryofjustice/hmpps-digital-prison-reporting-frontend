import { RequestHandler } from 'express'

import mockBarChartData from '../../../../../mocks/mockChartData/mockBarChartData'

export default class BarChartController {
  GET: RequestHandler = async (_req, res) => {
    res.render('views/pages/components/dashboards/charts/view.njk', {
      title: 'Bar charts',
      charts: mockBarChartData,
    })
  }
}
