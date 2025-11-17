import { RequestHandler } from 'express'

import mockLineChartData from '../../../../../mocks/mockChartData/mockLineChartData'

export default class LineChartController {
  GET: RequestHandler = async (_req, res) => {
    res.render('views/pages/components/dashboards/charts/view.njk', {
      title: 'Line charts',
      charts: mockLineChartData,
    })
  }
}
