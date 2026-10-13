import { RequestHandler } from 'express'

import mockBoxPlotChartData from '../../../../../mocks/mockChartData/mockBoxPlotChartData'

export default class LineChartController {
  GET: RequestHandler = async (_req, res) => {
    res.render('views/pages/components/dashboards/charts/view.njk', {
      title: 'Boxplot charts',
      charts: mockBoxPlotChartData,
    })
  }
}
