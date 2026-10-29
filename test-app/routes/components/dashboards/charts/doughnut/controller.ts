import { RequestHandler } from 'express'

import mockDoughnutChartData from '../../../../../mocks/mockChartData/mockDoughnutChartData'

export default class DoughnutChartController {
  GET: RequestHandler = async (_req, res) => {
    res.render('views/pages/components/dashboards/charts/view.njk', {
      title: 'Doughnut charts',
      charts: mockDoughnutChartData,
    })
  }
}
