import { RequestHandler } from 'express'

import mockMatrixChartData from '../../../../../mocks/mockChartData/mockMatrixChartData'

export default class MatrixChartController {
  GET: RequestHandler = async (_req, res) => {
    res.render('views/pages/components/dashboards/charts/view.njk', {
      title: 'Matrix charts',
      charts: mockMatrixChartData,
    })
  }
}
