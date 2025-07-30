import { RequestHandler } from 'express'

export default class DashboardController {
  layoutPath: string

  GET: RequestHandler = async (req, res, next) => {
    res.render('views/pages/menu.njk', {
      title: 'Dashboard',
      caption: 'Components',
      cards: [
        {
          text: 'Scorecards',
          description: 'Autocomplete input component.',
          href: '/components/dashboards/scorecards',
        },
        {
          text: 'Charts',
          description: 'Date input component.',
          href: '/components/dashboards/charts',
        },
      ],
    })
  }
}
