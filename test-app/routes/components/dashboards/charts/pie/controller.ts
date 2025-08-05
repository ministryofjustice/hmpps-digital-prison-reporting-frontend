import { RequestHandler } from 'express'

import mockPieChartData from '../../../../../mocks/mockChartData/mockPieChartData'

export default class PieChartController {
  GET: RequestHandler = async (req, res, next) => {
    res.render('views/pages/components/dashboards/charts/view.njk', {
      title: 'Pie charts',
      charts: mockPieChartData,
    })
  }
}
