import { RequestHandler } from 'express'

export default class DashboardController {
  layoutPath: string

  GET: RequestHandler = async (req, res, next) => {
    res.render('views/pages/menu.njk', {
      title: 'Dashboard visualisations',
      caption: 'Components',
      cards: [
        {
          text: 'Scorecards',
          description: 'Autocomplete input component.',
          href: '/components/dashboards/scorecards',
        },
        {
          text: 'Charts',
          description: 'Chart type visualisations',
          href: '/components/dashboards/charts',
        },
        {
          text: 'list',
          description: 'List visualisation',
          href: '/components/dashboards/list',
        },
      ],
    })
  }
}
