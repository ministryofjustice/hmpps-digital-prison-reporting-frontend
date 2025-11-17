import { RequestHandler } from 'express'

export default class ChartsController {
  GET: RequestHandler = async (_req, res, _next) => {
    res.render('views/pages/menu.njk', {
      title: 'Charts',
      caption: 'Dashboard',
      cards: [
        {
          text: 'Bar',
          description: 'Bar chart component examples',
          href: '/components/dashboards/charts/bar',
        },
        {
          text: 'Line',
          description: 'Line chart component examples',
          href: '/components/dashboards/charts/line',
        },
        {
          text: 'Pie',
          description: 'Pie chart component examples',
          href: '/components/dashboards/charts/pie',
        },
        {
          text: 'List',
          description: 'List chart component examples',
          href: '/components/dashboards/charts/list',
        },
      ],
    })
  }
}
